import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { FetchPaste } from '../../helpers/httpHelper'
import {CodeLike} from "../Common/mixins";

const RawText = styled.pre`
    ${CodeLike}
    padding: 0 1em;
`

const Raw = ({hash}) => {
    const [content, setContent] = useState('');

    useEffect(() => {
        FetchPaste(hash)
        .then((response) => {
            const data = response.data
            setContent(data.content)
        }).catch((error) => {
            const resp = error.response

            // catch 401 unauth (password protected)
            if (resp.status === 401) {
                setContent('err: password protected')
                return
            }

            // some weird err
            if (resp !== undefined) {
                const errTxt = `${resp.statusText}: ${resp.data}`
                setContent(errTxt)
                return
            }

            // some weird err (e.g. network)
            setContent(error)
    })}, [hash])

    return (
        <RawText>{content}</RawText>
    );
}

export default Raw