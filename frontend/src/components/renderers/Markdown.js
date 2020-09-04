import React from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components'

const Content = styled.div`
    max-width: 100%;
    overflow-wrap: anywhere;
    img {
        max-width: 100%;
    }
`
const Markdown = ({content}) => {
    return <Content>
        <ReactMarkdown source={content} />
    </Content>;
}

export default Markdown