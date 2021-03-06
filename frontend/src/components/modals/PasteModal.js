import React from 'react';
import Modal from 'react-modal';
import {LeftPad, ModalHeader, modalStyles, RightPad} from './shared'
import { useHistory } from 'react-router-dom';
import { Text } from '../Inputs'
import { useClipboard } from 'use-clipboard-copy';

const PasteModal = (props) => {
    const history = useHistory();
    const fullURL = `${window.location.origin}/${props.hash}`;
    const clipboard = useClipboard({ copiedTimeout: 3000 });
    Modal.setAppElement('body');

    const redir = (e) => {
        e.preventDefault();
        const redirUrl = `/${props.hash}`
        history.push(redirUrl);
    }

    return (
        <Modal
            isOpen={props.hash !== ''}
            style={modalStyles}
            contentLabel="paste created"
        >
            <form onSubmit={redir}>
                <LeftPad>
                    <ModalHeader><span role="img" aria-label="success">📎&nbsp;</span>paste created</ModalHeader>
                </LeftPad>
                    <RightPad>
                        <Text
                            type="text"
                            value={fullURL} 
                            readOnly
                            ref={clipboard.target} />
                    </RightPad>
                <LeftPad>
                    <button 
                        className="lt-button lt-shadow lt-hover"
                        type="submit">
                            view
                    </button>
                    <button 
                        className="lt-button lt-shadow lt-hover"
                        type="button" 
                        onClick={clipboard.copy}>
                            {clipboard.copied ? 'copied' : 'copy url'}
                    </button>
                </LeftPad>
            </form>
        </Modal>
    );
}

export default PasteModal