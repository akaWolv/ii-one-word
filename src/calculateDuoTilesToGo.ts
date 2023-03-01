import { EType } from './interfaces/EType'

const TILES = 15

interface ICalculation {
  tilesTotal: number
  tilesLeft: number
  assassin: number
}

const calculateDuoTilesToGo = (flatBoard: string, gameStateA: string, gameStateB: string): ICalculation => {
  const [flatBoardA, flatBoardB] = flatBoard.split(',')

  const tilesTotal: number = TILES
  let tilesLeft = tilesTotal
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
    tilesTotal,
    tilesLeft,
    assassin
  }
}

export default calculateDuoTilesToGo
