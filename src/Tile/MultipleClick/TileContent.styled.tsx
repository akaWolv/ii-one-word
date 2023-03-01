import { styled } from '@mui/material/styles'
import { CardActions } from '@mui/material'

const StyledUpsideDownWord = styled(CardActions)(({ theme }) => ({
  fontSize: '0.8em',
  fontWeight: 400,
  color: theme.palette.primary.main,
  textAlign: 'right',
  transform: 'scale(-1, -1)'
}))

export { StyledUpsideDownWord }
