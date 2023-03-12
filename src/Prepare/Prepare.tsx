import React from 'react'
import { Grid, Typography } from '@mui/material'
import { EPlayer } from '../interfaces/EPlayer'
import { ETeam } from 'src/interfaces/ETeam'
import getTeamColor from 'src/getTeamColor'
import getPlayerColor from '../getPlayerColor'
import KeyCard from './KeyCard'
import StartCard from './StartCard'

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
    <Grid container item sm={6} md={5} lg={4}>
      <KeyCard
        boardLink={boardLink}
        distinctColor={distinctColor}
        leaderText={leaderText}
      />
    </Grid>
  )

  return (
    <Grid container
          spacing={5}
          direction="column"
          justifyContent="center"
          style={{
            fontSize: '2em',
            minHeight: '100vh',
            padding: 10
          }}
    >
      <Grid container item xs={12} justifyContent="center">
        <Typography variant="h3">Prepare for a <b>{gameName}</b></Typography>
      </Grid>

      <Grid container item xs={12} justifyContent="space-around" spacing={5} style={{ flexGrow: 1 }}>
        { greenKeyCardLink && renderKeyCardContainer(greenKeyCardLink, getTeamColor(ETeam.Green), 'Leader')}
        { redKeyCardLink && renderKeyCardContainer(redKeyCardLink, getTeamColor(ETeam.Red), 'Red Leader')}
        { blueKeyCardLink && renderKeyCardContainer(blueKeyCardLink, getTeamColor(ETeam.Blue), 'Blue Leader')}
        { playerAKeyCardLink && renderKeyCardContainer(playerAKeyCardLink, getPlayerColor(EPlayer.A), 'Player A')}
        { playerBKeyCardLink && renderKeyCardContainer(playerBKeyCardLink, getPlayerColor(EPlayer.B), 'Player B')}
      </Grid>
      <Grid container item xs={12} sm={12} justifyContent="center">
        <StartCard startLink={startLink} tabletModeLink={tabletModeLink} />
      </Grid>
    </Grid>
  )
}

export default Prepare
