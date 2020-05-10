import React from 'react';

class PasteArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            value: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert('paste content: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <textarea placeholder="Paste your text here"
                    value={this.state.value} onChange={this.handleChange} className="lt-shadow"/>
                <br></br>
                <input className="lt-button lt-shadow lt-hover" type="submit" value="new paste" />
            </form>
        );
    }
}

export default PasteArea