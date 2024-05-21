import React from 'react'
import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

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
    <Button
      variant='outlined'
      size='small'
      style={{ margin: '0 5px' }}
      href={`${publicRuntimeConfig.APP_URL}${newGameUrl}`}>
      Nowa gra
    </Button>
    <Button
      variant='outlined'
      size='small'
      style={{ margin: '0 5px' }}
      href={`${publicRuntimeConfig.APP_URL}`}>
      Ekran główny
    </Button>
  </StyledButtonContainer>
)

export default Menu
