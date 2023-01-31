import React from "react";
import { Modal } from "../../context/Modal";
import LoginModalComponent from "./LoginForm";

function LoginFormModal({ isOpen, modalToggle }) {
  return (
    <>
      {isOpen && (
        <Modal onClose={() => modalToggle(false)}>
          <LoginModalComponent onClose={() => modalToggle(false)}/>
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
