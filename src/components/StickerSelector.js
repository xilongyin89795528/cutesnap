import React from 'react';
import './StickerSelector.css';

const StickerSelector = ({ stickerList, onAddSticker }) => {
  return (
    <div className="sticker-selector-wrapper">
      <div className="sticker-list">
        {stickerList.map((sticker) => (
          <img
            key={sticker.id}
            src={sticker.src}
            alt={`sticker-${sticker.id}`}
            className="sticker-thumb"
            onClick={() => onAddSticker(sticker.src)}
          />
        ))}
      </div>
    </div>
  );
};

export default StickerSelector;