import React from 'react';
import Error from './Err';
import { TitleInput, PasteInput } from './Inputs';
import PasteInfo from  './PasteInfo';
import PasswordModal from './PasswordModal'
import { FetchPaste, FetchPasswordPaste } from '../helpers/httpHelper'

const RENDER_MODES = Object.freeze({
    RAW: 'raw text',
    MD: 'markdown',
    LATEX: 'latex',
    CODE: 'code',
})

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
            mode: RENDER_MODES.RAW, 
        };

        this.handleChange = this.handleChange.bind(this);
        this.validatePass = this.validatePass.bind(this);
        this.ErrorLabel = React.createRef();
        this.PasswordModal = React.createRef();
    }

    handleChange(event) {
        this.setState({ enteredPass: event.target.value });
    }

    drawRightMode() {
        switch (this.state.mode) {
            // TODO: add other renderers

            // default render raw
            case RENDER_MODES.RAW:
            default:
                return (<PasteInput
                    content={this.state.content}
                    id="pasteInput"
                    readOnly />);
        }
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
                    onChange={this.handleChange}
                    validateCallback={this.validatePass} />
                <TitleInput
                    value={this.state.title}
                    id="titleInput"
                    readOnly />

                {this.drawRightMode()}

                <PasteInfo
                    expiry={this.state.expiry}
                    mode={this.state.mode} />
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
        console.log(data)
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