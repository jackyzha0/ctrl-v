import styled from "styled-components";
import React from "react";

const Logo = styled.h1`
  position: absolute;
  bottom: 0.75em;
  left: 1em;
  opacity: 0.3;
  font-size: 50px;
  margin: 0 0;
  transition: opacity 0.5s cubic-bezier(.25,.8,.25,1);

  & > a {
    text-decoration: none;
    position: relative;
    color: ${p => p.theme.colors.text};
    
  }
  
  &:hover {
    opacity: 1;
  }
`
export const Watermark = () => <Logo>
    <a href="https://github.com/jackyzha0/ctrl-v">ctrl-v</a>
</Logo>