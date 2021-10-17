import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import { purple } from '@mui/material/colors'

// Create a theme instance.
let theme = createTheme({
  palette: {
    background: {
      default: 'transparent'
    },
    primary: purple
  }
})

theme = responsiveFontSizes(theme)

export default theme
