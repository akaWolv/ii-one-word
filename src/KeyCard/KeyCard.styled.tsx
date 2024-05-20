import { styled } from '@mui/material/styles'
import { Chip, Grid, Paper } from '@mui/material'
import { EType } from '../interfaces/EType'
import getTileColorByType from '../getTileColorByType'

const StyledTeamChip = styled(Chip)<{ team: EType }>(({
  theme,
  team
}) => {
  const textColor = team === EType.Red ? theme.palette.primary.light : theme.palette.primary.dark
  return {
    backgroundColor: getTileColorByType(team),
    color: textColor,
    borderColor: textColor
  }
})
StyledTeamChip.defaultProps = { variant: 'outlined', size: 'small' }

const StyledKeyCardContainer = styled(Grid)(({ theme }) => ({
  maxWidth: '85vw',
  margin: '0 auto',
  paddingTop: 10,
  color: theme.palette.primary.light
}))

const StyledMiniBoardPaperContainer = styled(Paper)({
  backgroundColor: 'transparent',
  aspectRatio: '1 / 1'
})

export { StyledTeamChip, StyledKeyCardContainer, StyledMiniBoardPaperContainer }
