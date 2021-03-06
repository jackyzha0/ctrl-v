import styled from "styled-components";
import React from "react";
import FloatingLabel from "../decorators/FloatingLabel";

export const Wrapper = styled.div`
    display: block;
    margin-left: 2em;
`

export const Labelled = ({label, value, children}) => <Wrapper>
  <FloatingLabel label={label} value={value} >
    <span>{label}</span>
    {children}
  </FloatingLabel>
</Wrapper>