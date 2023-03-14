import { Paper } from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,
  width: '100%',
  height: '100%',
  padding: '15px',
  display: 'flex',
  flexDirection: 'column'
}))

export { StyledPaper }
