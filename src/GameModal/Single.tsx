import React from 'react'
import router from 'next/router'
import { grey } from '@mui/material/colors'
import getTeamColor from 'src/getTeamColor'
import { ETeam } from 'src/interfaces/ETeam'
import { Box, Button, ButtonGroup, Modal, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledBox = styled(Box)({
  color: grey[100],
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  border: 0,
  padding: 50
})

interface IGameModal {
  assassin: number
  tilesLeft: number
}

// eslint-disable-next-line react/prop-types
const GameModal = ({ assassin, tilesLeft }: IGameModal) => {
  const handleNewGame = () => router.push('/game/single/new')
  const handleBackToStart = () => router.push('/')

  let title = ''
  let text = ''
  let backgroundColor = ''

  switch (true) {
    case assassin > 0:
      backgroundColor = grey[900]
      title = 'Oh snap!'
      text = 'Assassin tile revealed - you lost...'
      break
    case tilesLeft === 0:
      backgroundColor = getTeamColor(ETeam.Green)
      title = 'Good Job!'
      text = 'You won!'
      break
    case assassin === 0:
      return null
  }

  return (
    <Modal open={true}>
      <StyledBox style={{ backgroundColor }}>
        <Typography variant="h2">
          {title}
        </Typography>
        <Typography variant="h4" sx={{ mt: 2 }} gutterBottom>
          {text}
        </Typography>
        <ButtonGroup size="large" variant="outlined" color="secondary" style={{ marginTop: 15 }}>
          <Button onClick={handleNewGame}>New Game</Button>
          <Button onClick={handleBackToStart}>Back to start</Button>
        </ButtonGroup>
      </StyledBox>
    </Modal>
  )
}

export default GameModal
