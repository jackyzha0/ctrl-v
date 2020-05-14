import React from 'react';
import Modal from 'react-modal';
import { PassInput } from '../Inputs'
import { RightPad, LeftPad, ModalHeader } from './shared'
import Error from '../Err';

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

class PasswordModal extends React.Component {

    componentWillMount() {
        Modal.setAppElement('body');
    }

    constructor(props) {
        super(props);
        this.submitPassword = this.submitPassword.bind(this);
        this.ErrorLabel = React.createRef();
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
            >
                <form onSubmit={this.submitPassword}>
                    <LeftPad>
                        <ModalHeader><span role="img" aria-label="warning">🚧&nbsp;</span>err: password protected</ModalHeader>
                    </LeftPad>
                    <RightPad>
                        <PassInput
                            value={this.props.value}
                            onChange={this.props.onChange} />
                    </RightPad>
                    <LeftPad>
                        <input className="lt-button lt-shadow lt-hover" type="submit" value="continue" />
                        <Error ref={this.ErrorLabel} />
                    </LeftPad>
                </form>
            </Modal>
        );
    }
}

export default PasswordModal