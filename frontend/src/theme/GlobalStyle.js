import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: ${(p) => p.theme.colors.background};
    font-family: 'JetBrains Mono', monospace;
    color: ${(p) => p.theme.colors.text};
  }
`