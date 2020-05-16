import React from 'react';
import { FetchPaste } from '../../helpers/httpHelper'

class Raw extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            content: '',
        };
    }

    render() {
        const styles = {
            wordWrap: "break-word",
            whiteSpace: "pre-wrap",
            lineHeight: "initial", 
            fontSize: "0.8em",
            padding: "0 1em"
        }

        return (
            <pre style={styles}>
                {this.state.content}
            </pre>
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