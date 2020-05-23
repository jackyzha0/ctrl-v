import React from 'react';
import styled from 'styled-components'
import { FetchPaste } from '../../helpers/httpHelper'

const RawText = styled.pre`
    word-wrap: break-word;
    white-space: pre-wrap;
    line-height: initial;
    font-size: 0.8em;
    padding: 0 1em;
`

class Raw extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            content: '',
        };
    }

    render() {
        return (
            <RawText>
                {this.state.content}
            </RawText>
        );
    }

    componentDidMount() {
        FetchPaste(this.props.hash)
            .then((response) => {
                const data = response.data
                this.setState({ content: data.content })
            }).catch((error) => {
                const resp = error.response

                // catch 401 unauth (password protected)
                if (resp.status === 401) {
                    this.setState({ content: 'err: password protected' })
                    return
                }

                // some weird err
                if (resp !== undefined) {
                    const errTxt = `${resp.statusText}: ${resp.data}`
                    this.setState({ content: errTxt })
                    return
                }

                // some weird err (e.g. network)
                this.setState({ content: error })
            })
    }
}

export default Raw