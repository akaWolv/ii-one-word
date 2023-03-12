import React, { ReactElement, useEffect, useState } from 'react'
import { isTablet } from 'react-device-detect'
import { Grid } from '@mui/material'
import { StyledGridContainer, StyledBoardContainer, StyledBottomBar } from './GameBoard.styled'

interface Props {
  board: ReactElement,
  bottomBar: ReactElement
  gameEnd: ReactElement
  tokenList?: ReactElement
}

const GameBoard = ({
  board,
  bottomBar,
  gameEnd,
  tokenList
}: Props) => {
  const [isTabletView, setIsTabletView] = useState<boolean>(false)
  useEffect(() => {
    if (isTablet) {
      setIsTabletView(isTablet)
    }
  }, [])

  return (
    <StyledGridContainer
      container
      spacing={1}
      direction="row"
    >
      <StyledBoardContainer container item xs={12} $istabletview={isTabletView}>
        <Grid item xs={1} style={{ display: 'flex', alignItems: 'flex-start', paddingTop: 15 }}>
          <a href={process.env.APP_URL}>
            <img
              className="App-logo"
              src={`${process.env.APP_URL}/indieimp.svg`}
              style={{ width: '75%' }}
              alt="Logo of IndieImp.com"
            />
          </a>
        </Grid>
        <Grid item xs={10} style={{ position: 'relative' }}>
          {board}
          {gameEnd}
        </Grid>
        <Grid item xs={1}>
          {tokenList}
        </Grid>
      </StyledBoardContainer>
      <Grid item xs={1} />
      <StyledBottomBar item xs={10}>
        {bottomBar}
      </StyledBottomBar>
      <Grid item xs={1} />
    </StyledGridContainer>
  )
}

export default GameBoard
