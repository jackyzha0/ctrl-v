import React from 'react';
import styled from 'styled-components'
import {CodeLike} from "../Common/mixins";
import useFetchPaste from "../hooks/useFetchPaste";

const RawText = styled.pre`
    ${CodeLike}
    padding: 0 1em;
`

const Raw = ({hash}) => {
    const { err, result } = useFetchPaste(hash)
    return <RawText>{result?.content || err}</RawText>
}

export default Raw