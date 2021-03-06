import React from "react";
import CharLimit from "../decorators/CharLimit";
import {Labelled} from "../decorators/Labelled";
import Editor from 'react-simple-code-editor';
import {Highlighter} from "../renderers/Code";

export const Code = ({content, id, readOnly, setContentCallback, ...props}) => {
  return (
    <Labelled
      label="content"
      id={id}
      value={content}>
        <Editor
          name="content"
          readOnly={readOnly}
          placeholder="Paste your text here"
          value={content}
          id={id}
          required
          highlight={code => <Highlighter theme="atom">{code}</Highlighter> }
          onValueChange={code => setContentCallback(code)}
          padding={10}
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 12,
          }}
        />
        <CharLimit
          content={content}
          maxLength={props.maxLength} />
    </Labelled>
  );
}