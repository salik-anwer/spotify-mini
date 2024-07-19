import React, { useEffect, useState } from 'react';
import SongItem from './SongItem';
import SkeletonLoader from './SkeletonLoader';
import { SearchIcon } from '../icons/SearchIcon';
import { useSongContext } from '../hooks/useSongContext';
import { createColorVariation } from '../utilities/createColorVariation';

const SongList: React.FC = () => {
  const {songs, error, loading, currentList, updateCurrentList, accentColor} = useSongContext();

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'top_tracks'>('all');

  useEffect(() => {
    if (songs) {
      let filteredList = songs.filter((song) =>
        song.name.toLowerCase().includes(search.toLowerCase()) ||
        song.artist.toLowerCase().includes(search.toLowerCase())
      );

      if (filter === 'top_tracks') {
        filteredList = filteredList.filter(song => song.top_track);
      }

      updateCurrentList(filteredList);
    }
  }, [search, filter, songs]);

  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  const hoverColor = createColorVariation(accentColor, 0.4);

  return (
    <div className="h-full overflow-y-auto pt-7">
      <div className="flex gap-5 pb-7 font-bold text-2xl">
        <button
          onClick={() => setFilter('all')}
          className={`bg-transparent ${filter === 'all' ? 'text-white' : 'text-gray-400/80'}`}
        >
          For You
        </button>
        <button
          onClick={() => setFilter('top_tracks')}
          className={`bg-transparent ${filter === 'top_tracks' ? 'text-white' : 'text-gray-400/80'}`}
        >
          Top Tracks
        </button>
      </div>
      <div className="relative w-full mb-7">
        <input
          type="text"
          placeholder="Search by song or artist..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full py-2 pl-3 pr-10 text-white text-base transition-colors outline-none ring-0 rounded-lg"
          style={{ backgroundColor: hoverColor || "#333333" }}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <SearchIcon />
        </div>
      </div>
      {loading?
        <SkeletonLoader />:
        currentList.map((song) => (
          <SongItem key={song.id} song={song} />
        ))
      }
    </div>
  );
};

export default SongList;
