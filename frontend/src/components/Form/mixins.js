import {css} from 'styled-components';

export const DropShadow = css`
  box-shadow: 0 14px 28px rgba(27, 33, 48,0.06), 0 10px 10px rgba(27, 33, 48,0.02);
`

export const Rounded = css`
  border-radius: 3px;
`

export const Border = css`
  border: 1px solid ${p => p.theme.colors.border};
`

export const InputLike = css`
  font-family: 'JetBrains Mono', monospace;
  width: 100%;
  font-size: 0.8em;
  padding: 0.6em;
  outline: none;
  margin: 1.7em 0;
`

export const ButtonLike = css`
  font-family: 'JetBrains Mono', serif;
  font-weight: 700;
  padding: 0.8em 2em;
  margin: 2em 0;
  outline: 0;
`