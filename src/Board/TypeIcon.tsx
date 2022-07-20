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

const StyledChip = styled(Chip)<{ $player?: EPlayer }>(({ $player, theme }) => ({
  fontSize: 18,
  fontWeight: 400,
  padding: 25,
  textTransform: 'capitalize',
  borderColor: $player ? alpha(getPlayerColor($player), 1) : 'inherited',
  borderWidth: $player ? 1 : 'inherited',
  borderStyle: $player ? 'solid' : 'inherited'
  // color: $player ? grey[50] : 'inherited'
}))

const TypeIcon = ({ type, player }: TypeIcon) => {
  switch (type) {
    case EType.Red:
    case EType.Blue:
    case EType.Green:
      return (
        <StyledChip
          avatar={<Hail style={{ color: grey[50] }} />}
          deleteIcon={<Done />}
          label={`Agent ${player || ''}`}
          onDelete={() => {}}
          $player={player}
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
