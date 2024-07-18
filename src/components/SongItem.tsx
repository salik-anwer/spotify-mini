import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Song } from '../utilities/fetchSongs';

interface SongItemProps {
  song: Song;
  onSelect: (id: number) => void;
  isSelected: boolean;
  hoverColor?: string;
}
interface StyledDivProps {
  isSelected: boolean;
  color: string;
  hoverColor: string;
}

const StyledDiv = styled.div<StyledDivProps>`
  transition: background-color 0.3s ease;
  background-color: ${props => (props.isSelected ? props.color : 'transparent')};
  &:hover {
    background-color: ${props => props.hoverColor || "grey"};
  }
`;

export const lightenHex = (hex: string, percent: number) => {
  hex = hex.replace('#', '');

  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);
  
  r = Math.round(r * (1 + percent));
  g = Math.round(g * (1 + percent));
  b = Math.round(b * (1 + percent));
  
  r = Math.min(r, 255);
  g = Math.min(g, 255);
  b = Math.min(b, 255);
  
  const result = `#${(r).toString(16).padStart(2, '0')}${(g).toString(16).padStart(2, '0')}${(b).toString(16).padStart(2, '0')}`;
  return result;
};

const SongItem: React.FC<SongItemProps> = ({ song, isSelected, hoverColor, onSelect }) => {
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

  const color = isSelected? lightenHex(song.accent, 0.9): "transparent";

  return (
    <StyledDiv
      className="flex items-center justify-between p-2 cursor-pointer"
      color={color}
      hoverColor={hoverColor || "#333333"}
      isSelected={isSelected}
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
    </StyledDiv>
  );
};

export default SongItem;
