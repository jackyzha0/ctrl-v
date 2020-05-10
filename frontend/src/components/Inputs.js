import React from 'react';
import CharLimit from './CharLimit'
import styled from 'styled-components'

const CharLimitContainer = styled.div`
    position: relative; 
`

class TitleInput extends React.Component {
    render() {
        return (
            <CharLimitContainer>
                <input
                    name="title"
                    className="lt-shadow"
                    placeholder="Title"
                    type="text"
                    autoComplete="off"
                    onChange={this.props.onChange}
                    value={this.props.value} />
                <CharLimit
                    content={this.props.value}
                    maxLength={this.props.maxLength} />
            </CharLimitContainer>
        );
    }
}

class PasteInput extends React.Component {
    render() {
        return (
            <CharLimitContainer>
                <textarea
                    name="content"
                    placeholder="Paste your text here"
                    value={this.props.content}
                    onChange={this.props.onChange}
                    className="lt-shadow" />
                <CharLimit
                    content={this.props.content}
                    maxLength={this.props.maxLength} />
            </CharLimitContainer>
        );
    }
}

export { TitleInput, PasteInput }