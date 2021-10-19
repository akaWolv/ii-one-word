import React from 'react'
import router from 'next/router'
import { grey } from '@mui/material/colors'
import { Box, Button, ButtonGroup, Modal, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import getTileColorByType from 'src/getTileColorByType'
import { EType } from 'src/interfaces/EType'

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
  const handleNewGame = () => router.push('/game/teams/new')
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
      backgroundColor = getTileColorByType(EType.Green)
      title = 'Good Job!'
      text = 'All Agents discovered - you won!'
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
        <Typography variant="h4" sx={{ mt: 2 }}>
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
