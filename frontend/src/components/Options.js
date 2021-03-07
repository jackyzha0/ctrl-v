import React from 'react';
import styled from 'styled-components'
import { Password, Expiry, Language } from './Inputs'

const Flex = styled.div`
    float: right;
    display: flex;
    flex-direction: row;
    transform: translateY(0.2em);
    
    & > *:not(:first-child) {
      margin-left: 2em;
    }

    @media (max-width: 850px) {
        float: none !important;
    }
`

const OptionsContainer = ({pass, lang, expiry, onPassChange, onLangChange, onExpiryChange}) => {
    return (
        <Flex>
            <Password
                value={pass}
                onChange={onPassChange}
                id="passwordInput" />
            <Language
                value={lang}
                onChange={onLangChange}
                id="langInput" />
            <Expiry
                value={expiry}
                onChange={onExpiryChange}
                id="expiryInput" />
        </Flex>
    );
}

export default OptionsContainer