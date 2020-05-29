import React from 'react';
import styled from 'styled-components'
import Latex from './Latex'
import Markdown from './Markdown'
import CodeRenderer from './Code'

const RenderWrapper = styled.div`
    padding: 2em;
`

const RenderDispatch = React.forwardRef((props, ref) => {
    switch (props.language) {
        case 'latex':
            return (
                <RenderWrapper ref={ref}>
                    <Latex content={props.content} />
                </RenderWrapper>)
        case 'markdown':
            return (
                <RenderWrapper>
                    <Markdown content={props.content} />
                </RenderWrapper>)
        default:
            return (
                <CodeRenderer
                    content={props.content}
                    lang={props.language}
                    theme={props.theme}
                    ref={ref}
                    id="pasteInput" />)
    }
});

export default RenderDispatch