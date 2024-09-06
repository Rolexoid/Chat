/* eslint-disable arrow-body-style */
// import axios from 'axios';
import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ChannelsForm from '../components/channelList';
import { logOut } from '../slices/authorizationSlice';

const ChatPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onClick = () => {
    localStorage.removeItem('userId');
    dispatch(logOut());
    navigate('/login');
  };
  // eslint-disable-next-line functional/no-loop-statements
  return (
    <div className="h-100">
      <div className="d-flex flex-column h-100">
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            <a className="navbar-brand" href="/">
              Hexlet Chat
            </a>
            <Button variant="primary" onClick={() => onClick()}>Выйти</Button>
          </div>
        </nav>
        <ChannelsForm />
      </div>
    </div>
  );
};

export default ChatPage;
