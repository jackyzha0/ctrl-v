import React from "react";
import styled from 'styled-components'
import CharLimit from "../decorators/CharLimit";
import Editor from 'react-simple-code-editor';
import {Highlighter} from "../renderers/Code";
import {CodeLike, Hover} from "../Common/mixins";

const Wrapper = styled.div`
  display: block;
  position: relative;
  width: calc(100%);
`

const EditorWrapper = styled(Editor)`
  overflow: visible !important;
  position: relative;

  & > * {
    padding: 0 !important;
    width: 100%;
  }
  
  & pre, & code, & > textarea {
    ${CodeLike}
    min-height: 40vh;
  }
  
  & pre {
    z-index: -1 !important;
  }
  
  & > textarea {
    ${Hover}
    padding: 0.6em !important;
    outline: none !important;
  }
`

export const Code = ({content, id, readOnly, setContentCallback, ...props}) => {
  return (
    <Wrapper>
      <EditorWrapper
        name="content"
        readOnly={readOnly}
        placeholder="Paste your text here"
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
    </Wrapper>
  );
}