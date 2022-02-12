import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ImageGalleryModal = (props: any) => {
  const url = "https://propertybot-backend.com/api/v1/properties/cleveland";
  const [data, setData] = useState([]);
  useEffect(() => {
    try {
      const getData = async () => {
        const response = await axios.get(url);
        setData(response.data);
      };
      getData();
    } catch (error) {
      console.log(error);
    }
  }, [props.id]);

  // const [show, setShow] = useState(false);
  let subtitle: HTMLHeadingElement | null;
  const [modalIsOpen, setIsOpen] = useState(false);
  console.log("props.show", props.show);
  console.log("modalIsOpen", modalIsOpen);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  const handleToggle = () => {
    setIsOpen(false);
  };
  console.log("images", props.images);

  return (
    <>
      <Modal
        isOpen={props.show}
        onAfterOpen={props}
        onRequestClose={props.close}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        <h3>{props.id}</h3>
        <div className="items-center">
          {props.images.map((items: string) => {
            return <img src={items} height="100px" width="100px" />;
          })}
        </div>
        <button onClick={handleToggle}>close</button>
        <div>{props.children}</div>
      </Modal>
    </>
  );
};

export default ImageGalleryModal;
