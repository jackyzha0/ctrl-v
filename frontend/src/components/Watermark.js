import styled from "styled-components";
import React from "react";

const Logo = styled.h1`
  position: fixed;
  bottom: 0.3em;
  left: 0.5em;
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