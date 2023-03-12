import React from 'react'
import QRCode from 'react-qr-code'
import { TextField, Typography } from '@mui/material'
import { StyledPaper } from './KeyCard.styled'

interface Props {
  boardLink: string
  distinctColor: string
  leaderText?: string
}

const KeyCard = ({
  boardLink,
  distinctColor,
  leaderText
}: Props) => (
  <StyledPaper
    elevation={6}
    suppressHydrationWarning={true}
    style={{ width: '100%', height: '100%' }}
  >
    <Typography variant="h5" component="div">
      <span style={{ color: distinctColor, fontWeight: 'bold' }}>{leaderText}</span>: Key Card
    </Typography>

    <Typography sx={{
      fontSize: 14
    }} color="text.secondary">
      <b>{leaderText || 'Leader'}</b> scans this QRcode with his phone
    </Typography>
    {
        <QRCode
          value={boardLink}
          // size={400}
          style={{
            width: '100%',
            height: 'auto',
            marginTop: '5px',
            marginBottom: '5px'
          }}
        />
    }
    <TextField
      label="...or copy the key card link below:"
      variant="standard"
      onFocus={event => {
        event.target.select()
      }}
      defaultValue={boardLink}
      style={{ width: '100%' }}
      InputProps={{ readOnly: true }} />
  </StyledPaper>
)

export default KeyCard
