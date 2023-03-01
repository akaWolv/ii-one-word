import { alpha, Button, Card, CardActions } from '@mui/material'
import { styled } from '@mui/material/styles'
import { grey } from '@mui/material/colors'
import { EType } from 'src/interfaces/EType'
import { EPicked } from 'src/interfaces/EPicked'
import { EPlayer } from 'src/interfaces/EPlayer'
import getTileColorByType from 'src/getTileColorByType'
import getPlayerColor from 'src/getPlayerColor'

const StyledCard = styled(Card)<{ _type?: EType }>(({ _type, theme }) => ({
  background: alpha(_type !== undefined ? getTileColorByType(_type) : theme.palette.secondary.light, 0.75),
  color: theme.palette.primary.dark,
  padding: 1,
  width: '100%',
  height: '100%',
  fontSize: 25
}))

const StyledCardContent = styled(Card)({
  padding: 38,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  backgroundColor: 'transparent'
})

const StyledButton = styled(Button)<{ _picked: EPicked, _player: EPlayer }>(({ _picked, _player }) => {
  const calculatedColor = _picked === EPicked.Yes ? getTileColorByType(EType.Neutral) : getPlayerColor(_player)
  return {
    backgroundColor: 'transparent',
    borderColor: calculatedColor,
    color: calculatedColor,
    padding: 0,
    fontWeight: 'bold',
    flex: 1,
    '&:hover': {
      color: grey[900],
      backgroundColor: alpha(calculatedColor, 0.6),
      borderColor: calculatedColor,
      cursor: 'pointer',
      textDecoration: 'none'
    },
    '&.Mui-disabled': {
      opacity: 0.4,
      color: grey[50],
      backgroundColor: grey[400],
      borderColor: grey[400]
    }
  }
})

const StyledButtonContainer = styled(CardActions)({
  height: '23%',
  display: 'flex',
  justifyItems: 'stretch',
  justifyContent: 'space-between'
})

export { StyledCard, StyledCardContent, StyledButton, StyledButtonContainer }
