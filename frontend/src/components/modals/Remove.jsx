import React from 'react';
import {
  Modal, Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useRemoveChannelMutation } from '../../services/channelsApi';

const Remove = (props) => {
  const { onHide, modalInfo } = props;
  const [removeChannel] = useRemoveChannelMutation();
  const { t } = useTranslation();
  const currId = modalInfo.item.id;

  const onSubmit = async () => {
    try {
      await removeChannel(currId).unwrap();
      onHide();
      toast.success(t('toastify.remove'));
    } catch (err) {
      toast.error(t('errors.server'));
      console.error(err);
    }
  };

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modals.removeChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">{t('modals.areYouSure')}</p>
        <div className="d-flex justify-content-end">
          <Button type="button" variant="secondary" className="me-2" onClick={() => onHide()}>{t('modals.cancel')}</Button>
          <Button
            type="button"
            variant="danger"
            onClick={() => onSubmit()}
          >
            {t('modals.delete')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
