import { styled } from '@mui/material/styles'
import { Grid } from '@mui/material'

const StyledGridContainer = styled(Grid)({
  height: '100%',
  margin: 0,
  padding: 0,
  paddingRight: 5,
  paddingBottom: 5,
  alignItems: 'center'
})

const StyledBoardContainer = styled(Grid)({
  textAlign: 'center',
  height: '95%'
})

const StyledBottomBar = styled(Grid)({
  textAlign: 'center',
  height: '5%',
  display: 'flex',
  justifyContent: 'space-between'
})

export { StyledGridContainer, StyledBoardContainer, StyledBottomBar }
