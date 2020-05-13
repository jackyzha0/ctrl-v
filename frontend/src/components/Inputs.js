import React from 'react';
import CharLimit from './decorators/CharLimit'
import styled from 'styled-components'
import FloatingLabel from './decorators/FloatingLabel'
import Dropdown from 'react-dropdown';

const CharLimitContainer = styled.div`
    position: relative; 
`

const FlexChild = styled.div`
    display: block;
    margin-left: 2em;
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
                    readOnly={this.props.readOnly}
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
                    readOnly={this.props.readOnly}
                    placeholder="Paste your text here"
                    value={this.props.content}
                    id={this.props.id}
                    required
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
            <FlexChild>
                <CharLimitContainer>
                    <FloatingLabel
                        label="password"
                        id={this.props.id}
                        value={this.props.value} />
                    <input
                        name="pass"
                        className="lt-shadow"
                        placeholder="password"
                        type="password"
                        autoComplete="off"
                        onChange={this.props.onChange}
                        value={this.props.value}
                        id={this.props.id} />
                </CharLimitContainer>
            </FlexChild>
        );
    }
}

class ExpiryInput extends React.Component {
    
    _onSelect(option) {
        this.callBackRef({target: {
            name: 'expiry',
            value: option.label
        }});
    }

    render() {
        const options = [
            '5 years',
            '1 year', 
            '1 month',
            '1 week',
            '1 day',
            '1 hour',
            '10 min',
        ];

        return (
            <FlexChild>
                <Dropdown 
                    options={options} 
                    onChange={this._onSelect} 
                    callBackRef={this.props.onChange}
                    value={this.props.value} 
                    placeholder="1 week"
                    id={this.props.id} />
                <FloatingLabel
                    label="expiry"
                    id={this.props.id}
                    value={this.props.value} />
            </FlexChild>
        );
    }
}

export { TitleInput, PasteInput, PassInput, ExpiryInput }