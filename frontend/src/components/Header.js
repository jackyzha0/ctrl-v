import React from 'react';
import styled from 'styled-components'

const SpacedTitle = styled.div`
    margin-top: 10vh
`

const Header = () => {
    return (
        <SpacedTitle>
            <h1>
                <span role="img" aria-label="clipboard">📋&nbsp;</span>
                ctrl-v
            </h1>
            <h3>a modern, <a href="https://github.com/jackyzha0/ctrl-v" target="_blank" rel="noopener noreferrer">open-source</a> pastebin with latex and markdown rendering support</h3>
        </SpacedTitle>
    );
}

export default Header;