import React from 'react'
import { EType } from '../interfaces/EType'
import { EPlayer } from '../interfaces/EPlayer'
import { EPicked } from '../interfaces/EPicked'
import TypeIcon from '../Board/TypeIcon'
import { styled } from '@mui/material/styles'
import { alpha, Button, CardActions, CardContent, Typography } from '@mui/material'
import { grey, pink } from '@mui/material/colors'
import Card from '@mui/material/Card'
import getTileColorByType from '../getTileColorByType'
import getPlayerColor from '../getPlayerColor'
import router from 'next/router'

const StyledCard = styled(Card)<{ _type?: EType }>(({ _type }) => ({
  backgroundColor: _type ? getTileColorByType(_type) : grey[800],
  color: grey[300],
  width: '100%',
  height: '100%',
  fontSize: 25
}))

const StyledCardContent = styled(Card)({
  padding: 38,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  backgroundColor: 'transparent'
})

const StyledButton = styled(Button)<{ _picked: EPicked, _player: EPlayer }>(({ _picked, _player }) => ({
  backgroundColor: _picked === EPicked.Yes
    ? getTileColorByType(EType.Neutral)
    : alpha(getPlayerColor(_player), 0.6),
  color: grey[100],
  padding: 0,
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: getPlayerColor(_player),
    color: grey[50],
    cursor: 'pointer'
  }
}))

interface ITile {
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
}: ITile) => {
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
        <TypeIcon type={type} player={player} />
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
    <CardContent style={{ height: '75%', paddingBottom: 0 }}>
        <Typography sx={{
          fontSize: '0.8em',
          fontWeight: 400,
          color: pink[200],
          textAlign: 'right',
          transform: 'scale(-1, -1)'
        }}>
          { withUpsideDownWord ? word : <span>&nbsp;</span> }
        </Typography>

      <Typography
        variant="caption"
        display="block"
        style={{ textAlign: 'center', bottom: 0, fontSize: 25, textTransform: 'uppercase' }}
      >
        {word}
      </Typography>
    </CardContent>
    <CardActions style={{ height: '23%', justifyItems: 'stretch', justifyContent: 'space-evenly' }}>
      <StyledButton
        variant='contained'
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
        variant='contained'
        href={pickTilePlayerBUrl}
        onClick={handleClickPlayerB}
        style={{ float: 'right' }}
        disabled={stateB === '1'}
        _picked={stateB === '1' ? EPicked.Yes : EPicked.No}
        _player={EPlayer.B}
      >
        B
      </StyledButton>
    </CardActions>
  </StyledCard>
}

export default Tile
