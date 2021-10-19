import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import { grey } from '@mui/material/colors'

// Create a theme instance.
let theme = createTheme({
  typography: {
    fontFamily: ['Lato', 'sans-serif'].join(',')
  },
  palette: {
    primary: {
      main: '#D100A4FF'
    },
    secondary: {
      main: grey[100]
    },
    background: {
      default: 'transparent'
    }
  }
})

theme = responsiveFontSizes(theme)

export default theme
