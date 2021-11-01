import { NextApiRequest, NextApiResponse } from 'next'
import { EType } from 'src/interfaces/EType'
import parseStringToBoardArray from 'src/parseStringToBoardArray'
import { Data, DataError } from './IResponse'
import shuffleArray from 'src/shuffleArray'

interface ITiles {
  [key: number]: EType
}

export default function handler (req: NextApiRequest, res: NextApiResponse<Data|DataError>) {
  const tilesNumbers: number[] = Array.from(Array(25).keys())
  shuffleArray(tilesNumbers)
  const tiles: ITiles = {}

  // assassins
  tilesNumbers.slice(0, 3).forEach(i => {
    tiles[++i] = EType.Assassin
  })
  // agents
  tilesNumbers.slice(3, 11).forEach(i => {
    tiles[++i] = EType.Green
  })
  // neutral
  tilesNumbers.slice(11, 25).forEach(i => {
    tiles[++i] = EType.Neutral
  })

  const tilesString: string = Object.values(tiles).join('')

  res.status(200).json(
    {
      id: Buffer.from(tilesString).toString('base64'),
      decodedId: tilesString,
      board: parseStringToBoardArray(tilesString)
    }
  )
}
