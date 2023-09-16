import React from "react";
import "../index.css";

const ImageGalleryItem = ({ src, alt, onClick }) => (
    <li className="ImageGalleryItem" onClick={onClick}>
        <img className="ImageGalleryItem-image" src={src} alt={alt} />
  </li>
)

export default ImageGalleryItem;