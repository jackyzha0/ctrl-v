import React from 'react';
import styled from 'styled-components'
import { useHistory } from 'react-router-dom';
import { ThemeInput } from './Inputs'
import { exportComponentAsJPEG } from "react-component-export-image";

const Bold = styled.span`
    font-weight: 700
`

const StyledDiv = styled.div`
    display: inline-block;
    margin: 2em 0;
`

const Button = styled.button`
    margin-right: 0 !important;
    margin-left: 2em !important;
    height: calc(16px + 1.6em + 2px);
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
    const redirRaw = () => {
        const redirUrl = `/raw/${props.hash}`
        history.push(redirUrl);
    }

    const render = () => {
    }

    const renderable = () => {
        if (props.lang === 'latex') {
            return (
                <Button
                    className="lt-shadow lt-hover"
                    type="button"
                    onClick={render}
                >
                    render
                </Button>
            );
        }
    }

    return (
        <div>
            <Flex>
                <Button
                    className="lt-shadow lt-hover"
                    type="button"
                    onClick={redirRaw}
                >
                    view raw
                </Button>
                <Button
                    className="lt-shadow lt-hover"
                    type="button"
                    onClick={() => exportComponentAsJPEG(props.compref, `paste-${props.hash}.png`)}
                >
                    save png
                </Button>
                {renderable()}
                <ThemeInput
                    value={props.theme}
                    onChange={props.onChange}
                    id="themeInput" />
            </Flex>
            <StyledDiv>
                <SpacedText>
                    <Bold>language:&nbsp;</Bold>{props.lang}
                </SpacedText>
                <SpacedText>
                    <Bold>expires:&nbsp;</Bold>{props.expiry}
                </SpacedText>
                <SpacedText>
                    {props.err}
                </SpacedText>
            </StyledDiv>
        </div>
    );
}

export default PasteInfo