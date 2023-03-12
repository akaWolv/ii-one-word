import React from 'react'
import { Button, Grid, Typography } from '@mui/material'
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
    <Grid container item sm={6} md={5} lg={4} style={{ padding: '15px' }}>
      <KeyCard
        boardLink={boardLink}
        distinctColor={distinctColor}
        leaderText={leaderText}
      />
    </Grid>
  )

  return (
    <Grid container
          direction="column"
          justifyContent="center"
          gap={1}
          style={{
            fontSize: '2em',
            padding: 15
          }}
    >
      <Grid container item alignItems="center" justifyContent="center">
        <Typography variant="h4">Przygotowanie do gry: <b>{gameName}</b></Typography>
      </Grid>

      <Grid container item justifyContent="space-around" style={{ flexGrow: 2 }}>
        {greenKeyCardLink && renderKeyCardContainer(greenKeyCardLink, getTeamColor(ETeam.Green), 'Lidera')}
        {redKeyCardLink && renderKeyCardContainer(redKeyCardLink, getTeamColor(ETeam.Red), 'Lidera Czerwonych')}
        {blueKeyCardLink && renderKeyCardContainer(blueKeyCardLink, getTeamColor(ETeam.Blue), 'Lidera Niebieskich')}
        {playerAKeyCardLink && renderKeyCardContainer(playerAKeyCardLink, getPlayerColor(EPlayer.A), 'Gracza A')}
        {playerBKeyCardLink && renderKeyCardContainer(playerBKeyCardLink, getPlayerColor(EPlayer.B), 'Gracza B')}
      </Grid>

      <Grid container item alignItems="center" justifyContent="center" gap={2}>
        <Button
          variant="outlined"
          size="large"
          href={startLink}
        >
          Start Gry!
        </Button>
        {
          tabletModeLink && <Button
            variant="outlined"
            size="large"
            href={tabletModeLink}
          >
            Start Gry w trybie tabletu
          </Button>
        }
      </Grid>
    </Grid>
  )
}

export default Prepare
