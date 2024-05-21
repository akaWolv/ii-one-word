import React from 'react'
import { CardMedia, Typography } from '@mui/material'
import {
  StyledBackdrop,
  StyledButton,
  StyledButtonContainer,
  StyledCustomBackdrop,
  StyledCard,
  StyledCardContent
} from './GameEnd.styled'

interface Props {
  assassin: number
  tilesLeft: number
  isLastChanceUsed?: boolean
  gameType: 'single' | 'duo'
}

const GameEnd = ({ assassin, tilesLeft, isLastChanceUsed, gameType }: Props) => {
  const handleNewGame = () => { window.location.href = `/game/${gameType === 'single' ? 'single' : 'duo'}/new` }
  const handleBackToStart = () => { window.location.href = '/' }

  let title = ''
  let text = ''
  let isWin = false

  switch (true) {
    case assassin > 0:
      title = 'Przegrana!'
      text = 'Karta zabójcy została odkryta...'
      break
    case isLastChanceUsed:
      title = 'Nie udało się'
      text = 'Nie wszyscy agenci zostali odkryci'
      break
    case tilesLeft === 0:
      title = 'Zwycięstwo!'
      text = 'Wszyscy agenci zostali odnalezieni!'
      isWin = true
      break
    default:
      return null
  }

  return (
    <>
      { !isWin && <StyledCustomBackdrop iswin={+false} /> }
      <StyledBackdrop open={true} />
      <StyledCard elevation={12} iswin={+isWin}>
        <CardMedia
          component="img"
          height="194"
          image={`${process.env.APP_URL}/indieimp.svg`}
  alt = "Logo of IndieImp.com"
  sx = {{ height: '50%' }
}
/>
  < StyledCardContent >
          <Typography variant="h1" style={{ textDecoration: 'underline' }}>
            {title}
          </Typography>
          <Typography variant="h4" gutterBottom>
            {text}
          </Typography>
          <StyledButtonContainer>
            <StyledButton style={{ margin: '0 5px' }} onClick={handleNewGame}>Kolejna Gra</StyledButton>
            <StyledButton style={{ margin: '0 5px' }} onClick={handleBackToStart}>Ekran Główny</StyledButton>
          </StyledButtonContainer>
        </StyledCardContent >
      </StyledCard >
    </>
  )
}

export default GameEnd
