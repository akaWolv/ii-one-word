import React from 'react'
import type { GetServerSideProps } from 'next'
import router from 'next/router'
import { Button, ButtonGroup, Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { grey } from '@mui/material/colors'
import { EType } from 'src/interfaces/EType'
import Board from 'src/Board/Teams'
import { ETeam } from 'src/interfaces/ETeam'
import getTeamColor from 'src/getTeamColor'
import calculateTeamsTilesToGo from 'src/calculateTeamsTilesToGo'
import GameModal from 'src/GameModal/Teams'

interface IGame {
  words: string[][]
  board: Array<EType[]>
  flatBoard: string
  gameState: string
  starting: ETeam
}

const StyledContainer = styled(Grid)(({ theme }) => ({
  color: grey[100],
  textAlign: 'center',
  height: '5vh',
  flexGrow: 0
}))

// eslint-disable-next-line react/prop-types
const Game = ({
  words,
  board,
  flatBoard,
  gameState,
  starting
}: IGame) => {
  const changeGameState = (gameState: string) => {
    const url = new URL(window.location.href)
    url.searchParams.set('gameState', gameState)
    router.push(url.toString())
  }

  const handleNewGame = () => router.push('/game/teams/new')
  const handleBackToStart = () => router.push('/')

  const {
    redTeamTilesLeft,
    blueTeamTilesLeft,
    assassin
  } = calculateTeamsTilesToGo(flatBoard, gameState, starting)

  return (
    <Grid container
          spacing={2}
          direction="row"
          alignItems="stretch"
    >
      <GameModal redTeamTilesLeft={redTeamTilesLeft} blueTeamTilesLeft={blueTeamTilesLeft} assassin={assassin} />
      <Grid item xs={12} style={{ height: '95vh' }}>
        <Board
          words={words}
          board={board}
          gameState={gameState}
          changeGameState={changeGameState}
        />
      </Grid>
      <StyledContainer container item xs={12}>
        <Grid item xs={3}>
          <Typography variant="h6">
            <span style={{ color: getTeamColor(ETeam.Red) }}>Red Team</span>
            &nbsp;<b>{redTeamTilesLeft}</b> agent{redTeamTilesLeft > 0 && 's'} to go
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <ButtonGroup size="small" variant="text">
            <Button onClick={handleNewGame}>New Game</Button>
            <Button onClick={handleBackToStart}>Back to start</Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6">
            <span style={{ color: getTeamColor(ETeam.Blue) }}>Blue Team </span>
            &nbsp;<b>{blueTeamTilesLeft}</b> agent{blueTeamTilesLeft > 0 && 's'} to go
          </Typography>
        </Grid>
      </StyledContainer>
    </Grid>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
  res
}) => {
  const {
    board: boardId,
    words: wordsId,
    gameState
  } = query
  if (!boardId || !wordsId || !gameState) {
    res.writeHead(307, { Location: '/game/teams/new' })
    res.end()

    return { props: {} }
  }

  // get Words
  const resWords = await fetch(`${process.env.APP_URL}/api/words/${wordsId}`)
  const dataWords = await resWords.json()
  if (!dataWords) {
    return {
      notFound: true
    }
  }
  const { words } = dataWords

  // get Board
  const resBoard = await fetch(`${process.env.APP_URL}/api/boards/teams/${boardId}`)
  const dataBoard = await resBoard.json()
  const {
    board,
    decodedId: flatBoard,
    starting
  } = dataBoard

  return {
    props: {
      words,
      board,
      flatBoard,
      gameState,
      starting
    }
  }
}

export default Game
