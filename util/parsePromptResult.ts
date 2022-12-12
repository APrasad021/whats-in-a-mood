import { OpenAISongData } from './types'

const getSongTitle = (line: string) => {
  const regexMatch = line.match(/"(.*?)"/)
  const title = regexMatch && regexMatch.length > 1 ? regexMatch[1] : line
  return title
}

const getSongArtist = (line: string) => {
  const artist = line.split('by ')[1]
  return artist
}

const parsePromptResult = (text?: string): OpenAISongData[] => {
  if (!text) return []
  const lines = text.trim().split('\n-')
  let result: OpenAISongData[] = []
  lines.forEach((line) => {
    const title = getSongTitle(line)
    const artist = getSongArtist(line)
    result.push({ title, artist })
  })

  return result
}

export default parsePromptResult
