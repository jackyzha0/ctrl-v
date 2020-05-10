import React from 'react';
import styled from 'styled-components'
import { PassInput } from './Inputs'

const Float = styled.div`
    float: right; 
`

class OptionsContainer extends React.Component {
    render() {
        return (
            <Float>
                <PassInput
                    value={this.props.pass}
                    onChange={this.props.onChange}
                    id="passwordInput" />
            </Float>
        );
    }
}

export default OptionsContainer