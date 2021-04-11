import React from 'react';
import styled from 'styled-components'
import { Theme } from './Inputs'
import {Button} from "./Common/Button";
import {useRouter} from "next/router";
import {ErrMsg} from "./Err";

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

const SpacedText = styled.span`
    margin-right: 1em;
`

const Flex = styled.div`
    float: right;
    display: flex;
    flex-direction: row;
`

const PasteInfo = ({hash, lang, theme, expiry, toggleRenderCallback, isRenderMode, onChange, err}) => {
    const router = useRouter()
    const redirRaw = () => {
        const redirUrl = `/raw/${hash}`
        router.push(redirUrl);
    }

    const renderable = () => {
        const buttonTxt = isRenderMode ? 'text' : 'render'
        if (lang === 'latex' || lang === 'markdown') {
            return (
                <ShiftedButton
                    secondary
                    type="button"
                    onClick={toggleRenderCallback}>
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
                {renderable()}
                <Theme
                    value={theme}
                    onChange={onChange}
                    id="themeInput" />
            </Flex>
            <StyledDiv>
                {err ?
                  <ErrMsg active> {err} </ErrMsg> :
                  <>
                    <SpacedText>
                      <Bold>language:&nbsp;</Bold>{lang}
                    </SpacedText>
                    <SpacedText>
                      <Bold>expires:&nbsp;</Bold>{expiry}
                    </SpacedText>
                  </>
                }
            </StyledDiv>
        </div>
    );
}

export default PasteInfo