import React from 'react';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import styled from 'styled-components'

const StyledInlineLatex = styled.div`
    display: block;
    margin-bottom: 0.5em;
`

class Latex extends React.Component {
    render() {
        // split by line break chars (\\, \newline, \break)
        const els = this.props.content.split(/\\\\|\\newline|\\break/)

        // if <=1 lines, just render block
        if (els.length <= 1) {
            return (
                <BlockMath>
                    {this.props.content}
                </BlockMath>
            );
        } else {
            // new inline block for every line
            const blocks = els.map(line => 
                <StyledInlineLatex>
                    <InlineMath>
                        {line}
                    </InlineMath>
                </StyledInlineLatex>
            )

            return blocks;
        }
    }
}

export default Latex