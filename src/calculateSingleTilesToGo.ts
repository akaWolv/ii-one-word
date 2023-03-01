import { EType } from './interfaces/EType'

const TILES = 8

interface ICalculation {
  tilesTotal: number
  tilesLeft: number
  assassin: number
}

const calculateSingleTilesToGo = (flatBoard: string, gameState: string): ICalculation => {
  const tilesTotal: number = TILES
  let tilesLeft = tilesTotal
  let assassin: number = 0

  for (const k in gameState.split('')) {
    if (gameState[k] === '1') {
      if (flatBoard[k] === EType.Green) {
        --tilesLeft
      } else if (flatBoard[k] === EType.Assassin) {
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

export default calculateSingleTilesToGo
