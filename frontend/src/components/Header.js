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
            <h3>pastebin but less ass.</h3>
        </SpacedTitle>
    );
}

export default Header;