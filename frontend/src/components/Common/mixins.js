import {css} from 'styled-components';

export const DropShadow = css`
  box-shadow: 0 14px 28px rgba(27, 33, 48,0.06), 0 10px 10px rgba(27, 33, 48,0.02);
`

export const Hover = css`
  opacity: 0.5;
  transition: all 0.5s cubic-bezier(.25,.8,.25,1);
  
  & ~ pre {
    transition: all 0.5s cubic-bezier(.25,.8,.25,1);
    opacity: 0.5;
  }
  
  &:focus, &:hover, &:focus span, &:focus ~ pre {
    opacity: 1;
  }
`

export const Rounded = css`
  border-radius: 3px;
`

export const Border = css`
  border: 1px solid ${p => p.theme.colors.border};
`

export const InputLike = css`
  ${Hover}
  font-family: 'JetBrains Mono', monospace;
  width: 100%;
  font-size: 0.8em;
  padding: 0.6em;
  outline: none;
  margin: 1.7em 0;
`

export const CodeLike = css`
  font-family: JetBrains Mono !important;
  font-size: 13px !important;
  line-height: 1.6em !important;
  white-space: pre-wrap;
`

export const ButtonLike = css`
  font-family: 'JetBrains Mono', serif;
  font-weight: 700;
  padding: 0.6em 1.5em;
  margin: 2em 0;
  outline: 0;
`