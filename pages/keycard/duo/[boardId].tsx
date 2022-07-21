import React from 'react'
import type { GetServerSideProps } from 'next'
import { EType } from 'src/interfaces/EType'
import KeyCard from 'src/KeyCard'
import { Typography } from '@mui/material'
import { EPlayer } from 'src/interfaces/EPlayer'
import getPlayerColor from 'src/getPlayerColor'

interface IStart {
  board: Array<EType[]>
  player: EPlayer.A | EPlayer.B
}

// eslint-disable-next-line react/prop-types
const PlayerKeyCard = ({ board, player }: IStart) => {
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
        You are <span style={{ textTransform: 'uppercase', color: getPlayerColor(player) }}>Player {player}</span>
      </Typography>
      <Typography variant='h6' style={{ color: 'white', textAlign: 'center', fontSize: '0.8em' }}>
        This is board for other player to guess
      </Typography>
    </div>
  </>
}

export const getServerSideProps: GetServerSideProps = async ({ params, query, res }) => {
  const { player } = query
  // @ts-ignore
  const { boardId } = params
  if (!boardId) {
    res.writeHead(307, { Location: '/game/duo/new' })
    res.end()

    return { props: {} }
  }

  // get Board
  const resBoard = await fetch(`${process.env.APP_URL}/api/boards/duo/${boardId}`)
  const dataBoard = await resBoard.json()
  const { boardPlayerA, boardPlayerB } = dataBoard

  return {
    props: {
      board: player === EPlayer.A ? boardPlayerB : boardPlayerA,
      player
    }
  }
}

export default PlayerKeyCard
