import React from 'react';
import axios from 'axios';
import Error from './Err';
import { TitleInput, PasteInput } from './Inputs';
import PasteInfo from  './PasteInfo';

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
            expiry: 'no expiry',
            error: '',
            mode: RENDER_MODES.RAW, 
        };
    }

    newErr(msg, duration = 5000) {
        this.setState({ error: msg })

        // if duration -1, dont clear
        if (duration !== -1) {
            setTimeout(() => {
                this.setState({ error: '' })
            }, duration);
        }
    }

    render() {
        return (
            <div>
                <TitleInput
                    value={this.state.title}
                    id="titleInput"
                    readOnly />
                <PasteInput
                    content={this.state.content}
                    id="pasteInput"
                    readOnly />
                <PasteInfo
                    expiry={this.state.expiry}
                    mode={this.state.mode} />
                <Error msg={this.state.error} />
            </div>
        );
    }

    fmtDateStr(dateString) {
        const d = new Date(dateString)
        const options = { hour: '2-digit', minute: '2-digit', year: 'numeric', month: 'long', day: 'numeric' }
        return d.toLocaleDateString("en-US", options).toLocaleLowerCase()
    }

    componentDidMount() {
        const serverURL = `http://localhost:8080/api/${this.props.hash}`

        axios.get(serverURL)
            .then((response) => {
                const data = response.data
                console.log(this.fmtDateStr(data.expiry))
                this.setState({
                    title: data.title,
                    content: data.content,
                    expiry: this.fmtDateStr(data.expiry),
                })
            }).catch((error) => {
                const resp = error.response

                // some weird err
                if (resp !== undefined) {
                    const errTxt = `${resp.statusText}: ${resp.data}`
                    this.newErr(errTxt, -1)
                } else {
                    // some weird err (e.g. network)
                    this.newErr(error, -1)
                }
            })
    }
}

export default ViewPaste