import React from 'react'
import router from 'next/router'
import { EType } from '../interfaces/EType'
import { StyledButton } from './SingleClick.styled'
import TypeTileContent from '../Board/TypeTileContent'

interface Props {
  lineId: number
  wordId: number
  word: string
  board: Array<EType[]>
  gameState: string
  getChangeGameStateUrl: Function
}

const Tile = ({
  lineId,
  wordId,
  word,
  board,
  gameState,
  getChangeGameStateUrl
}: Props) => {
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
    return <StyledButton disabled={true} _type={type}><TypeTileContent type={type} /></StyledButton>
  }
}

export default Tile
