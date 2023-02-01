import React from "react";
import { Modal } from "../../context/Modal";
import UpdateSubrandditComponent from "./index";

function UpdateSubrandditModal({ isOpen, modalToggle }) {
  return (
    <>
      {isOpen && (
        <Modal onClose={() => modalToggle(false)}>
          <UpdateSubrandditComponent onClose={() => modalToggle(false)} />
        </Modal>
      )}
    </>
  );
}

export default UpdateSubrandditModal;
