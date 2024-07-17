import React, { useEffect, useState } from 'react';
import { Song } from '../utilities/fetchSongs';

interface SongItemProps {
  song: Song;
  onSelect: (id: number) => void;
  isSelected: boolean;
}

const SongItem: React.FC<SongItemProps> = ({ song, isSelected, onSelect }) => {
  const [duration, setDuration] = useState<number | null>(null);

  useEffect(() => {
    const audio = new Audio(song.url);
    audio.onloadedmetadata = () => {
      setDuration(audio.duration);
    };
  }, [song.url]);

  const formatDuration = (seconds: number | null) => {
    if (seconds === null) return '';
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div
      className={`flex items-center justify-between p-2 cursor-pointer ${isSelected ? 'bg-blue-500' : 'bg-gray-700 hover:bg-gray-600'}`}
      onClick={() => onSelect(song.id)}
    >
      <div className="flex items-center">
        <img src={`https://cms.samespace.com/assets/${song.cover}`} alt={song.name} className="w-12 h-12 mr-2" />
        <div>
          <h4 className="text-white text-sm">{song.name}</h4>
          <p className="text-gray-400 text-xs">{song.artist}</p>
        </div>
      </div>
      <div className="text-gray-400">
          {formatDuration(duration)}
      </div>    
    </div>
  );
};

export default SongItem;
