import { styled } from '@mui/material/styles'
import { Grid } from '@mui/material'

const MainScreenContainer = styled(Grid)<{ $isTabletView: boolean }>(({ $isTabletView }) => ({
  height: $isTabletView ? '90vh' : '100vh',
  textAlign: 'center',
  marginTop: 0,
  paddingBottom: 15,
  paddingLeft: 15,
  paddingRight: 15,
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'center'
}))

export { MainScreenContainer }
