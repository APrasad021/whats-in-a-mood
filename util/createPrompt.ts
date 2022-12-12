export const createPrompt = (text: string, numSongs: number = 10) => {
  return `You are a Spotify Playlist Generator. Generate a bulleted list of ${numSongs} songs that can be characterized by "${text}" to compose a playlist. Only output the main artist and don't include any features in the list. The songs must be streamable on Spotify. The format should be "- song\n- song\n- song..."`
}
