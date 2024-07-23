import axios from 'axios';
import React, { useEffect, useState } from 'react';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

const ChatPage = () => {
  const [channels, setChannels] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get('/api/v1/channels', { headers: getAuthHeader() });
      setChannels(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      {channels.map((channel) => (
        <div key={channel.id}>{channel.name}</div>
      ))}
    </div>
  );
};

export default ChatPage;
