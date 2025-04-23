import React from 'react';
import './BorderSelector.css'; 


/**
 * BorderSelector Component
 * 
 * The component displays a list of borders and allows the user to select one
 * When a border is selected, the onSelect callback will pass the border's URL and its size
 *
 * @param {Object[]} borderList - The list of borders
 * @param {string} borderList.name - The name of the border
 * @param {string} borderList.thumbnail - The thumbnail image URL for the border
 * @param {string} borderList.frame - The full frame image URL for the border
 * @param {Function} onSelect - A callback function triggered when a border thumbnail is clicked
 * 
 * @returns {JSX.Element} The border selector component
 */
const BorderSelector = ({ borderList, onSelect }) => {
  /**
 * choose a border, load its image and get its width and height
 * passing to father component
 * @param {Object} border - the chosen border
 * @param {string} border.frame - the whole image of the border
 * @param {string} border.name - name of the border
 * @param {string} border.thumbnail - URL of the border thumbnail
 */
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
