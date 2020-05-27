import React from 'react';
import styled from 'styled-components'
import { PassInput, ExpiryInput, LangInput } from './Inputs'

const Flex = styled.div`
    float: right;
    display: flex;
    flex-direction: row;
    transform: translateY(0.2em);

    @media (max-width: 850px) {
        float: none !important;
        transform: translateX(-2em);
    }
`

class OptionsContainer extends React.Component {
    render() {
        return (
            <Flex>
                <PassInput
                    value={this.props.pass}
                    onChange={this.props.onChange}
                    id="passwordInput" />
                <LangInput
                    value={this.props.lang}
                    onChange={this.props.onChange}
                    id="langInput" />
                <ExpiryInput
                    value={this.props.expiry}
                    onChange={this.props.onChange}
                    id="expiryInput" />
            </Flex>
        );
    }
}

export default OptionsContainer