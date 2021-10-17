import { NextApiRequest, NextApiResponse } from 'next'
import parseStringToBoardArray from 'src/parseStringToBoardArray'
import { Data, DataError } from './IResponse'
import sortString from 'src/sortString'

const VALID_STRING = 'aaagggggggggnnnnnnnnnnnnn'

export default function handler (req: NextApiRequest, res: NextApiResponse<Data | DataError>) {
  const { id } = req.query
  const encodedBoard = String(id)
  const decodedId: string = Buffer.from(encodedBoard, 'base64').toString()
  const [decodedIdA, decodedIdB] = decodedId.split(',')
  const tilesSortedA = sortString(decodedIdA)
  const tilesSortedB = sortString(decodedIdB)

  if (VALID_STRING !== tilesSortedA || VALID_STRING !== tilesSortedB) {
    res.status(500).json({ error: 'invalid id' })
    return
  }

  res.status(200).json(
    {
      id: encodedBoard,
      decodedId: decodedId,
      boardPlayerA: parseStringToBoardArray(decodedIdA),
      boardPlayerB: parseStringToBoardArray(decodedIdB)
    }
  )
}
