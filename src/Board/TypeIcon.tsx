import React from 'react'
import HailIcon from '@mui/icons-material/Hail'
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk'
import DangerousIcon from '@mui/icons-material/Dangerous';

import { EType } from 'src/interfaces/EType'
import { amber, pink } from '@mui/material/colors'

interface ITypeIcon {
  type: EType
}

const TypeIcon = ({ type }: ITypeIcon) => {
  switch (type) {
    case EType.Red:
    case EType.Blue:
    case EType.Green:
      return <HailIcon style={{ fontSize: 80 }} />
    case EType.Neutral:
      return <DirectionsWalkIcon style={{ fontSize: 80, color: amber[800] }} />
    case EType.Assassin:
      return <DangerousIcon style={{ fontSize: 80, color: pink[800] }} />
    default:
      return null
  }
}

export default TypeIcon
