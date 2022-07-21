import React from 'react'
import { styled } from '@mui/material/styles'
import { Close, Done, Hail, DirectionsWalk, Dangerous } from '@mui/icons-material'
import { amber, grey, pink } from '@mui/material/colors'
import { alpha, Chip } from '@mui/material'

import { EType } from 'src/interfaces/EType'
import { EPlayer } from 'src/interfaces/EPlayer'
import getPlayerColor from '../getPlayerColor'

interface TypeIcon {
  type: EType,
  player?: EPlayer
}

const StyledChip = styled(Chip)<{ $player?: EPlayer, $isWhiteText?: boolean }>(({ $player, $isWhiteText }) => ({
  fontSize: 18,
  fontWeight: 400,
  padding: 25,
  textTransform: 'capitalize',
  color: $isWhiteText ? grey[200] : 'inherited',
  borderColor: $player ? alpha(getPlayerColor($player), 0.5) : 'inherited',
  borderLeftWidth: $player ? 2 : 'inherited',
  borderRightWidth: $player ? 2 : 'inherited',
  borderStyle: $player ? 'solid' : 'inherited'
}))

const TypeIcon = ({ type, player }: TypeIcon) => {
  let isWhiteText: boolean = false
  switch (type) {
    case EType.Red:
      isWhiteText = true
    case EType.Blue:
      isWhiteText = true
    case EType.Green:
      return (
        <StyledChip
          avatar={<Hail style={{ color: grey[50] }} />}
          deleteIcon={<Done />}
          label={`Agent ${player || ''}`}
          onDelete={() => {}}
          $player={player}
          $isWhiteText={isWhiteText}
        />
      )
    case EType.Neutral:
      return (
        <StyledChip
          avatar={<DirectionsWalk style={{ color: amber[800] }} />}
          deleteIcon={<Close />}
          label='Neutral'
          onDelete={() => {}}
        />
      )
    case EType.Assassin:
      return (
        <StyledChip
          avatar={<Dangerous style={{ color: pink[600] }} />}
          deleteIcon={<Dangerous style={{ color: pink[600] }} />}
          label='Assassin'
          onDelete={() => {}}
        />
      )
    default:
      return null
  }
}

export default TypeIcon
