import React from 'react'
import { Grid, Typography } from '@mui/material'
import { EPlayer } from '../interfaces/EPlayer'
import { ETeam } from 'src/interfaces/ETeam'
import getTeamColor from 'src/getTeamColor'
import getPlayerColor from '../getPlayerColor'
import KeyCard from './KeyCard'
import StartCard from './StartCard'

interface Props {
  startLink: string
  tabletModeLink?: string
  greenKeyCardLink?: string
  redKeyCardLink?: string
  blueKeyCardLink?: string
  playerAKeyCardLink?: string
  playerBKeyCardLink?: string
}

const Prepare = ({
  startLink,
  tabletModeLink,
  greenKeyCardLink,
  redKeyCardLink,
  blueKeyCardLink,
  playerAKeyCardLink,
  playerBKeyCardLink
}: Props) => {
  const renderKeyCardContainer = (boardLink: string, distinctColor: string, leaderText?: string) => (
    <Grid container item sm={6} md={5} lg={4} style={{ justifyContent: 'center' }}>
      <KeyCard
        boardLink={boardLink}
        distinctColor={distinctColor}
        leaderText={leaderText}
      />
    </Grid>
  )

  return (
    <Grid container
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          style={{
            fontSize: '2em',
            minHeight: '100vh',
            padding: 10
          }}
    >
      <Grid container item xs={12} style={{ justifyContent: 'center' }}>
        <Typography variant="h3">Prepare for a Single Team Game</Typography>
      </Grid>

      { greenKeyCardLink && renderKeyCardContainer(greenKeyCardLink, getTeamColor(ETeam.Green), 'Leader')}
      { redKeyCardLink && renderKeyCardContainer(redKeyCardLink, getTeamColor(ETeam.Red), 'Red Leader')}
      { blueKeyCardLink && renderKeyCardContainer(blueKeyCardLink, getTeamColor(ETeam.Blue), 'Blue Leader')}
      { playerAKeyCardLink && renderKeyCardContainer(playerAKeyCardLink, getPlayerColor(EPlayer.A), 'Player A')}
      { playerBKeyCardLink && renderKeyCardContainer(playerBKeyCardLink, getPlayerColor(EPlayer.B), 'Player B')}

      <Grid container item xs={12} sm={12} style={{ justifyContent: 'center' }}>
        <StartCard startLink={startLink} tabletModeLink={tabletModeLink} />
      </Grid>
    </Grid>
  )
}

export default Prepare
