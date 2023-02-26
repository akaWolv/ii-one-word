import { styled } from '@mui/material/styles'
import { Grid } from '@mui/material'

const StyledGridContainer = styled(Grid)(({ theme }) => ({
  alignItems: 'center'
}))
const StyledBoardContainer = styled(Grid)(({ theme }) => ({
  textAlign: 'center',
  height: '95vh',
  flexGrow: 0
}))
const StyledBottomBar = styled(Grid)(({ theme }) => ({
  textAlign: 'center',
  height: '5vh',
  flexGrow: 0,
  display: 'flex',
  justifyContent: 'space-between'
}))

export { StyledGridContainer, StyledBoardContainer, StyledBottomBar }
