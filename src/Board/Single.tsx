import React from 'react'
import { EType } from '../interfaces/EType'
import Tile from '../Tile/SingleClick'

interface Props {
  words: string[][]
  board: Array<EType[]>
  gameState: string
  getChangeGameStateUrl: Function
}

const Board = ({
  words,
  board,
  gameState,
  getChangeGameStateUrl
}: Props) => {
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
              <td key={`${lineId}-${wordId}`} style={{
                width: '20%',
                height: '20%'
              }}>
                <Tile
                  lineId={lineId}
                  wordId={wordId}
                  word={word}
                  board={board}
                  gameState={gameState}
                  getChangeGameStateUrl={getChangeGameStateUrl}
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
