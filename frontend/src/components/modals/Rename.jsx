import React, { useEffect, useRef } from 'react';
import { Formik } from 'formik';
import {
  Modal, FormGroup, FormControl, Button, Form, FormLabel,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import { useEditChannelMutation } from '../../services/channelsApi';
import { newChannelSchema } from '../../utils/schema';

const Rename = (props) => {
  const { channels, onHide, modalInfo } = props;
  const [editChannel] = useEditChannelMutation();
  const { t } = useTranslation();

  const onSubmit = async (values) => {
    const currId = modalInfo.item.id;
    try {
      await editChannel({ id: currId, body: { name: filter.clean(values.body) } }).unwrap();
      onHide();
      toast.success(t('toastify.rename'));
    } catch (err) {
      toast.error(t('errors.server'));
      console.error(err);
    }
  };

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.select();
  }, []);

  const names = channels.map(({ name }) => name);

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modals.renameChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Formik
          validationSchema={newChannelSchema(t, names)}
          onSubmit={onSubmit}
          initialValues={{ body: modalInfo.item.name }}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({
            handleSubmit, handleChange, values, errors, handleBlur,
          }) => (
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <FormControl
                  id="body"
                  ref={inputRef}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.body}
                  data-testid="input-body"
                  name="body"
                  className="mb-2"
                  isInvalid={errors.body}
                />
                <FormLabel className="visually-hidden" htmlFor="body">{t('modals.label')}</FormLabel>
                <FormControl.Feedback type="invalid">
                  {errors.body}
                </FormControl.Feedback>
              </FormGroup>
              <div className="d-flex justify-content-end">
                <Button type="button" variant="secondary" className="me-2" onClick={() => onHide()}>{t('modals.cancel')}</Button>
                <Button type="submit" variant="primary">{t('modals.submit')}</Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;
