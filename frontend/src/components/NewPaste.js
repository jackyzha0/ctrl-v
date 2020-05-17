import React from 'react';
import { TitleInput, PasteInput } from './Inputs'
import OptionsContainer from './Options'
import Error from './Err'
import { PostNewPaste } from '../helpers/httpHelper'
import PasteModal from './modals/PasteModal'
import { LANGS } from './renderers/Code'

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
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleSubmit(event) {
        event.preventDefault();
        PostNewPaste(this.state)
            .then((response) => {
                // on success, redir
                this.setState({ hash: response.data.hash })
            }).catch((error) => {
                const resp = error.response

                // some weird err
                if (resp !== undefined) {
                    const errTxt = `${resp.statusText}: ${resp.data}`
                    this.ErrorLabel.current.showMessage(errTxt)
                } else {
                    // some weird err (e.g. network)
                    this.ErrorLabel.current.showMessage(error)
                }
            });
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
                <PasteInput
                    onChange={this.handleChange}
                    content={this.state.content}
                    maxLength="100000"
                    id="pasteInput" />
                <OptionsContainer
                    pass={this.state.pass}
                    expiry={this.state.expiry}
                    lang={this.state.language}
                    onChange={this.handleChange} />
                <input className="lt-button lt-shadow lt-hover" type="submit" value="new paste" />
                <Error ref={this.ErrorLabel} />
            </form>
        );
    }
}

export default NewPaste