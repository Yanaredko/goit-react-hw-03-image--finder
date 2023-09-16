import React, { useEffect } from 'react';
import "../index.css";

const Modal = ({ src, alt, onClose }) => {
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [onClose]);

  return (
    <div className="Overlay" onClick={onClose}>
      <div className="Modal">
        <img src={src} alt={alt} />
      </div>
    </div>
  );
};

export default Modal;
