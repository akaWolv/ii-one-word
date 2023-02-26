import React from 'react'
import { styled } from '@mui/material/styles'
import { Close, Done, Hail, DirectionsWalk, Dangerous } from '@mui/icons-material'
import { amber, grey, pink } from '@mui/material/colors'
import { alpha, Chip, Typography } from '@mui/material'

import { EType } from 'src/interfaces/EType'
import { EPlayer } from 'src/interfaces/EPlayer'
import getPlayerColor from '../getPlayerColor'

interface Params {
  type: EType,
  player?: EPlayer
}

const StyledChip = styled(Chip)<{ $player?: EPlayer, $isWhiteText?: boolean }>(({ $player, $isWhiteText }) => ({
  opacity: 0.7,
  fontSize: 18,
  fontWeight: 400,
  padding: 25,
  color: $isWhiteText ? grey[200] : 'inherited',
  textTransform: 'capitalize',
  borderColor: $player ? alpha(getPlayerColor($player), 0.5) : 'inherited',
  borderLeftWidth: $player ? 2 : 'inherited',
  borderRightWidth: $player ? 2 : 'inherited',
  borderStyle: $player ? 'solid' : 'inherited'
}))

const TypeTileContent = ({ type, player }: Params) => {
  let isWhiteText: boolean = false
  switch (type) {
    case EType.Red:
      isWhiteText = true
    // eslint-disable-next-line no-fallthrough
    case EType.Blue:
      isWhiteText = true
    // eslint-disable-next-line no-fallthrough
    case EType.Green:
      return (
        <StyledChip
          avatar={<Hail style={{ color: grey[50] }} />}
          label={`Agent ${player || ''}`}
          $player={player}
          $isWhiteText={isWhiteText}
          sx={{ opacity: 0.8 }}
        />
      )
    case EType.Neutral:
      return (
        <StyledChip
          avatar={<DirectionsWalk style={{ color: amber[700] }} />}
          label='Neutral'
          size="small"
          sx={{ backgroundColor: amber[100] }}
        />
      )
    case EType.Assassin:
      return (
        <StyledChip
          avatar={<Dangerous style={{ color: pink[600] }} />}
          label='Assassin'
        />
      )
    default:
      return null
  }
}

export default TypeTileContent
