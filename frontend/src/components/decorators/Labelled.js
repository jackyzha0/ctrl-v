import styled from "styled-components";
import React from "react";

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

const FloatingLabel = (props) => <StyledLabel label={props.label}>
  {props.children}
</StyledLabel>


export const Labelled = ({label, value, children}) => <div>
  <FloatingLabel label={label} value={value} >
    <span>{label}</span>
    {children}
  </FloatingLabel>
</div>