import React from 'react';
import './StyleSelector.css';



const StyleSelector = ({ categoryList, selectedCategory, onCategoryChange }) => {
    return (
      <div className="style-selector">
        {categoryList.map(({ id, image, label }) => (
          <div
            key={id}
            className={`style-item ${selectedCategory === id ? 'active' : ''}`}
            onClick={() => onCategoryChange(id)}
          >
            <img
              src={image}
              alt={label}
              className="style-icon"
            />
            <div className="style-label">{label}</div>
          </div>
        ))}
      </div>
    );
  };
  
  
  export default StyleSelector;
