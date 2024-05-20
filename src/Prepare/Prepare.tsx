import React from 'react'
import { Button, Grid, Paper, Typography } from '@mui/material'
import { EPlayer } from '../interfaces/EPlayer'
import { ETeam } from 'src/interfaces/ETeam'
import getTeamColor from 'src/getTeamColor'
import getPlayerColor from '../getPlayerColor'
import KeyCard from './KeyCard'

interface Props {
  gameName: string
  startLink: string
  tabletModeLink?: string
  greenKeyCardLink?: string
  redKeyCardLink?: string
  blueKeyCardLink?: string
  playerAKeyCardLink?: string
  playerBKeyCardLink?: string
}

const Prepare = ({
  gameName,
  startLink,
  tabletModeLink,
  greenKeyCardLink,
  redKeyCardLink,
  blueKeyCardLink,
  playerAKeyCardLink,
  playerBKeyCardLink
}: Props) => {
  const renderKeyCardContainer = (boardLink: string, distinctColor: string, leaderText?: string) => (
    <Grid container item sm={5} md={5} lg={4} justifyContent='center' alignItems='stretch' style={{ padding: 20 }}>
      <KeyCard
        boardLink={boardLink}
        distinctColor={distinctColor}
        leaderText={leaderText}
      />
    </Grid>
  )

  return (
    <Grid
      container
      direction="column"
      alignItems="space-between"
      justifyContent="center"
      style={{ height: '100dvh' }}
    >
      <Grid container item>
        <Paper elevation={6} style={{
          width: '100%',
          padding: 5,
          backgroundColor: 'transparent',
          textAlign: 'center'
        }}>
          <Typography variant="h4">Przygotowanie do gry: <b>{gameName}</b></Typography>
        </Paper>
      </Grid>

      <Grid item
            container
            direction="column"
            justifyContent="center"
            alignItems="stretch"
            style={{ flexGrow: 2 }}
      >

        <Grid container item justifyContent="space-around" direction='row'>
            {greenKeyCardLink && renderKeyCardContainer(greenKeyCardLink, getTeamColor(ETeam.Green), 'Lidera')}
            {redKeyCardLink && renderKeyCardContainer(redKeyCardLink, getTeamColor(ETeam.Red), 'Lidera Czerwonych')}
            {blueKeyCardLink && renderKeyCardContainer(blueKeyCardLink, getTeamColor(ETeam.Blue), 'Lidera Niebieskich')}
            {playerAKeyCardLink && renderKeyCardContainer(playerAKeyCardLink, getPlayerColor(EPlayer.A), 'Gracza A')}
            {playerBKeyCardLink && renderKeyCardContainer(playerBKeyCardLink, getPlayerColor(EPlayer.B), 'Gracza B')}
        </Grid>

      </Grid>

      <Grid container item>
        <Grid container item alignItems="center" justifyContent="center" gap={2} sx={{ paddingBottom: '15px' }}>
          <Button
            variant="outlined"
            size="large"
            href={startLink}
            style={{ margin: '0 5px' }}
          >
            Start Gry!
          </Button>
          {
            tabletModeLink && <Button
              variant="outlined"
              size="large"
              href={tabletModeLink}
              style={{ margin: '0 5px' }}
            >
              Start Gry w trybie tabletu
            </Button>
          }
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Prepare
