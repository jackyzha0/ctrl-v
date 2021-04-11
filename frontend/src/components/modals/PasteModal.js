import React from 'react';
import Modal from 'react-modal';
import {Form, ModalHeader, modalStyles} from './shared'
import { useRouter } from 'next/router'
import { Text } from '../Inputs'
import { useClipboard } from 'use-clipboard-copy';
import {Button} from "../Common/Button";

const PasteModal = (props) => {
    const fullURL = `https://ctrl-v.app/${props.hash}`;
    const clipboard = useClipboard({ copiedTimeout: 3000 });
    Modal.setAppElement('body');
    const router = useRouter()

    const redir = (e) => {
        e.preventDefault();
        const redirUrl = `/${props.hash}`
        router.push(redirUrl);
    }

    return (
        <Modal
            isOpen={props.hash !== ''}
            style={modalStyles}
            contentLabel="paste created"
        >
            <Form onSubmit={redir}>
                <ModalHeader>
                    <span role="img" aria-label="success">📎&nbsp;</span>paste created
                </ModalHeader>
                <Text
                    label="url"
                    type="text"
                    value={fullURL}
                    readOnly
                    ref={clipboard.target} />
                <Button
                    type="submit">
                        go to paste
                </Button>
                <Button
                    secondary
                    type="button"
                    onClick={clipboard.copy}>
                        {clipboard.copied ? 'copied' : 'copy url'}
                </Button>
            </Form>
        </Modal>
    );
}

export default PasteModal