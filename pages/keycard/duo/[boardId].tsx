import React from 'react'
import type { GetServerSideProps } from 'next'
import { EType } from 'src/interfaces/EType'
import { EPlayer } from 'src/interfaces/EPlayer'
import KeyCard from 'src/KeyCard'
import { StyledTeamChip } from 'src/KeyCard/KeyCard.styled'

interface Props {
  board: Array<EType[]>
  player: EPlayer.A | EPlayer.B
}

const PlayerKeyCard = ({
  board,
  player
}: Props) => {
  return (
    <KeyCard
      text={(
        <>
          <ul>
            <li>This key card is for your eyes only.</li>
            <li>You are <StyledTeamChip $team={EType.Green} label={`Player ${String(player).toUpperCase()}`} /></li>
            <li>Use it to provide tips for your partner.</li>
            <li>Discover all green fields.</li>
            <li>You have to avoid black tiles.</li>
          </ul>
        </>
      )}
      board={board}
    />
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  query,
  res
}) => {
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
  const {
    boardPlayerA,
    boardPlayerB
  } = dataBoard

  return {
    props: {
      board: player === EPlayer.A ? boardPlayerB : boardPlayerA,
      player
    }
  }
}

export default PlayerKeyCard
