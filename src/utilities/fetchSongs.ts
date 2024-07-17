export interface Song {
    id: number;
    name: string;
    artist: string;
    accent: string;
    cover: string;
    top_track: boolean;
    url: string;
  }
  
  export const fetchSongs = async (): Promise<Song[]> => {
    const response = await fetch('https://cms.samespace.com/items/songs');
    const json = await response.json();
    return json.data;
  };