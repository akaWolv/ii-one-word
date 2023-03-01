import React from 'react'
import type { GetServerSideProps } from 'next'
import { alpha, Avatar, Chip } from '@mui/material'
import { grey } from '@mui/material/colors'
import { EType } from 'src/interfaces/EType'
import Board from 'src/Board/Teams'
import { ETeam } from 'src/interfaces/ETeam'
import getTeamColor from 'src/getTeamColor'
import calculateTeamsTilesToGo from 'src/calculateTeamsTilesToGo'
import Menu from 'src/GameBottomBar/Menu'
import GameBoard from 'src/GameBoard'
import { Hail } from '@mui/icons-material'
import GameEnd from 'src/GameEnd/Teams'

interface Props {
  boardId: string
  wordsId: string
  words: string[][]
  board: Array<EType[]>
  flatBoard: string
  gameState: string
  starting: ETeam
}

const url = new URL(`${process.env.APP_URL}/game/teams`)
const Game = ({
  boardId,
  wordsId,
  words,
  board,
  flatBoard,
  gameState,
  starting
}: Props) => {
  const getChangeGameStateUrl = (gameState: string) => {
    url.searchParams.set('board', boardId)
    url.searchParams.set('words', wordsId)
    url.searchParams.set('gameState', gameState)
    return url.toString()
  }

  const {
    redTeamTilesLeft,
    blueTeamTilesLeft,
    assassin
  } = calculateTeamsTilesToGo(flatBoard, gameState, starting)

  return <GameBoard
    board={
      <Board
        words={words}
        board={board}
        gameState={gameState}
        getChangeGameStateUrl={getChangeGameStateUrl}
      />
    }
    bottomBar={
      <>
        <Chip
          style={{ backgroundColor: getTeamColor(ETeam.Red) }}
          avatar={<Avatar style={{
            backgroundColor: alpha(grey[50], 0.1),
            color: grey[50],
            fontWeight: 'bold'
          }}>{redTeamTilesLeft}</Avatar>}
          deleteIcon={<Hail style={{ color: grey[50] }} />}
          label={`Agent${redTeamTilesLeft > 1 ? 's' : ''} yet to discover`}
          onDelete={() => {
          }}
        />
        <Menu newGameUrl="/game/teams/new" />
        <Chip
          style={{ backgroundColor: getTeamColor(ETeam.Blue) }}
          avatar={<Avatar style={{
            backgroundColor: alpha(grey[50], 0.1),
            color: grey[50],
            fontWeight: 'bold'
          }}>{blueTeamTilesLeft}</Avatar>}
          deleteIcon={<Hail style={{ color: grey[50] }} />}
          label={`Agent${blueTeamTilesLeft > 1 ? 's' : ''} yet to discover`}
          onDelete={() => {
          }}
        />
      </>
    }
    gameEnd={<GameEnd redTeamTilesLeft={redTeamTilesLeft} blueTeamTilesLeft={blueTeamTilesLeft} assassin={assassin} />}
  />
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
      boardId,
      wordsId,
      words,
      board,
      flatBoard,
      gameState,
      starting
    }
  }
}

export default Game
