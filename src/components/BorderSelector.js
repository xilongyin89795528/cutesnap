import React from 'react';
import './BorderSelector.css'; 

const BorderSelector = ({ borderList, onSelect }) => {
  const handleSelect = (border) => {
    const img = new Image();
    img.onload = () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;

      onSelect(border.frame, { width, height });
    };
    img.src = border.frame;
  };

  return (
    <div className="border-selector-wrapper">
      <div className="border-scroll-list">
        {borderList.map((border, index) => (
          <img
            key={index}
            src={border.thumbnail}
            alt={border.name}
            className="border-thumb"
            onClick={() => handleSelect(border)}
          />
        ))}
      </div>
    </div>
  );
};

export default BorderSelector;
