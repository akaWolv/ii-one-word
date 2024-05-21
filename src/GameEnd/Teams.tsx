import React from 'react'
import { CardMedia, Typography } from '@mui/material'
import {
  StyledBackdrop,
  StyledButtonContainer,
  StyledCustomBackdrop,
  StyledButton,
  StyledCard,
  StyledCardContent
} from './GameEnd.styled'
import getTileColorByType from '../getTileColorByType'
import { EType } from '../interfaces/EType'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

interface Props {
  assassin: number
  redTeamTilesLeft: number
  blueTeamTilesLeft: number
}

const GameEnd = ({
  assassin,
  redTeamTilesLeft,
  blueTeamTilesLeft
}: Props) => {
  const handleNewGame = () => { window.location.href = '/game/teams/new' }
  const handleBackToStart = () => { window.location.href = '/' }

  let title = ''
  let text = ''
  let isWin = false
  let type: EType | undefined

  switch (true) {
    case assassin > 0:
      title = 'Przegrana!'
      text = 'Karta zabójcy została odkryta...'
      break
    case redTeamTilesLeft === 0:
      title = 'Drużyna Czerwonych wygrywa!'
      text = 'Odnaleźli wszystkich agentów!'
      isWin = true
      type = EType.Red
      break
    case blueTeamTilesLeft === 0:
      title = 'Drużyna Niebieskich wygrywa!'
      text = 'Odnaleźli wszystkich agentów!'
      isWin = true
      type = EType.Blue
      break
    default:
      return null
  }

  return (
    <>
      {!isWin && <StyledCustomBackdrop iswin={+false} />}
      <StyledBackdrop open={true} />
      <StyledCard elevation={12} iswin={+isWin}>
        <CardMedia
          component="img"
          height="194"
          image={`${publicRuntimeConfig.APP_URL}/indieimp.svg`}
          alt="Logo of IndieImp.com"
          sx={{ height: '50%' }}
        />
        <StyledCardContent>
          <Typography variant="h1" style={{ textDecoration: `underline ${type ? getTileColorByType(type) : ''}` }}>
            {title}
          </Typography>
          <Typography variant="h4" gutterBottom>
            {text}
          </Typography>
          <StyledButtonContainer>
            <StyledButton onClick={handleNewGame}>Kolejna Gra</StyledButton>
            <StyledButton onClick={handleBackToStart}>Ekran Główny</StyledButton>
          </StyledButtonContainer>
        </StyledCardContent>
      </StyledCard>
    </>
  )
}

export default GameEnd
