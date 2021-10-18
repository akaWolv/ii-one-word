import React from 'react'
import { styled } from '@mui/material/styles'
import { grey } from '@mui/material/colors'
import Card from '@mui/material/Card'
import { Button, CardActions, CardContent, Typography } from '@mui/material'
import { EType } from 'src/interfaces/EType'
import getTileColorByType from 'src/getTileColorByType'
import getPlayerColor from 'src/getPlayerColor'
import { EPlayer } from 'src/interfaces/EPlayer'
import TypeIcon from 'src/Board/TypeIcon'

enum EPicked {
  Yes = '1',
  No = '0'
}

interface IWords {
  words: string[][]
  boardPlayerA: Array<EType[]>
  boardPlayerB: Array<EType[]>
  gameStateA: string
  gameStateB: string
  changeGameState: Function
}

const StyledCard = styled(Card)<{ _type?: EType }>(({ _type }) => ({
  backgroundColor: _type ? getTileColorByType(_type) : grey[50],
  width: '100%',
  height: '100%',
  fontSize: 25
}))

const StyledButton = styled(Button)<{ _picked: EPicked, _player: EPlayer }>(({ _picked, _player }) => ({
  backgroundColor: _picked === EPicked.Yes ? getTileColorByType(EType.Neutral) : 'inherit',
  color: getPlayerColor(_player)
}))

interface ITile {
  lineId: number
  wordId: number
  word: string
  boardPlayerA: Array<EType[]>
  boardPlayerB: Array<EType[]>
  gameStateA: string
  gameStateB: string
  changeGameState: Function
}

const Tile = ({ lineId, wordId, word, boardPlayerA, boardPlayerB, gameStateA, gameStateB, changeGameState }: ITile) => {
  const orderId = lineId * 5 + wordId
  const stateA = gameStateA[orderId]
  const stateB = gameStateB[orderId]
  const stateBoardForPlayerA = boardPlayerB[lineId][wordId]
  const stateBoardForPlayerB = boardPlayerA[lineId][wordId]

  const handlePickTilePlayerA = () => changeGameState(lineId, wordId, EPlayer.A, stateBoardForPlayerA)
  const handlePickTilePlayerB = () => changeGameState(lineId, wordId, EPlayer.B, stateBoardForPlayerB)

  const renderPickedTile = (type: EType) => <StyledCard _type={type}>
    <CardContent>
      <Typography
        variant="caption"
        display="block"
        style={{ marginTop: '15%', textAlign: 'center', fontSize: 25, textTransform: 'uppercase' }}
      >
        <TypeIcon type={type} />
      </Typography>
    </CardContent>
  </StyledCard>

  if (stateA === '1' && stateBoardForPlayerA !== EType.Neutral) {
    return renderPickedTile(stateBoardForPlayerA)
  }

  if (stateB === '1' && stateBoardForPlayerB !== EType.Neutral) {
    return renderPickedTile(stateBoardForPlayerB)
  }

  if (stateA === '1' && stateB === '1') {
    return renderPickedTile(EType.Neutral)
  }

  return <StyledCard>
    <CardContent>
      <Typography
        variant="caption"
        display="block"
        style={{ textAlign: 'center', fontSize: 25, marginTop: 10, textTransform: 'uppercase' }}
      >
        {word}
      </Typography>
    </CardContent>
    <CardActions style={{ justifyItems: 'stretch', justifyContent: 'space-evenly' }}>
      <StyledButton
        size="small"
        onClick={handlePickTilePlayerA}
        disabled={stateA === '1'}
        _picked={stateA === '1' ? EPicked.Yes : EPicked.No}
        _player={EPlayer.A}
      >
        Player A
      </StyledButton>
      <StyledButton
        size="small"
        onClick={handlePickTilePlayerB}
        disabled={stateB === '1'}
        _picked={stateB === '1' ? EPicked.Yes : EPicked.No}
        _player={EPlayer.B}
      >
        Player B
      </StyledButton>
    </CardActions>
  </StyledCard>
}

// eslint-disable-next-line react/prop-types
const Board = ({ words, boardPlayerA, boardPlayerB, gameStateA, gameStateB, changeGameState }: IWords) => {
  return <table style={{ tableLayout: 'fixed', width: '100%', height: '100%', borderSpacing: '5px' }}>
    <tbody>
    {
      words.map((line, lineId) => (
        <tr key={encodeURIComponent(line.join(''))}>
          {
            line.map((word, wordId) => (
              <td key={`${lineId}-${wordId}`}>
                <Tile
                  lineId={lineId}
                  wordId={wordId}
                  word={word}
                  boardPlayerA={boardPlayerA}
                  boardPlayerB={boardPlayerB}
                  gameStateA={gameStateA}
                  gameStateB={gameStateB}
                  changeGameState={changeGameState}
                />
              </td>
            ))
          }
        </tr>
      ))
    }
    </tbody>
  </table>
}

export default Board
