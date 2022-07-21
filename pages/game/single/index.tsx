import React from 'react'
import type { GetServerSideProps } from 'next'
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
import Menu from 'src/GameBottomBar/Menu'

interface IGame {
  boardId: string
  wordsId: string
  words: string[][]
  board: Array<EType[]>
  flatBoard: string
  gameState: string
  tokenState: string
}

const StyledBoardContainer = styled(Grid)(({ theme }) => ({
  textAlign: 'center',
  height: '95vh',
  flexGrow: 0
}))
const StyledBottomBar = styled(Grid)(({ theme }) => ({
  color: grey[100],
  textAlign: 'center',
  height: '5vh',
  flexGrow: 0
}))

const getCurrentUrl = () => new URL(`${process.env.APP_URL}/game/single`)

// eslint-disable-next-line react/prop-types
const Game = ({ boardId, wordsId, words, board, flatBoard, gameState, tokenState }: IGame) => {
  const getChangeGameStateUrl = (gameState: string): string => {
    const url = getCurrentUrl()
    url.searchParams.set('board', boardId)
    url.searchParams.set('words', wordsId)
    url.searchParams.set('gameState', gameState)
    url.searchParams.set('tokenState', tokenState)
    return url.toString()
  }

  const getUpdateTokenStateUrl = (): string => {
    const url = getCurrentUrl()

    url.searchParams.set('board', boardId)
    url.searchParams.set('words', wordsId)
    url.searchParams.set('gameState', gameState)

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
    return url.toString()
  }

  const {
    tilesLeft,
    assassin
  } = calculateSingleTilesToGo(flatBoard, gameState)

  return (
    <Grid container
          spacing={1}
          direction="row"
          alignItems="center"
    >
      <GameModal tilesLeft={tilesLeft} assassin={assassin} />
      <StyledBoardContainer container item xs={12}>
        <Grid item xs={11}>
          <Board
            words={words}
            board={board}
            gameState={gameState}
            getChangeGameStateUrl={getChangeGameStateUrl}
          />
        </Grid>
        <Grid item xs={1}>
        <TokenList tokenState={tokenState} getUpdateTokenStateUrl={getUpdateTokenStateUrl} />
      </Grid>
      </StyledBoardContainer>
      <StyledBottomBar container item xs={12}>
        <Grid item xs={3}>
          <Typography variant="h6">
            <b>{tilesLeft}</b>&nbsp;<span style={{ color: getTeamColor(ETeam.Green) }}>
            agent{tilesLeft > 1 && 's'}
          </span>&nbsp;yet to discover
          </Typography>
        </Grid>
        <Grid item xs={5}>
        </Grid>
        <Grid item xs={3}>
          <Menu newGameUrl='/game/single/new' />
        </Grid>
      </StyledBottomBar>
    </Grid>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
  res
}) => {
  console.log(query)
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
      boardId,
      wordsId,
      words,
      board,
      flatBoard,
      gameState,
      tokenState
    }
  }
}

export default Game
