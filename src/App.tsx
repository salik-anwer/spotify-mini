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
  const [accent, setAccent] = useState<string>("#212121");
  const [isListVisible, setIsListVisible] = useState<boolean>(false);

  const handleSelect = (id: number) => {
    setSelectedSongId(id);
    const song = currentList.find(song => song.id === id);
    if(song) setAccent(song?.accent);
  };
  const handleFilter = (songs: Song[]) => {
    setCurrentList(songs);
  };

  const handleToggleList = () => {
    setIsListVisible(!isListVisible);
  };

  const handleNext = () => {
    if (selectedSongId !== null && currentList) {
      const currentIndex = currentList.findIndex(song => song.id === selectedSongId);
      const nextIndex = (currentIndex + 1) % currentList.length;
      setSelectedSongId(currentList[nextIndex].id);
      setAccent(currentList[nextIndex].accent);
    }
  };
  const handlePrevious = () => {
    if (selectedSongId !== null && currentList) {
      const currentIndex = currentList.findIndex(song => song.id === selectedSongId);
      const previousIndex = (currentIndex - 1 + currentList.length) % currentList.length;
      setSelectedSongId(currentList[previousIndex].id);
      setAccent(currentList[previousIndex].accent);
    }
  };

  return (
    <div style={{backgroundColor: accent}} className="h-screen w-screen flex transition-bg duration-500 ease-in-out">
      <Navbar />
      <div className="flex-grow flex">
        <div className={`w-full sm:w-1/3 bg-transparent ${isListVisible ? 'block' : 'hidden sm:block'}`}>
          <SongList
            loading={isLoading} 
            error={error?.message} 
            songs={data} 
            id={selectedSongId} 
            onSelect={handleSelect} 
            onFilter={handleFilter}/>
        </div>
        <div className={`w-full sm:w-2/3 bg-transparent ${isListVisible ? 'hidden sm:block' : 'block'}`}>
          <Player 
            song={currentList.find(song => song.id === selectedSongId) || data?.find(song => song.id === selectedSongId) || null}
            onNext={handleNext}
            onPrevious={handlePrevious} 
          />
        </div>
      </div>
      <button
        onClick={handleToggleList}
        className="sm:hidden fixed bottom-4 right-4 bg-blue-500 text-white p-2 rounded-full"
      >
        {isListVisible ? 'Hide List' : 'Show List'}
      </button>
    </div>
  );
};

export default App;
