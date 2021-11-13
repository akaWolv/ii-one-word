import React from 'react'
import type { GetServerSideProps } from 'next'
import router from 'next/router'
import { Button, ButtonGroup, Grid, Typography } from '@mui/material'
import { EType } from 'src/interfaces/EType'
import Board from 'src/Board/Duo'
import TokenList from 'src/Board/TokenList'
import { EPlayer } from 'src/interfaces/EPlayer'
import { styled } from '@mui/material/styles'
import { grey } from '@mui/material/colors'
import calculateDuoTilesToGo from 'src/calculateDuoTilesToGo'
import GameModal from 'src/GameModal/Duo'

const StyledContainer = styled(Grid)(({ theme }) => ({
  color: grey[100],
  textAlign: 'center',
  height: '5vh',
  flexGrow: 0
}))

interface IStart {
  boardId: string
  wordsId: string
  words: string[][]
  boardPlayerA: Array<EType[]>
  boardPlayerB: Array<EType[]>
  gameStateA: string
  gameStateB: string
  tokenState: string
  flatBoard: string
}

const getCurrentUrl = () => new URL(`${process.env.APP_URL}/game/duo`)

const editGameState = (gameState: string, orderId: number): string => {
  const gameStateList = gameState.split('')
  gameStateList[orderId] = '1'
  return gameStateList.join('')
}

// eslint-disable-next-line react/prop-types
const Game = ({
  boardId,
  wordsId,
  words,
  boardPlayerA,
  boardPlayerB,
  gameStateA,
  gameStateB,
  tokenState,
  flatBoard
}: IStart) => {
  const getChangeGameStateUrl = (lineId: number, wordId: number, player: EPlayer): string => {
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
    url.searchParams.set('board', boardId)
    url.searchParams.set('words', wordsId)
    url.searchParams.set('gameState', gameStateList.join(','))
    url.searchParams.set('tokenState', tokenState)
    return url.toString()
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

  const { tilesLeft, assassin } = calculateDuoTilesToGo(flatBoard, gameStateA, gameStateB)

  return (
    <Grid container
          spacing={1}
          direction="row"
          alignItems="stretch"
    >
      <GameModal tilesLeft={tilesLeft} assassin={assassin} />
      <Grid item xs={11} style={{ height: '95vh' }}>
        <Board
          words={words}
          boardPlayerA={boardPlayerA}
          boardPlayerB={boardPlayerB}
          gameStateA={gameStateA}
          gameStateB={gameStateB}
          getChangeGameStateUrl={getChangeGameStateUrl}
        />
      </Grid>
      <Grid item xs={1} style={{ textAlign: 'center', height: '95vh' }}>
        <TokenList tokenState={tokenState} updateTokenState={updateTokenState} />
      </Grid>
      <StyledContainer container item xs={12}>
        <Grid item xs={3}>
          <Typography variant="h6">
            There is <b>{tilesLeft}</b> agent{tilesLeft > 1 && 's'} to go
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <ButtonGroup size="small" variant="text">
            <Button href={`${process.env.APP_URL}/game/duo/new`}>New Game</Button>
            <Button href={`${process.env.APP_URL}`}>Back to start</Button>
          </ButtonGroup>
        </Grid>
      </StyledContainer>
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
  const { boardPlayerA, boardPlayerB, decodedId: flatBoard } = dataBoard

  return {
    props: {
      boardId,
      wordsId,
      words,
      boardPlayerA: boardPlayerA,
      boardPlayerB: boardPlayerB,
      gameStateA,
      gameStateB,
      tokenState,
      flatBoard
    }
  }
}

export default Game
