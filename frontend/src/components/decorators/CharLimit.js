import React from 'react';
import styled, { css } from 'styled-components'

// show char limit if length > half of max
const Chars = styled.p`
    color: #11111100;
    font-family: 'Roboto Mono', monospace;
    position: absolute; 
    font-size: 0.8em;
    writing-mode: vertical-rl;
    top: 50%;
    transform: translate(5em, -50%);
    right: 0;
    transition: all 0.5s cubic-bezier(.25,.8,.25,1);

    ${props =>
        ((props.content.length / props.maxLength) > 0.5) &&
        css`
        color: #111111;
    `};

    ${props =>
        ((props.content.length / props.maxLength) > 1) &&
        css`
        color: #ee1111;
    `};
`;

const CharLimit = (props) => {
    return (
        <Chars {...props} >{props.maxLength - props.content.length}/{props.maxLength}</Chars>
    );
}

export default CharLimit