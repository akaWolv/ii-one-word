import { NextApiRequest, NextApiResponse } from 'next'
import parseListToBoardArray from 'src/parseListToBoardArray'
import { Data, DataError } from './IResponse'
import getWordsFromDb from 'src/getWordsFromDb'
import data from './words.json'

const { words } = data

export default function handler (req: NextApiRequest, res: NextApiResponse<Data | DataError>) {
  const { id } = req.query
  const encodedId = String(id)
  const decodedIdString: string = Buffer.from(encodedId, 'base64').toString()
  const decodedIdList = decodedIdString.split(',').map(i => Number(i))
  res.status(200).json(
    {
      id: encodedId,
      decodedId: decodedIdString,
      words: parseListToBoardArray(getWordsFromDb(words, decodedIdList))
    }
  )
}
