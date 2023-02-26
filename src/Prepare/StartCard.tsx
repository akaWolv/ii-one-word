import React from 'react'
import { Button } from '@mui/material'
import { StyledPaper } from './StartCard.styled'

interface Props {
  startLink: string
  tabletModeLink?: string
}

const Prepare = ({
  startLink,
  tabletModeLink
}: Props) => (
  <StyledPaper elevation={0}>
    <Button
      variant="outlined"
      size="large"
      href={startLink}
    >
      Start Game!
    </Button>
    {
      tabletModeLink && <Button
        variant="outlined"
        size="large"
        href={tabletModeLink}
      >
        Start Game in Tablet mode
      </Button>
    }
  </StyledPaper>
)

export default Prepare
