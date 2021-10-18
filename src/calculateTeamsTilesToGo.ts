import { ETeam } from './interfaces/ETeam'
import { EType } from './interfaces/EType'

const FIRST_TEAM_TILES = 9
const SECOND_TEAM_TILES = 8

interface ICalculation {
  redTeamTilesLeft: number
  blueTeamTilesLeft: number
  assassin: number
}

const calculateTeamsTilesToGo = (flatBoard: string, gameState: string, starting: ETeam): ICalculation => {
  let redTeamTilesLeft: number = starting === ETeam.Red ? FIRST_TEAM_TILES : SECOND_TEAM_TILES
  let blueTeamTilesLeft: number = starting === ETeam.Blue ? FIRST_TEAM_TILES : SECOND_TEAM_TILES
  let assassin: number = 0

  for (const k in gameState.split('')) {
    if (gameState[k] === '1') {
      if (flatBoard[k] === EType.Red) {
        --redTeamTilesLeft
      } else if (flatBoard[k] === EType.Blue) {
        --blueTeamTilesLeft
      } else if (flatBoard[k] === EType.Assassin) {
        ++assassin
      }
    }
  }
  return {
    redTeamTilesLeft,
    blueTeamTilesLeft,
    assassin
  }
}

export default calculateTeamsTilesToGo
