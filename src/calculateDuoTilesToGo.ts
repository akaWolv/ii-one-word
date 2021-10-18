import { EType } from './interfaces/EType'

const TILES = 15

interface ICalculation {
  tilesLeft: number
  assassin: number
}

const calculateDuoTilesToGo = (flatBoard: string, gameStateA: string, gameStateB: string): ICalculation => {
  const [flatBoardA, flatBoardB] = flatBoard.split(',')

  let tilesLeft: number = TILES
  let assassin: number = 0

  for (const k in gameStateA.split('')) {
    if (gameStateA[k] === '1') {
      if (flatBoardA[k] === EType.Green) {
        --tilesLeft
      } else if (flatBoardA[k] === EType.Assassin) {
        ++assassin
      }
    }
  }

  for (const k in gameStateB.split('')) {
    if (gameStateB[k] === '1') {
      if (flatBoardB[k] === EType.Green) {
        --tilesLeft
      } else if (flatBoardB[k] === EType.Assassin) {
        ++assassin
      }
    }
  }

  return {
    tilesLeft,
    assassin
  }
}

export default calculateDuoTilesToGo
