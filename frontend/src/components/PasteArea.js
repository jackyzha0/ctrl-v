import React from 'react';
import { TitleInput, PasteInput } from './Inputs'
import OptionsContainer from './Options'

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

    handleSubmit(event) {
        console.log(`title: ${this.state.title}`)
        console.log(`content: ${this.state.content}`)
        console.log(`pass: ${this.state.pass}`)
        console.log(`expiry: ${this.state.expiry}`)
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