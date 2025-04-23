import React, { useRef } from 'react';
import uploadIcon from '../assets/button.png';

/**
 * ImageUploader Component
 * 
 * This component allows the user to upload an image. It renders a clickable icon that triggers the file input when clicked.
 * After an image is selected, it reads the image file and passes the URL to the parent component via the onImageUpload callback.
 *
 * @param {Function} onImageUpload - A callback function that receives the URL of the uploaded image
 * 
 * @returns {JSX.Element} The image uploader component.
 */
const ImageUploader = ({ onImageUpload }) => {
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  /**
   * Trigger the file input click when the upload icon is clicked.
   */
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        onImageUpload(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="image-uploader text-center">
      <img
        src={uploadIcon}
        alt="Upload"
        onClick={handleImageClick}
        style={{
          cursor: 'pointer',
          width: '70px',
          height: '70px',
          objectFit: 'contain'
        }}
      />
      <div className="style-label">Upload</div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default ImageUploader;
