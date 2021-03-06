import React, {useEffect, useRef} from "react";
import * as indentation from "indent-textarea";
import CharLimit from "../decorators/CharLimit";
import {Labelled} from "../decorators/Labelled";

export const Code = ({content, ...props}) => {
  const textInput = useRef(null);

  useEffect(() => {
    indentation.watch(textInput.current);
  }, [textInput])

  return (
    <Labelled
      label="content"
      id={props.id}
      value={content}>
        <textarea
          name="content"
          readOnly={props.readOnly}
          placeholder="Paste your text here"
          value={content}
          id={props.id}
          ref={textInput}
          required
          onChange={props.onChange}
          className="lt-shadow" />
        <CharLimit
          content={content}
          maxLength={props.maxLength} />
    </Labelled>
  );
}