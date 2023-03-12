import { styled } from '@mui/material/styles'
import { alpha, Backdrop, Button, Card, CardContent } from '@mui/material'
import { grey } from '@mui/material/colors'

const StyledButton = styled(Button)(({ theme }) => ({
  color: '#fff',
  width: 200,
  backgroundColor: alpha(theme.palette.primary.main, 0.8),
  transitionDelay: '0ms',
  transitionDuration: '100ms',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 1),
    textDecoration: 'underline',
    borderColor: theme.palette.secondary.light
  }
}))

const StyledBackdrop = styled(Backdrop)({
  backgroundColor: 'rgba(0, 0 , 0, 0.6)',
  zIndex: 999,
  transitionDelay: '1s !important'
})

const StyledCustomBackdrop = styled('div')<{ $iswin: boolean }>(({ $iswin }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 1000,
  backdropFilter: `${$iswin ? 'contrast(200%) brightness(30%)' : 'grayscale(100%) brightness(70%)'} blur(2px)`, // contrast(150%) brightness(90%) // hue-rotate(190deg)
  // animation
  animationDuration: '1.5s',
  animationName: 'fadein-GameEnd-StyledBackdrop',
  animationFillMode: 'backwards',
  animationTimingFunction: 'linear',
  '@keyframes fadein-GameEnd-StyledBackdrop': {
    '0%': { transform: 'scale(1)', opacity: 0 },
    '100%': { transform: 'scale(1)', opacity: 1 }
  }
}))

const StyledCard = styled(Card)<{ $iswin: boolean }>(({ $iswin }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '98%',
  height: '96%',
  margin: '1%',
  zIndex: 1001,
  background: (
    $iswin
      ? 'linear-gradient(0deg, rgba(178, 255, 89,1) 60%, rgba(29, 233, 182,1) 100%)'
      : 'linear-gradient(0deg, rgba(255,63,150,1) 60%, rgba(252,0,0,1) 100%)'
  ),
  backdropFilter: 'blur(2px)',
  display: 'flex',
  alignContent: 'center',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  color: ($iswin ? grey[700] : grey[200]),
  // animation
  animationDelay: '1s',
  animationDuration: '0.2s',
  animationName: 'fadein-GameEnd-StyledCard',
  animationFillMode: 'backwards',
  animationTimingFunction: 'ease-out',
  '@keyframes fadein-GameEnd-StyledCard': {
    '0%': { transform: 'scale(0.5)', opacity: 0 },
    '100%': { transform: 'scale(1)', opacity: 1 }
  }
}))

const StyledCardContent = styled(CardContent)({
  flexGrow: 2,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyContent: 'center',
  boxShadow: '0px -15px 30px -25px #111'
})

export { StyledBackdrop, StyledCustomBackdrop, StyledCard, StyledCardContent, StyledButton }
