import React from 'react';
import Modal from 'react-modal';
import { LeftPad, ModalHeader, RightPad } from './shared'
import { useHistory } from 'react-router-dom';
import { PasteURLInput } from '../Inputs'
import { useClipboard } from 'use-clipboard-copy';

const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '500px',
        height: '250px',
        border: '1px solid #11111188'
    }
};

const PasteModal = (props) => {
    const history = useHistory();
    const fullURL = `https://ctrl-v.app${props.hash}`;
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
                        <PasteURLInput 
                            id="paste_modal"
                            fullURL={fullURL} />
                        <input 
                            hidden
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