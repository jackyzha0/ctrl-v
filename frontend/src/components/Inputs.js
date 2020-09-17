import React, {useEffect, useRef} from 'react';
import CharLimit from './decorators/CharLimit'
import styled from 'styled-components'
import FloatingLabel from './decorators/FloatingLabel'
import Dropdown from 'react-dropdown';
import { LANGS, THEMES } from './renderers/Code';
import * as indentation from 'indent-textarea';

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

const PasteInput = ({content, ...props}) => {
    const textInput = useRef(null);

    useEffect(() => {
        indentation.watch(textInput.current);
    }, [textInput])

    return (
        <RelPositioning>
            <FloatingLabel
                label="content"
                id={props.id}
                value={content} />
            <textarea
                name="content"
                readOnly={props.readOnly}
                placeholder="Paste your text here"
                value={content}
                id={props.id}
                ref={textInput}
                required
                onChange={props.onChange}
                className="lt-shadow" />
            <CharLimit
                content={content}
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