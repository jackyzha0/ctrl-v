import React from 'react';
import { TitleInput, PasteInput } from './Inputs'
import OptionsContainer from './Options'
import { Redirect } from 'react-router-dom'
import Error from './Err'
import { PostNewPaste } from './httpHelper'

class NewPaste extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            title: '',
            content: '',
            pass: '',
            expiry: '',
            hash: '',
            error: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    newErr(msg, duration = 5000) {
        this.setState({ error: msg })
        setTimeout(() => {
            this.setState({ error: '' })
        }, duration);
    }

    renderRedirect = () => {
        if (this.state.hash !== '') {
            const redirUrl = `/${this.state.hash}`
            return <Redirect to={redirUrl} />
        }
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
                    this.newErr(errTxt)
                } else {
                    // some weird err (e.g. network)
                    this.newErr(error)
                }
            });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {this.renderRedirect()}
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
                <input className="lt-button lt-shadow lt-hover" type="submit" value="new paste" />
                <Error msg={this.state.error} />
                <OptionsContainer
                    pass={this.state.pass}
                    expiry={this.state.expiry}
                    onChange={this.handleChange} />
            </form>
        );
    }
}

export default NewPaste