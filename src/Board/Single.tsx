import React from 'react'
import router from 'next/router'
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
  getChangeGameStateUrl: Function
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
  getChangeGameStateUrl: Function
}
const Tile = ({ lineId, wordId, word, board, gameState, getChangeGameStateUrl }: ITile) => {
  const orderId = lineId * 5 + wordId
  const state = gameState[orderId]
  const getPickTileUrl = (): string => {
    const gameStateList = gameState.split('')
    gameStateList[orderId] = '1'
    return getChangeGameStateUrl(gameStateList.join(''))
  }
  if (state === '0') {
    const pickTilUrl = getPickTileUrl()
    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault()
      router.push(pickTilUrl)
    }
    return <StyledButton href={pickTilUrl} onClick={handleClick}>{word}</StyledButton>
  } else {
    const type: EType = board[lineId][wordId]
    return <StyledButton disabled={true} _type={type}><TypeIcon type={type} /></StyledButton>
  }
}

// eslint-disable-next-line react/prop-types
const Board = ({ words, board, gameState, getChangeGameStateUrl }: IWords) => {
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
                  getChangeGameStateUrl={getChangeGameStateUrl}
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
