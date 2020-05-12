import React from 'react';
import styled from 'styled-components'

const Bold = styled.span`
    font-weight: 700
`

const FloatLeft = styled.p`
    float: left;
    display: inline-block;
    margin: 0;
`
const FloatRight = styled.p`
    float: right;
    display: inline-block;
    margin: 0;
    margin-right: -1em;
`

const PasteInfo = (props) => {
    return (
        <div>
            <FloatLeft><Bold>mode:&nbsp;</Bold>{props.mode}</FloatLeft>
            <FloatRight><Bold>expires:&nbsp;</Bold>{props.expiry}</FloatRight>
        </div>
    );
}

export default PasteInfo