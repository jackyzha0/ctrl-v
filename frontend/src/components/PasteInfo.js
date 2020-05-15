import React from 'react';
import styled from 'styled-components'
import { LangInput, ThemeInput } from './Inputs'

const Bold = styled.span`
    font-weight: 700
`

const StyledDiv = styled.div`
    margin: 2em 0;
    display: inline-block;
`

const Flex = styled.div`
    float: right;
    display: flex;
    flex-direction: row;
    transform: translateY(0.2em);
`

const PasteInfo = (props) => {
    return (
        <div>
            <Flex>
                <LangInput
                    value={props.lang}
                    onChange={props.onChange}
                    id="langInput" />
                <ThemeInput
                    value={props.theme}
                    onChange={props.onChange}
                    id="themeInput" />
            </Flex>
            <StyledDiv>
                <Bold>expires:&nbsp;</Bold>{props.expiry}
            </StyledDiv>
        </div>
    );
}

export default PasteInfo