import {
    createContext,
    useContext,
    useState,
} from "react";
import { Playlist, Song } from "../util/types";

type InitialPlaylistData = {
    text: string;
};

type CreatePlaylistData = {
    playlistData: {
        name: string;
        description: string;
    }
    songs: string[];
}

type ContextProps = {
    generateInitialPlaylist: (playlistData: InitialPlaylistData) => void;
    songs: Song[];
    createPlaylistOnSpotify: (playlistData: CreatePlaylistData) => void;
    initialPlaylistDescription: string;
    archiveCurrentPlaylist: () => void;
};

const SiteContext = createContext({} as ContextProps);

export const SiteContextProvider = ({ children }: any) => {
    const [playlistDescription, setPlaylistDescription] = useState<string>("");
    const [numSongs, setNumSongs] = useState<number>(0);
    const [songs, setSongs] = useState<Song[]>([]);
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [playlistId, setPlaylistId] = useState<string>("");
    const [playlistName, setPlaylistName] = useState<string>("");
    const [initialPlaylistDescription, setInitialPlaylistDescription] = useState<string>("");
    const [playListGenerateTimestamp, setPlayListGenerateTimestamp] = useState<number>(0);
    const [playListCreationTimestamp, setPlayListCreationTimestamp] = useState<number>(0);
    console.log(playlistId);

    const generateInitialPlaylist = async (playlistData: InitialPlaylistData) => {
        const response = await fetch("/api/playlist/init", {
            method: 'POST',
            body: JSON.stringify(playlistData),
        })
            .catch((error) => { console.log(error) });

        const songs = await response.json();
        setSongs(songs);
        setInitialPlaylistDescription(playlistData.text);
        setNumSongs(songs.length);
        setPlayListGenerateTimestamp(Date.now());
    };

    const createPlaylistOnSpotify = async (data: CreatePlaylistData) => {
        const response = await fetch("/api/playlist/upload", {
            method: 'POST',
            body: JSON.stringify(data),
        });
        const responseData = await response.json();
        setPlaylistId(responseData.id);
        setPlaylistDescription(data.playlistData.description);
        setNumSongs(data.songs.length);
        setPlaylistName(data.playlistData.name);
        setPlayListCreationTimestamp(Date.now());
    };

    const archiveCurrentPlaylist = () => {
        //TODO
        const playlist = {
            id: playlistId,
            name: playlistName,
            description: playlistDescription,
            numSongs: numSongs,
            initialPlaylistDescription: initialPlaylistDescription,
            timeGenerated: playListGenerateTimestamp,
            timeCreated: playListCreationTimestamp,
            songs,
        }
        setPlaylists([...playlists, playlist]);
        setPlaylistId("");
        setPlaylistDescription("");
        setNumSongs(0);
        setPlaylistName("");
        setPlayListCreationTimestamp(0);
        setPlayListGenerateTimestamp(0);
        setSongs([]);
        setInitialPlaylistDescription("");

    };

    return (
        <SiteContext.Provider
            value={{
                generateInitialPlaylist,
                songs,
                createPlaylistOnSpotify,
                initialPlaylistDescription,
                archiveCurrentPlaylist,
            }}
        >
            {children}
        </SiteContext.Provider>
    );
};

export const useSiteContext = () => useContext(SiteContext);