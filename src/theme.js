import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import { alpha } from '@mui/material'

// Create a theme instance.
let theme = createTheme({
  typography: {
    // fontFamily: ['Lato', 'sans-serif'].join(',')
    fontFamily: ['Proza Libre', 'sans-serif'].join(','),
    color: '#232223'
  },
  palette: {
    primary: {
      // main: '#D100A4FF'
      main: '#D100A4',
      dark: '#232223',
      light: '#eaeaea',
    },
    secondary: {
      main: '#2fffeb',
      dark: '#232223',
      light: '#eaeaea'
    },
    background: {
      default: 'transparent'
    }
  },
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          // Some CSS
          fontSize: '2rem',
          backdropFilter: 'saturate(150%)',
          color: '#eaeaea'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backdropFilter: 'saturate(150%)',
          color: '#eaeaea',
          borderColor: alpha('#eaeaea', 0.6),
          '&:hover': {
            backdropFilter: 'saturate(200%)',
            borderColor: '#eaeaea',
            textDecoration: `underline ${alpha('#eaeaea', 0.6)}`
          }
        },
      },
    },
  }
})

theme = responsiveFontSizes(theme)

export default theme
