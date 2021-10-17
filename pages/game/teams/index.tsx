import React from 'react'
import type { GetServerSideProps } from 'next'
import router from 'next/router'
import { Button, ButtonGroup, Grid } from '@mui/material'
import { EType } from 'src/interfaces/EType'
import Board from 'src/Board/Teams'

interface IGame {
  words: string[][]
  board: Array<EType[]>
  gameState: string
}

// eslint-disable-next-line react/prop-types
const Game = ({ words, board, gameState }: IGame) => {
  const changeGameState = (gameState: string) => {
    const url = new URL(window.location.href)
    url.searchParams.set('gameState', gameState)
    router.push(url.toString())
  }
  const handleNewGame = () => router.push('/game/teams/new')
  const handleBackToStart = () => router.push('/')

  return (
    <Grid container
          spacing={2}
          direction="row"
          alignItems="stretch"
    >
      <Grid item xs={12} style={{ height: '95vh' }}>
        <Board
          words={words}
          board={board}
          gameState={gameState}
          changeGameState={changeGameState}
        />
      </Grid>
      <Grid item xs={12} style={{ textAlign: 'center', height: '5vh', flexGrow: 0 }}>
        <ButtonGroup size="small" variant="text" aria-label="outlined primary button group">
          <Button onClick={handleNewGame}>New Game</Button>
          <Button onClick={handleBackToStart}>Back to start</Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query, res }) => {
  const { board: boardId, words: wordsId, gameState } = query
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
  const { board } = dataBoard

  return {
    props: { words, board, gameState }
  }
}

export default Game
