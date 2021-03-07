import styled from 'styled-components'
import {Border, DropShadow, InputLike, Rounded} from "./mixins";

export const Input = styled.input`
  ${Border}
  ${Rounded}
  ${DropShadow}
  ${InputLike}
`