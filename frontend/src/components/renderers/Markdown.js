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
    
    h3 {
        font-weight: bold;
    }

    hr {
        border-top: 1px solid ${p => p.theme.colors.text};
        border-style: solid;
    }

    code {
        background: ${p => p.theme.colors.codeHighlight};
        font-size: 0.8em;
    }
    
    pre {
        padding: 0.7em;
        background: ${p => p.theme.colors.codeHighlight};
    }
    
    pre > code {
        background: none;
    }
    
    table {
        width: 100%;
    }
    
    code, pre {
        background: none;
        font-family: 'JetBrains Mono', monospace;
        padding: initial;
        border-radius: 3px;
        outline: none;
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