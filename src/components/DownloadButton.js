import React from 'react';
import downloadIcon from '../assets/download.png';
import './DownloadButton.css';

const DownloadButton = ({
  imageSrc,
  selectedBorder,
  position,
  scale,
  stickers,
  displaySize, 
}) => {
  const handleDownload = () => {
    if (!imageSrc || !selectedBorder) {
      alert('Please upload image and choose border!');
      return;
    }

    const baseImage = new Image();
    const borderImage = new Image();
    baseImage.crossOrigin = 'anonymous';
    borderImage.crossOrigin = 'anonymous';

    baseImage.onload = () => {
      borderImage.onload = async () => {
        const canvasW = borderImage.naturalWidth;
        const canvasH = borderImage.naturalHeight;

        console.log('[DEBUG] displaySize', displaySize); 
    console.log('[DEBUG] baseImage', baseImage.naturalWidth, baseImage.naturalHeight);
    console.log('[DEBUG] borderImage', canvasW, canvasH);

        const canvas = document.createElement('canvas');
        canvas.width = canvasW;
        canvas.height = canvasH;
        const ctx = canvas.getContext('2d');

        // width and height of original region
        const displayW = displaySize.width;
        const displayH = displaySize.height;

        // width and height of the image uploaded
        const imgW = baseImage.naturalWidth;
        const imgH = baseImage.naturalHeight;

        const fitRatio = Math.min(displayW / imgW, displayH / imgH);
        const fittedW = imgW * fitRatio;
        const fittedH = imgH * fitRatio;

        const offsetX = (displayW - fittedW) / 2;
        const offsetY = (displayH - fittedH) / 2;

        const scaledW = fittedW * scale;
        const scaledH = fittedH * scale;

        const ratioX = canvasW / displayW;
        const ratioY = canvasH / displayH;

        const drawW = scaledW * ratioX;
        const drawH = scaledH * ratioY;

        const drawX = (offsetX + position.x + (fittedW - scaledW) / 2) * ratioX;
        const drawY = (offsetY + position.y + (fittedH - scaledH) / 2) * ratioY;

        ctx.drawImage(baseImage, drawX, drawY, drawW, drawH);

        await Promise.all(
          stickers.map((s) => {
            return new Promise((resolve) => {
              const stickerImg = new Image();
              stickerImg.crossOrigin = 'anonymous';
              stickerImg.onload = () => {
                const sw = (s.width || 80) * ratioX;
                const sh = (s.height || 80) * ratioY;
                const sx = s.x * ratioX;
                const sy = s.y * ratioY;
                ctx.drawImage(stickerImg, sx, sy, sw, sh);
                resolve();
              };
              stickerImg.src = s.src;
            });
          })
        );

        ctx.drawImage(borderImage, 0, 0, canvasW, canvasH);

        const link = document.createElement('a');
        link.download = 'cuted-photo.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      };

      borderImage.src = selectedBorder;
    };

    baseImage.src = imageSrc;
    
  };

  return (
    <div className="image-download">
      <img
        src={downloadIcon}
        alt="Download"
        onClick={handleDownload}
        className="reset-button"
      />
      <div className="style-download">Download</div>
    </div>
  );
};

export default DownloadButton;
