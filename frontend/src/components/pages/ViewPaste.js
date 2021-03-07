import React, { useEffect, useState, useRef } from 'react';
import Error from '../Err';
import { Text } from '../Inputs';
import CodeRenderer from '../renderers/Code'
import PasteInfo from '../PasteInfo';
import PasswordModal from '../modals/PasswordModal'
import RenderDispatch from '../renderers/RenderDispatch'
import useFetchPaste from "../hooks/useFetchPaste";

const ViewPaste = (props) => {
    const { err, requiresAuth, validPass, getWithPassword, result } = useFetchPaste(props.hash)
    const {content, language, expiry, title} = result ?? {}
    const [theme, setTheme] = useState('atom');
    const [isRenderMode, setIsRenderMode] = useState(false);
    const [enteredPass, setEnteredPass] = useState('');
    const ErrorLabelRef = useRef(null);

    if (err) {
        ErrorLabelRef.current.showMessage(err, -1)
    }

    useEffect(() => {
        setIsRenderMode(language === 'latex' || language === 'markdown')
    }, [language])

    function getDisplay() {
        return isRenderMode ? <RenderDispatch
          language={language}
          content={content}
        /> : <CodeRenderer
          content={content}
          lang={language}
          theme={theme}
          id="pasteInput" />
    }

    return (
        <div>
            <PasswordModal
                hasPass={requiresAuth}
                validPass={validPass}
                value={enteredPass}
                onChange={(e) => setEnteredPass(e.target.value)}
                validateCallback={getWithPassword} />
            <Text
                label="title"
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
                err={<Error ref={ErrorLabelRef} />}
            />
        </div>
    );
}

export default ViewPaste