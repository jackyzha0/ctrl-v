import styled, {css} from 'styled-components'
import {Border, ButtonLike, DropShadow, Rounded} from "./mixins";

const Base = css`
  ${DropShadow}
  ${Rounded}
  ${ButtonLike}
  margin-right: 2em;
  height: calc(16px + 1.4em);
  cursor: pointer;
`

const Primary = css`
  ${Base};
  border: none;
  color: ${p => p.theme.colors.background};
  background-color: ${p => p.theme.colors.text};
`
const Secondary = css`
  ${Base};
  ${Border};
  color: ${p => p.theme.colors.text};
  background-color: ${p => p.theme.colors.background};
`

export const Button = styled.button`
  ${p => p.secondary ? css`${Secondary}` : css`${Primary}`  }
`

export const SubmitButton = styled.input`
  ${Primary}
`