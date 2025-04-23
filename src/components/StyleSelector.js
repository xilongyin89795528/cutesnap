import React from 'react';
import './StyleSelector.css';

/**
 * StyleSelector Component
 * 
 * This component displays a list of style categories and allows the user to select one.
 * When a category is selected, the onCategoryChange callback will be triggered, updating the selected category.
 *
 * @param {Object[]} categoryList - The list of categories
 * @param {string} categoryList.id - ID for each category
 * @param {string} categoryList.image - Image of the category icon
 * @param {string} categoryList.label - Label for the category
 * @param {string} selectedCategory - ID of the selected category
 * @param {Function} onCategoryChange - A callback function triggered when a category is selected
 * 
 * @returns {JSX.Element} The style selector component.
 */
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
