import React from 'react'
import type { GetServerSideProps } from 'next'
import QRCode from 'react-qr-code'
import { grey } from '@mui/material/colors'
import { Button, Grid, TextField, Typography } from '@mui/material'
import router from 'next/router'
import { EType } from 'src/interfaces/EType'
import getTeamColor from 'src/getTeamColor'
import { ETeam } from 'src/interfaces/ETeam'

const INITIAL_GAME_STATE = '0000000000000000000000000'

interface IPrepare {
  boardId: string
  wordsId: string
}

const getBoardLink = (boardId: string, team: EType.Red | EType.Blue): string => {
  const url = new URL(`${process.env.APP_URL}/keycard/teams/${boardId}`)
  url.searchParams.set('team', team)
  return url.toString()
}

// eslint-disable-next-line react/prop-types
const Prepare = ({ boardId, wordsId }: IPrepare) => {
  const boardLinkRed = getBoardLink(boardId, EType.Red)
  const boardLinkBlue = getBoardLink(boardId, EType.Blue)
  const handleClickStart = () => {
    // redirect to prepare
    const redirectUrl = new URL(`${process.env.APP_URL}/game/teams`)
    redirectUrl.searchParams.set('board', boardId)
    redirectUrl.searchParams.set('words', wordsId)
    redirectUrl.searchParams.set('gameState', INITIAL_GAME_STATE)
    router.push(redirectUrl.toString())
  }
  return (
    <Grid container
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
          style={{ fontSize: '2em', minHeight: '100vh', padding: 10 }}
    >
      <Grid container item xs={12} style={{ justifyContent: 'center', color: grey[300] }}>
        <Typography variant="h3">Prepare for a Teams Game</Typography>
      </Grid>

      <Grid container spacing={2} item xs={12} md={6} style={{ textAlign: 'center', color: getTeamColor(ETeam.Red) }}>
        <Grid item xs={12}>
          <Typography variant="h4">Red Team</Typography>
          <Typography variant="subtitle1" gutterBottom>key card</Typography>
        </Grid>
        <Grid item xs={12}>
          <QRCode value={boardLinkRed} size={400} />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Red team"
            variant="standard"
            defaultValue={boardLinkRed}
            InputProps={{
              readOnly: true,
              style: { width: 400, color: grey[600] }
            }}/>
        </Grid>
      </Grid>

      <Grid container spacing={2} item xs={12} md={6} style={{ textAlign: 'center', color: getTeamColor(ETeam.Blue) }}>
        <Grid item xs={12}>
          <Typography variant="h4">Blue Team</Typography>
          <Typography variant="subtitle1" gutterBottom>key card</Typography>
        </Grid>
        <Grid item xs={12}>
          <QRCode value={boardLinkBlue} size={400} />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Blue team"
            variant="standard"
            defaultValue={boardLinkBlue}
            InputProps={{
              readOnly: true,
              style: { width: 400, color: grey[600] }
            }}/>
        </Grid>
      </Grid>

      <Grid container item xs={12} style={{ justifyContent: 'center' }}>
        <Button
          variant="outlined"
          size="large"
          onClick={handleClickStart}
          style={{ color: grey[400] }}
        >
          Let the game begin!
        </Button>
      </Grid>
    </Grid>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query, res }) => {
  const { board: boardId, words: wordsId } = query
  if (!boardId || !wordsId) {
    res.writeHead(307, { Location: '/game/teams/new' })
    res.end()
    return { props: {} }
  }

  return {
    props: { boardId, wordsId }
  }
}

export default Prepare
