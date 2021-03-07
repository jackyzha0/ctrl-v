import styled from "styled-components";
import React from "react";
import Footer from "./Footer";

const Logo = styled.div`
    position: fixed;
    bottom: 1em;
    left: 2em;
    opacity: 0.3;
    transition: opacity 0.5s cubic-bezier(.25,.8,.25,1);
    
    &:hover {
        opacity: 1;
    }

    & > h1 {
        font-size: 50px;
        margin: 0 0;
      
        & > a {
            text-decoration: none;
            position: relative;
            color: ${p => p.theme.colors.text};
        }
    }
`
export const Watermark = () => <Logo>
    <h1>
        <a href="https://github.com/jackyzha0/ctrl-v">ctrl-v</a>
    </h1>
    <Footer />
</Logo>