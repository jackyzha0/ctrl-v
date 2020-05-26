import React from 'react';
import styled from 'styled-components'

const SpacedFooter = styled.div`
    margin: 2em 0;
`

const Link = (props) => {
    return (
        <a href={props.link} target="_blank" rel="noopener noreferrer">{props.name}</a>
    );
}

const Footer = () => {
    return (
        <SpacedFooter>
            © 2020 &mdash; <Link link="https://jzhao.xyz/" name="jacky" />, <Link link="https://ryanmehri.tech/" name="ryan" />
        </SpacedFooter>
    );
}

export default Footer;