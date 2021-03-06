import {css} from 'styled-components';

export const Dropshadow = css`
  box-shadow: 0 14px 28px rgba(27, 33, 48,0.06), 0 10px 10px rgba(27, 33, 48,0.02);
`

export const InputLike = css`
  width: 100%;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8em;
  padding: calc(0.8em - 1px);
  border-radius: 3px;
  border: 1px solid ${p => p.theme.colors.border};
  outline: none;
  margin: 1.7em 0;
`

export const ButtonLike = css`
  font-family: 'JetBrains Mono', serif;
  font-weight: 700;
  padding: 0.8em 2em;
  margin: 2em 0;
  outline: 0;
  
  ${p => p.primary ? `
    color: #faf9f5;
    background-color: #111111;
  ` : `
    color: #faf9f5;
    background-color: #111111;
  `}

`