import React from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import { setActiveChannelId, showModal } from '../slices/appSlice';

const ChannelName = ({ channel }) => {
  const dispatch = useDispatch();
  const appInfo = useSelector((state) => state.appControl);
  const { activeChannelId } = appInfo;
  const { t } = useTranslation();

  const setClasses = (cur) => {
    const channelClasses = cn('w-100', 'rounded-0', 'text-start', {
      'text-truncate': cur.removable,
      btn: true,
      'btn-secondary': cur.id === activeChannelId,
    });
    return channelClasses;
  };

  const renderChannel = () => (
    <button
      type="button"
      onClick={() => dispatch(setActiveChannelId(channel.id))}
      className={setClasses(channel)}
    >
      <span className="me-1">#</span>
      {channel.name}
    </button>
  );

  const renderChannelWithNavs = () => (
    <Dropdown as={ButtonGroup} className="d-flex">
      {renderChannel()}
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
    <li className="nav-item w-100">
      {channel.removable ? renderChannelWithNavs() : renderChannel() }
    </li>
  );
};

export default ChannelName;
