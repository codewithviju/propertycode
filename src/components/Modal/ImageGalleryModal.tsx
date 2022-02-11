import React, { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const ImageGalleryModal = (props: any) => {
  // const [show, setShow] = useState(false);
  let subtitle: HTMLHeadingElement | null;
  const [modalIsOpen, setIsOpen] = useState(true);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
      <Modal
        isOpen={props}
        onAfterOpen={props}
        onRequestClose={props}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        <button onClick={closeModal}>close</button>
        <div>{props.children}</div>
      </Modal>
    </>
  );
};

export default ImageGalleryModal;
