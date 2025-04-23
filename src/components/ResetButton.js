import resetIcon from '../assets/reset.png';
import React from 'react';
import './ResetButton.css';

/**
 * ResetButton
 * 
 * When clicked, it triggers the onClick callback to reset.
 *
 * @param {Function} onClick - A callback function that is triggered when the reset button is clicked
 * 
 * @returns {JSX.Element} The reset button component
 */
const ResetButton = ({ onClick }) => {
    return (
      <div className="image-reset">
      <img
        src={resetIcon}
        alt="Reset"
        onClick={onClick}
        className="reset-button"
      />
      <div className="style-reset">Reset</div>
    </div>
    );
  };
  
  export default ResetButton;
