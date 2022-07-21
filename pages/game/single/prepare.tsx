import React from 'react'
import type { GetServerSideProps } from 'next'
import QRCode from 'react-qr-code'
import { grey } from '@mui/material/colors'
import { Button, Grid, TextField, Typography } from '@mui/material'
import getTeamColor from 'src/getTeamColor'
import { ETeam } from 'src/interfaces/ETeam'

const INITIAL_GAME_STATE = '0000000000000000000000000'
const INITIAL_TOKEN_STATE = '11111'

interface IPrepare {
  boardId: string
  wordsId: string
}

const getBoardLink = (boardId: string): string => {
  const url = new URL(`${process.env.APP_URL}/keycard/single/${boardId}`)
  return url.toString()
}

// eslint-disable-next-line react/prop-types
const Prepare = ({ boardId, wordsId }: IPrepare) => {
  const boardLink = getBoardLink(boardId)
  const getStartLink = (): string => {
    const startLink = new URL(`${process.env.APP_URL}/game/single`)
    startLink.searchParams.set('board', boardId)
    startLink.searchParams.set('words', wordsId)
    startLink.searchParams.set('gameState', INITIAL_GAME_STATE)
    startLink.searchParams.set('tokenState', INITIAL_TOKEN_STATE)
    return startLink.toString()
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
        <Typography variant="h3">Prepare for a Single Team Game</Typography>
      </Grid>

      <Grid container spacing={2} item xs={12} md={6} style={{ textAlign: 'center', color: getTeamColor(ETeam.Green) }}>
        <Grid item xs={12}>
          <Typography variant="h4">Key Card</Typography>
        </Grid>
        <Grid item xs={12}>
          <QRCode value={boardLink} size={400} />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Key Card"
            variant="standard"
            onFocus={event => {
              event.target.select()
            }}
            defaultValue={boardLink}
            InputProps={{
              readOnly: true,
              style: { width: 400, color: grey[300] }
            }}/>
        </Grid>
      </Grid>

      <Grid container item xs={12} style={{ justifyContent: 'center' }}>
        <Button
          variant="outlined"
          size="large"
          href={getStartLink()}
          style={{ color: grey[400] }}
        >
          Start Game!
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
