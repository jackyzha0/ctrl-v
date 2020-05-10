import React from 'react';
import CharLimit from './CharLimit'
import styled from 'styled-components'
import FloatingLabel from './FloatingLabel'

const CharLimitContainer = styled.div`
    position: relative; 
`

class TitleInput extends React.Component {
    render() {
        return (
            <CharLimitContainer>
                <FloatingLabel
                    label="title"
                    id={this.props.id}
                    value={this.props.value} />
                <input
                    name="title"
                    className="lt-shadow"
                    placeholder="Title"
                    id={this.props.id}
                    type="text"
                    autoFocus
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
                <FloatingLabel
                    label="content"
                    id={this.props.id}
                    value={this.props.content} />
                <textarea
                    name="content"
                    placeholder="Paste your text here"
                    value={this.props.content}
                    id={this.props.id}
                    onChange={this.props.onChange}
                    className="lt-shadow" />
                <CharLimit
                    content={this.props.content}
                    maxLength={this.props.maxLength} />
            </CharLimitContainer>
        );
    }
}

class PassInput extends React.Component {
    render() {
        return (
            <CharLimitContainer>
                <FloatingLabel
                    label="password"
                    id={this.props.id}
                    value={this.props.value} />
                <input
                    name="pass"
                    className="lt-shadow"
                    placeholder="password (optional)"
                    type="password"
                    autoComplete="off"
                    onChange={this.props.onChange}
                    value={this.props.value}
                    id={this.props.id} />
            </CharLimitContainer>
        );
    }
}

export { TitleInput, PasteInput, PassInput }