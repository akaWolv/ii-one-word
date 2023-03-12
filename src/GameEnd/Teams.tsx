import React from 'react'
import router from 'next/router'
import { CardMedia, Typography } from '@mui/material'
import { StyledBackdrop, StyledCustomBackdrop, StyledButton, StyledCard, StyledCardContent } from './GameEnd.styled'
import getTileColorByType from '../getTileColorByType'
import { EType } from '../interfaces/EType'

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
  const handleNewGame = () => router.push('/game/single/new')
  const handleBackToStart = () => router.push('/')

  let title = ''
  let text = ''
  let isWin = false
  let type: EType|undefined

  switch (true) {
    case assassin > 0:
      title = 'Oh snap!'
      text = 'Assassin tile revealed, you lost...'
      break
    case redTeamTilesLeft === 0:
      title = 'Red team won!'
      text = 'All agents have been discovered!'
      isWin = true
      type = EType.Red
      break
    case blueTeamTilesLeft === 0:
      title = 'Blue team won!'
      text = 'All agents have been discovered!'
      isWin = true
      type = EType.Blue
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
          <Typography variant="h1" style={{ textDecoration: `underline ${type ? getTileColorByType(type) : ''}` }}>
            {title}
          </Typography>
          <Typography variant="h4" gutterBottom>
            {text}
          </Typography>
          <Typography variant="h3" sx={{ mt: 2 }} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            flexDirection: 'row'
          }}>
            <StyledButton onClick={handleNewGame}>Another Game</StyledButton>
            <StyledButton onClick={handleBackToStart}>Back to start</StyledButton>
          </Typography>
        </StyledCardContent>
      </StyledCard>
    </>
  )
}

export default GameEnd
