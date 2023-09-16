import React, { useEffect } from 'react';
import PropTypes from 'prop-types'; 
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

Modal.propTypes = {
  src: PropTypes.string.isRequired, 
  alt: PropTypes.string.isRequired, 
  onClose: PropTypes.func.isRequired, 
};

export default Modal;
