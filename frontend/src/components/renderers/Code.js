import React from 'react';
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
    'bash': 'bash',
    'c': 'c',
    'c++': 'cpp',
    'c#': 'cs',
    'css': 'css',
    'docker': 'dockerfile',
    'go': 'go',
    'haskell': 'haskell',
    'html': 'html',
    'java': 'java',
    'js': 'javascript',
    'latex': 'latex',
    'lisp': 'lisp',
    'makefile': 'makefile',
    'markdown': 'markdown',
    'php': 'php',
    'python': 'python',
    'raw': 'text',
    'ruby': 'ruby',
    'scala': 'scala',
    'yaml': 'yaml'
})

const CodeRenderer = React.forwardRef((props, ref) => {

    const Pre = (props) => {
        return (
            <pre {...props} ref={ref} />
        );
    }

    return (
        <SyntaxHighlighter
            className="codeBlock lt-shadow"
            ref={ref}
            language={props.lang}
            style={THEMES[props.theme]}
            showLineNumbers
            PreTag={Pre}>
            {props.content}
        </SyntaxHighlighter>
    );
});

export default CodeRenderer