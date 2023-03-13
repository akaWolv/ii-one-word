import React from 'react'
import { StyledUpsideDownWord, StyledWord } from './TileContent.styled'

interface Props {
  word: string
  withUpsideDownWord: boolean
}

const TileContent = ({
  word,
  withUpsideDownWord
}: Props) => {
  return (
    <>
      <StyledUpsideDownWord>{withUpsideDownWord ? word : <span>&nbsp;</span>}</StyledUpsideDownWord>
      <StyledWord variant="caption">{word}</StyledWord>
    </>
  )
}

export default TileContent
