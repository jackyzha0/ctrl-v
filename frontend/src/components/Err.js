import React from 'react';
import styled, { css } from 'styled-components'

export const ErrMsg = styled.p`
    display: inline;
    font-weight: 700;
    color: #ff3333;
    opacity: 0;
    transition: opacity 0.3s cubic-bezier(.25,.8,.25,1);

    ${props => 
        (props.active) && css`
            opacity: 1
        `
    };
`

class Error extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            active: false,
            msg: '&nbsp;',
        };

        this.showMessage = this.showMessage.bind(this);
    }

    showMessage(msg, duration = 3000) {
        this.setState({ 
            active: true,
            msg: msg
        })

        // fadeout after duration ms if duration != -1
        if (duration !== -1) {
            setTimeout(() => {
                this.setState({ active: false })
            }, duration);
        }
    }

    render() {
        const msg = this.state.msg.toString().toLowerCase()
        return (
            <ErrMsg active={this.state.active}> {msg} </ErrMsg>
        );
    }
}

export default Error