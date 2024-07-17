import React, { useState } from 'react';
import Navbar from './components/Navbar';
import SongList from './components/SongList';
import Player from './components/Player';
import { fetchSongs, Song } from './utilities/fetchSongs';
import { useQuery } from '@tanstack/react-query';

const App: React.FC = () => {
  const { data, error, isLoading } = useQuery<Song[], Error>({queryKey: ['songs'], queryFn: fetchSongs});
  const [selectedSongId, setSelectedSongId] = useState<number | null>(null);
  const [currentList, setCurrentList] = useState<Song[]>([]);

  const handleSelect = (id: number) => {
    setSelectedSongId(id);
  };
  const handleFilter = (songs: Song[]) => {
    setCurrentList(songs);
  };

  const handleNext = () => {
    if (selectedSongId !== null && currentList) {
      const currentIndex = currentList.findIndex(song => song.id === selectedSongId);
      const nextIndex = (currentIndex + 1) % currentList.length;
      setSelectedSongId(currentList[nextIndex].id);
    }
  };
  const handlePrevious = () => {
    if (selectedSongId !== null && currentList) {
      const currentIndex = currentList.findIndex(song => song.id === selectedSongId);
      const previousIndex = (currentIndex - 1 + currentList.length) % currentList.length;
      setSelectedSongId(currentList[previousIndex].id);
    }
  };

  return (
    <div className="h-screen w-screen flex">
      <Navbar />
      <div className="flex-grow flex">
        <div className="w-1/3 bg-gray-800">
          <SongList
            loading={isLoading} 
            error={error?.message} 
            songs={data} 
            id={selectedSongId} 
            onSelect={handleSelect} 
            onFilter={handleFilter}/>
        </div>
        <div className="w-2/3 bg-gray-900">
        <Player 
            song={currentList.find(song => song.id === selectedSongId) || null}
            onNext={handleNext}
            onPrevious={handlePrevious} 
          />
        </div>
      </div>
    </div>
  );
};

export default App;
