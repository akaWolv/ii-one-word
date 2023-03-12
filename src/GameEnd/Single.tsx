import React from 'react'
import router from 'next/router'
import { CardMedia, Typography } from '@mui/material'
import { StyledBackdrop, StyledCustomBackdrop, StyledCard, StyledCardContent, StyledButton } from './GameEnd.styled'

interface Props {
  assassin: number
  tilesLeft: number
  isLastChanceUsed?: boolean
}

const GameEnd = ({ assassin, tilesLeft, isLastChanceUsed }: Props) => {
  const handleNewGame = () => router.push('/game/single/new')
  const handleBackToStart = () => router.push('/')

  let title = ''
  let text = ''
  let isWin = false

  switch (true) {
    case assassin > 0:
      title = 'Oh snap!'
      text = 'Assassin tile revealed, you lost...'
      break
    case isLastChanceUsed:
      title = 'You failed'
      text = 'Some Agents remain undiscovered...'
      break
    case tilesLeft === 0:
      title = 'You won!'
      text = 'All agents have been discovered!'
      isWin = true
      break
    default:
      return null
  }

  return (
    <>
      { !isWin && <StyledCustomBackdrop $iswin={false} /> }
      <StyledBackdrop open={true} />
      <StyledCard elevation={12} $iswin={isWin}>
        <CardMedia
          component="img"
          height="194"
          image={`${process.env.APP_URL}/indieimp.svg`}
          alt="Logo of IndieImp.com"
          sx={{ height: '50%' }}
        />
        <StyledCardContent>
          <Typography variant="h1" style={{ textDecoration: 'underline' }}>
            {title}
          </Typography>
          <Typography variant="h4" gutterBottom>
            {text}
          </Typography>
          <Typography variant="h3" sx={{ mt: 2 }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }}>
            <StyledButton onClick={handleNewGame}>Another Game</StyledButton>
            <StyledButton onClick={handleBackToStart}>Back to start</StyledButton>
          </Typography>
        </StyledCardContent>
      </StyledCard>
    </>
  )
}

export default GameEnd
