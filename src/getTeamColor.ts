import { blue, red } from '@mui/material/colors'
import { ETeam } from 'src/interfaces/ETeam'

const getTeamColor = (player: ETeam) => {
  switch (player) {
    case ETeam.Red:
      return red[500]
    case ETeam.Blue:
      return blue[500]
  }
}

export default getTeamColor
