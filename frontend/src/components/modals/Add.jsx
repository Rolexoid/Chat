import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import {
  Modal, FormGroup, FormControl, Button,
} from 'react-bootstrap';
import * as yup from 'yup';
import { useAddChannelMutation } from '../../services/channelsApi';

yup.setLocale({
  mixed: {
    notOneOf: 'Должно быть уникальным',
    required: 'Обязательное поле',
  },
  string: {
    min: 'От 3 до 20 символов',
    max: 'От 3 до 20 символов',
  },
});

const getShema = (channels) => yup.string().required().min(3).max(20)
  .notOneOf(channels);

const Add = (props) => {
  const [error, setError] = useState('');
  const { channels, onHide } = props;
  const [addChannel] = useAddChannelMutation();

  const f = useFormik({
    onSubmit: (values) => {
      const names = channels.map(({ name }) => name);
      getShema(names)
        .validate(values.body)
        .then((trueValue) => {
          try {
            addChannel({ name: trueValue });
            onHide();
          } catch (err) {
            console.log(err);
          }
        })
        .catch((err) => setError(err.message));
    },
    initialValues: { body: '' },
  });
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={f.handleSubmit}>
          <FormGroup>
            <FormControl
              ref={inputRef}
              onChange={f.handleChange}
              onBlur={f.handleBlur}
              value={f.values.body}
              data-testid="input-body"
              name="body"
              className="mb-2"
              isInvalid={error.length !== 0}
            />
            <FormControl.Feedback type="invalid">
              {error}
            </FormControl.Feedback>
          </FormGroup>
          <div className="d-flex justify-content-end">
            <Button type="button" variant="secondary" className="me-2" onClick={() => onHide()}>Отменить</Button>
            <Button type="submit" variant="primary">Отправить</Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
