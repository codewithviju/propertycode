import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

const ImageGalleryModal = (props: any) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            {props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.children}</Modal.Body>
      </Modal>
    </>
  );
};

export default ImageGalleryModal;
