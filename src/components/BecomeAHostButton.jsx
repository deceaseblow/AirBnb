import React, { useState } from 'react';
import BecomeAHostModal from './BecomeAHostModal';

function BecomeHostButton({ className = "", children = "Become a host" }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className={className}
      >
        {children}
      </button>
      
      <BecomeAHostModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}

export default BecomeHostButton;