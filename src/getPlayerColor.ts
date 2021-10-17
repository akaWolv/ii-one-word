import { blue, red } from '@mui/material/colors'
import { EPlayer } from 'src/interfaces/EPlayer'

const getPlayerColor = (player: EPlayer) => {
  switch (player) {
    case EPlayer.A:
      return red[500]
    case EPlayer.B:
      return blue[500]
  }
}

export default getPlayerColor
