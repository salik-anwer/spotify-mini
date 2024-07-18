import React, { useEffect, useState } from 'react';
import { Song } from '../utilities/fetchSongs';
import SongItem, { lightenHex } from './SongItem';
import SkeletonLoader from './SkeletonLoader';

interface SongListProps {
  loading: boolean;
  onSelect: (id: number) => void;
  onFilter: (songs: Song[]) => void;
  id?: number | null;
  error?: string;
  songs?: Song[];
}

const SongList: React.FC<SongListProps> = ({ songs, id, loading, error, onSelect, onFilter }) => {

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'top_tracks'>('all');
  const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);

  useEffect(() => {
    if (songs) {
      let filtered = songs.filter((song) =>
        song.name.toLowerCase().includes(search.toLowerCase()) ||
        song.artist.toLowerCase().includes(search.toLowerCase())
      );

      if (filter === 'top_tracks') {
        filtered = filtered.filter(song => song.top_track);
      }

      setFilteredSongs(filtered);
      onFilter(filtered);
    }
  }, [search, filter, songs]);

  if (error) return <div className="text-red-500">Error: {error}</div>; //add error page

  const accentColor = () => {
    const accent = songs?.find(song => song.id === id)?.accent;
    return accent && lightenHex(accent, 0.4);
  }

  const hoverColor = accentColor();

  return (
    <div className="h-full overflow-y-auto">
      <div className="flex justify-between mb-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 ${filter === 'all' ? 'bg-blue-500' : 'bg-gray-700'} text-white`}
        >
          For You
        </button>
        <button
          onClick={() => setFilter('top_tracks')}
          className={`px-4 py-2 ${filter === 'top_tracks' ? 'bg-blue-500' : 'bg-gray-700'} text-white`}
        >
          Top Tracks
        </button>
      </div>
      <input
        type="text"
        placeholder="Search by song or artist..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 mb-2 text-white transition-colors focus:outline-none focus:ring-0"
        style={{backgroundColor: hoverColor}}
      />
      {loading?
        <SkeletonLoader />:
        filteredSongs && filteredSongs.map((song) => (
          <SongItem key={song.id} song={song} onSelect={onSelect} isSelected={song.id === id} hoverColor={hoverColor}/>
        ))
      }
    </div>
  );
};

export default SongList;
