import React, { useState, useRef } from 'react';
import './Editor.css';
import ResetButton from './ResetButton';
import DownloadButton from './DownloadButton';
import ImageUploader from './ImageUploader';

const Editor = ({ imageSrc, setImageSrc, selectedBorder, stickers, setStickers, onResetStickers, editorSize }) => {

  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const canvasRef = useRef(null);

  const [draggingStickerId, setDraggingStickerId] = useState(null);
  const stickerOffset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y,
      });
    }
    if (draggingStickerId !== null) {
      setStickers((prev) =>
        prev.map((s) =>
          s.id === draggingStickerId
            ? {
                ...s,
                x: e.clientX - stickerOffset.current.x,
                y: e.clientY - stickerOffset.current.y,
              }
            : s
        )
      );
    }
    
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggingStickerId(null);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.05 : 0.05;
    setScale((prev) => Math.max(0.1, prev + delta));
  };

  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setStickers([]);
  };


  const handleAddSticker = (src) => {
    const newSticker = {
      id: Date.now(),
      src,
      x: 100,
      y: 100,
    };
    setStickers((prev) => [...prev, newSticker]);
  };

  const handleStickerMouseDown = (e, id) => {
    setDraggingStickerId(id);
    const target = stickers.find((s) => s.id === id);
    stickerOffset.current = {
      x: e.clientX - target.x,
      y: e.clientY - target.y,
    };
  };
  
  



  return (
    <div className="editor-canvas-wrapper">
      <div className="button-container">
        <ImageUploader onImageUpload={setImageSrc} />
        <DownloadButton
          imageSrc={imageSrc}
          selectedBorder={selectedBorder}
          position={position}
          scale={scale}
          stickers={stickers}
          displaySize = {editorSize}
        />
        <ResetButton onClick={handleReset} />
      </div>
      <div
        className="editor-canvas"
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        style={{
          width: `${editorSize.width}px`,
          height: `${editorSize.height}px`,
        }}
      >
        <div className="image-layer">
          {imageSrc && (
            <img
              src={imageSrc}
              alt="Uploaded"
              className="editable-image"
              onMouseDown={handleMouseDown}
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                cursor: isDragging ? 'grabbing' : 'grab',
              }}
              draggable={false}
            />
          )}
          {stickers.map((sticker) => (
            <img
              key={sticker.id}
              src={sticker.src}
              className="sticker-image"
              style={{
                position: 'absolute',
                left: sticker.x,
                top: sticker.y,
                width: '80px', 
                height: '80px',
                pointerEvents: 'auto',
                cursor: draggingStickerId === sticker.id ? 'grabbing' : 'grab',
              }}
              onMouseDown={(e) => handleStickerMouseDown(e, sticker.id)}
              draggable={false}
              alt="sticker"
            />
          ))}
          {selectedBorder && (
            <img
              src={selectedBorder}
              alt="Selected border"
              className="border-image-overlay"
              draggable={false}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Editor;

