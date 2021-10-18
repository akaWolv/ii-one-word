import React from 'react'
import { styled } from '@mui/material/styles'
import { EType } from 'src/interfaces/EType'
import getTileColorByType from 'src/getTileColorByType'

interface IKeyCard {
  board: Array<EType[]>
}

const StyledTable = styled('table')(({ theme }) => ({
  tableLayout: 'fixed',
  textAlign: 'center',
  verticalAlign: 'middle',
  margin: '0 auto',
  width: '100%',
  height: '100%',
  borderSpacing: '5px'
}))

const Item = styled('td')(({ type }: {type: EType}) => ({
  backgroundColor: getTileColorByType(type)
}))

// eslint-disable-next-line react/prop-types
const KeyCard = ({ board }: IKeyCard) => {
  return <StyledTable>
    <tbody>
    {
      board.map((line, id) => (
        <tr key={id}>
          {
            line.map((type, id) => <Item key={id} type={type} />)
          }
        </tr>
      ))
    }
    </tbody>
  </StyledTable>
}

export default KeyCard
