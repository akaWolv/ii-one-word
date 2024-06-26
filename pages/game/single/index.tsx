import React from 'react'
import type { GetServerSideProps } from 'next'
import { EType } from 'src/interfaces/EType'
import Board from 'src/Board/Single'
import { ETeam } from 'src/interfaces/ETeam'
import calculateSingleTilesToGo from 'src/calculateSingleTilesToGo'
import TokenList from 'src/Board/TokenList'
import Menu from 'src/GameBottomBar/Menu'
import GameBoard from 'src/GameBoard'
import GameEnd from 'src/GameEnd/Single'
import AgentsLeftInfo from 'src/AgentsLeftInfo'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

interface Props {
  boardId: string
  wordsId: string
  words: string[][]
  board: Array<EType[]>
  flatBoard: string
  gameState: string
  tokenState: string
  isLastChanceUsed: boolean
}

const getCurrentUrl = () => new URL(`${publicRuntimeConfig.APP_URL}/game/single`)

const Game = ({
  boardId,
  wordsId,
  words,
  board,
  flatBoard,
  gameState,
  tokenState,
  isLastChanceUsed
}: Props) => {
  const getLastChanceUsedUrl = (): string => {
    const url = getCurrentUrl()
    url.searchParams.set('board', boardId)
    url.searchParams.set('words', wordsId)
    url.searchParams.set('gameState', gameState)
    url.searchParams.set('tokenState', tokenState)
    url.searchParams.set('isLastChanceUsed', '1')
    return url.toString()
  }

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
    tilesTotal,
    tilesLeft,
    assassin
  } = calculateSingleTilesToGo(flatBoard, gameState)

  return <GameBoard
    board={
      <Board
        words={words}
        board={board}
        gameState={gameState}
        getChangeGameStateUrl={getChangeGameStateUrl}
      />
    }
    tokenList={
      <TokenList
        tokenState={tokenState}
        getUpdateTokenStateUrl={getUpdateTokenStateUrl}
        getLastChanceUsedUrl={getLastChanceUsedUrl}
      />
    }
    bottomBar={
      <>
        <Menu newGameUrl="/game/single/new" />
        <AgentsLeftInfo tilesTotal={tilesTotal} tilesLeft={tilesLeft} team={ETeam.Green} />
      </>
    }
    gameEnd={<GameEnd tilesLeft={tilesLeft} assassin={assassin} isLastChanceUsed={isLastChanceUsed} gameType='single' />}
  />
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
  res
}) => {
  const {
    board: boardId,
    words: wordsId,
    gameState,
    tokenState,
    isLastChanceUsed
  } = query
  if (!boardId || !wordsId || !gameState || !tokenState) {
    res.writeHead(307, { Location: '/game/single/new' })
    res.end()

    return { props: {} }
  }

  // get Words
  const resWords = await fetch(`${publicRuntimeConfig.APP_URL}/api/words/${wordsId}`)
  const dataWords = await resWords.json()
  if (!dataWords) {
    return {
      notFound: true
    }
  }
  const { words } = dataWords

  // get Board
  const resBoard = await fetch(`${publicRuntimeConfig.APP_URL}/api/boards/single/${boardId}`)
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
      tokenState,
      isLastChanceUsed: Boolean(Number(isLastChanceUsed || '0'))
    }
  }
}

export default Game
