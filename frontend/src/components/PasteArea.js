import React from 'react';
import { TitleInput, PasteInput } from './Inputs'
import OptionsContainer from './Options'
import axios from 'axios';

class PasteArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            title: '',
            content: '',
            pass: '',
            expiry: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    parseExpiry(e) {
        var cur = new Date();
        var inSeconds = 0
        switch (e) {
            case '5 years':
                inSeconds = 600 * 6 * 24 * 7 * 4 * 12 * 5
                break;
            case '1 year':
                inSeconds = 600 * 6 * 24 * 7 * 4 * 12
                break;
            case '1 month':
                inSeconds = 600 * 6 * 24 * 7 * 4
                break;
            case '1 day':
                inSeconds = 600 * 6 * 24
                break;
            case '1 hour':
                inSeconds = 600 * 6
                break;
            case '10 min':
                inSeconds = 600
                break;
            case '1 week':
            default:
                inSeconds = 600 * 6 * 24 * 7
                break;
        }
        return new Date(cur.getTime() + inSeconds * 1000).toISOString();
    }

    handleSubmit(event) {
        var bodyFormData = new FormData();
        bodyFormData.set('title', this.state.title);
        bodyFormData.set('content', this.state.content);
        bodyFormData.set('password', this.state.pass);
        bodyFormData.set('expiry', this.parseExpiry(this.state.expiry));

        axios({
            method: 'post',
            url: 'http://localhost:8080/api',
            data: bodyFormData,
            headers: { 'Content-Type': 'multipart/form-data' },
        }).then(function (response) {
            //handle success
            console.log(response);
        }).catch(function (response) {
            //handle error
            console.log(response);
        });

        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
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
                <OptionsContainer
                    pass={this.state.pass}
                    expiry={this.state.expiry}
                    onChange={this.handleChange} />
            </form>
        );
    }
}

export default PasteArea