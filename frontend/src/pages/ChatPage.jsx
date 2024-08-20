// import axios from 'axios';
import React from 'react';
import { useGetChannelsQuery } from '../services/channelsApi';
import ChannelsForm from '../components/channelList';
// import axios from 'axios';

const ChatPage = () => {
  const { data: channels } = useGetChannelsQuery();
  // const [addMessage] = useAddMessageMutation();
  // const newMessage = { body: 'Lala', channelId: '1', username: 'admin' };
  // addMessage(newMessage).then((res) => console.log(res));
  // eslint-disable-next-line functional/no-loop-statements
  return (
    <div className="d-flex flex-column h-100">
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <a className="navbar-brand" href="/">
            Hexlet Chat
          </a>
        </div>
      </nav>
      <ChannelsForm channels={channels} />
    </div>
  );
};

export default ChatPage;
