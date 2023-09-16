import React from "react";
import "../index.css";

const ImageGalleryItem = ({ src, alt }) => (
    <li className="ImageGalleryItem">
        <img className="ImageGalleryItem-image" src={src} alt={alt} />
  </li>
)

export default ImageGalleryItem;