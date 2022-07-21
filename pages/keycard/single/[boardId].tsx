import React from 'react'
import type { GetServerSideProps } from 'next'
import { EType } from 'src/interfaces/EType'
import KeyCard from 'src/KeyCard'
import { Typography } from '@mui/material'

interface IStart {
  board: Array<EType[]>
}

// eslint-disable-next-line react/prop-types
const PlayerKeyCard = ({ board }: IStart) => {
  return <>
    <Typography
      variant="h6"
      style={{ color: 'white', textAlign: 'center', marginTop: 10 }}>
      Key Card
    </Typography>
    <div style={{ width: '80vw', margin: '10px 10vw' }}>
      <KeyCard board={board} />
    </div>
    <div style={{ width: '100vw', height: '10vh' }}>
      <Typography
        variant="h6"
        style={{ color: 'white', textAlign: 'center' }}>
        This is board for 1 Team gameplay
      </Typography>
    </div>
  </>
}

export const getServerSideProps: GetServerSideProps = async ({ params, query, res }) => {
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
