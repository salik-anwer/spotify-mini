import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import SongList from './SongList';
import Player from './Player';
import { useSongContext } from '../hooks/useSongContext';
import { CgMenuRound } from "react-icons/cg";
import { SiYoutubemusic } from "react-icons/si";

const App: React.FC = () => {
  const {
    selectedSongId, 
    accentColor,
  } = useSongContext();

  const [isListVisible, setIsListVisible] = useState<boolean>(false);

  const handleToggleList = () => {
    setIsListVisible(!isListVisible);
  };

  useEffect(() => {
    if(!selectedSongId) {
      setIsListVisible(true);
    }
    else {
      setIsListVisible(false);
    }
  },[selectedSongId]);

  return (
    <div style={{backgroundColor: accentColor}} className="flex gap-4 h-screen w-screen flex transition-bg duration-500 ease-in-out px-4 ">
      <Navbar />
      <div className="flex-grow flex gap-4">
        <div className={`w-full md:w-1/3 bg-transparent ${isListVisible ? 'block' : 'hidden md:block'}`}>
          <SongList />
        </div>
        <div className={`w-full md:w-2/3 bg-transparent ${isListVisible ? 'hidden md:block' : 'block'}`}>
          <Player />
        </div>
      </div>
      <button
        onClick={handleToggleList}
        className="sm:hidden fixed bottom-4 right-4 text-4xl text-white p-2 rounded-full transition transform duration-150 ease-in-out hover:scale-105 active:scale-95 active:bg-opacity-75"
      >
        {isListVisible ? <SiYoutubemusic /> : <CgMenuRound />}
      </button>
    </div>
  );
};

export default App;
