import React from 'react'
import { ThemeProvider } from 'styled-components'

const theme = {
  colors: {
    background: '#faf9f5',
    border: '#565656',
    text: '#111111',
  },
}

export default ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>