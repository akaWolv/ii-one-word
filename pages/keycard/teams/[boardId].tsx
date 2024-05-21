import React from 'react'
import type { GetServerSideProps } from 'next'
import { EType } from 'src/interfaces/EType'
import KeyCard from 'src/KeyCard'
import { StyledTeamChip } from 'src/KeyCard/KeyCard.styled'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

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
        <ul style={{
          padding: 5,
          margin: '5px 0'
        }}>
          <li>Tylko Ty możesz oglądać <i>kartę klucz</i>.</li>
          <li>Użyj jej, aby nakierować swój zespoł na właściwe hasła.</li>
          <li>
            Jesteś w drużynie {team === EType.Red ? 'Czerwonych' : 'Niebieskich'}.
            Odkryjcie wszystkie
            &nbsp;<StyledTeamChip team={team} label={team === EType.Red ? 'czerwone' : 'niebieskie'} />&nbsp;
            karty.
          </li>
          <li>Omijaj czarną kartę!</li>
          <li>
            {
              starting === team
                ? <b>Twoja drużyna zaczyna!</b>
                : 'Drużyna przeciwna zaczyna.'
            }
          </li>
          <li><b>Podpowiedź</b>: Najlepiej podawaj hasła, które kojarzą się z więcej niż jednym słowem.</li>
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
  const resBoard = await fetch(`${publicRuntimeConfig.APP_URL}/api/boards/teams/${boardId}`)
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
