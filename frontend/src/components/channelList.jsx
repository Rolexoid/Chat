import React, { useEffect } from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import MessageForm from './messagesList';
import { useGetChannelsQuery } from '../services/channelsApi';
import { setActiveChannelId, showModal, hideModal } from '../slices/appSlice';
import getModal from './modals/index.js';
import socket from '../utils/socket.js';
import { defaultChannelId } from '../utils/defaultChannel.js';

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
    data: channels, refetch, error: getChannelsError, isLoading,
  } = useGetChannelsQuery();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const appInfo = useSelector((state) => state.appControl);
  const { activeChannelId } = appInfo;
  const onHide = () => dispatch(hideModal());

  useEffect(() => {
    if (getChannelsError) {
      toast.error(t('errors.server'));
      throw getChannelsError;
    }
  }, [dispatch, getChannelsError, t]);

  useEffect(() => {
    function newChannelFunc() {
      refetch();
    }

    function renameChannelFunc(editedChannel) {
      refetch();
      if (editedChannel.id === activeChannelId) {
        dispatch(setActiveChannelId(editedChannel.id));
      }
    }

    function removeChannelFunc(removedChannel) {
      refetch();
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
  }, [activeChannelId, dispatch, refetch]);

  if (isLoading) {
    return (<p>{t('loading.text')}</p>);
  }

  const setClasses = (cur) => {
    const channelClasses = cn('w-100', 'rounded-0', 'text-start', {
      'text-truncate': cur.removable,
      btn: true,
      'btn-secondary': cur.id === activeChannelId,
    });
    return channelClasses;
  };

  const renderChannelName = (channel) => (
    <button
      type="button"
      onClick={() => dispatch(setActiveChannelId(channel.id))}
      className={setClasses(channel)}
    >
      <span className="me-1">#</span>
      {channel.name}
    </button>
  );

  const renderNavs = (channel) => (
    <Dropdown as={ButtonGroup} className="d-flex">
      {renderChannelName(channel)}
      <Dropdown.Toggle
        split
        className="flex-grow-0"
        variant={channel.id === activeChannelId ? 'secondary' : 'none'}
        id="dropdown-split-basic"
      >
        <span className="visually-hidden">{t('chat.controlChannel')}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => dispatch(showModal({ type: 'removing', item: channel }))}>{t('chat.remove')}</Dropdown.Item>
        <Dropdown.Item onClick={() => dispatch(showModal({ type: 'renaming', item: channel }))}>{t('chat.rename')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

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
            {channels?.map((channel) => (
              <li className="nav-item w-100" key={channel.id}>
                {channel.removable
                  ? renderNavs(channel)
                  : renderChannelName(channel)}
              </li>
            ))}
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
