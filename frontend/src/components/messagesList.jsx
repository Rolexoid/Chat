import React, { useEffect, useRef } from 'react';
import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { useGetMessagesQuery, useAddMessageMutation } from '../services/messagesApi';
import filter from '../utils/filter';
import socket from '../utils/socket.js';

const MessageForm = (props) => {
  const { activeChannelId, channels } = props;
  const { data: messages, refetch, error: messageError } = useGetMessagesQuery();
  const [addMessage, { isLoading }] = useAddMessageMutation();
  const inputRef = useRef();
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current.focus();
    if (messageError) {
      toast.error(t('errors.server'));
      throw messageError;
    }
  }, [messageError, t]);

  useEffect(() => {
    function newMessageFunc() {
      refetch();
    }

    socket.on('newMessage', newMessageFunc);

    return () => {
      socket.off('newMessage', newMessageFunc);
    };
  }, [refetch]);

  const activeMessages = messages?.filter(({ channelId }) => channelId === activeChannelId) || [];
  const { username } = useSelector((state) => state.users);

  const onSubmit = async (values, actions) => {
    try {
      const newMessage = { body: filter(values.body), channelId: activeChannelId, username };
      await addMessage(newMessage).unwrap();
      actions.resetForm({
        values: {
          body: '',
        },
      });
    } catch (err) {
      console.log('seterror');
      toast.error(t('errors.server'));
      console.error(err);
    }
  };

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {channels.find((channel) => channel.id === activeChannelId)?.name}
            </b>
          </p>
          <span className="text-muted">
            {t('chat.messages.count', { count: activeMessages.length })}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {messages?.filter(({ channelId }) => channelId === activeChannelId).map((message) => (
            <div className="text-break mb-2" key={message.id}>
              <b>{message.username}</b>
              :
              {' '}
              {message.body}
            </div>
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <Formik
            onSubmit={onSubmit}
            initialValues={{ body: '' }}
          >
            {({
              handleSubmit, handleChange, values,
            }) => (
              <Form className="py-1 border rounded-2" onSubmit={handleSubmit}>
                <div className="input-group has-validation">
                  <Form.Control
                    name="body"
                    aria-label="Новое сообщение"
                    placeholder={t('chat.putMessage')}
                    className="border-0 p-0 ps-2"
                    onChange={handleChange}
                    value={values.body}
                    ref={inputRef}
                  />
                  <button
                    type="submit"
                    className="btn btn-group-vertical"
                    disabled={isLoading || values.body.replaceAll(' ', '').length === 0}
                  >
                    {t('chat.submit')}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default MessageForm;
