import React from 'react'
import type { GetServerSideProps } from 'next'
import { EType } from 'src/interfaces/EType'
import KeyCard from 'src/KeyCard'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

interface Props {
  board: Array<EType[]>
}

const PlayerKeyCard = ({ board }: Props) => {
  return (
    <KeyCard
      text={(
        <ul style={{ padding: 5, margin: '5px 0' }}>
          <li>Tylko Ty możesz oglądać <i>kartę klucz</i>.</li>
          <li>Użyj jej, aby nakierować swoj zespoł na właściwe hasła.</li>
          <li>Odkryjcie wszystkie zielone karty.</li>
          <li>Omijajcie czarne pole.</li>
          <li><b>Podpowiedź</b>: Najlepiej podawaj hasła, które kojarzą się z więcej niż jednym słowem.</li>
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
  const resBoard = await fetch(`${publicRuntimeConfig.APP_URL}/api/boards/single/${boardId}`)
  const { board } = await resBoard.json()

  return {
    props: {
      board
    }
  }
}

export default PlayerKeyCard
