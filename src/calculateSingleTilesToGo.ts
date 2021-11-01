import { EType } from './interfaces/EType'

const TILES = 8

interface ICalculation {
  tilesLeft: number
  assassin: number
}

const calculateSingleTilesToGo = (flatBoard: string, gameState: string): ICalculation => {
  let tilesLeft: number = TILES
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
    tilesLeft,
    assassin
  }
}

export default calculateSingleTilesToGo
