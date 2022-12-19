export const createPlaylistName = (copy: string): string => {
  if (copy.length > 0 && copy.length <= 30) {
    return `'${copy}' Playlist`
  }
  return 'Generated Playlist'
}
