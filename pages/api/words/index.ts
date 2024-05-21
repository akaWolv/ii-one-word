import { NextApiRequest, NextApiResponse } from 'next'
import { Data, DataError } from './IResponse'
import getWordsFromDb from 'src/getWordsFromDb'
import parseListToBoardArray from 'src/parseListToBoardArray'
import data from './words.json'

const { words } = data

const getRandomKeys = (db: string[], n: number): number[] => {
  const dbSize = db.length
  const result: number[] = []
  let i = 0
  while (i < n) {
    const foundId = Math.floor(Math.random() * dbSize)
    if (!result.includes(foundId)) {
      result.push(foundId)
      ++i
    }
  }
  return result
}

export default function handler (req: NextApiRequest, res: NextApiResponse<Data | DataError>) {
  const randomKeys = getRandomKeys(words, 25)
  const randomKeysString = randomKeys.join(',')
  res.status(200).json(
    {
      id: Buffer.from(randomKeysString).toString('base64'),
      decodedId: randomKeysString,
      words: parseListToBoardArray(getWordsFromDb(words, randomKeys))
    }
  )
}
