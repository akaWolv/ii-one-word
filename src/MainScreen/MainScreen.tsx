import React from 'react'
import { Grid, Typography } from '@mui/material'
import StyledButton from './StyledButton'
import { StyledAlternateSpan } from './StyledTypography'
import { MainScreenContainer } from './MainScreen.styled'

const MainScreen = () => {
  return (
    <MainScreenContainer container
        spacing={5}
        direction="row"
        justifyContent="center"
    >
      <Grid item xs={12}>
        <Typography variant="h2">
          <img src={'indieimp.svg'} style={{ height: 200 }} alt='Logo of IndieImp.com' />
        </Typography>
        <Typography variant="h1">One-Word <StyledAlternateSpan>Game</StyledAlternateSpan></Typography>
        <Typography variant="h4"><StyledAlternateSpan>Please choose the game mode</StyledAlternateSpan></Typography>
      </Grid>
      <Grid item xs={12} md={3}>
        <StyledButton variant='outlined' href="game/single/new">1 Team</StyledButton>
      </Grid>
      <Grid item xs={12} md={3}>
        <StyledButton variant='outlined' href="game/teams/new">2 Teams</StyledButton>
      </Grid>
      <Grid item xs={12} md={3}>
        <StyledButton variant='outlined' href="game/duo/new">Duo</StyledButton>
      </Grid>
    </MainScreenContainer>
  )
}

export default MainScreen
