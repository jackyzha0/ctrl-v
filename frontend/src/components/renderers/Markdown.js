import React from 'react';
import marked from 'marked';

const getHtml = (markdown) => {
    const rawMarkup = marked(markdown, {sanitize: true})
    return {__html: rawMarkup}
}

const Markdown = (props) => {
    const dangerousHtml = getHtml(props.content)
    return <div dangerouslySetInnerHTML={dangerousHtml} />;
}

export default Markdown