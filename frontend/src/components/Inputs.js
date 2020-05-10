import React from 'react';

class TitleInput extends React.Component {
    render() {
        return (
            <input
                name="title"
                className="lt-shadow"
                placeholder="Title"
                type="text"
                onChange={this.props.onChange}
                value={this.props.title} />
        );
    }
}

class PasteInput extends React.Component {
    render() {
        return (
            <textarea
                name="content"
                placeholder="Paste your text here"
                value={this.props.content}
                onChange={this.props.onChange}
                className="lt-shadow" />
        );
    }
}

export { TitleInput, PasteInput }