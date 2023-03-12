import { styled } from '@mui/material/styles'
import { Grid } from '@mui/material'

const StyledGridContainer = styled(Grid)({
  alignItems: 'center'
})

const StyledBoardContainer = styled(Grid)<{$istabletview: boolean}>(({ $istabletview }) => ({
  textAlign: 'center',
  height: $istabletview ? '85vh' : '95vh',
  flexGrow: 0
}))

const StyledBottomBar = styled(Grid)({
  textAlign: 'center',
  height: '5vh',
  flexGrow: 0,
  display: 'flex',
  justifyContent: 'space-between'
})

export { StyledGridContainer, StyledBoardContainer, StyledBottomBar }
