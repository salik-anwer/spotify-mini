import { useQuery } from "@tanstack/react-query";
import { fetchSongs, Song } from "../utilities";

const useSongs = () => {
    const { data, error, isLoading } = useQuery<Song[], Error>({queryKey: ['songs'], queryFn: fetchSongs});
    return {data, error, isLoading};
}

export { useSongs };