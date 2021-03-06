import React from "react";
import {Labelled} from "./shared";
import {Input} from "../Form/Input";

export const Password = (props) => <Labelled label="password">
  <Input
    name="pass"
    placeholder="password"
    type="password"
    autoComplete="off"
    onChange={props.onChange}
    value={props.value}
    id={props.id} />
</Labelled>