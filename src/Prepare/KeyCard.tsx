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
    <Typography variant="h6">
      Karta Klucz dla <span style={{ color: distinctColor, fontWeight: 'bold' }}>{leaderText}</span>
    </Typography>

    <Typography variant='body2' color="text.secondary">
      Kod QR do zeskanowania przez <b>{leaderText}</b>
    </Typography>
    {
        <QRCode
          value={boardLink}
          style={{
            width: '100%',
            height: 'auto',
            marginTop: '5px',
            marginBottom: '10px'
          }}
        />
    }
    <TextField
      label="...albo link poniżej do skopiowania:"
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
