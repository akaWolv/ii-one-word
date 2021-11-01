import { EType } from 'src/interfaces/EType'
import { amber, grey, lightBlue, red, lightGreen } from '@mui/material/colors'

const getTileColorByType = (type: EType) => {
  switch (type) {
    case EType.Red:
      return red[500]
    case EType.Blue:
      return lightBlue[400]
    case EType.Assassin:
      return grey[800]
    case EType.Neutral:
      return amber[100]
    case EType.Green:
      return lightGreen[500]
  }
}

export default getTileColorByType
