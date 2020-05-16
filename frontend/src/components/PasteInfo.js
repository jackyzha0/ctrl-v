import React from 'react';
import styled from 'styled-components'
import { useHistory } from 'react-router-dom';
import { LangInput, ThemeInput } from './Inputs'

const Bold = styled.span`
    font-weight: 700
`

const StyledDiv = styled.div`
    display: inline-block;
`

const Button = styled.button`
    margin-left: 0 !important;
`

const ButtonRow = styled.div`
    display: inline;
`

const Flex = styled.div`
    float: right;
    display: flex;
    flex-direction: row;
    transform: translateY(0.2em);
`

const PasteInfo = (props) => {
    const history = useHistory();
    const redir = () => {
        const redirUrl = `/raw/${props.hash}`
        history.push(redirUrl);
    }

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
                <ButtonRow>
                    <Button 
                        className="lt-shadow lt-hover" 
                        type="button"
                        onClick={redir}
                        >
                        view raw
                    </Button>
                </ButtonRow>
                <Bold>expires:&nbsp;</Bold>{props.expiry}
            </StyledDiv>
        </div>
    );
}

export default PasteInfo