import React from 'react';
import { TitleInput, PasteInput } from './Inputs'

class PasteArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            title: '',
            content: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <TitleInput 
                    onChange={this.handleChange}
                    value={this.state.title} />
                <PasteInput
                    onChange={this.handleChange}
                    content={this.state.content} />
                <br />
                <input className="lt-button lt-shadow lt-hover" type="submit" value="new paste" />
            </form>
        );
    }
}

export default PasteArea