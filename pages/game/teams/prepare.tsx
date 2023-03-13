import React from 'react'
import type { GetServerSideProps } from 'next'
import { EType } from 'src/interfaces/EType'
import PrepareView from 'src/Prepare/Prepare'

const INITIAL_GAME_STATE = '0000000000000000000000000'

interface Props {
  boardId: string
  wordsId: string
}

const getBoardLink = (boardId: string, team: EType.Red | EType.Blue): string => {
  const url = new URL(`${process.env.APP_URL}/keycard/teams/${boardId}`)
  url.searchParams.set('team', team)
  return url.toString()
}

const Prepare = ({ boardId, wordsId }: Props) => {
  const getStartLink = (): string => {
    // redirect to prepare
    const startLink = new URL(`${process.env.APP_URL}/game/teams`)
    startLink.searchParams.set('board', boardId)
    startLink.searchParams.set('words', wordsId)
    startLink.searchParams.set('gameState', INITIAL_GAME_STATE)
    return startLink.toString()
  }
  return <PrepareView
    gameName='Czerwoni kontra Niebiescy'
    redKeyCardLink={getBoardLink(boardId, EType.Red)}
    blueKeyCardLink={getBoardLink(boardId, EType.Blue)}
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
