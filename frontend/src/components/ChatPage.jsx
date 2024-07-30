// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
import { useGetChannelsQuery } from '../services/channelsApi';

/* const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  console.log(userId);

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
}; */

const ChatPage = () => {
  const { data: channels, error: channelsError } = useGetChannelsQuery();
  // const res = await axios.get('/api/v1/channels', { headers: getAuthHeader() });
  console.log(channels, channelsError);

  return (
    <ul>
      {channels.map((channel) => (
        <li key={channel.id}>{channel.name}</li>
      ))}
    </ul>
  );
};

export default ChatPage;
