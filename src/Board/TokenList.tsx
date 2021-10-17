import React from 'react'
import { styled } from '@mui/material/styles'
import { grey, purple } from '@mui/material/colors'
import { Button } from '@mui/material'
import { ETokenStatus } from 'src/interfaces/ETokenStatus'

interface ITokenList {
  tokenState: string
  updateTokenState: Function
}

const NUMBER_OF_TOKENS = 9

const StyledUl = styled('ul')({
  width: '100%',
  height: '90%',
  listStyleType: 'none'
})
const StyledLi = styled('li')(({ _status }: { _status: ETokenStatus }) => ({
  marginTop: 10,
  width: '100%',
  height: '10%'
}))

const StyledButton = styled(Button)(({ _status }: { _status: ETokenStatus }) => ({
  backgroundColor: _status === ETokenStatus.Available ? purple[100] : purple[800],
  color: purple[800],
  width: '100%',
  height: '100%',
  '&:hover': {
    backgroundColor: purple[300],
    cursor: 'pointer'
  }
}))

// eslint-disable-next-line react/prop-types
const TokenList = ({ tokenState, updateTokenState }: ITokenList) => {
  const tokenStateList = tokenState.split('')
  const handleUpdateStatus = () => updateTokenState()
  const renderTokens = () => {
    return Array.from(Array(NUMBER_OF_TOKENS).keys()).map(
      (i, index) => {
        const tokenState: ETokenStatus = Number(tokenStateList[index]) ? ETokenStatus.Available : ETokenStatus.Used
        return <StyledLi key={index} _status={tokenState}>
          <StyledButton
            onClick={handleUpdateStatus}
            disabled={tokenState === ETokenStatus.Used}
            _status={tokenState}
          >
            {
              tokenState === ETokenStatus.Available
                ? '1 Move'
                : ''
            }
          </StyledButton>
        </StyledLi>
      }
    )
  }

  return <StyledUl>
    {renderTokens()}
  </StyledUl>
}

export default TokenList
