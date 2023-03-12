import React from 'react'
import { CheckCircle, Hail, HelpOutline } from '@mui/icons-material'
import { alpha, Avatar, Chip, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'

import { ETeam } from 'src/interfaces/ETeam'
import getTeamColor from 'src/getTeamColor'

interface Props {
  tilesTotal: number
  tilesLeft: number
  team: ETeam
}

const AgentsLeftInfo = ({
  tilesTotal,
  tilesLeft,
  team
}: Props) => {
  const iconList = new Array(tilesTotal)
  iconList.fill(<HelpOutline sx={{ opacity: 0.4 }} />, 0, tilesLeft)
  iconList.fill(<CheckCircle />, tilesLeft)

  return (
    <Chip
      style={{ backgroundColor: alpha(getTeamColor(team), 0.8) }}
      avatar={(
        <Avatar style={{
          backgroundColor: alpha(grey[900], 0.3),
          color: grey[50],
          fontWeight: 'bold'
        }}>{tilesLeft}</Avatar>
      )}
      label={(
        <Typography variant="subtitle2" style={{
          lineHeight: 1,
          color: grey[50],
          display: 'flex'
        }}>
          {iconList.map((element, i) => <div key={i}>{element}</div>)}
        </Typography>
      )}
      deleteIcon={(
        <Hail style={{ color: grey[50] }} />
      )}
      onDelete={() => {}}
    />
  )
}

export default AgentsLeftInfo

// <Chip
// style={{ backgroundColor: alpha(getTeamColor(team), 0.8) }}
// avatar={(
//   <Avatar style={{
//     backgroundColor: alpha(grey[50], 0.1),
//     color: grey[50],
//     fontWeight: 'bold'
//   }}>{tilesLeft}</Avatar>
// )}
// deleteIcon={<Hail style={{ color: grey[50] }} />}
// label={`Agent${tilesLeft > 1 ? 's' : ''} yet to discover`}
// onDelete={() => {
// }}
// />
