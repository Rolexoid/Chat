import React from 'react';
import {
  Modal, Button,
} from 'react-bootstrap';
import { useRemoveChannelMutation } from '../../services/channelsApi';

const Remove = (props) => {
  const { onHide, modalInfo } = props;
  const [removeChannel] = useRemoveChannelMutation();
  const currId = modalInfo.item.id;

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <Button type="button" variant="secondary" className="me-2" onClick={() => onHide()}>Отменить</Button>
          <Button
            type="button"
            variant="danger"
            onClick={() => {
              removeChannel(currId);
              onHide();
            }}
          >
            Удалить
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
