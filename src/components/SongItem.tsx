import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Song } from '../utilities/fetchSongs';
import { useSongContext } from '../hooks/useSongContext';
import { createColorVariation } from '../utilities/createColorVariation';

interface SongItemProps {
  song: Song;
}
interface StyledDivProps {
  isselected: boolean | undefined;
  color: string;
  hovercolor: string;
}

const StyledDiv = styled.div<StyledDivProps>`
  transition: background-color 0.3s ease;
  background-color: ${props => (props.isselected ? props.color : 'transparent')};
  &:hover {
    background-color: ${props => props.hovercolor || "grey"};
  }
`;

const SongItem: React.FC<SongItemProps> = ({ song }) => {
  const {selectedSongId, updateSelectedSongId, accentColor, updateAccentColor} = useSongContext();
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

  const updateSong = (id: number, color: string) => {
    updateSelectedSongId(id);
    updateAccentColor(color);
  }

  const color = song.id === selectedSongId? createColorVariation(accentColor, 0.9): "transparent";
  const hoverColor = createColorVariation(accentColor, 0.4);

  return (
    <StyledDiv
      className="flex items-center justify-between p-2 cursor-pointer rounded-lg"
      color={color}
      hovercolor={hoverColor || "#333333"}
      isselected={song.id === selectedSongId}
      onClick={() => updateSong(song.id, song.accent)}
    >
      <div className="flex items-center">
        <img src={`https://cms.samespace.com/assets/${song.cover}`} alt={song.name} className="w-12 h-12 mr-2 rounded-full" />
        <div>
          <h4 className="text-white text-base">{song.name}</h4>
          <p className="text-gray-400 text-sm">{song.artist}</p>
        </div>
      </div>
      <div className="text-gray-400 text-sm">
          {formatDuration(duration)}
      </div>    
    </StyledDiv>
  );
};

export default SongItem;
