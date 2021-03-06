import Dropdown from "react-dropdown";
import FloatingLabel from "../decorators/FloatingLabel";
import React from "react";
import {LANGS, THEMES} from "../renderers/Code";
import {FlexChild} from "./shared";

const GenericDropdown = (props) => {
  function _onSelect(option) {
    props.onChange({
      target: {
        name: props.label,
        value: option.label
      }
    });
  }

  return (
    <FlexChild>
      <Dropdown
        options={props.options}
        onChange={_onSelect}
        value={props.value}
        placeholder={props.placeholder}
        id={props.id} />
      <FloatingLabel
        label={props.label}
        id={props.id}
        value={props.value} />
    </FlexChild>
  );
}

export const Expiry = (props) => {
  const options = [
    '5 years',
    '1 year',
    '1 month',
    '1 week',
    '1 day',
    '1 hour',
    '10 min',
  ];

  return (
    <GenericDropdown
      {...props}
      options={options}
      placeholder='1 week'
      label='expiry'
    />
  );
}

export const Language = (props) => {
  const options = Object.entries(LANGS).map((key, _) => ({
    'value': key[1],
    'label': key[0]
  }))

  return (
    <GenericDropdown
      {...props}
      options={options}
      placeholder={LANGS.auto}
      label='language'
    />
  );
}

export const Theme = (props) => {
  const options = Object.entries(THEMES).map((key) => ({
    'value': key[1],
    'label': key[0]
  }))

  return (
    <GenericDropdown
      {...props}
      options={options}
      placeholder={'atom'}
      label='theme'
    />
  );
}