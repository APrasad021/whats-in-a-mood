import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const data = JSON.parse(req.body)
  const session = await getSession({ req })
  if (!session) return res.status(500).json({ error: 'Invalid session' })
  const createPlaylistResponse = await fetch(
    // @ts-ignore
    `https://api.spotify.com/v1/users/${session?.user?.sub}/playlists`,
    {
      method: 'POST',
      body: JSON.stringify(data.playlistData),
      headers: {
        'Content-Type': 'application/json',
        // @ts-ignore
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
    },
  )
  const playlistData = await createPlaylistResponse.json()
  await fetch(
    `https://api.spotify.com/v1/playlists/${playlistData.id}/tracks`,
    {
      method: 'POST',
      body: JSON.stringify(data.songs),
      headers: {
        'Content-Type': 'application/json',
        // @ts-ignore
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
    },
  )
  res.status(200).json({ id: playlistData.id })
}
