import React from 'react';
import styled from 'styled-components'
import { useHistory } from 'react-router-dom';
import { Theme } from './Inputs'
import { exportComponentAsPNG } from "react-component-export-image";
import {Button} from "./Common/Button";

const Bold = styled.span`
    font-weight: 700
`

const StyledDiv = styled.div`
    display: inline-block;
    margin: 2em 0;
`

const ShiftedButton = styled(Button)`
    margin-top: 1.6em !important;
`

const SpacedText = styled.p`
    margin-right: 1em;
`

const Flex = styled.div`
    float: right;
    display: flex;
    flex-direction: row;
`

const PasteInfo = (props) => {
    const history = useHistory();
    const redirRaw = () => {
        const redirUrl = `/raw/${props.hash}`
        history.push(redirUrl);
    }

    const renderable = () => {
        const buttonTxt = props.isRenderMode ? 'text' : 'render'
        if (props.lang === 'latex' || props.lang === 'markdown') {
            return (
                <ShiftedButton
                    secondary
                    type="button"
                    onClick={props.toggleRenderCallback}>
                    {buttonTxt}
                </ShiftedButton>
            );
        }
    }

    return (
        <div>
            <Flex>
                <ShiftedButton
                    secondary
                    type="button"
                    onClick={redirRaw}>
                    view raw
                </ShiftedButton>
                <ShiftedButton
                    secondary
                    type="button"
                    onClick={() => exportComponentAsPNG(props.compref, `paste-${props.hash}.png`)}>
                    save png
                </ShiftedButton>
                {renderable()}
                <Theme
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
            </StyledDiv>
            <br />
            {props.err}
        </div>
    );
}

export default PasteInfo