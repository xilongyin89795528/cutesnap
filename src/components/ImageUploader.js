import React, { useRef } from 'react';
import uploadIcon from '../assets/button.png';
import './ImageUploader.css';


const ImageUploader = ({ onImageUpload }) => {
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

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
