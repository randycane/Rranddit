import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from '../auth/SignUpForm';
//import "./auth.css"

function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="come-in" onClick={() => setShowModal(true)}>Sign Up</div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;
