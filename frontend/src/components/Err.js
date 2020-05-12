import React from 'react';
import styled from 'styled-components'

const ErrMsg = styled.p`
    display: inline;
    font-weight: 700;
    margin-left: 2em;
    color: #ff3333
`

const Error = (props) => {
    const msg = props.msg.toString().toLowerCase()
    return (
        <ErrMsg> {msg} </ErrMsg>
    );
}

export default Error