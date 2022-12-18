export const createPlaylistName = (copy: string): string => {
  console.log(copy, copy.length)
  if (copy.length > 0 && copy.length <= 30) {
    return `'${copy}' Playlist`
  }
  return 'Generated Playlist'
}
