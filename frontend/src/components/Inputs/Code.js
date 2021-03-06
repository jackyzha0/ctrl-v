import React from "react";
import styled from 'styled-components'
import CharLimit from "../decorators/CharLimit";
import Editor from 'react-simple-code-editor';
import {Highlighter} from "../renderers/Code";

const EditorWrapper = styled(Editor)`
  overflow: visible !important;
  
  & > * {
    padding: 0 !important;
    width: 100%;
  }
  
  & pre, & code, & > textarea {
    font-family: JetBrains Mono !important;
    font-size: 14px !important;
    line-height: 1.2em !important;
    min-height: 40vh;
  }
  
  & > textarea {
    padding: 0.8em !important;
    z-index: 1;
    border: none !important;
    background-color: transparent !important;
    outline: none !important;
  }
`

const DefaultText = `Paste your text here`

export const Code = ({content, id, readOnly, setContentCallback, ...props}) => {
  return (
    <div>
      <EditorWrapper
        name="content"
        readOnly={readOnly}
        placeholder={DefaultText}
        value={content}
        id={id}
        required
        highlight={code => <Highlighter theme="atom">{code}</Highlighter> }
        onValueChange={code => setContentCallback(code)}
        padding={15}
      />
      <CharLimit
        content={content}
        maxLength={props.maxLength} />
    </div>
  );
}