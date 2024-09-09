import React, { useEffect, useRef } from 'react';
import { Formik } from 'formik';
import {
  Modal, FormGroup, FormControl, Button, Form,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useEditChannelMutation } from '../../services/channelsApi';
import { newChannelShema } from '../../utils/shema';
import filter from '../../utils/filter';

const Rename = (props) => {
  const { channels, onHide, modalInfo } = props;
  const [editChannel] = useEditChannelMutation();
  const { t } = useTranslation();

  const onSubmit = async (values) => {
    const currId = modalInfo.item.id;
    try {
      await editChannel({ id: currId, body: { name: filter(values.body) } });
      onHide();
      toast.success(t('toastify.rename'));
    } catch (err) {
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
          validationSchema={newChannelShema(t, names)}
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
                  ref={inputRef}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.body}
                  data-testid="input-body"
                  name="body"
                  className="mb-2"
                  isInvalid={errors.body}
                />
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
