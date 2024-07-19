import App from "../components/App";
import { SongContextProvider } from "../context/SongContext";
import { useSongs } from "../hooks/useSongs"

const AppContainer = () => {
    const {data, error, isLoading} = useSongs();

    return(
        <SongContextProvider initialSongs={data} error={error} loading={isLoading}>
            <App />
        </SongContextProvider>
    );
};

export default AppContainer;