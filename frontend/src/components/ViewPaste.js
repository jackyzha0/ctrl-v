import React, { useEffect, useState, useRef } from 'react';
import Error from './Err';
import { TitleInput } from './Inputs';
import CodeRenderer from './renderers/Code'
import PasteInfo from  './PasteInfo';
import PasswordModal from './modals/PasswordModal'
import { FetchPaste, FetchPasswordPaste } from '../helpers/httpHelper'
import { LANGS } from './renderers/Code'
import RenderDispatch from './renderers/RenderDispatch'

function fmtDateStr(dateString) {
    const d = new Date(dateString)
    const options = { hour: '2-digit', minute: '2-digit', year: 'numeric', month: 'long', day: 'numeric' }
    return d.toLocaleDateString("en-US", options).toLocaleLowerCase()
}

const ViewPaste = (props) => {
    const [title, setTitle] = useState('fetching paste...');
    const [content, setContent] = useState('');
    const [hasPass, setHasPass] = useState(false);
    const [enteredPass, setEnteredPass] = useState('');
    const [validPass, setValidPass] = useState(false);
    const [expiry, setExpiry] = useState('');
    const [theme, setTheme] = useState('atom');
    const [isRenderMode, setIsRenderMode] = useState(false);
    const [language, setLanguage] = useState(LANGS.raw);

    const ErrorLabelRef = useRef(null);
    const ComponentRef = useRef(null);

    function validatePass(pass, onErrorCallBack) {
        FetchPasswordPaste(props.hash, pass)
            .then((response) => {
                setValidPass(true)
                setStateFromData(response.data)
            }).catch((error) => {
                const resp = error.response

                // 401 unauth (bad pass)
                if (resp.status === 401) {
                    onErrorCallBack("incorrect pass")
                    return
                }

                // otherwise, just log it lmao
                if (resp !== undefined) {
                    const errTxt = `${resp.status}: ${resp.data}`
                    onErrorCallBack(errTxt)
                } else {
                    // some weird err (e.g. network)
                    onErrorCallBack(error)
                }
            });
    }

    function setStateFromData(data) {
        setTitle(data.title)
        setContent(data.content)
        setLanguage(data.language)
        setExpiry(fmtDateStr(data.expiry))
    }

    useEffect(() => {
        FetchPaste(props.hash)
            .then((response) => {
                setStateFromData(response.data)
            }).catch((error) => {
                const resp = error.response

                // network err
                if (!resp) {
                    ErrorLabelRef.current.showMessage(error)
                    return
                }

                // catch 401 unauth (password protected)
                if (resp.status === 401) {
                    setHasPass(true)
                    return
                }

                // some weird err
                if (resp !== undefined) {
                    const errTxt = `${resp.status}: ${resp.data}`
                    ErrorLabelRef.current.showMessage(errTxt, -1)
                    return
                }

                // some weird err (e.g. network)
                ErrorLabelRef.current.showMessage(error, -1)
            })
    }, [props.hash])

    function getDisplay() {
        if (isRenderMode) {
            return (
                <RenderDispatch
                    language={language}
                    content={content}
                    ref={ComponentRef}
                />
            )
        } else {
            return (
                <CodeRenderer
                    content={content}
                    lang={language}
                    theme={theme}
                    ref={ComponentRef}
                    id="pasteInput" />
            )
        }
    }

    return (
        <div>
            <PasswordModal
                hasPass={hasPass}
                validPass={validPass}
                value={enteredPass}
                onChange={(e) => setEnteredPass(e.target.value)}
                validateCallback={validatePass} />
            <TitleInput
                value={title}
                id="titleInput"
                readOnly />
            {getDisplay()}
            <PasteInfo
                hash={props.hash}
                lang={language}
                theme={theme}
                expiry={expiry}
                toggleRenderCallback={() => setIsRenderMode(!isRenderMode)}
                isRenderMode={isRenderMode}
                onChange={(e) => setTheme(e.target.value)}
                compref={ComponentRef}
                err={<Error ref={ErrorLabelRef} />}
            />
        </div>
    );
}

export default ViewPaste