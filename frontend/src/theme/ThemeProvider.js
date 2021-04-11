import React from 'react'
import { ThemeProvider } from 'styled-components'

const theme = {
  colors: {
    background: '#faf9f5',
    codeHighlight: '#00000008',
    border: '#565656',
    text: '#111111',
    error: '#ee1111',
  },
}

const Provider = ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>

export default Provider