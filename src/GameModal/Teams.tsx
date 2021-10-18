import React from 'react'
import { grey } from '@mui/material/colors'
import getTeamColor from 'src/getTeamColor'
import { ETeam } from 'src/interfaces/ETeam'
import { Box, Modal, Typography } from '@mui/material'
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
  redTeamTilesLeft: number
  blueTeamTilesLeft: number
}

// eslint-disable-next-line react/prop-types
const GameModal = ({ assassin, redTeamTilesLeft, blueTeamTilesLeft }: IGameModal) => {
  let title = ''
  let text = ''
  let backgroundColor = ''

  switch (true) {
    case assassin > 0:
      backgroundColor = grey[900]
      title = 'Oh snap!'
      text = 'Assassin tile revealed - you lost...'
      break
    case redTeamTilesLeft === 0:
      backgroundColor = getTeamColor(ETeam.Red)
      title = 'Good Job!'
      text = `${redTeamTilesLeft === 0 ? 'Red' : 'Blue'} team won!`
      break
    case blueTeamTilesLeft === 0:
      backgroundColor = getTeamColor(ETeam.Blue)
      title = 'Good Job!'
      text = `${redTeamTilesLeft === 0 ? 'Red' : 'Blue'} team won!`
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
