import React from 'react'
import type { GetServerSideProps } from 'next'
import { EPlayer } from 'src/interfaces/EPlayer'
import PrepareView from 'src/Prepare/Prepare'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const INITIAL_GAME_STATE = '0000000000000000000000000,0000000000000000000000000'
const INITIAL_TOKEN_STATE = '111111111'

interface Props {
  boardId: string
  wordsId: string
}

const getBoardLink = (boardId: string, player: EPlayer): string => {
  const url = new URL(`${publicRuntimeConfig.APP_URL}/keycard/duo/${boardId}`)
  url.searchParams.set('player', player)
  return url.toString()
}

const Prepare = ({ boardId, wordsId }: Props) => {
  const getStartLink = (tabletMode: boolean): string => {
    const startLink = new URL(`${publicRuntimeConfig.APP_URL}/game/duo`)
    startLink.searchParams.set('board', boardId)
    startLink.searchParams.set('words', wordsId)
    startLink.searchParams.set('gameState', INITIAL_GAME_STATE)
    startLink.searchParams.set('tokenState', INITIAL_TOKEN_STATE)
    startLink.searchParams.set('tabletMode', String(Number(tabletMode)))
    return startLink.toString()
  }

  return <PrepareView
    gameName='Duo - Kooperacja'
    playerAKeyCardLink={getBoardLink(boardId, EPlayer.A)}
    playerBKeyCardLink={getBoardLink(boardId, EPlayer.B)}
    startLink={getStartLink(false)}
    tabletModeLink={getStartLink(true)}
  />
}

export const getServerSideProps: GetServerSideProps = async ({ query, res }) => {
  const { board: boardId, words: wordsId } = query
  if (!boardId || !wordsId) {
    res.writeHead(307, { Location: '/game/duo/new' })
    res.end()
    return { props: {} }
  }

  return {
    props: { boardId, wordsId }
  }
}

export default Prepare
