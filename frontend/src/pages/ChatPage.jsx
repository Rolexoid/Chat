import React from 'react';
import ChannelsForm from '../components/channelList';
import Header from '../components/Header';

const ChatPage = () => (
  <div className="h-100">
    <div className="d-flex flex-column h-100">
      <Header />
      <ChannelsForm />
    </div>
  </div>
);

export default ChatPage;
