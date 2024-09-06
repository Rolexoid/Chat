import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import {
  Modal, FormGroup, FormControl, Button,
} from 'react-bootstrap';
import * as yup from 'yup';
import { useEditChannelMutation } from '../../services/channelsApi';

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

const Rename = (props) => {
  const [error, setError] = useState('');
  const { channels, onHide, modalInfo } = props;
  const [editChannel] = useEditChannelMutation();

  const f = useFormik({
    onSubmit: (values) => {
      const names = channels.map(({ name }) => name);
      const currId = modalInfo.item.id;
      getShema(names)
        .validate(values.body)
        .then((trueValue) => {
          try {
            editChannel({ id: currId, body: { name: trueValue } });
            onHide();
          } catch (err) {
            console.log(err);
          }
        })
        .catch((err) => setError(err.message));
    },
    initialValues: { body: modalInfo.item.name },
  });
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.select();
  }, []);

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Переименовать канал</Modal.Title>
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

export default Rename;
