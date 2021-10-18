import React from 'react'
import router from 'next/router'
import { Button, Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { grey } from '@mui/material/colors'
import { EType } from 'src/interfaces/EType'

interface IHome {
  words: string[][]
  board: Array<EType[]>
}

const StyledButton = styled(Button)<{ _type?: EType }>(({ _type, theme }) => ({
  backgroundColor: 'transparent',
  border: `solid 2px ${theme.palette.primary.main}`,
  width: '100%',
  height: 200,
  fontSize: 30,
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: grey[50],
    cursor: 'pointer'
  }
}))

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main
}))

const Home = ({ words, board }: IHome) => {
  const handleClickNewTeams = () => router.push('game/teams/new')
  const handleClickNewDuo = () => router.push('game/duo/new')
  return (
    <Grid container
          spacing={5}
          direction="row"
          justifyContent="center"
          alignItems="center"
          style={{ height: '100vh', textAlign: 'center', marginTop: 0 }}
    >
      <Grid item xs={12}>
        <StyledTypography variant="h2" >
          <img src={'indieimp.svg'} style={{ height: 150 }} />
        </StyledTypography>
        <StyledTypography variant="h1" >One-Word Game</StyledTypography>
      </Grid>
      <Grid item xs={4}>
        <StyledButton onClick={handleClickNewTeams}>Teams</StyledButton>
      </Grid>
      <Grid item xs={4}>
        <StyledButton onClick={handleClickNewDuo}>Duo (co-op)</StyledButton>
      </Grid>
    </Grid>
  )
}

export default Home
