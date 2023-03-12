import React from 'react'
import type { GetServerSideProps } from 'next'
import { EType } from 'src/interfaces/EType'
import KeyCard from 'src/KeyCard'

interface Props {
  board: Array<EType[]>
}

const PlayerKeyCard = ({ board }: Props) => {
  return (
    <KeyCard
      text={(
        <ul>
          <li>This key card is for your eyes only. </li>
          <li>Use it to provide tips for your team. </li>
          <li>Discover all green fields.</li>
          <li>You have to avoid black tiles.</li>
        </ul>
      )}
      board={board}
    />
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  res
}) => {
  // @ts-ignore
  const { boardId } = params
  if (!boardId) {
    res.writeHead(307, { Location: '/game/single/new' })
    res.end()

    return { props: {} }
  }

  // get Board
  const resBoard = await fetch(`${process.env.APP_URL}/api/boards/single/${boardId}`)
  const { board } = await resBoard.json()

  return {
    props: {
      board
    }
  }
}

export default PlayerKeyCard
