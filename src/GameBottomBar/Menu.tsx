import React from 'react'
import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'

interface Menu {
  newGameUrl: string
}

const StyledButtonContainer = styled('div')({
  display: 'flex',
  alignItems: 'space-between',
  gap: 10,
  fontWeight: 'bold'
})

const Menu = ({ newGameUrl }: Menu) => (
  <StyledButtonContainer>
    <Button variant='outlined' href={`${process.env.APP_URL}${newGameUrl}`}>Start new Game</Button>
    <Button variant='outlined' href={`${process.env.APP_URL}`}>Back to main window</Button>
  </StyledButtonContainer>
)

export default Menu
