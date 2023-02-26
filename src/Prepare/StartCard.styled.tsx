import { alpha, Paper } from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledPaper = styled(Paper)(({ theme }) => ({
  border: `solid 1px ${alpha(theme.palette.primary.main, 0.1)}`,
  background: alpha('#fff', 0.1),
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 15,
  padding: 10,
  paddingTop: 15
}))

export { StyledPaper }
