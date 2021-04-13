import React from "react";
import styled from "styled-components";
import { Password, Expiry, Language } from "./Inputs";

const Flex = styled.div`
  float: right;
  display: flex;
  flex-direction: row;
  transform: translateY(0.2em);

  & > *:not(:first-child) {
    margin-left: 2em;
  }

  @media (max-width: 850px) {
    position: auto;
    display: inline-flex;
  }
  @media (max-width: 650px) {
    position: relative;
    float: none !important;
    width: 100%;
    display: inline-table;
    text-align: center;
  }
`;

const OptionsContainer = ({
  pass,
  lang,
  expiry,
  onPassChange,
  onLangChange,
  onExpiryChange,
}) => {
  return (
    <Flex>
      <Password value={pass} onChange={onPassChange} id="passwordInput" />
      <Language value={lang} onChange={onLangChange} id="langInput" />
      <Expiry value={expiry} onChange={onExpiryChange} id="expiryInput" />
    </Flex>
  );
};

export default OptionsContainer;
