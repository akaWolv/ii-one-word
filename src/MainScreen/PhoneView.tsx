import React from 'react'
import { Typography } from '@mui/material'
import { StyledAlternateSpan } from './StyledTypography'
import { Tablet, Computer, Tv } from '@mui/icons-material'

const PhoneView = () => {
  return (
    <div style={{ textAlign: 'center', paddingTop: '30px' }}>
      <Typography variant="h2">
        <img src={'indieimp.svg'} style={{ height: 200 }} alt='Logo of IndieImp.com' />
      </Typography>
      <Typography variant="h1">One-Word <StyledAlternateSpan>Game</StyledAlternateSpan></Typography>

      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyItems: 'stretch',
        justifyContent: 'center',
        gap: '15px',
        paddingTop: '15px'
      }}>
        <Tablet style={{ fontSize: '20vw' }} />
        <Computer style={{ fontSize: '20vw' }} />
        <Tv style={{ fontSize: '20vw' }} />
      </div>

      <Typography variant='h4'>
        Uruchom te stronę na tablecie, przegladarce komputera lub telewizora.
      </Typography>
      <Typography variant='h4' style={{ paddingTop: '15px' }}>
        Telefon przyda się Wam <br /> w poźniejszym etapie.
      </Typography>
    </div>
  )
}

export default PhoneView
