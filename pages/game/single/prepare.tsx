import React from 'react'
import type { GetServerSideProps } from 'next'
import PrepareView from 'src/Prepare'

const INITIAL_GAME_STATE = '0000000000000000000000000'
const INITIAL_TOKEN_STATE = '11111'

interface Props {
  boardId: string
  wordsId: string
}

const getBoardLink = (boardId: string): string => {
  const url = new URL(`${process.env.APP_URL}/keycard/single/${boardId}`)
  return url.toString()
}

const Prepare = ({ boardId, wordsId }: Props) => {
  const getStartLink = (): string => {
    const startLink = new URL(`${process.env.APP_URL}/game/single`)
    startLink.searchParams.set('board', boardId)
    startLink.searchParams.set('words', wordsId)
    startLink.searchParams.set('gameState', INITIAL_GAME_STATE)
    startLink.searchParams.set('tokenState', INITIAL_TOKEN_STATE)
    return startLink.toString()
  }
  return <PrepareView
    gameName='Pojedynczy Zespół'
    greenKeyCardLink={getBoardLink(boardId)}
    startLink={getStartLink()}
  />
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
