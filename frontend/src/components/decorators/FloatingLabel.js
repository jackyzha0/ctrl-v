import React from 'react';
import styled from 'styled-components'

const StyledLabel = styled.label`
  position: relative;
  & > span {
    position: absolute;
    transform: translateY(-0.2em);
    font-weight: 700;
    font-size: 1em;
    opacity: 0.5;
    transition: opacity 0.5s cubic-bezier(.25,.8,.25,1);
  }
  
  &:hover > span {
    opacity: 1;
  }
`

export default (props) => <StyledLabel label={props.label}>
  {props.children}
</StyledLabel>
