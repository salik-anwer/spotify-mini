import { App } from "../components";
import { SongContextProvider } from "../context/SongContext";
import { useSongs } from "../hooks"

const AppContainer = () => {
    const {data, error, isLoading} = useSongs();

    return(
        <SongContextProvider initialSongs={data} error={error} loading={isLoading}>
            <App />
        </SongContextProvider>
    );
};

export default AppContainer;