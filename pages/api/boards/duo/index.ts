import { NextApiRequest, NextApiResponse } from 'next'
import { EType } from 'src/interfaces/EType'
import parseStringToBoardArray from 'src/parseStringToBoardArray'
import { Data, DataError } from './IResponse'
import shuffleArray from 'src/shuffleArray'

interface ITiles {
  [key: number]: { playerA: EType, playerB: EType }
}

export default function handler (req: NextApiRequest, res: NextApiResponse<Data | DataError>) {
  const tilesNumbers: number[] = Array.from(Array(25).keys())
  shuffleArray(tilesNumbers)
  const tiles: ITiles = {}

  // ASSASSINS
  tiles[tilesNumbers[0] + 1] = { playerA: EType.Green, playerB: EType.Assassin }
  tiles[tilesNumbers[1] + 1] = { playerA: EType.Assassin, playerB: EType.Green }
  tiles[tilesNumbers[2] + 1] = { playerA: EType.Assassin, playerB: EType.Assassin }
  tiles[tilesNumbers[3] + 1] = { playerA: EType.Assassin, playerB: EType.Neutral }
  tiles[tilesNumbers[4] + 1] = { playerA: EType.Neutral, playerB: EType.Assassin }
  // Player A Greens
  tilesNumbers.slice(5, 10).forEach(i => {
    tiles[++i] = { playerA: EType.Green, playerB: EType.Neutral }
  })
  // Player B Greens
  tilesNumbers.slice(10, 15).forEach(i => {
    tiles[++i] = { playerA: EType.Neutral, playerB: EType.Green }
  })
  // Both Players Green
  tilesNumbers.slice(15, 18).forEach(i => {
    tiles[++i] = { playerA: EType.Green, playerB: EType.Green }
  })
  // Neutrals
  tilesNumbers.slice(18, 25).forEach(i => {
    tiles[++i] = { playerA: EType.Neutral, playerB: EType.Neutral }
  })

  const tilesList = Object.values(tiles)
  const tilesStringPlayerA: string = tilesList.map(({ playerA }) => playerA).join('')
  const tilesStringPlayerB: string = tilesList.map(({ playerB }) => playerB).join('')
  const tilesString = [tilesStringPlayerA, tilesStringPlayerB].join(',')

  res.status(200).json(
    {
      id: Buffer.from(tilesString).toString('base64'),
      decodedId: tilesString,
      boardPlayerA: parseStringToBoardArray(tilesStringPlayerA),
      boardPlayerB: parseStringToBoardArray(tilesStringPlayerB)
    }
  )
}
