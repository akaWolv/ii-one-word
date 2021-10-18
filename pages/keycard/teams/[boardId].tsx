import React from 'react'
import type { GetServerSideProps } from 'next'
import { EType } from 'src/interfaces/EType'
import KeyCard from 'src/KeyCard'
import { Typography } from '@mui/material'
import getTileColorByType from 'src/getTileColorByType'

interface IStart {
  board: Array<EType[]>
  starting: EType.Red | EType.Blue
  team: EType.Red | EType.Blue
}

// eslint-disable-next-line react/prop-types
const TeamKeyCard = ({ starting, board, team }: IStart) => {
  return <>
    <div style={{ width: '100vw', height: '90vh' }}>
      <KeyCard board={board} />
    </div>
    <div style={{ width: '100vw', height: '10vh' }}>
      <Typography
        variant="h6"
        style={{ color: 'white', textAlign: 'center' }}>
        You are <span style={{ color: getTileColorByType(team) }}>
          {team === EType.Red ? 'Red' : 'Blue'}
        </span> {team === starting ? 'and' : 'but'} <span style={{ color: getTileColorByType(starting) }}>
          {starting === EType.Red ? 'Red' : 'Blue'}
        </span> starts
      </Typography>
    </div>
  </>
}

export const getServerSideProps: GetServerSideProps = async ({ params, query, res }) => {
  const { team } = query
  // @ts-ignore
  const { boardId } = params
  if (!boardId) {
    res.writeHead(307, { Location: '/game/teams/new' })
    res.end()

    return { props: {} }
  }

  // get Board
  const resBoard = await fetch(`${process.env.APP_URL}/api/boards/teams/${boardId}`)
  const dataBoard = await resBoard.json()
  const { starting, board } = dataBoard

  return {
    props: { board, starting, team }
  }
}

export default TeamKeyCard
