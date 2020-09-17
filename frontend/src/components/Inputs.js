import React, {useRef} from 'react';
import CharLimit from './decorators/CharLimit'
import styled from 'styled-components'
import FloatingLabel from './decorators/FloatingLabel'
import Dropdown from 'react-dropdown';
import { LANGS, THEMES } from './renderers/Code';

const RelPositioning = styled.div`
    position: relative; 
    height: calc(100% - 4em);
`

const FlexChild = styled.div`
    display: block;
    margin-left: 2em;
`

const TitleInput = (props) => {
    return (
        <RelPositioning>
            <FloatingLabel
                label="title"
                id={props.id}
                value={props.value} />
            <input
                name="title"
                readOnly={props.readOnly}
                className="lt-shadow"
                placeholder="Title"
                id={props.id}
                type="text"
                autoFocus
                autoComplete="off"
                onChange={props.onChange}
                value={props.value} />
            <CharLimit
                content={props.value}
                maxLength={props.maxLength} />
        </RelPositioning>
    );
}

const PasteInput = (props) => {
    const textInput = useRef(null);

    function handleKeyDown(e) {
        if (e.keyCode === 9) { // tab was pressed

            // prevent autofocus on next intput
            e.preventDefault();

            // get selection start and end
            const start = e.target.selectionStart
            const end = e.target.selectionEnd

            props.insertTabCallback(start, end, () => {
                textInput.current.focus()
                textInput.current.selectionStart = textInput.current.selectionEnd + 4
            })
        }
    }

    return (
        <RelPositioning>
            <FloatingLabel
                label="content"
                id={props.id}
                value={props.content} />
            <textarea
                name="content"
                readOnly={props.readOnly}
                placeholder="Paste your text here"
                value={props.content}
                id={props.id}
                ref={textInput}
                required
                onChange={props.onChange}
                onKeyDown={handleKeyDown}
                className="lt-shadow" />
            <CharLimit
                content={props.content}
                maxLength={props.maxLength} />
        </RelPositioning>
    );
}

const PassInput = (props) => {
    return (
        <FlexChild>
            <RelPositioning>
                <FloatingLabel
                    label="password"
                    id={props.id}
                    value={props.value} />
                <input
                    name="pass"
                    className="lt-shadow"
                    placeholder="password"
                    type="password"
                    autoComplete="off"
                    onChange={props.onChange}
                    value={props.value}
                    id={props.id} />
            </RelPositioning>
        </FlexChild>
    );
}

const GenericDropdown = (props) => {
    function _onSelect(option) {
        props.onChange({
            target: {
                name: props.label,
                value: option.label
            }
        });
    }

    return (
        <FlexChild>
            <Dropdown
                options={props.options}
                onChange={_onSelect}
                value={props.value}
                placeholder={props.placeholder}
                id={props.id} />
            <FloatingLabel
                label={props.label}
                id={props.id}
                value={props.value} />
        </FlexChild>
    );
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

const PasteURLInput = ({id, fullURL}) => {
    return (
        <FlexChild>
            <RelPositioning>
                <FloatingLabel
                    label="url"
                    id={id}
                    value={id} />
                <input
                    name="paste_url"
                    className="lt-shadow"
                    type="text"
                    readOnly
                    autoFocus
                    id={id}
                    value={fullURL} />
            </RelPositioning>
        </FlexChild>
    );
}

export { TitleInput, PasteInput, PassInput, ExpiryInput, PasteURLInput, LangInput, ThemeInput }