import { NextApiRequest, NextApiResponse } from 'next'
import parseStringToBoardArray from 'src/parseStringToBoardArray'
import { EType } from 'src/interfaces/EType'
import { Data, DataError } from './IResponse'
import sortString from 'src/sortString'

const VALID_STRING_BLUE = 'abbbbbbbbbnnnnnnnrrrrrrrr'
const VALID_STRING_RED = 'abbbbbbbbnnnnnnnrrrrrrrrr'

export default function handler (req: NextApiRequest, res: NextApiResponse<Data | DataError>) {
  const { id } = req.query
  const encodedBoard = String(id)
  const decodedId: string = Buffer.from(encodedBoard, 'base64').toString()
  const tilesSorted = sortString(decodedId)
  if (![VALID_STRING_BLUE, VALID_STRING_RED].includes(tilesSorted)) {
    res.status(500).json({ error: 'invalid id' })
    return
  }

  res.status(200).json(
    {
      id: encodedBoard,
      decodedId: decodedId,
      starting: tilesSorted === VALID_STRING_RED ? EType.Red : EType.Blue,
      board: parseStringToBoardArray(decodedId)
    }
  )
}
