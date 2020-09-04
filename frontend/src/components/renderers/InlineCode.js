import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { LANGS } from './Code'

const MarkdownCodeRenderer = (props) => {
    return (
        <SyntaxHighlighter
            language={LANGS[props.language]}
            style={atomOneLight}>
            {props.value}
        </SyntaxHighlighter>
    );
};

export default MarkdownCodeRenderer;