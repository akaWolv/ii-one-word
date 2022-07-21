import React from 'react'
import { Button, ButtonGroup } from '@mui/material'
import { styled } from '@mui/material/styles'
import { grey } from '@mui/material/colors'

interface Menu {
  newGameUrl: string
}

const StyledButton = styled(Button)({
  color: grey[400]
})

const Menu = ({ newGameUrl }: Menu) => (
  <ButtonGroup size="small" variant="text">
    <StyledButton href={`${process.env.APP_URL}${newGameUrl}`}>New Game</StyledButton>
    <StyledButton href={`${process.env.APP_URL}`}>Back to start</StyledButton>
  </ButtonGroup>
)

export default Menu
