export type Song = {
  artist: string;
  title: string;
  uri?: string;
  id?: string;
};

export type Session = {
  user: {
    accessToken: string;
    sub: string;
    name: string;
    email: string;
    picture: string;
    expires_at: number;
  };
};

export type Playlist = {
  id: string;
  name: string;
  description: string;
  numSongs: number;
  initialPlaylistDescription: initialPlaylistDescription;
  timeGenerated: number;
  timeCreated: number;
  songs: Song[];
};
