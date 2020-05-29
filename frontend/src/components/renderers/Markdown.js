import React from 'react';
import marked from 'marked';
import styled from 'styled-components'

const Content = styled.div`
    max-width: 100%;
    overflow-wrap: anywhere;
    img {
        max-width: 100%;
    }
`
const Markdown = (props) => {
    const dangerousHtml = {
        __html: marked(props.content)
    }
    return <Content dangerouslySetInnerHTML={dangerousHtml} />;
}

export default Markdown