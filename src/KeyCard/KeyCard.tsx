import React, { ReactElement } from 'react'
import { Grid, Typography } from '@mui/material'
import { EType } from '../interfaces/EType'
import MiniBoard from './MiniBoard'
import { StyledKeyCardContainer, StyledMiniBoardPaperContainer } from './KeyCard.styled'

interface Props {
  text: string|ReactElement
  board: Array<EType[]>
  highlightedteam?: EType
}

const KeyCard = ({ text, board, highlightedteam }: Props) => {
  return (
    <StyledKeyCardContainer
      container
      justifyContent="center"
      alignItems="flex-start"
    >
      <Grid item justifyContent="flex-start" xs={12} sm={6}>
        <Typography variant="h3">Karta Klucz</Typography>
        <Typography variant="body1">
          {text}
        </Typography>
      </Grid>

      <Grid item xs={12} sm={4}>
        <StyledMiniBoardPaperContainer elevation={12}>
          <MiniBoard board={board} highlightedteam={highlightedteam} />
        </StyledMiniBoardPaperContainer>
      </Grid>
    </StyledKeyCardContainer>
  )
}

export default KeyCard
