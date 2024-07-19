import { createContext, useState, ReactNode, useEffect } from 'react';
import { Song } from '../utilities/fetchSongs';

interface SongContextProps {
    songs: Song[] | undefined;
    selectedSongId: number | null;
    updateSelectedSongId: (id: number) => void;
    accentColor: string;
    updateAccentColor: (color: string) => void;
    currentList: Song[];
    updateCurrentList: (songs: Song[]) => void;
    error: Error | null;
    loading: boolean;
  }

interface SongContextProviderProps {
    children: ReactNode;
    initialSongs?: Song[];
    error: Error | null;
    loading: boolean;
}

const SongContext = createContext<SongContextProps | undefined>(undefined);

const SongContextProvider: React.FC<SongContextProviderProps> = ({ children, initialSongs, error, loading}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [songs, setSongs] = useState<Song[]>(initialSongs || []);
  const [selectedSongId, setSelectedSongId] = useState<number | null>(null);
  const [accentColor, setAccentColor] = useState<string>('#212121');
  const [currentList, setCurrentList] = useState<Song[]>(initialSongs || []);

  useEffect(() => {
    if(initialSongs) {
      setSongs(initialSongs);
      setCurrentList(initialSongs);
    }
  }, [initialSongs]);

  const updateSelectedSongId = (id: number) => {
    setSelectedSongId(id);
  };

  const updateAccentColor = (color: string) => {
    setAccentColor(color);
  };

  const updateCurrentList =(updatedList: Song[]) => {
    setCurrentList(updatedList);
  };  

  return (
    <SongContext.Provider 
        value={{
            songs,
            selectedSongId,
            updateSelectedSongId,
            accentColor,
            updateAccentColor,
            currentList,
            updateCurrentList,
            error,
            loading
    }}>
      {children}
    </SongContext.Provider>
  );
};

export { SongContext, SongContextProvider };
export type {SongContextProps};
