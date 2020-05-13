import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components'
import { PassInput } from './Inputs'
import Error from './Err';

const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '400px',
        height: '250px',
        border: '1px solid #11111188'
    }
};

const PassProtected = styled.h3`
    font-weight: 700
`

const RightPad = styled.div`
    margin-right: 3em;
`

const LeftPad = styled.div`
    margin-left: 2em;
`

class PasswordModal extends React.Component {

    componentWillMount() {
        Modal.setAppElement('body');
    }

    constructor(props) {
        super(props);

        this.submitPassword = this.submitPassword.bind(this);
    }

    submitPassword(event) {
        const password = this.props.value
        this.props.validateCallback(password)
        event.preventDefault();
    }

    render() {
        return(
            <Modal
                isOpen={this.props.hasPass && !this.props.validPass}
                style={modalStyles}
                contentLabel="enter paste password"
                classNames
            >
                <form onSubmit={this.submitPassword}>
                    <LeftPad>
                        <PassProtected><span role="img" aria-label="warning">🚧&nbsp;</span>err: password protected</PassProtected>
                    </LeftPad>
                    <RightPad>
                        <PassInput
                            value={this.props.value}
                            onChange={this.props.onChange} />
                    </RightPad>
                    <LeftPad>
                        <input className="lt-button lt-shadow lt-hover" type="submit" value="continue" />
                        <Error msg={this.props.error} />
                    </LeftPad>
                </form>
            </Modal>
        );
    }
}

export default PasswordModal