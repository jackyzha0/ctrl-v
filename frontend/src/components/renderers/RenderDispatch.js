import React from 'react';
import styled from 'styled-components'
import Latex from './Latex'
import Markdown from './Markdown'
import CodeRenderer from './Code'

const RenderWrapper = styled.div`
    padding: 1em;
`

const RenderDispatch = (props) => {
    switch (props.language) {
        case 'latex':
            return (
                <RenderWrapper>
                    <Latex content={props.content} />
                </RenderWrapper>)
        case 'markdown':
            return (
                <RenderWrapper className="md" >
                    <Markdown content={props.content} />
                </RenderWrapper>)
        default:
            return (
                <CodeRenderer
                    content={props.content}
                    lang={props.language}
                    theme={props.theme}
                    id="pasteInput" />)
    }
};

export default RenderDispatch