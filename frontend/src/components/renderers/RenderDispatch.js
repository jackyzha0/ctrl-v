import React from 'react';
import styled from 'styled-components'
import Latex from './Latex'
import CodeRenderer from './Code'

const LatexWrapper = styled.div`
    padding: 2em;
`

const RenderDispatch = React.forwardRef((props, ref) => {
    switch (props.language) {
        case 'latex':
            return (
                <LatexWrapper ref={ref}>
                    <Latex
                        content={props.content} />
                </LatexWrapper>)
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