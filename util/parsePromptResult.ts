import { Song } from "./types";

const getSongTitle = (line: string) => {
    const title = line.match(/"(.*?)"/)[1];
    return title;
};

const getSongArtist = (line: string) => {
    const artist = line.split("by ")[1];
    return artist;
};

const parsePromptResult = (text?: string): Song[] => {
    if (!text) return [];
    const lines = text.trim().split("\n-");
    let result: Song[] = [];
    lines.forEach((line) => {
        const title = getSongTitle(line);
        const artist = getSongArtist(line);
        result.push({ title, artist });
    });

    return result;

};

export default parsePromptResult;