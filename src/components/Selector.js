import React, { useState } from 'react';
import BorderSelector from './BorderSelector';
import StickerSelector from './StickerSelector';
import StyleSelector from './StyleSelector';
import './Selector.css';

import borderIcon from '../assets/border.png';
import stickerIcon from '../assets/sticker.png';

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
