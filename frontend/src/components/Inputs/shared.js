import styled from "styled-components";
import React from "react";
import FloatingLabel from "../decorators/FloatingLabel";

export const Labelled = ({label, value, children}) => <div>
  <FloatingLabel label={label} value={value} >
    <span>{label}</span>
    {children}
  </FloatingLabel>
</div>