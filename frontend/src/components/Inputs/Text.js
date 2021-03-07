import CharLimit from "../decorators/CharLimit";
import React from "react";
import {Labelled} from "../decorators/Labelled";
import {Input} from "../Common/Input";

export const Text = React.forwardRef(({label, id, readOnly, onChange, value, maxLength, autoFocus}, ref) => {
  return (
    <Labelled label={label} value={value}>
      <Input
        ref={ref}
        name={label}
        readOnly={readOnly}
        placeholder="Title"
        id={id}
        type="text"
        autoFocus={autoFocus}
        autoComplete="off"
        onChange={onChange}
        value={value} />
      <CharLimit
        content={value}
        maxLength={maxLength} />
    </Labelled>
  );
})