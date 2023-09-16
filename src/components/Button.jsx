import React from "react";
import "../index.css";

const Button = ({ onClick, isHidden }) => (
  <button
    type="button"
    className="Button"
    onClick={onClick} 
    style={{ display: isHidden ? 'none' : 'block' }}
  >
    Load more
  </button>
);

export default Button;