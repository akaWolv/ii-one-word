import React, { useEffect, useState } from 'react'
import { Grid, Typography } from '@mui/material'
import StyledButton from './StyledButton'
import { StyledAlternateSpan } from './StyledTypography'
import { MainScreenContainer } from './MainScreen.styled'
import { isTablet } from 'react-device-detect'

const MainScreen = () => {
  const [isTabletView, setIsTabletView] = useState<boolean>(false)
  useEffect(() => {
    if (isTablet) {
      setIsTabletView(isTablet)
    }
  }, [])

  return (
    <MainScreenContainer container
      spacing={5}
      direction="row"
      justifyContent="center"
      $isTabletView={isTabletView}
    >
      <Grid item xs={12}>
        <Typography variant="h2">
          <img src={'indieimp.svg'} style={{ height: 200 }} alt='Logo of IndieImp.com' />
        </Typography>
        <Typography variant="h1">One-Word <StyledAlternateSpan>Game</StyledAlternateSpan></Typography>
        <Typography variant="h4"><StyledAlternateSpan>Wybierz rodzaj rozgrywki</StyledAlternateSpan></Typography>
      </Grid>
      <Grid item xs={12} md={3}>
        <StyledButton variant='outlined' href="game/single/new">Pojedynczy Zespół</StyledButton>
      </Grid>
      <Grid item xs={12} md={3}>
        <StyledButton variant='outlined' href="game/teams/new">Dwie Drużyny</StyledButton>
      </Grid>
      <Grid item xs={12} md={3}>
        <StyledButton variant='outlined' href="game/duo/new">Duo - Kooperacja</StyledButton>
      </Grid>
    </MainScreenContainer>
  )
}

export default MainScreen
