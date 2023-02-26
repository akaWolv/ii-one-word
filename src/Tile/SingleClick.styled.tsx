import { EType } from '../interfaces/EType'
import { styled } from '@mui/material/styles'
import { alpha, Button } from '@mui/material'
import getTileColorByType from '../getTileColorByType'

const StyledButton = styled(Button)<{ _type?: EType }>(({
  _type,
  theme
}) => ({
  // backgroundColor: _type ? getTileColorByType(_type) : theme.palette.secondary.main,
  // background: 'linear-gradient(0deg, rgba(209,0,164,1) 39%, rgba(252,176,69,1) 100%)',
  background: _type ? alpha(getTileColorByType(_type), 0.8) : alpha(theme.palette.secondary.light, 0.4),
  color: theme.palette.primary.dark, // theme.palette.secondary.main,
  border: `solid 2px ${alpha(theme.palette.primary.main, 0.3)}`, // `solid 2px ${_type ? getTileColorByType(_type) : alpha(theme.palette.primary.main, 0.2)}`,
  padding: 1,
  width: '100%',
  height: '100%',
  fontSize: 25,
  '&:hover': {
    border: `solid 2px ${alpha(theme.palette.primary.main, 0.4)}`,
    backgroundColor: alpha(theme.palette.secondary.light, 1),
    color: alpha(theme.palette.primary.main, 1),
    textDecoration: `underline ${alpha(theme.palette.primary.dark, 0.4)}`,
    cursor: 'pointer'
  }
}))

export { StyledButton }
