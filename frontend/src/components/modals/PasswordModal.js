import React, { useRef } from 'react';
import Modal from 'react-modal';
import { Password } from '../Inputs'
import {ModalHeader, modalStyles, Form} from './shared'
import Error from '../Err';
import {SubmitButton} from "../Common/Button";

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
            <Form onSubmit={submitPassword}>
                <ModalHeader><span role="img" aria-label="warning">🚧&nbsp;</span>err: password protected</ModalHeader>
                <Password
                    placeholder="hunter2"
                    value={props.value}
                    onChange={props.onChange} />
                <SubmitButton type="submit" value="continue" />
                <Error ref={ErrorLabel} />
            </Form>
        </Modal>
    );
}

export default PasswordModal