import React from 'react'
import { styled } from '@mui/material/styles'
import { Hail, DirectionsWalk, Dangerous } from '@mui/icons-material'
import { amber, grey, pink } from '@mui/material/colors'
import { alpha, Chip } from '@mui/material'

import { EType } from 'src/interfaces/EType'
import { EPlayer } from 'src/interfaces/EPlayer'
import getPlayerColor from '../getPlayerColor'

interface Params {
  type: EType,
  player?: EPlayer
}

const StyledChip = styled(Chip)<{ $player?: EPlayer, $iswhitetext?: boolean }>(({ $player, $iswhitetext }) => ({
  opacity: 0.9,
  fontSize: '1.5vw',
  fontWeight: 400,
  padding: 20,
  color: $iswhitetext ? grey[200] : 'inherited',
  textTransform: 'capitalize',
  boxShadow: $player ? `0px 0px 15px 4px ${alpha(getPlayerColor($player), 0.5)}` : 'none'
}))

const TypeTileContent = ({ type, player }: Params) => {
  let isWhiteText: boolean = false
  switch (type) {
    case EType.Red:
    case EType.Blue:
      isWhiteText = true
    // eslint-disable-next-line no-fallthrough
    case EType.Green:
      return (
        <StyledChip
          avatar={<Hail style={{ color: grey[50] }} />}
          label='Agent'
          $player={player}
          $iswhitetext={isWhiteText ? true : undefined}
        />
      )
    case EType.Neutral:
      return (
        <StyledChip
          avatar={<DirectionsWalk style={{ color: amber[700] }} />}
          label='Neutralny'
          size="small"
          sx={{ backgroundColor: amber[100] }}
        />
      )
    case EType.Assassin:
      return (
        <StyledChip
          avatar={<Dangerous style={{ color: pink[600] }} />}
          label='Zabójca'
        />
      )
    default:
      return null
  }
}

export default TypeTileContent
