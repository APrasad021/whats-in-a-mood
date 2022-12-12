import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { createPrompt } from "../../../util/createPrompt";
import createSpotifySearchQuery from "../../../util/createSpotifySearchQuery";
import { customGet } from "../../../util/customGet";
import openai from "../../../util/openai";
import parsePromptResult from "../../../util/parsePromptResult";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const reqJson = JSON.parse(req.body);
  
  const prompt = createPrompt(reqJson.text, reqJson.numSongs);
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: prompt,
    temperature: 0,
    top_p: 1,
    frequency_penalty: 0.5,
    presence_penalty: 0,
    max_tokens: 800,
  });
  console.log(completion.data.choices[0].text);
  const songs = parsePromptResult(completion.data.choices[0].text);
  const session = await getSession({ req });
  console.log(songs);
  let results = [];
  for (const song of songs) {
    const url = createSpotifySearchQuery(song);
    const searchResults = await customGet(url, session);
    const spotifySongData = await searchResults?.tracks?.items[0];
    if (spotifySongData) results.push(spotifySongData);
  }

  res.status(200).json(results);
}
