import React from 'react'
import { styled } from '@mui/material/styles'
import { purple } from '@mui/material/colors'
import { Check } from '@mui/icons-material'
import { Button } from '@mui/material'
import { ETokenStatus } from 'src/interfaces/ETokenStatus'
import router from 'next/router'

interface ITokenList {
  tokenState: string
  getUpdateTokenStateUrl: Function
}

const StyledUl = styled('ul')({
  width: '100%',
  height: '100%',
  listStyleType: 'none',
  display: 'flex',
  alignContent: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: 0
})
const StyledLi = styled('li')(({ _status }: { _status: ETokenStatus }) => ({
  marginTop: 5,
  marginBottom: 5,
  width: '100%',
  height: '10%'
}))

const StyledButton = styled(Button)<{ _status: ETokenStatus }>(({ _status, theme }) => ({
  backgroundColor: _status === ETokenStatus.Available ? purple[100] : purple[800],
  color: purple[800],
  width: '100%',
  height: '100%',
  '&:hover': {
    backgroundColor: purple[200],
    cursor: 'pointer'
  }
}))

// eslint-disable-next-line react/prop-types
const TokenList = ({ tokenState, getUpdateTokenStateUrl }: ITokenList) => {
  const numberOfTokens = tokenState.split('').length
  const tokenStateList = tokenState.split('')
  const updateStatusUrl = getUpdateTokenStateUrl()
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    router.push(updateStatusUrl)
  }
  const renderTokens = () => {
    return Array.from(Array(numberOfTokens).keys()).map(
      (i, index) => {
        const tokenState: ETokenStatus = Number(tokenStateList[index]) ? ETokenStatus.Available : ETokenStatus.Used
        return <StyledLi key={index} _status={tokenState}>
          <StyledButton
            href={updateStatusUrl}
            onClick={handleClick}
            disabled={tokenState === ETokenStatus.Used}
            _status={tokenState}
          >
            {
              tokenState === ETokenStatus.Available
                ? 'One Turn'
                : <Check style={{ fontSize: 52 }} />
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
