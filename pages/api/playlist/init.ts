import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { createPrompt } from '../../../util/createPrompt'
import createSpotifySearchQuery from '../../../util/createSpotifySearchQuery'
import { getWithAccessToken } from '../../../util/customGet'
import openai from '../../../util/openai'
import parsePromptResult from '../../../util/parsePromptResult'
// import { cudiSpotifySongs } from '../../../util/dummyData'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // res.status(200).json(cudiSpotifySongs)
  const reqJson = JSON.parse(req.body)

  const prompt = createPrompt(reqJson.text, reqJson.numSongs)
  const completion = await openai.createCompletion({
    model: 'text-davinci-002',
    prompt: prompt,
    temperature: 0,
    top_p: 1,
    frequency_penalty: 0.5,
    presence_penalty: 0,
    max_tokens: 800,
  })
  const songs = parsePromptResult(completion.data.choices[0].text)
  const session = await getSession({ req })
  if (!session) return res.status(500).json({ error: 'Invalid session' })
  let results = []
  for (const song of songs) {
    const url = createSpotifySearchQuery(song)
    const searchResults = await getWithAccessToken(url, session)
    const spotifySongData = await searchResults?.tracks?.items[0]
    if (spotifySongData) results.push(spotifySongData)
  }

  res.status(200).json(results)
}
