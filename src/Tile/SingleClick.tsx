import React from 'react'
import router from 'next/router'
import { EType } from '../interfaces/EType'
import TypeIcon from '../Board/TypeIcon'
import { styled } from '@mui/material/styles'
import { Button } from '@mui/material'
import getTileColorByType from '../getTileColorByType'
import { grey, pink } from '@mui/material/colors'

interface ITile {
  lineId: number
  wordId: number
  word: string
  board: Array<EType[]>
  gameState: string
  getChangeGameStateUrl: Function
}

const StyledButton = styled(Button)<{ _type?: EType }>(({
  _type,
  theme
}) => ({
  backgroundColor: _type ? getTileColorByType(_type) : pink[50],
  padding: 1,
  width: '100%',
  height: '100%',
  fontSize: 25,
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: grey[50],
    cursor: 'pointer'
  }
}))

// eslint-disable-next-line react/prop-types
const Tile = ({
  lineId,
  wordId,
  word,
  board,
  gameState,
  getChangeGameStateUrl
}: ITile) => {
  const orderId = lineId * 5 + wordId
  const state = gameState[orderId]
  const getPickTileUrl = (): string => {
    const gameStateList = gameState.split('')
    gameStateList[orderId] = '1'
    return getChangeGameStateUrl(gameStateList.join(''))
  }
  if (state === '0') {
    const pickTileUrl = getPickTileUrl()
    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault()
      router.push(pickTileUrl)
    }
    return <StyledButton href={pickTileUrl} onClick={handleClick}>{word}</StyledButton>
  } else {
    const type: EType = board[lineId][wordId]
    return <StyledButton disabled={true} _type={type}><TypeIcon type={type} /></StyledButton>
  }
}

export default Tile
