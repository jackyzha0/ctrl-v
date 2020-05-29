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

const getHtml = (markdown) => {
    const rawMarkup = marked(markdown)
    console.log(rawMarkup)
    return {__html: rawMarkup}
}

const Markdown = (props) => {
    const dangerousHtml = getHtml(props.content)
    return <Content dangerouslySetInnerHTML={dangerousHtml} />;
}

export default Markdown