import React from 'react'
import type { GetServerSideProps } from 'next'
import { EType } from 'src/interfaces/EType'
import Board from 'src/Board/Teams'
import { ETeam } from 'src/interfaces/ETeam'
import calculateTeamsTilesToGo from 'src/calculateTeamsTilesToGo'
import Menu from 'src/GameBottomBar/Menu'
import GameBoard from 'src/GameBoard'
import GameEnd from 'src/GameEnd/Teams'
import AgentsLeftInfo from 'src/AgentsLeftInfo'

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
    redTeamTilesTotal,
    blueTeamTilesTotal,
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
        <AgentsLeftInfo tilesTotal={redTeamTilesTotal} tilesLeft={redTeamTilesLeft} team={ETeam.Red} />
        <Menu newGameUrl="/game/teams/new" />
        <AgentsLeftInfo tilesTotal={blueTeamTilesTotal} tilesLeft={blueTeamTilesLeft} team={ETeam.Blue} />
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
