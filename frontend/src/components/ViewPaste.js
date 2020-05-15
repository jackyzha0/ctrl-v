import React from 'react';
import Error from './Err';
import { TitleInput } from './Inputs';
import CodeRenderer from './renderers/Code'
import PasteInfo from  './PasteInfo';
import PasswordModal from './modals/PasswordModal'
import { FetchPaste, FetchPasswordPaste } from '../helpers/httpHelper'
import { LANGS } from './renderers/Code'

class ViewPaste extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: 'untitled paste',
            content: '',
            hasPass: false,
            enteredPass: '',
            validPass: false,
            expiry: 'no expiry',
            error: '',
            passError: '',
            theme: 'atom',
            language: LANGS.raw,
        };

        this.handleChange = this.handleChange.bind(this);
        this.typedPass = this.typedPass.bind(this);
        this.validatePass = this.validatePass.bind(this);
        this.ErrorLabel = React.createRef();
        this.PasswordModal = React.createRef();
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        console.log(target, name)

        this.setState({
            [name]: target.value
        });
    }

    typedPass(event) {
        this.setState({ enteredPass: event.target.value });
    }

    validatePass(pass) {
        FetchPasswordPaste(this.props.hash, pass)
            .then((response) => {
                this.setState({ validPass: true })
                this.setStateFromData(response.data)
            }).catch((error) => {
                const resp = error.response

                // 401 unauth (bad pass)
                if (resp.status === 401) {
                    this.PasswordModal.current
                        .ErrorLabel.current
                        .showMessage("incorrect pass")
                    return
                }

                // otherwise, just log it lmao
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
            <div>
                <PasswordModal
                    ref={this.PasswordModal}
                    hasPass={this.state.hasPass}
                    validPass={this.state.validPass}
                    value={this.state.enteredPass}
                    onChange={this.typedPass}
                    validateCallback={this.validatePass} />
                <TitleInput
                    value={this.state.title}
                    id="titleInput"
                    readOnly />
                <CodeRenderer
                    content={this.state.content}
                    lang={this.state.language}
                    theme={this.state.theme}
                    id="pasteInput" />
                <PasteInfo
                    lang={this.state.language}
                    theme={this.state.theme}
                    onChange={this.handleChange}
                    expiry={this.state.expiry} />
                <Error ref={this.ErrorLabel} />
            </div>
        );
    }

    fmtDateStr(dateString) {
        const d = new Date(dateString)
        const options = { hour: '2-digit', minute: '2-digit', year: 'numeric', month: 'long', day: 'numeric' }
        return d.toLocaleDateString("en-US", options).toLocaleLowerCase()
    }

    setStateFromData(data) {
        this.setState({
            title: data.title,
            content: data.content,
            expiry: this.fmtDateStr(data.expiry),
        })
    }

    componentDidMount() {
        FetchPaste(this.props.hash)
            .then((response) => {
                const data = response.data
                this.setStateFromData(data)
            }).catch((error) => {
                const resp = error.response

                // catch 401 unauth (password protected)
                if (resp.status === 401) {
                    this.setState({hasPass: true})
                    return
                }

                // some weird err
                if (resp !== undefined) {
                    const errTxt = `${resp.statusText}: ${resp.data}`
                    this.ErrorLabel.current.showMessage(errTxt, -1)
                    return
                }

                // some weird err (e.g. network)
                this.ErrorLabel.current.showMessage(error, -1)
            })
    }
}

export default ViewPaste