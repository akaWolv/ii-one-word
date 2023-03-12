import { styled } from '@mui/material/styles'
import { CardActions } from '@mui/material'

const StyledUpsideDownWord = styled(CardActions)(({ theme }) => ({
  fontSize: '1.7vw',
  fontWeight: 400,
  color: theme.palette.primary.main,
  textAlign: 'right',
  transform: 'scale(-1, -1)'
}))

export { StyledUpsideDownWord }
