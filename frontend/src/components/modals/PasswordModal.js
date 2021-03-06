import React, { useRef } from 'react';
import Modal from 'react-modal';
import { Password } from '../Inputs'
import { RightPad, LeftPad, ModalHeader, Padding } from './shared'
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

const PasswordModal = (props) => {
    const ErrorLabel = useRef(null);
    Modal.setAppElement('body');

    function submitPassword(e) {
        e.preventDefault();
        const password = props.value
        props.validateCallback(password, ErrorLabel.current.showMessage)
    }

    return(
        <Modal
            isOpen={props.hasPass && !props.validPass}
            style={modalStyles}
            contentLabel="enter paste password"
        >
            <form onSubmit={submitPassword}>
                <LeftPad>
                    <ModalHeader><span role="img" aria-label="warning">🚧&nbsp;</span>err: password protected</ModalHeader>
                </LeftPad>
                <RightPad>
                    <Password
                        value={props.value}
                        onChange={props.onChange} />
                </RightPad>
                <LeftPad>
                    <input className="lt-button lt-shadow lt-hover" type="submit" value="continue" />
                    <Padding />
                    <Error ref={ErrorLabel} />
                </LeftPad>
            </form>
        </Modal>
    );
}

export default PasswordModal