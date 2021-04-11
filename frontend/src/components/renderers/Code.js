import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import virtualizedRenderer from 'react-syntax-highlighter-virtualized-renderer';
import { atomOneLight, ascetic, atomOneDark, dracula, ocean } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import styled from 'styled-components'
import {Border, CodeLike, DropShadow, Rounded} from "../Common/mixins";

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
    'detect': 'text',
})

export const StyledPre = styled.pre`
  ${Rounded};
  ${Border};
  ${DropShadow};
  width: calc(100%);
  padding: calc(0.6em - 1px) !important;
  margin: 1.7em 0;
  position: relative;
  outline: none;
  
  & code {
    ${CodeLike}
  }

  & code:first-child:not(:only-of-type) {
    margin-right: 10px !important;
    border-radius: 0 !important;
    border-right: 1px solid #11111155 !important;
  }
`

const PreWithBr = (props) => (
  <StyledPre {...props}>
    {props.children}
    <br />
  </StyledPre>
)

export const Highlighter = ({language, lineNumbers, theme, pre = StyledPre, children}) => <SyntaxHighlighter
  language={LANGS[language]}
  style={THEMES[theme]}
  showLineNumbers={lineNumbers}
  PreTag={PreWithBr}>
    {children}
</SyntaxHighlighter>

const CodeRenderer = (props) => {
    return (<Highlighter
      lineNumbers={true}
      theme={props.theme}
      renderer={virtualizedRenderer()}
      pre={StyledPre}
    >
      {props.content}
    </Highlighter>)
};

export default CodeRenderer