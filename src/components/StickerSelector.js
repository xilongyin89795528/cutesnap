import React from 'react';
import './StickerSelector.css';

/**
 * StickerSelector Component
 * 
 * The component displays a list of stickers and allows the user to add them
 * When a sticker is clicked, the onAddSticker callback will be triggered, passing the sticker's URL
 *
 * @param {Object[]} stickerList - The list of stickers
 * @param {string} stickerList.id - ID for each sticker
 * @param {string} stickerList.src - URL of the sticker's image
 * @param {Function} onAddSticker - A callback function triggered when a sticker is clicked
 * 
 * @returns {JSX.Element} The sticker selector componen
 */
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
