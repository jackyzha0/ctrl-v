import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { LANGS } from './Code'

const MarkdownCodeRenderer = ({language, value}) => {

    return (
        <SyntaxHighlighter
            language={(language in LANGS) ? LANGS[language] : 'text'}
            style={atomOneDark}>
            {value ?? ''}
        </SyntaxHighlighter>
    );
};

export default MarkdownCodeRenderer;