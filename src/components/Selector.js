import React, { useState } from 'react';
import BorderSelector from './BorderSelector';
import StickerSelector from './StickerSelector';
import StyleSelector from './StyleSelector';
import './Selector.css';

import borderIcon from '../assets/border.png';
import stickerIcon from '../assets/sticker.png';

/**
 * SelectorPanel
 * 
 * It displays a panel where the user can select borders or stickers to apply to an image.
 * has two modes "border" and "sticker", which allow the user to switch.
 * The selected border or sticker category is filtered based on the user’s choice.
 *
 * @param {Object[]} borderList - List of available borders
 * @param {Object[]} stickerList - List of available sticker
 * @param {Object[]} borderCategoryList - List of border categories
 * @param {Object[]} stickerCategoryList - List of sticker categories
 * @param {string} selectedBorderCategory - The currently selected border category
 * @param {Function} setSelectedBorderCategory - Function to update the selected border category
 * @param {string} selectedStickerCategory - The currently selected sticker category
 * @param {Function} setSelectedStickerCategory - Function to update the selected sticker category
 * @param {Function} onSelectBorder - Callback function triggered when a border is selected
 * @param {Function} onAddSticker - Callback function triggered when a sticker is added
 * 
 * @returns {JSX.Element} The SelectorPanel component
 */
const SelectorPanel = ({
  borderList,
  stickerList,
  borderCategoryList,
  stickerCategoryList,
  selectedBorderCategory,         
  setSelectedBorderCategory,      
  selectedStickerCategory,
  setSelectedStickerCategory,
  onSelectBorder,
  onAddSticker,
}) => {
  const [mode, setMode] = useState('border');

  const filteredBorders = borderList.filter(
    (b) => b.category === selectedBorderCategory
  );
  const filteredStickers = stickerList.filter(
    (s) => s.category === selectedStickerCategory
  );

  return (
    <div className="selector-panel">
      <div className="selector-tabs">
        <div className="selector-border">
          <img
            src={borderIcon}
            alt="Border Mode"
            className={`tab-icon ${mode === 'border' ? 'active' : ''}`}
            onClick={() => setMode('border')}
          />
          <div className="style-border">Border</div>
        </div>
        <div className="selector-sticker">
          <img
            src={stickerIcon}
            alt="Sticker Mode"
            className={`tab-icon ${mode === 'sticker' ? 'active' : ''}`}
            onClick={() => setMode('sticker')}
          />
          <div className="style-sticker">Sticker</div>
        </div>
      </div>

      <div className="selector-content">
        {mode === 'border' && (
          <>
            <StyleSelector
              categoryList={borderCategoryList}
              selectedCategory={selectedBorderCategory}
              onCategoryChange={setSelectedBorderCategory}
            />
            <BorderSelector
              borderList={filteredBorders}
              onSelect={(frameUrl, size) => onSelectBorder(frameUrl, size)}
            />
          </>
        )}

        {mode === 'sticker' && (
          <>
            <StyleSelector
              categoryList={stickerCategoryList}
              selectedCategory={selectedStickerCategory}
              onCategoryChange={setSelectedStickerCategory}
            />
            <StickerSelector
              stickerList={filteredStickers}
              onAddSticker={onAddSticker}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default SelectorPanel;
