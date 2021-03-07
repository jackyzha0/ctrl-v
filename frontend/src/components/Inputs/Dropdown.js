import Dropdown from "react-dropdown";
import React from "react";
import styled from 'styled-components';
import {LANGS, THEMES} from "../renderers/Code";
import {Labelled} from "../decorators/Labelled";
import {Border, DropShadow, InputLike, Rounded} from "../Common/mixins";

const StyledDropdown = styled(Dropdown)`
  ${Border}
  ${Rounded}
  ${DropShadow}
  ${InputLike}
  cursor: pointer;
  
  & .Dropdown-root {
    cursor: pointer;
    
    &:hover, &.is-open {
      opacity: 1;
    }
  }
  
  & .Dropdown-placeholder {
    width: 5.5em;
  }
  
  & .Dropdown-menu {
    border-top: 1px solid ${p => p.theme.colors.text};
    margin-top: 0.5em;
    bottom: auto;
  }
  
  & .Dropdown-option {
    margin-top: 0.5em;
    transition: all 0.5s cubic-bezier(.25,.8,.25,1);
    
    &:hover {
      font-weight: 700;
      opacity: 0.4;
    }
  }
`

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
    <Labelled
      label={props.label}
      id={props.id}
      value={props.value}>
      <StyledDropdown
        options={props.options}
        onChange={_onSelect}
        value={props.value}
        placeholder={props.placeholder}
        id={props.id} />
    </Labelled>
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
      placeholder='detect'
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
      placeholder='atom'
      label='theme'
    />
  );
}