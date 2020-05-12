import React from 'react';
import axios from 'axios';
import Error from './Err';
import { TitleInput, PasteInput } from './Inputs';

class ViewPaste extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            content: '',
            hasPass: false,
            expiry: '',
            timestamp: '',
            error: '',
        };
    }
    
    newErr(msg) {
        this.setState({ error: msg })
        setTimeout(() => {
            this.setState({ error: '' })
        }, 3000);
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
                <Error msg={this.state.error} />
            </div>
        );
    }

    componentDidMount() {
        const serverURL = `http://localhost:8080/api/${this.props.hash}`

        axios.get(serverURL)
            .then((response) => {
                const data = response.data
                console.log(data)
                this.setState({
                    title: data.title,
                    content: data.content,
                    expiry: data.expiry,
                    timestamp: data.timestamp
                })
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
            })
    }
}

export default ViewPaste