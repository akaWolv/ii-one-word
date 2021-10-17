import React from 'react'
import type { GetServerSideProps } from 'next'
import router from 'next/router'
import { Button, ButtonGroup, Grid } from '@mui/material'
import { EType } from 'src/interfaces/EType'
import Board from 'src/Board/Duo'
import TokenList from 'src/Board/TokenList'
import { EPlayer } from 'src/interfaces/EPlayer'

interface IStart {
  words: string[][]
  boardPlayerA: Array<EType[]>
  boardPlayerB: Array<EType[]>
  gameStateA: string
  gameStateB: string
  tokenState: string
}

const getCurrentUrl = () => new URL(window.location.href)

const editGameState = (gameState: string, orderId: number): string => {
  const gameStateList = gameState.split('')
  gameStateList[orderId] = '1'
  return gameStateList.join('')
}

// eslint-disable-next-line react/prop-types
const Game = ({ words, boardPlayerA, boardPlayerB, gameStateA, gameStateB, tokenState }: IStart) => {
  const changeGameState = (lineId: number, wordId: number, player: EPlayer) => {
    const orderId = lineId * 5 + wordId
    let gameStateList = []

    // edit correct player state
    if (player === EPlayer.A) {
      gameStateList = [editGameState(gameStateA, orderId), gameStateB]
    } else {
      gameStateList = [gameStateA, editGameState(gameStateB, orderId)]
    }

    // push location
    const url = getCurrentUrl()
    url.searchParams.set('gameState', gameStateList.join(','))
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
  const handleNewGame = () => router.push('/game/duo/new')
  const handleBackToStart = () => router.push('/')

  return (
    <Grid container
          spacing={1}
          direction="row"
          alignItems="stretch"
    >
      <Grid item xs={11} style={{ height: '95vh' }}>
        <Board
          words={words}
          boardPlayerA={boardPlayerA}
          boardPlayerB={boardPlayerB}
          gameStateA={gameStateA}
          gameStateB={gameStateB}
          changeGameState={changeGameState}
        />
      </Grid>
      <Grid item xs={1} style={{ textAlign: 'center', height: '95vh' }}>
        <TokenList tokenState={tokenState} updateTokenState={updateTokenState} />
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
  const { board: boardId, words: wordsId, gameState, tokenState } = query
  if (!boardId || !wordsId || !gameState || !tokenState) {
    // res.writeHead(307, { Location: '/game/duo/new' })
    res.end()

    return { props: {} }
  }
  const [gameStateA, gameStateB] = String(gameState).split(',')

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
  const resBoard = await fetch(`${process.env.APP_URL}/api/boards/duo/${boardId}`)
  const dataBoard = await resBoard.json()
  const { boardPlayerA, boardPlayerB } = dataBoard

  return {
    props: {
      words,
      boardPlayerA: boardPlayerA,
      boardPlayerB: boardPlayerB,
      gameStateA,
      gameStateB,
      tokenState
    }
  }
}

export default Game
