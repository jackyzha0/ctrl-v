import React from 'react';
import styled from 'styled-components'
import { PassInput, ExpiryInput, LangInput } from './Inputs'

const Flex = styled.div`
    float: right;
    display: flex;
    flex-direction: row;
    transform: translateY(0.2em);

    @media (max-width: 850px) {
        float: none !important;
        transform: translateX(-2em);
    }
`

const OptionsContainer = ({pass, lang, expiry, onPassChange, onLangChange, onExpiryChange}) => {
    return (
        <Flex>
            <PassInput
                value={pass}
                onChange={onPassChange}
                id="passwordInput" />
            <LangInput
                value={lang}
                onChange={onLangChange}
                id="langInput" />
            <ExpiryInput
                value={expiry}
                onChange={onExpiryChange}
                id="expiryInput" />
        </Flex>
    );
}

export default OptionsContainer