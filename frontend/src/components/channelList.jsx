import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import MessageForm from './messagesList';
import { useGetChannelsQuery, channelsApi } from '../services/channelsApi';
import { messagesApi } from '../services/messagesApi.js';
import { setActiveChannelId, showModal, hideModal } from '../slices/appSlice';
import getModal from './modals/index.js';
import { defaultChannelId } from '../utils/defaultChannel.js';
import ChannelName from './ChannelName.jsx';
import SocketContext from '../context/SocketContext.js';
import { ROUTES } from '../utils/routes';
import useAuth from '../hooks/useAuth';

const renderModals = ({
  appInfo, channels, onHide,
}) => {
  const { modalInfo } = appInfo;
  if (!modalInfo.type) {
    return null;
  }
  const Component = getModal(modalInfo.type);
  return <Component channels={channels} onHide={onHide} modalInfo={modalInfo} />;
};

const ChannelsForm = () => {
  const {
    data: channels, error: channelError, refetch, isLoading,
  } = useGetChannelsQuery();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const appInfo = useSelector((state) => state.appControl);
  const { activeChannelId } = appInfo;
  const onHide = () => dispatch(hideModal());
  const socket = useContext(SocketContext);
  const { logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (channelError?.status === 401) {
      logOut();
      navigate(ROUTES.login);
    }
  }, [channelError, logOut, navigate, t]);

  useEffect(() => {
    function newChannelFunc(newChannel) {
      dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
        draft.push(newChannel);
      }));
    }

    function renameChannelFunc(editedChannel) {
      dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
        const filtered = draft.filter(({ id }) => id !== editedChannel.id);
        filtered.push(editedChannel);
        return filtered;
      }));
      if (editedChannel.id === activeChannelId) {
        dispatch(setActiveChannelId(editedChannel.id));
      }
    }

    function removeChannelFunc(removedChannel) {
      dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draft) => (
        draft.filter(({ id }) => id !== removedChannel.id))));
      dispatch(messagesApi.util.updateQueryData('getMessages', undefined, (draft) => (
        draft.filter(({ channelId }) => channelId !== removedChannel.id))));
      if (removedChannel.id === activeChannelId) {
        dispatch(setActiveChannelId(defaultChannelId));
      }
    }

    socket.on('newChannel', newChannelFunc);
    socket.on('renameChannel', renameChannelFunc);
    socket.on('removeChannel', removeChannelFunc);

    return () => {
      socket.off('newChannel', newChannelFunc);
      socket.off('renameChannel', renameChannelFunc);
      socket.off('removeChannel', removeChannelFunc);
    };
  }, [activeChannelId, dispatch, refetch, socket]);

  if (isLoading) {
    return (<p>{t('loading.text')}</p>);
  }

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>{t('chat.channels')}</b>
            <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={() => dispatch(showModal({ type: 'adding', item: null }))}>
              +
            </button>
          </div>
          <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
            {channels?.map((channel) => (<ChannelName channel={channel} key={channel.id} />))}
          </ul>
        </div>
        <MessageForm activeChannelId={activeChannelId} channels={channels} />
      </div>
      {renderModals({
        appInfo, channels, onHide,
      })}
    </div>
  );
};

export default ChannelsForm;
