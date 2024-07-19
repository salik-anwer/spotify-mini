import { useContext } from "react";
import { SongContext, SongContextProps } from "../context/SongContext";

const useSongContext = (): SongContextProps => {
    const context = useContext(SongContext);
    if (!context) {
      throw new Error('useContext must be used within a ContextProvider');
    }
    return context;
  };

export {useSongContext};