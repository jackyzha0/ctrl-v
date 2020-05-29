import React from 'react';
import { TitleInput, PasteInput } from './Inputs'
import OptionsContainer from './Options'
import Error from './Err'
import { PostNewPaste } from '../helpers/httpHelper'
import PasteModal from './modals/PasteModal'
import { LANGS } from './renderers/Code'
import styled from 'styled-components'
import CodeRenderer from './renderers/Code'
import Latex from './renderers/Latex'
import Markdown from './renderers/Markdown'

const Button = styled.button`
    margin-right: 0 !important;
    margin-left: 2em !important;
    height: calc(16px + 1.6em + 2px);
`

const Flex = styled.div`
    display: flex;
    flex-direction: row;
`

const FlexLeft = styled.div`
    flex: 0 0 calc(50% - 1em - 2px);
`

const FlexRight = styled.div`
    flex: 0 0 50%;
    max-width: calc(50% - 1em + 2px);
    margin-left: 2em;
`

const LatexWrapper = styled.div`
    margin: 2em;
`

class NewPaste extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            title: '',
            content: '',
            pass: '',
            language: LANGS.raw,
            expiry: '',
            hash: '',
            error: '',
            preview: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.togglePreview = this.togglePreview.bind(this);
        this.renderPreview = this.renderPreview.bind(this);
        this.insertTab = this.insertTab.bind(this);
        this.ErrorLabel = React.createRef();
    }

    componentDidUpdate() {
        if (this.state.title === "") {
            document.title = `ctrl-v`;
        } else {
            document.title = `ctrl-v | ${this.state.title}`;
        }
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;

        this.setState({
            [name]: target.value
        });
    }

    togglePreview() {
        const state = this.state.preview
        this.setState({ preview: !state })
    }

    handleSubmit(event) {
        event.preventDefault();

        // prevent resubmission
        if (!this.state.hash) {
            PostNewPaste(this.state)
                .then((response) => {
                    // on success, redir
                    this.setState({ hash: response.data.hash })
                }).catch((error) => {
                    const resp = error.response
    
                    // some weird err
                    if (resp !== undefined) {
                        const errTxt = `${resp.status}: ${resp.data}`
                        this.ErrorLabel.current.showMessage(errTxt)
                    } else {
                        // some weird err (e.g. network)
                        this.ErrorLabel.current.showMessage(error)
                    }
                });
        }
    }

    insertTab(start, end) {
        const oldContent = this.state.content
        this.setState({
            content: oldContent.substring(0, start) + '    ' + oldContent.substring(end)
        })
    }

    renderPreview() {
        const pasteInput = <PasteInput
            onChange={this.handleChange}
            insertTabCallback={this.insertTab}
            content={this.state.content}
            maxLength="100000"
            id="pasteInput" />

        var preview
        switch (this.state.language) {
            case 'latex':
                preview = 
                    <LatexWrapper>
                        <Latex
                            content={this.state.content} />
                    </LatexWrapper>
                break
            case 'markdown':
                preview = 
                    <LatexWrapper>
                        <Markdown
                            content={this.state.content} />
                    </LatexWrapper>
                break
            default:
                preview = 
                    <CodeRenderer
                        lang={this.state.language}
                        theme='atom'
                        content={this.state.content} />
        }

        if (this.state.preview) {
            return (
                <Flex>
                    <FlexLeft>
                        {pasteInput}
                    </FlexLeft>
                    <FlexRight className='preview' >
                        {preview}
                    </FlexRight>
                </Flex>
            );
        } else {
            return (
                pasteInput
            );
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <PasteModal hash={this.state.hash} />
                <TitleInput
                    onChange={this.handleChange}
                    value={this.state.title}
                    maxLength="100"
                    id="titleInput" />
                {this.renderPreview()}
                <OptionsContainer
                    pass={this.state.pass}
                    expiry={this.state.expiry}
                    lang={this.state.language}
                    onChange={this.handleChange} />
                <input className="lt-button lt-shadow lt-hover" type="submit" value="new paste" />
                <Button
                    className="lt-shadow lt-hover"
                    type="button"
                    onClick={this.togglePreview} >
                    preview
                </Button>
                <br />
                <Error ref={this.ErrorLabel} />
            </form>
        );
    }
}

export default NewPaste