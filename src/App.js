import './App.css';
import React, { useState } from 'react';
import {
  borderList,
  stickerList,
  borderCategoryList,
  stickerCategoryList
} from './data';
import Editor from "./components/Editor";
import Selector from "./components/Selector";
import MusicPlayer from './components/MusicPlayer';


function App() {
  const [imageSrc, setImageSrc] = useState(null);
  const [selectedBorder, setSelectedBorder] = useState(null);
  const [editorSize, setEditorSize] = useState({ width: 500, height: 500 });
  const [stickersInEditor, setStickersInEditor] = useState([]); 
  const [selectedBorderCategory, setSelectedBorderCategory] = useState('dreamy'); 
  const [selectedStickerCategory, setSelectedStickerCategory] = useState('crystal');


/**
 * choose a border and adjust the editor size according to the border size
 * the URL of new border is updated
 * @param {string} frameUrl - URL of the chosen border
 * @param {number} size.width - width of border
 * @param {number} size.height - height of border
 */
  const handleSelectBorder = (frameUrl, size) => {
    setSelectedBorder(frameUrl);
  
    const maxH = 500;
    const ratio = maxH / size.height;
    setEditorSize({
      width: size.width * ratio,
      height: size.height * ratio,
    });
  };
  
  /**
 * add a new sticker, with primary location (150, 150)
 * update the sticker list
 *
 * @param {string} src - 新贴纸的图片URL。
 */
  
  const handleAddSticker = (src) => {
    const newSticker = {
      id: Date.now(),
      src,
      x: 150,
      y: 150,
    };
    setStickersInEditor((prev) => [...prev, newSticker]);
  };

  /**
 *
 * reset all the stickers
 */
  const handleResetStickers = () => setStickersInEditor([]);


  return (
    <div className="App">
      <MusicPlayer />
      <h1>Welcome to CuteSnap!</h1>

      <div className="main-layout">
        <div className="left-panel">
          <Editor 
          imageSrc={imageSrc} 
          setImageSrc={setImageSrc}
          selectedBorder={selectedBorder}
          editorSize = {editorSize}
          stickers={stickersInEditor}
          setStickers={setStickersInEditor}
          onResetStickers={handleResetStickers}
          />
        </div>

        <div className="right-panel">
          <Selector
            borderList={borderList}
            stickerList={stickerList}
            borderCategoryList={borderCategoryList}
            stickerCategoryList={stickerCategoryList}
            selectedBorderCategory={selectedBorderCategory}                 
            setSelectedBorderCategory={setSelectedBorderCategory}
            selectedStickerCategory={selectedStickerCategory}       
            setSelectedStickerCategory={setSelectedStickerCategory}
            onSelectBorder={handleSelectBorder}
            onAddSticker={handleAddSticker}
/>
        </div>
        <div className="watermark">
          © 2025 CuteSnap by Xilong
        </div>
      </div>
    </div>
  );
}


export default App;
