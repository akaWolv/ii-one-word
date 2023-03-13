import { styled } from '@mui/material/styles'
import { CardActions, Typography } from '@mui/material'

const StyledWord = styled(Typography)({
  textAlign: 'center',
  bottom: 0,
  fontSize: '1.7vw',
  textTransform: 'uppercase'
})

const StyledUpsideDownWord = styled(CardActions)(({ theme }) => ({
  fontSize: '1.5vw',
  fontWeight: 400,
  color: theme.palette.primary.main,
  textAlign: 'right',
  transform: 'scale(-1, -1)'
}))

export { StyledUpsideDownWord, StyledWord }
