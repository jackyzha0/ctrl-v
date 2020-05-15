import React from 'react';
import styled from 'styled-components'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneLight, ascetic, atomOneDark, dracula, ocean } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export const THEMES = Object.freeze({
    'atom': atomOneLight,
    'atom dark': atomOneDark,
    'plain': ascetic,
    'dracula': dracula,
    'ocean': ocean,
})

export const LANGS = Object.freeze({
    'go': 'go',
    'python': 'python',
    'javscript': 'javascript',
    'html': 'html',
    'css': 'css',
    'c': 'c',
    'c++': 'cpp',
    'c#': 'cs',
    'ruby': 'ruby',
    'docker': 'dockerfile',
    'bash': 'bash',
    'raw': 'text',
    'java': 'java',
    'lisp': 'lisp',
    'haskell': 'haskell',
    'scala': 'scala',
    'markdown': 'markdown',
    'makefile': 'makefile',
    'php': 'php',
    'latex': 'latex',
    'yaml': 'yaml'
})

const RelPositioning = styled.div`
    position: relative; 
`

const CodeRenderer = (props) => {
    return (
        <RelPositioning>
            <SyntaxHighlighter
                className="codeBlock lt-shadow"
                language={props.lang}
                style={THEMES[props.theme]}
                showLineNumbers >
                {props.content}
            </SyntaxHighlighter>
        </RelPositioning>
    );
};

export default CodeRenderer