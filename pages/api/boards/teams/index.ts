import { NextApiRequest, NextApiResponse } from 'next'
import { EType } from 'src/interfaces/EType'
import parseStringToBoardArray from 'src/parseStringToBoardArray'
import { Data, DataError } from './IResponse'
import shuffleArray from 'src/shuffleArray'

interface ITiles {
  [key: number]: EType
}

export default function handler (req: NextApiRequest, res: NextApiResponse<Data|DataError>) {
  const doRedStarts: boolean = Math.random() < 0.5
  const tilesNumbers: number[] = Array.from(Array(25).keys())
  shuffleArray(tilesNumbers)
  const tiles: ITiles = {}

  // assasin
  tilesNumbers.slice(0, 1).forEach(i => {
    tiles[++i] = EType.Assassin
  })
  // first team
  tilesNumbers.slice(1, 10).forEach(i => {
    tiles[++i] = doRedStarts ? EType.Red : EType.Blue
  })
  // second team
  tilesNumbers.slice(10, 18).forEach(i => {
    tiles[++i] = doRedStarts ? EType.Blue : EType.Red
  })
  // neutral
  tilesNumbers.slice(18, 25).forEach(i => {
    tiles[++i] = EType.Neutral
  })

  const tilesString: string = Object.values(tiles).join('')

  res.status(200).json(
    {
      id: Buffer.from(tilesString).toString('base64'),
      decodedId: tilesString,
      starting: doRedStarts ? EType.Red : EType.Blue,
      board: parseStringToBoardArray(tilesString)
    }
  )
}
