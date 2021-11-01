import React from 'react'
import { styled } from '@mui/material/styles'
import { grey } from '@mui/material/colors'
import { EType } from 'src/interfaces/EType'
import { Button } from '@mui/material'
import getTileColorByType from 'src/getTileColorByType'
import TypeIcon from './TypeIcon'

interface IWords {
  words: string[][]
  board: Array<EType[]>
  gameState: string
  changeGameState: Function
}

const StyledButton = styled(Button)<{ _type?: EType }>(({ _type, theme }) => ({
  backgroundColor: _type ? getTileColorByType(_type) : grey[50],
  width: '100%',
  height: '100%',
  fontSize: 25,
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: grey[50],
    cursor: 'pointer'
  }
}))

interface ITile {
  lineId: number
  wordId: number
  word: string
  board: Array<EType[]>
  gameState: string
  changeGameState: Function
}
const Tile = ({ lineId, wordId, word, board, gameState, changeGameState }: ITile) => {
  const orderId = lineId * 5 + wordId
  const state = gameState[orderId]
  const pickTile = () => {
    const gameStateList = gameState.split('')
    gameStateList[orderId] = '1'
    changeGameState(gameStateList.join(''))
  }
  if (state === '0') {
    return <StyledButton onClick={pickTile}>{word}</StyledButton>
  } else {
    const type: EType = board[lineId][wordId]
    return <StyledButton disabled={true} _type={type}><TypeIcon type={type} /></StyledButton>
  }
}

// eslint-disable-next-line react/prop-types
const Board = ({ words, board, gameState, changeGameState }: IWords) => {
  return <table style={{ tableLayout: 'fixed', width: '100%', height: '100%' }}>
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
                  board={board}
                  gameState={gameState}
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
