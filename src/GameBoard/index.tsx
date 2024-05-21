import React, { ReactElement } from 'react'
import { Grid } from '@mui/material'
import { StyledGridContainer, StyledBoardContainer, StyledBottomBar } from './GameBoard.styled'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

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
  return (
    <StyledGridContainer
      container
      spacing={0}
      direction="row"
    >
      <StyledBoardContainer container item xs={12}>
        <Grid item xs={1} style={{ display: 'flex', alignItems: 'flex-start', paddingTop: 15 }}>
          <a href={publicRuntimeConfig.APP_URL}>
            <img
              className="App-logo"
              src={`${publicRuntimeConfig.APP_URL}/indieimp.svg`}
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
