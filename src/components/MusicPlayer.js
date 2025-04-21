import React, { useRef, useState } from 'react';
import bgm from '../assets/music.mp3';
import musicIcon from '../assets/play.png';
import './MusicPlayer.css';

const MusicPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="music-button-wrapper">
      <audio ref={audioRef} src={bgm} loop />
      <img
        src={musicIcon}
        alt="music control"
        className={`music-button ${isPlaying ? 'bouncing' : ''}`}
        onClick={toggleMusic}
      />
    </div>
  );
};

export default MusicPlayer;
