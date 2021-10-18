import React from 'react'
import { grey } from '@mui/material/colors'
import { Box, Modal, Typography } from '@mui/material'
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
      </StyledBox>
    </Modal>
  )
}

export default GameModal
