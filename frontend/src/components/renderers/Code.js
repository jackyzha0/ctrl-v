import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneLight, ascetic, atomOneDark, dracula, ocean } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import styled from 'styled-components'

export const THEMES = Object.freeze({
    'atom': atomOneLight,
    'atom dark': atomOneDark,
    'plain': ascetic,
    'dracula': dracula,
    'ocean': ocean,
})

export const LANGS = Object.freeze({
    'latex': 'latex',
    'markdown': 'markdown',
    'auto': 'text',
})

const StyledPre = styled.pre`
  width: 100%;
  font-size: 0.8em;
  min-height: 1.2em;
  border-radius: 3px !important;
  border: 1px solid #565656 !important;
  padding: calc(0.8em - 1px) !important;
  outline: none;
  margin: 1.7em 0;

  & code:first-child {
    margin-right: 10px !important;
    border-radius: 0 !important;
    border-right: 1px solid #11111155 !important;
  }
`

export const Highlighter = ({language, theme, preTag, children}) => <SyntaxHighlighter
  language={LANGS[language]}
  style={THEMES[theme]}
  showLineNumbers
  PreTag={preTag}>
    {children}
</SyntaxHighlighter>

const CodeRenderer = React.forwardRef((props, ref) => {
    const Pre = (props) => <StyledPre {...props} ref={ref} />

    return (
        <div className="lt-shadow">
            <Highlighter
                language={props.lang}
                theme={props.theme}
                preTag={Pre}
            >
                {props.content}
            </Highlighter>
        </div>
    );
});

export default CodeRenderer