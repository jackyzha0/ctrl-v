import React from 'react';
import styled, { css } from 'styled-components'

const StyledLabel = styled.label`
    position: absolute;
    top: 0.5em;
    font-weight: 700;
    font-size: 1em;
    opacity: 0;
    transition: all 0.5s cubic-bezier(.25,.8,.25,1);

    ${props =>
        (props.value.length > 0) &&
        css`
        top: -0.1em;
        opacity: 1
    `};
`

const FloatingLabel = (props) => {
    return (
        <StyledLabel 
            label={props.label}
            value={props.value}
            className={props.id}
            htmlFor={props.id}>
                {props.label}
        </StyledLabel>
    );
}

export default FloatingLabel