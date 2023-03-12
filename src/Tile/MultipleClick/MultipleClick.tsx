import React from 'react'
import router from 'next/router'
import { EType } from 'src/interfaces/EType'
import { EPlayer } from 'src/interfaces/EPlayer'
import { EPicked } from 'src/interfaces/EPicked'
import { CardContent } from '@mui/material'
import { StyledButton, StyledCard, StyledCardContent, StyledButtonContainer } from './MultipleClick.styled'
import TileContent from './TileContent'
import TypeTileContent from 'src/Board/TypeTileContent'

interface Props {
  lineId: number
  wordId: number
  word: string
  boardPlayerA: Array<EType[]>
  boardPlayerB: Array<EType[]>
  gameStateA: string
  gameStateB: string
  getChangeGameStateUrl: Function
  withUpsideDownWord: boolean
}

const Tile = ({
  lineId,
  wordId,
  word,
  boardPlayerA,
  boardPlayerB,
  gameStateA,
  gameStateB,
  getChangeGameStateUrl,
  withUpsideDownWord
}: Props) => {
  const orderId = lineId * 5 + wordId
  const stateA = gameStateA[orderId]
  const stateB = gameStateB[orderId]
  const stateBoardForPlayerA = boardPlayerA[lineId][wordId]
  const stateBoardForPlayerB = boardPlayerB[lineId][wordId]

  const pickTilePlayerAUrl = getChangeGameStateUrl(lineId, wordId, EPlayer.A, stateBoardForPlayerA)
  const pickTilePlayerBUrl = getChangeGameStateUrl(lineId, wordId, EPlayer.B, stateBoardForPlayerB)

  const handleClickPlayerA = (e: React.MouseEvent) => {
    e.preventDefault()
    router.push(pickTilePlayerAUrl)
  }
  const handleClickPlayerB = (e: React.MouseEvent) => {
    e.preventDefault()
    router.push(pickTilePlayerBUrl)
  }

  const renderPickedTile = (type: EType, player?: EPlayer) => <StyledCard _type={type}>
    <StyledCardContent>
        <TypeTileContent type={type} player={player} />
    </StyledCardContent>
  </StyledCard>

  if (stateA === '1' && stateBoardForPlayerA !== EType.Neutral) {
    return renderPickedTile(stateBoardForPlayerA, EPlayer.A)
  }

  if (stateB === '1' && stateBoardForPlayerB !== EType.Neutral) {
    return renderPickedTile(stateBoardForPlayerB, EPlayer.B)
  }

  if (stateA === '1' && stateB === '1') {
    return renderPickedTile(EType.Neutral)
  }

  return <StyledCard>
    <CardContent style={{ padding: 0, flexGrow: 2 }}>
      <TileContent word={word} withUpsideDownWord={withUpsideDownWord} />
    </CardContent>
    <StyledButtonContainer>
      <StyledButton
        variant='outlined'
        href={pickTilePlayerAUrl}
        onClick={handleClickPlayerA}
        disabled={stateA === '1'}
        style={{ float: 'left' }}
        _picked={stateA === '1' ? EPicked.Yes : EPicked.No}
        _player={EPlayer.A}
      >
        A
      </StyledButton>
      <StyledButton
        variant='outlined'
        href={pickTilePlayerBUrl}
        onClick={handleClickPlayerB}
        style={{ float: 'right' }}
        disabled={stateB === '1'}
        _picked={stateB === '1' ? EPicked.Yes : EPicked.No}
        _player={EPlayer.B}
      >
        B
      </StyledButton>
    </StyledButtonContainer>
  </StyledCard>
}

export default Tile
