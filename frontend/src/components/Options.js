import React from "react";
import styled from "styled-components";
import { Password, Expiry, Language } from "./Inputs";

const Flex = styled.div`
  float: right;
  display: flex;
  flex-direction: row;
  transform: translateY(0.2em);

  @media (min-width: 650px) {
    & > *:not(:first-child) {
      margin-left: 2em;
    }
  }

  @media (max-width: 650px) {
    position: relative;
    float: none !important;
    flex-direction: column;
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
