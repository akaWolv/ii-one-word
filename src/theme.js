import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import { alpha } from '@mui/material'

// Create a theme instance.
let theme = createTheme({
  typography: {
    fontFamily: ['Proza Libre', 'sans-serif'].join(','),
    color: '#232223'
  },
  palette: {
    primary: {
      main: '#D100A4',
      dark: '#232223',
      light: '#eaeaea',
    },
    secondary: {
      main: '#f28d63',
      dark: '#232223',
      light: '#eaeaea'
    },
    background: {
      default: 'transparent'
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          margin: 0,
          padding: 0,
          // background: 'linear-gradient(45deg, #ff3f96 5%, #ff6a2f 100%) 50% 50%',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          minHeight: '100dvh',
          background: '#f26f99'
        },
        body: {
          minHeight: '100dvh',
          background: 'linear-gradient(45deg, #f26f99 5%, #f28d63 100%) 50% 50%',
        }
      }
    },
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
