import { Song } from "./fetchSongs";

type PlayerFunctionsType = {
  audioRef: React.RefObject<HTMLAudioElement>;
  currentList: Song[];
  selectedSongId: number | null;
  updateSelectedSongId: (id: number) => void;
  updateAccentColor: (color: string) => void;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  isMuted: boolean;
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
}

const getPlayerFunctions = (data: PlayerFunctionsType) => {
  const {audioRef,
    currentList,
    selectedSongId,
    updateSelectedSongId,
    updateAccentColor,
    isPlaying,
    setIsPlaying,
    isMuted,
    setIsMuted,
    setProgress} = data;

    const onNext = () => {
        if (selectedSongId !== null && currentList) {
          const currentIndex = currentList.findIndex(song => song.id === selectedSongId);
          const nextIndex = (currentIndex + 1) % currentList.length;
          updateSelectedSongId(currentList[nextIndex].id);
          updateAccentColor(currentList[nextIndex].accent);
        }
      };
    
    const onPrevious = () => {
        if (selectedSongId !== null && currentList) {
          const currentIndex = currentList.findIndex(song => song.id === selectedSongId);
          const previousIndex = (currentIndex - 1 + currentList.length) % currentList.length;
          updateSelectedSongId(currentList[previousIndex].id);
          updateAccentColor(currentList[previousIndex].accent);
        }
      };
    
    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
      };
    
    const handleTimeUpdate = () => {
        if (audioRef.current) {
          const currentTime = audioRef.current.currentTime;
          const duration = audioRef.current.duration;
          setProgress((currentTime / duration) * 100);
        }
      };
    
    const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
          const newTime = (event.target.valueAsNumber / 100) * audioRef.current.duration;
          audioRef.current.currentTime = newTime;
          setProgress(event.target.valueAsNumber);
        }
      };
    
    const handleMute = () => {
        if (audioRef.current) {
          if (isMuted) {
            audioRef.current.volume = 1; 
          } else {
            audioRef.current.volume = 0;
          }
          setIsMuted(!isMuted); 
        }
      };

      return {onNext, onPrevious, handleMute, handlePlayPause, handleSeek, handleTimeUpdate};
};

export default getPlayerFunctions;