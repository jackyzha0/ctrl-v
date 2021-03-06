import React from "react";
import {Labelled} from "./shared";

export const Password = (props) => <Labelled label="password">
  <input
    name="pass"
    className="lt-shadow"
    placeholder="password"
    type="password"
    autoComplete="off"
    onChange={props.onChange}
    value={props.value}
    id={props.id} />
</Labelled>