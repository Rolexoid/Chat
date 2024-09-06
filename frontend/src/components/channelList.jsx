import React, { useEffect } from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import MessageForm from './messagesList';
import { useGetChannelsQuery } from '../services/channelsApi';
import { setActiveChannel, showModal, hideModal } from '../slices/appSlice';
import getModal from './modals/index.js';
import socket from '../utils/socket';

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
  const { data: channels, refetch } = useGetChannelsQuery();
  const dispatch = useDispatch();
  const appInfo = useSelector((state) => state.appControl);
  const { activeChannel } = appInfo;
  const onHide = () => dispatch(hideModal());

  const setClasses = (cur) => {
    const channelClasses = cn('w-100', 'rounded-0', 'text-start', 'btn', {
      'btn-secondary': cur.id === activeChannel.id,
      'text-truncate': cur.removable,
    });
    return channelClasses;
  };

  const renderChannelName = (channel) => (
    <button
      type="button"
      onClick={() => dispatch(setActiveChannel(channel))}
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
        variant={channel.id === activeChannel.id ? 'secondary' : 'none'}
        id="dropdown-split-basic"
      >
        <span className="visually-hidden"> Управление каналом </span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => dispatch(showModal({ type: 'removing', item: channel }))}>Удалить</Dropdown.Item>
        <Dropdown.Item onClick={() => dispatch(showModal({ type: 'renaming', item: channel }))}>Переименовать</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  useEffect(() => {
    socket.on('newChannel', (payload) => {
      refetch();
      dispatch(setActiveChannel(payload));
    });
    socket.on('renameChannel', (payload) => {
      refetch();
      if (payload.id === activeChannel.id) {
        dispatch(setActiveChannel(payload));
      }
    });
    socket.on('removeChannel', (payload) => {
      refetch();
      if (payload.id === activeChannel.id) {
        dispatch(setActiveChannel({ id: '1', name: 'general', removable: false }));
      }
    });
  }, [refetch, dispatch, activeChannel.id]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>Каналы</b>
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
        <MessageForm activeChannel={activeChannel} />
      </div>
      {renderModals({
        appInfo, channels, onHide,
      })}
    </div>
  );
};

export default ChannelsForm;
