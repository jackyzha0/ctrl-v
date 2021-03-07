import React from 'react';
import styled from 'styled-components'

// show char limit if length > half of max
const Chars = styled.p`
    color: #11111100;
    position: absolute; 
    font-size: 0.8em;
    writing-mode: vertical-rl;
    top: 50%;
    transform: translate(4em, -50%);
    right: 0;
    transition: all 0.5s cubic-bezier(.25,.8,.25,1);

    ${p => ((p.content.length / p.maxLength) > 0.5) && ` color: ${p.theme.colors.text}; `};
    ${p => ((p.content.length / p.maxLength) > 1) && ` color: ${p.theme.colors.error}; `};
`;

const CharLimit = (props) => {
    return (
        <Chars {...props}>{props.maxLength - props.content.length}/{props.maxLength}</Chars>
    );
}

export default CharLimit