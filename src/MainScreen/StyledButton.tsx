import { alpha, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import { EType } from 'src/interfaces/EType'

const StyledButton = styled(Button)<{ _type?: EType }>(({ _type, theme }) => ({
  backdropFilter: 'saturate(150%)',
  border: `solid 2px ${alpha(theme.palette.primary.light, 0.6)}`,
  width: '100%',
  height: 150,
  fontSize: 30,
  color: theme.palette.primary.light,
  '&:hover': {
    backdropFilter: 'saturate(300%)',
    border: `solid 2px ${theme.palette.primary.light}`,
    textDecoration: `underline ${alpha(theme.palette.primary.light, 0.6)}`
  },
  '& .MuiTouchRipple-child': {
    color: alpha(theme.palette.primary.main, 0.6)
  }
}))

export default StyledButton
