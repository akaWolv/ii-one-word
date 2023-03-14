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
  >
    <Typography variant="h6">
      Karta Klucz dla <span style={{ color: distinctColor, fontWeight: 'bold' }}>{leaderText}</span>
    </Typography>

    <Typography variant='body2' color="text.secondary">
      Kod QR do zeskanowania przez <b style={{ whiteSpace: 'nowrap' }}>{leaderText}</b>
    </Typography>
    <div style={{
      width: '100%',
      paddingTop: '5px',
      paddingBottom: '5px',
      display: 'block'
    }}>
    {
        <QRCode
          value={boardLink}
          style={{
            width: '100%',
            maxWidth: '100%',
            height: 'auto',
            maxHeight: '100%',
            margin: '0 auto'
          }}
        />
    }
    </div>
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
