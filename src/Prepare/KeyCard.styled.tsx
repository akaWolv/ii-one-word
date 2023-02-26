import { Paper } from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,
  height: '60vh',
  padding: '15px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
}))

export { StyledPaper }
