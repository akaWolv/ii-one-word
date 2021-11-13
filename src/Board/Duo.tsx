import React from 'react'
import { EType } from 'src/interfaces/EType'
import Tile from '../Tile/MultipleClick'

interface IWords {
  words: string[][]
  boardPlayerA: Array<EType[]>
  boardPlayerB: Array<EType[]>
  gameStateA: string
  gameStateB: string
  getChangeGameStateUrl: Function
  withUpsideDownWord: boolean
}

// eslint-disable-next-line react/prop-types
const Board = ({
  words,
  boardPlayerA,
  boardPlayerB,
  gameStateA,
  gameStateB,
  getChangeGameStateUrl,
  withUpsideDownWord
}: IWords) => {
  return <table style={{
    tableLayout: 'fixed',
    width: '100%',
    height: '100%',
    borderSpacing: '5px'
  }}>
    <tbody>
    {
      words.map((line, lineId) => (
        <tr key={encodeURIComponent(line.join(''))}>
          {
            line.map((word, wordId) => (
              <td key={`${lineId}-${wordId}`}>
                <Tile
                  lineId={lineId}
                  wordId={wordId}
                  word={word}
                  boardPlayerA={boardPlayerA}
                  boardPlayerB={boardPlayerB}
                  gameStateA={gameStateA}
                  gameStateB={gameStateB}
                  getChangeGameStateUrl={getChangeGameStateUrl}
                  withUpsideDownWord={withUpsideDownWord}
                />
              </td>
            ))
          }
        </tr>
      ))
    }
    </tbody>
  </table>
}

export default Board
