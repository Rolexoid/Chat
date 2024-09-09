import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ChannelsForm from '../components/channelList';
import { logOut } from '../slices/authorizationSlice';

const ChatPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const onClick = () => {
    localStorage.removeItem('userId');
    dispatch(logOut());
    navigate('/login');
  };

  return (
    <div className="h-100">
      <div className="d-flex flex-column h-100">
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            <a className="navbar-brand" href="/">
              Hexlet Chat
            </a>
            <Button variant="primary" onClick={() => onClick()}>{t('chat.logOut')}</Button>
          </div>
        </nav>
        <ChannelsForm />
      </div>
    </div>
  );
};

export default ChatPage;
