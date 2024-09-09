import React, { useEffect, useRef } from 'react';
import { Formik } from 'formik';
import {
  Modal, FormGroup, FormControl, Button, Form,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useAddChannelMutation } from '../../services/channelsApi';
import { newChannelShema } from '../../utils/shema';
import filter from '../../utils/filter';
import { setActiveChannelId } from '../../slices/appSlice';

const Add = (props) => {
  const dispatch = useDispatch();
  const { channels, onHide } = props;
  const [addChannel] = useAddChannelMutation();
  const { t } = useTranslation();

  const onSubmit = async (values) => {
    try {
      const response = await addChannel({ name: filter(values.body) });
      onHide();
      toast.success(t('toastify.add'));
      dispatch(setActiveChannelId(response.data.id));
    } catch (err) {
      console.error(err);
    }
  };

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const names = channels.map(({ name }) => name);

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modals.addChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Formik
          validationSchema={newChannelShema(t, names)}
          onSubmit={onSubmit}
          initialValues={{ body: '' }}
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

export default Add;
