import React from 'react'
import router from 'next/router'
import { Button, Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { grey, purple } from '@mui/material/colors'
import VpnKeyIcon from '@mui/icons-material/VpnKey'
import PasswordIcon from '@mui/icons-material/Password'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import { EType } from 'src/interfaces/EType'

interface IHome {
  words: string[][]
  board: Array<EType[]>
}

const StyledButton = styled(Button)<{ _type?: EType }>(({ _type }) => ({
  backgroundColor: 'transparent',
  border: `solid 2px ${purple[800]}`,
  width: '100%',
  height: 200,
  fontSize: 30,
  '&:hover': {
    backgroundColor: purple[800],
    color: grey[50],
    cursor: 'pointer'
  }
}))

const Home = ({ words, board }: IHome) => {
  const handleClickNewTeams = () => router.push('game/teams/new')
  const handleClickNewDuo = () => router.push('game/duo/new')
  return (
    <Grid container
          spacing={12}
          direction="row"
          justifyContent="center"
          alignItems="center"
          style={{ height: '100vh', textAlign: 'center' }}
    >
      <Grid item xs={12}>
        <Typography variant="h1" gutterBottom style={{ color: purple[500] }}>One-Word Game</Typography>
        <Typography variant="h2" gutterBottom style={{ color: purple[500] }}>
          <PasswordIcon style={{ margin: 10, fontSize: 60 }} />
          <VpnKeyIcon style={{ margin: 10, fontSize: 60 }} />
          <LockOpenIcon style={{ margin: 10, fontSize: 60 }} />
        </Typography>
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
