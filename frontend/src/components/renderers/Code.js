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
    'go': 'go',
    'python': 'python',
    'js': 'javascript',
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