import React, { useRef, useState, useEffect } from 'react';
import { Song } from '../utilities/fetchSongs';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import {PlayIcon} from '../icons/PlayIcon';
import {PauseIcon} from '../icons/PauseIcon';
import { NextIcon } from '../icons/NextIcon';
import { PreviousIcon} from '../icons/PreviousIcon';
import { Dots } from '../icons/Dots';
import { useSongContext } from '../hooks/useSongContext';
import getPlayerFunctions from '../utilities/getPlayerFunctions';
import { createColorVariation } from '../utilities/createColorVariation';

const Player: React.FC = () => {
  const {selectedSongId, updateSelectedSongId, accentColor, updateAccentColor, currentList, songs} = useSongContext();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [song, setSong] = useState<Song>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isBoxVisible, setIsBoxVisible] = useState(false);

  const {onNext, onPrevious, handleMute, handlePlayPause, handleSeek, handleTimeUpdate}
    = getPlayerFunctions({audioRef,
      currentList,
      selectedSongId,
      updateSelectedSongId,
      updateAccentColor,
      isPlaying,
      setIsPlaying,
      isMuted,
      setIsMuted,
      setProgress});

  useEffect(() => {
    const currentSong = songs?.find(song => song.id === selectedSongId);
    setSong(currentSong);
    if (audioRef.current) {
      setProgress(0);
      if (song) {
        audioRef.current.src = song.url;
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  }, [song, selectedSongId]);

  useEffect(() => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      const handleEnded = () => {
        onNext();
      };
  
      const audio = audioRef.current;
      audio.addEventListener('ended', handleEnded);
      
      return () => {
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, [audioRef.current, onNext]);
  
  const handleButtonClick = () => {
    setIsBoxVisible(!isBoxVisible);
  };

  const handleHireMeClick = () => {
    window.location.href = 'https://www.linkedin.com/in/salik-anwer-ansari-40b259170/';
  };

  if (!song) {
    return <div className="flex items-center justify-center h-full text-white">Select a song to play</div>;
  }

  const color = createColorVariation(accentColor, 0.9);

  return (
    <div className="flex flex-col items-center pt-[5.3rem] bg-transparent text-white">
      <div className="flex flex-col items-start w-80 sm:w-96 md:w-[26rem] gap-3">
        <div className="flex flex-col items-start">
          <h2 className="text-4xl font-bold">{song.name}</h2>
          <p className="text-base text-gray-300/70">{song.artist}</p>
        </div>
        <img src={`https://cms.samespace.com/assets/${song.cover}`} alt={song.name} className="w-80 h-80 sm:w-96 sm:h-96 md:w-[26rem] md:h-[26rem]" />
        <input  
          type="range"
          value={progress || 0}
          onChange={handleSeek}
          className="w-full accent-white"
        />
        <div className="flex justify-between w-full">
          <div className="relative">
            <button
              onClick={handleButtonClick}
              className="relative z-10 transition transform duration-150 ease-in-out hover:scale-105 active:scale-95 active:bg-opacity-75"
            >
              <Dots />
            </button>
            {isBoxVisible && (
            <button
              style={{backgroundColor: color}}
              onClick={handleHireMeClick}
              className="absolute bottom-full w-20 h-10 font-bold shadow-lg z-20 rounded-lg left-1/2 transform -translate-x-1/2 transition transform duration-150 ease-in-out hover:scale-105 active:scale-95 active:bg-opacity-75">
              Hire me
            </button>
            )}
          </div>
          <div className="flex items-center gap-5">
            <button onClick={onPrevious} className="transition transform duration-150 ease-in-out hover:scale-105 active:scale-95 active:bg-opacity-75">
              <PreviousIcon />
            </button>
            <button onClick={handlePlayPause} className="transition transform duration-150 ease-in-out hover:scale-105 active:scale-95 active:bg-opacity-75">
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
            <button onClick={onNext} className="transition transform duration-150 ease-in-out hover:scale-105 active:scale-95 active:bg-opacity-75">
              <NextIcon />
            </button>
          </div>
          <button onClick={handleMute} className="transition transform duration-150 ease-in-out hover:scale-105 active:scale-95 active:bg-opacity-75">
            {isMuted ? <FaVolumeMute size={24} /> : <FaVolumeUp size={24} />}
          </button>
        </div>
      </div>

      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
      />
    </div>
  );
};

export default Player;