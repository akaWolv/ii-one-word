import React from 'react'
import { styled } from '@mui/material/styles'
import { Check } from '@mui/icons-material'
import { Button } from '@mui/material'
import { ETokenStatus } from 'src/interfaces/ETokenStatus'
import router from 'next/router'

const StyledUl = styled('ul')({
  width: '100%',
  height: '100%',
  listStyleType: 'none',
  display: 'flex',
  alignContent: 'center',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  margin: 0,
  padding: 5,
  gap: 5
})
const StyledLi = styled('li')(({ _status }: { _status: ETokenStatus }) => ({
  width: '100%',
  height: '10%'
}))

interface Props {
  tokenState: string
  getUpdateTokenStateUrl: Function,
  getLastChanceUsedUrl: Function
}

const StyledButton = styled(Button)<{ _status: ETokenStatus }>(({
  _status,
  theme
}) => ({
  width: '100%',
  height: '100%',
  padding: '0 5px',
  fontWeight: 'bold',
  backdropFilter: _status === ETokenStatus.Available ? 'saturate(150%)' : 'saturate(90%)',
  '&:hover': {
    backdropFilter: 'saturate(150%)',
    cursor: 'pointer'
  }
}))

const TokenList = ({
  tokenState,
  getUpdateTokenStateUrl,
  getLastChanceUsedUrl
}: Props) => {
  const numberOfTokens = tokenState.split('').length
  const tokenStateList = tokenState.split('')
  const updateStatusUrl = getUpdateTokenStateUrl()
  const lastChanceUsedUrl = getLastChanceUsedUrl()
  const isLastChance = tokenState.search('1') === -1

  const handleClick = (e: React.MouseEvent, updateStatusUrl: string) => {
    e.preventDefault()
    router.push(updateStatusUrl)
  }
  const renderTokens = () => {
    let isFirstAvailableToken: boolean = true
    return Array.from(Array(numberOfTokens).keys()).map(
      (i, index) => {
        const tokenState: ETokenStatus = Number(tokenStateList[index]) ? ETokenStatus.Available : ETokenStatus.Used
        let opacity = 1
        let availableTokenText = 'Finish Turn'
        let isButtonDisabled = false
        if (tokenState === ETokenStatus.Available) {
          if (isFirstAvailableToken) {
            isFirstAvailableToken = false
          } else {
            opacity = 0.5
            availableTokenText = 'Next turn'
            isButtonDisabled = true
          }
        } else {
          isButtonDisabled = true
        }
        return <StyledLi key={index} _status={tokenState} style={{ opacity }}>
          <StyledButton
            variant='outlined'
            href={updateStatusUrl}
            onClick={(e) => handleClick(e, updateStatusUrl)}
            disabled={isButtonDisabled}
            _status={tokenState}
          >
            {
              tokenState === ETokenStatus.Available
                ? availableTokenText
                : <Check style={{
                  fontSize: 52,
                  color: '#D100A4'
                }} />
            }
          </StyledButton>
        </StyledLi>
      }
    )
  }

  return <StyledUl>
    {renderTokens()}
    <StyledLi key={'last-chance'} _status={ETokenStatus.Available}>
      <StyledButton
        href={lastChanceUsedUrl}
        onClick={(e) => handleClick(e, lastChanceUsedUrl)}
        variant='outlined'
        disabled={!isLastChance}
        _status={isLastChance ? ETokenStatus.Available : ETokenStatus.Used}
      >
        Last Chance!
      </StyledButton>
    </StyledLi>
  </StyledUl>
}

export default TokenList
