import styled from "styled-components";
import React from "react";
import FloatingLabel from "../decorators/FloatingLabel";

export const RelPositioning = styled.div`
    position: relative; 
    height: calc(100% - 4em);
`

export const FlexChild = styled.div`
    display: block;
    margin-left: 2em;
`

export const Labelled = ({label, value, children}) => {
  console.log(children)
  return (<FlexChild>
    <RelPositioning>
      <FloatingLabel label={label} value={value} >
        <span>{label}</span>
        {children}
      </FloatingLabel>
    </RelPositioning>
  </FlexChild>)
}