import React from 'react';
import styled from 'styled-components'
import { useHistory } from 'react-router-dom';
import { ThemeInput } from './Inputs'

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

const SpacedText = styled.span`
    margin-right: 1em;
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
                    <SpacedText>
                        <Bold>language:&nbsp;</Bold>{props.lang}
                    </SpacedText>
                    <SpacedText>
                        <Bold>expires:&nbsp;</Bold>{props.expiry}
                    </SpacedText>
                    <SpacedText>
                        {props.err}
                    </SpacedText>
                </ButtonRow>
            </StyledDiv>
        </div>
    );
}

export default PasteInfo