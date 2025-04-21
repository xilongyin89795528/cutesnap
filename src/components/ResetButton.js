import resetIcon from '../assets/reset.png';
import React from 'react';
import './ResetButton.css';

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