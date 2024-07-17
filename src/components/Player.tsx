import React, { useRef, useState, useEffect } from 'react';
import { Song } from '../utilities/fetchSongs';
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

interface PlayerProps {
  song: Song | null;
  onNext: () => void;
  onPrevious: () => void;
}

const Player: React.FC<PlayerProps> = ({ song, onNext, onPrevious }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setProgress(0);
      if (song) {
        audioRef.current.src = song.url;
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  }, [song]);

  useEffect(() => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      setProgress((currentTime / duration) * 100);
    }
  };

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const newTime = (event.target.valueAsNumber / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setProgress(event.target.valueAsNumber);
    }
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = event.target.valueAsNumber;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? volume : 0;
    }
  };

  if (!song) {
    return <div className="flex items-center justify-center h-full text-white">Select a song to play</div>;
  }

  return (
    <div className="flex flex-col items-center p-4 bg-gray-900 text-white">
      <img src={`https://cms.samespace.com/assets/${song.cover}`} alt={song.name} className="w-64 h-64 mb-4" />
      <h2 className="text-lg">{song.name}</h2>
      <p className="text-gray-400">{song.artist}</p>

      <div className="flex items-center space-x-4 mt-4">
        <button onClick={onPrevious}>
          <FaStepBackward size={24} />
        </button>
        <button onClick={handlePlayPause}>
          {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
        </button>
        <button onClick={onNext}>
          <FaStepForward size={24} />
        </button>
      </div>

      <input
        type="range"
        value={progress || 0}
        onChange={handleSeek}
        className="w-full mt-4"
      />

      <div className="flex items-center space-x-2 mt-4">
        <button onClick={handleMute}>
          {isMuted ? <FaVolumeMute size={24} /> : <FaVolumeUp size={24} />}
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume || 0}
          onChange={handleVolumeChange}
          className="w-full"
        />
      </div>

      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
      />
    </div>
  );
};

export default Player;