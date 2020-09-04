import React from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components'
import MarkdownCodeRenderer from './InlineCode'

const Content = styled.div`
    max-width: 100%;
    overflow-wrap: anywhere;
    img {
        max-width: 100%;
    }
`
const Markdown = ({content}) => {
    return <Content>
        <ReactMarkdown
            source={content}
            linkTarget='_blank'
            renderers={{
                code: MarkdownCodeRenderer,
            }}
        />
    </Content>;
}

export default Markdown