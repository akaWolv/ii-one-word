import React from 'react'
import { styled } from '@mui/material/styles'
import { EType } from 'src/interfaces/EType'
import getTileColorByType from 'src/getTileColorByType'

interface Props {
  board: Array<EType[]>
  highlightedteam?: EType
}

const StyledTable = styled('table')({
  tableLayout: 'fixed',
  textAlign: 'center',
  verticalAlign: 'middle',
  margin: '0 auto',
  width: '100%',
  height: '100%',
  borderSpacing: '5px'
})

const Item = styled('td')<{ type: EType, highlightedteam?: EType }>(({
  theme,
  type,
  highlightedteam
}) => {
  const borderWidth = highlightedteam && highlightedteam === type ? 3 : 0
  const textColor = highlightedteam === EType.Red ? theme.palette.primary.light : theme.palette.primary.dark
  return {
    backgroundColor: getTileColorByType(type),
    lineHeight: 2.5,
    color: 'transparent',
    borderStyle: 'solid',
    borderColor: textColor,
    borderWidth
  }
})

const MiniBoard = ({
  board,
  highlightedteam
}: Props) => {
  return <StyledTable>
    <tbody>
    {
      board.map((line, id) => (
        <tr key={id}>
          {
            line.map((type, id) => <Item key={id} type={type} highlightedteam={highlightedteam}>{type}</Item>)
          }
        </tr>
      ))
    }
    </tbody>
  </StyledTable>
}

export default MiniBoard
