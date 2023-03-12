import { Typography } from '@mui/material'
import React from 'react'
import { StyledUpsideDownWord } from './TileContent.styled'

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
      <StyledUpsideDownWord>
        {withUpsideDownWord ? word : <span>&nbsp;</span>}
      </StyledUpsideDownWord>

      <Typography
        variant="caption"
        display="block"
        style={{
          textAlign: 'center',
          bottom: 0,
          fontSize: '1.5vw',
          textTransform: 'uppercase'
        }}
      >
        {word}
      </Typography>
    </>)
}

export default TileContent
