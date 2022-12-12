import { useContext } from "react"
import AddPlaylistButton from "../components/AddPlaylistButton";
import GenerateAgainButton from "../components/GenerateAgainButton";
import { useSiteContext } from "../context/Context"


export default function Results() {
    const { songs } = useSiteContext(); 
    console.log(songs);
    return (
        <div>
            <h1>Results</h1>
            <AddPlaylistButton />
            <GenerateAgainButton />
            {songs && songs.map((song) => {
                return (
                    <div key={song.id}>
                        <h2>{song.name}</h2>
                        <h3>{song.artists[0].name}</h3>
                        <img src={song.album.images[0].url} />
                    </div>
                )
            })
            }
        </div>
    )
};