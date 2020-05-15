import React from 'react';
import CharLimit from './decorators/CharLimit'
import styled from 'styled-components'
import FloatingLabel from './decorators/FloatingLabel'
import Dropdown from 'react-dropdown';
import { LANGS, THEMES } from './renderers/Code';

const RelPositioning = styled.div`
    position: relative; 
`

const FlexChild = styled.div`
    display: block;
    margin-left: 2em;
`

class TitleInput extends React.Component {
    render() {
        return (
            <RelPositioning>
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
            </RelPositioning>
        );
    }
}

class PasteInput extends React.Component {
    render() {
        return (
            <RelPositioning>
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
            </RelPositioning>
        );
    }
}

class PassInput extends React.Component {
    render() {
        return (
            <FlexChild>
                <RelPositioning>
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
                </RelPositioning>
            </FlexChild>
        );
    }
}

class GenericDropdown extends React.Component {

    constructor(props) {
        super(props)

        this._onSelect = this._onSelect.bind(this)
    }

    _onSelect(option) {
        this.props.onChange({
            target: {
                name: this.props.label,
                value: option.label
            }
        });
    }

    render() {
        return (
            <FlexChild>
                <Dropdown
                    options={this.props.options}
                    onChange={this._onSelect}
                    callBackRef={this.props.onChange}
                    value={this.props.value}
                    placeholder={this.props.placeholder}
                    id={this.props.id} />
                <FloatingLabel
                    label={this.props.label}
                    id={this.props.id}
                    value={this.props.value} />
            </FlexChild>
        );
    }
}

const ExpiryInput = (props) => {
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
        <GenericDropdown 
            {...props}
            options={options}
            placeholder='1 week'
            label='expiry'
        />
    );
}

const LangInput = (props) => {
    const options = Object.entries(LANGS).map((key, _) => {
        return {
            'value': key[1],
            'label': key[0]
        }
    })

    return (
        <GenericDropdown
            {...props}
            options={options}
            placeholder={LANGS.raw}
            label='language'
        />
    );
}

const ThemeInput = (props) => {
    const options = Object.entries(THEMES).map((key, _) => {
        return {
            'value': key[1],
            'label': key[0]
        }
    })

    return (
        <GenericDropdown
            {...props}
            options={options}
            placeholder={'atom'}
            label='theme'
        />
    );
}

class PasteURLInput extends React.Component {
    render() {
        return (
            <FlexChild>
                <RelPositioning>
                    <FloatingLabel
                        label="url"
                        id={this.props.id}
                        value={this.props.id} />
                    <input
                        name="paste_url"
                        className="lt-shadow"
                        type="text"
                        readOnly
                        autoFocus
                        id={this.props.id}
                        value={this.props.fullURL} />
                </RelPositioning>
            </FlexChild>
        );
    }
}

export { TitleInput, PasteInput, PassInput, ExpiryInput, PasteURLInput, LangInput, ThemeInput }