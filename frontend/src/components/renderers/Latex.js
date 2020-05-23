import React from 'react';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

class Latex extends React.Component {
    render() {
        return (
            <BlockMath>
                {this.props.content}
            </BlockMath>
        );
    }
}

export default Latex