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
    <Typography variant="h5" component="div" sx={{ color: distinctColor, fontWeight: 'bold' }}>
      Key Card
    </Typography>

    <Typography sx={{
      fontSize: 14
    }} color="text.secondary">
      <b>{leaderText || 'Leader'}</b> scans this QRcode with his phone
    </Typography>
    {
      process.browser && (
        <QRCode
          value={boardLink}
          style={{
            width: 'auto',
            maxWidth: '100%',
            height: 'auto',
            flexGrow: 10,
            marginTop: '5px',
            marginBottom: '5px'
          }}
        />
      )
    }
    <TextField
      label="...or he copies the key card link below:"
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
