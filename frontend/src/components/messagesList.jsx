import React, { useEffect, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useGetMessagesQuery, useAddMessageMutation } from '../services/messagesApi';

const MessageForm = (props) => {
  const { activeChannel } = props;
  const { data: messages, refetch } = useGetMessagesQuery();
  const [addMessage] = useAddMessageMutation();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const activeMessages = messages?.filter(({ channelId }) => channelId === activeChannel.id) || [];
  const { username } = useSelector((state) => state.users);

  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = { body: value, channelId: activeChannel.id, username };
    addMessage(newMessage);
    refetch();
    setValue('');
  };

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              { activeChannel.name }
            </b>
          </p>
          <span className="text-muted">
            { activeMessages.length }
            {' '}
            сообщений
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {messages?.filter(({ channelId }) => channelId === activeChannel.id).map((message) => (
            <div className="text-break mb-2" key={message.id}>
              <b>{message.username}</b>
              :
              {' '}
              {message.body}
            </div>
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <Form className="py-1 border rounded-2" onSubmit={handleSubmit}>
            <div className="input-group has-validation">
              <Form.Control
                name="body"
                aria-label="Новое сообщение"
                placeholder="Введите сообщение"
                className="border-0 p-0 ps-2"
                onChange={handleChange}
                value={value}
                ref={inputRef}
              />
              <button type="submit" className="btn btn-group-vertical">
                Отправить
              </button>
            </div>
          </Form>
        </div>
      </div>

    </div>
  );
};

export default MessageForm;
