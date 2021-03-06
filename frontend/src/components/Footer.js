import React from 'react';
import styled from 'styled-components'

const SpacedFooter = styled.div`
    margin: 2em 0;
    & a {
        color: ${p => p.theme.colors.text};
    }
`

const Link = (props) => {
    return (
        <a href={props.link} target="_blank" rel="noopener noreferrer">{props.name}</a>
    );
}

const Footer = () => {
    return (
        <SpacedFooter>
            <p>(c) 2020 &mdash; <Link link="https://jzhao.xyz/" name="jacky" />, <Link link="https://ryanmehri.tech/" name="ryan" /></p>
        </SpacedFooter>
    );
}

export default Footer;