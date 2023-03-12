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
  const playerColor = EPlayer.A === player ? EType.Red : EType.Blue
  return (
    <KeyCard
      text={(
        <>
        <ul style={{ padding: 5, margin: '5px 0' }}>
          <li>Nie pokazuj <i>karty klucz</i> partnerowi.</li>
          <li>Pomóż partnerowi odgadnąć zielone pola z twojej <i>karty klucz</i>.</li>
          <li>Partner musi omijać czarne pola.</li>
          <li><b>Podpowiedź</b>: Najlepiej podawaj hasła, które kojarzą się z więcej niż jednym słowem.</li>
        </ul>
        <ul style={{ padding: 5, margin: '5px 0' }}>
          <li>
            Ty odpowiadaj klikając
            &nbsp;<StyledTeamChip $team={playerColor} label={`Guzik ${String(player).toUpperCase()}`} />
          </li>
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
