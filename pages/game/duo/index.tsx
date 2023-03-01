import React from 'react'
import type { GetServerSideProps } from 'next'
import { alpha, Avatar, Chip, Grid, Typography } from '@mui/material'
import { EType } from 'src/interfaces/EType'
import Board from 'src/Board/Duo'
import TokenList from 'src/Board/TokenList'
import { EPlayer } from 'src/interfaces/EPlayer'
import { styled } from '@mui/material/styles'
import { grey } from '@mui/material/colors'
import calculateDuoTilesToGo from 'src/calculateDuoTilesToGo'
import GameModal from 'src/GameModal/Duo'
import getTeamColor from 'src/getTeamColor'
import { ETeam } from 'src/interfaces/ETeam'
import Menu from 'src/GameBottomBar/Menu'
import GameBoard from 'src/GameBoard'
import GameEnd from 'src/GameEnd/Single'
import { Hail } from '@mui/icons-material'

const StyledBoardContainer = styled(Grid)(({ theme }) => ({
  textAlign: 'center',
  height: '95vh'
}))
const StyledBottomBar = styled(Grid)(({ theme }) => ({
  color: grey[100],
  textAlign: 'center'
}))

interface Props {
  boardId: string
  wordsId: string
  words: string[][]
  boardPlayerA: Array<EType[]>
  boardPlayerB: Array<EType[]>
  gameStateA: string
  gameStateB: string
  gameState: string
  tokenState: string
  flatBoard: string
  withUpsideDownWord: boolean
  isLastChanceUsed: boolean
}

const getCurrentUrl = () => new URL(`${process.env.APP_URL}/game/duo`)

const editGameState = (gameState: string, orderId: number): string => {
  const gameStateList = gameState.split('')
  gameStateList[orderId] = '1'
  return gameStateList.join('')
}

const Game = ({
  boardId,
  wordsId,
  words,
  boardPlayerA,
  boardPlayerB,
  gameStateA,
  gameStateB,
  gameState,
  tokenState,
  flatBoard,
  withUpsideDownWord,
  isLastChanceUsed
}: Props) => {
  const getChangeGameStateUrl = (lineId: number, wordId: number, player: EPlayer): string => {
    const orderId = lineId * 5 + wordId
    let gameStateList = []

    // edit correct player state
    if (player === EPlayer.A) {
      gameStateList = [editGameState(gameStateA, orderId), gameStateB]
    } else {
      gameStateList = [gameStateA, editGameState(gameStateB, orderId)]
    }

    // push location
    const url = getCurrentUrl()
    url.searchParams.set('board', boardId)
    url.searchParams.set('words', wordsId)
    url.searchParams.set('gameState', gameStateList.join(','))
    url.searchParams.set('tokenState', tokenState)
    url.searchParams.set('tabletMode', String(Number(withUpsideDownWord)))
    return url.toString()
  }

  const getLastChanceUsedUrl = (): string => {
    const url = getCurrentUrl()
    url.searchParams.set('board', boardId)
    url.searchParams.set('words', wordsId)
    url.searchParams.set('gameState', gameState)
    url.searchParams.set('tokenState', tokenState)
    url.searchParams.set('tabletMode', String(Number(withUpsideDownWord)))
    url.searchParams.set('isLastChanceUsed', '1')
    return url.toString()
  }

  const getUpdateTokenStateUrl = (): string => {
    const url = getCurrentUrl()

    url.searchParams.set('board', boardId)
    url.searchParams.set('words', wordsId)
    url.searchParams.set('gameState', gameState)

    const countTaken = (tokenState.match(/0/g) || []).length
    if (countTaken < tokenState.length) {
      url.searchParams.set(
        'tokenState',
        [
          '0'.repeat(countTaken + 1),
          '1'.repeat(tokenState.length - countTaken - 1)
        ].join('')
      )
    }
    url.searchParams.set('tabletMode', String(Number(withUpsideDownWord)))
    return url.toString()
  }

  const {
    tilesLeft,
    assassin
  } = calculateDuoTilesToGo(flatBoard, gameStateA, gameStateB)

  return <GameBoard
    board={
      <Board
        words={words}
        boardPlayerA={boardPlayerA}
        boardPlayerB={boardPlayerB}
        gameStateA={gameStateA}
        gameStateB={gameStateB}
        getChangeGameStateUrl={getChangeGameStateUrl}
        withUpsideDownWord={withUpsideDownWord}
      />
    }
    bottomBar={
      <>
        <Menu newGameUrl="/game/due/new" />
        <Chip
          style={{ backgroundColor: getTeamColor(ETeam.Green) }}
          avatar={<Avatar style={{
            backgroundColor: alpha(grey[50], 0.1),
            color: grey[50],
            fontWeight: 'bold'
          }}>{tilesLeft}</Avatar>}
          deleteIcon={<Hail style={{ color: grey[50] }} />}
          label={`Agent${tilesLeft > 1 ? 's' : ''} yet to discover`}
          onDelete={() => {
          }}
        />
      </>
    }
    tokenList={
      <TokenList
        tokenState={tokenState}
        getUpdateTokenStateUrl={getUpdateTokenStateUrl}
        getLastChanceUsedUrl={getLastChanceUsedUrl}
      />
    }
    gameEnd={<GameEnd tilesLeft={tilesLeft} assassin={assassin} isLastChanceUsed={isLastChanceUsed} />}
  />

  return (
    <Grid container
          spacing={1}
          direction="row"
          alignItems="center"
    >
      <GameModal tilesLeft={tilesLeft} assassin={assassin} />
      <StyledBoardContainer container item xs={12}>
        <Grid item xs={11}>
          <Board
            words={words}
            boardPlayerA={boardPlayerA}
            boardPlayerB={boardPlayerB}
            gameStateA={gameStateA}
            gameStateB={gameStateB}
            getChangeGameStateUrl={getChangeGameStateUrl}
            withUpsideDownWord={withUpsideDownWord}
          />
        </Grid>
        <Grid item xs={1}>
          <TokenList tokenState={tokenState} getUpdateTokenStateUrl={getUpdateTokenStateUrl} getLastChanceUsedUrl={getLastChanceUsedUrl} />
        </Grid>
      </StyledBoardContainer>
      <StyledBottomBar container item xs={12}>
        <Grid item xs={3}>
          <Typography variant="h6">
            <b>{tilesLeft}</b>&nbsp;
            <span style={{ color: getTeamColor(ETeam.Green) }}>
              agent{tilesLeft > 1 && 's'}
            </span>&nbsp;yet to discover
          </Typography>
        </Grid>
        <Grid item xs={5}>
        </Grid>
        <Grid item xs={3}>
          <Menu newGameUrl="/game/duo/new" />
        </Grid>
      </StyledBottomBar>
    </Grid>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
  res
}) => {
  const {
    board: boardId,
    words: wordsId,
    gameState,
    tokenState,
    tabletMode,
    isLastChanceUsed
  } = query
  if (!boardId || !wordsId || !gameState || !tokenState) {
    res.end()

    return { props: {} }
  }
  const [gameStateA, gameStateB] = String(gameState).split(',')

  // get Words
  const resWords = await fetch(`${process.env.APP_URL}/api/words/${wordsId}`)
  const dataWords = await resWords.json()
  if (!dataWords) {
    return {
      notFound: true
    }
  }
  const { words } = dataWords

  // get Board
  const resBoard = await fetch(`${process.env.APP_URL}/api/boards/duo/${boardId}`)
  const dataBoard = await resBoard.json()
  const {
    boardPlayerA,
    boardPlayerB,
    decodedId: flatBoard
  } = dataBoard

  return {
    props: {
      boardId,
      wordsId,
      words,
      boardPlayerA: boardPlayerA,
      boardPlayerB: boardPlayerB,
      gameStateA,
      gameStateB,
      gameState,
      tokenState,
      flatBoard,
      withUpsideDownWord: Boolean(Number(tabletMode || 0)),
      isLastChanceUsed: Boolean(Number(isLastChanceUsed || '0'))
    }
  }
}

export default Game
