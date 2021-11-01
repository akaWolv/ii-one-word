import React from 'react'
import type { GetServerSideProps } from 'next'
import router from 'next/router'
import { Button, ButtonGroup, Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { grey } from '@mui/material/colors'
import { EType } from 'src/interfaces/EType'
import Board from 'src/Board/Single'
import { ETeam } from 'src/interfaces/ETeam'
import getTeamColor from 'src/getTeamColor'
import calculateSingleTilesToGo from 'src/calculateSingleTilesToGo'
import GameModal from 'src/GameModal/Single'
import TokenList from 'src/Board/TokenList'

interface IGame {
  words: string[][]
  board: Array<EType[]>
  flatBoard: string
  gameState: string
  starting: ETeam
  tokenState: string
}

const StyledContainer = styled(Grid)(({ theme }) => ({
  color: grey[100],
  textAlign: 'center',
  height: '5vh',
  flexGrow: 0
}))

const getCurrentUrl = () => new URL(window.location.href)

// eslint-disable-next-line react/prop-types
const Game = ({ words, board, flatBoard, gameState, tokenState }: IGame) => {
  const changeGameState = (gameState: string) => {
    const url = getCurrentUrl()
    url.searchParams.set('gameState', gameState)
    router.push(url.toString())
  }

  const updateTokenState = () => {
    const url = getCurrentUrl()
    const countTaken = (tokenState.match(/0/g) || []).length
    if (countTaken < tokenState.length) {
      url.searchParams.set(
        'tokenState',
        [
          '0'.repeat(countTaken + 1),
          '1'.repeat(tokenState.length - countTaken - 1)
        ].join('')
      )
    }
    router.push(url.toString())
  }

  const handleNewGame = () => router.push('/game/single/new')
  const handleBackToStart = () => router.push('/')

  const {
    tilesLeft,
    assassin
  } = calculateSingleTilesToGo(flatBoard, gameState)

  return (
    <Grid container
          spacing={2}
          direction="row"
          alignItems="stretch"
    >
      <GameModal tilesLeft={tilesLeft} assassin={assassin} />
      <Grid item xs={11} style={{ height: '95vh' }}>
        <Board
          words={words}
          board={board}
          gameState={gameState}
          changeGameState={changeGameState}
        />
      </Grid>
      <Grid item xs={1} style={{ textAlign: 'center', height: '95vh' }}>
        <TokenList tokenState={tokenState} updateTokenState={updateTokenState} />
      </Grid>
      <StyledContainer container item xs={12}>
        <Grid item xs={3}>
          <Typography variant="h6">
            <span style={{ color: getTeamColor(ETeam.Green) }}>Team </span>
            &nbsp;have <b>{tilesLeft}</b> agent{tilesLeft > 1 && 's'} to go
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <ButtonGroup size="small" variant="text">
            <Button onClick={handleNewGame}>New Game</Button>
            <Button onClick={handleBackToStart}>Back to start</Button>
          </ButtonGroup>
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
    gameState,
    tokenState
  } = query
  if (!boardId || !wordsId || !gameState || !tokenState) {
    res.writeHead(307, { Location: '/game/single/new' })
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
  const resBoard = await fetch(`${process.env.APP_URL}/api/boards/single/${boardId}`)
  const {
    board,
    decodedId: flatBoard
  } = await resBoard.json()

  return {
    props: {
      words,
      board,
      flatBoard,
      gameState,
      tokenState
    }
  }
}

export default Game
