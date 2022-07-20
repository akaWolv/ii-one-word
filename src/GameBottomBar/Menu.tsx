import React from 'react'
import { Button, ButtonGroup } from '@mui/material'

interface Menu {
  newGameUrl: string
}

const Menu = ({ newGameUrl }: Menu) => (
  <ButtonGroup size="small" variant="outlined">
    <Button href={`${process.env.APP_URL}${newGameUrl}`}>New Game</Button>
    <Button href={`${process.env.APP_URL}`}>Back to start</Button>
  </ButtonGroup>
)

export default Menu
