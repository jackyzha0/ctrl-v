import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  body {
      margin: 0;
      padding: 0;
      background: ${(p) => p.theme.colors.background};
      font-family: 'JetBrains Mono', monospace;
      color: ${(p) => p.theme.colors.text};
  }
  
  @media all and (max-width: 1000px) {
    .lt-content-column {
        padding: 0 calc(5vw + 1em) 0 5vw !important;
    }
  }
`