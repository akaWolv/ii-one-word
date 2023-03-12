import React from 'react'
import type { GetServerSideProps } from 'next'
import { EType } from 'src/interfaces/EType'
import KeyCard from 'src/KeyCard'
import { StyledTeamChip } from 'src/KeyCard/KeyCard.styled'

interface Params {
  board: Array<EType[]>
  starting: EType.Red | EType.Blue
  team: EType.Red | EType.Blue
}

const TeamKeyCard = ({
  starting,
  board,
  team
}: Params) => {
  return (
    <KeyCard
      text={(
        <ul>
          <li>This key card is for your eyes only.</li>
          <li>
            Your team is&nbsp;
            <StyledTeamChip $team={team} label={team === EType.Red ? 'Red' : 'Blue'} />
          </li>
          <li>Use it to provide tips for your team.</li>
          <li>Discover all green fields.</li>
          <li>You have to avoid black tile.</li>
          <li>
            Team&nbsp;
            <StyledTeamChip $team={starting} label={starting === EType.Red ? 'Red' : 'Blue'} />
            &nbsp;is starting
          </li>
        </ul>
      )}
      board={board}
      highlightedteam={team}
    />
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  query,
  res
}) => {
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
  const {
    starting,
    board
  } = dataBoard

  return {
    props: {
      board,
      starting,
      team
    }
  }
}

export default TeamKeyCard
