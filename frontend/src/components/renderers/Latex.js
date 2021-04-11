import React from 'react';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import styled from 'styled-components'

const StyledInlineLatex = styled.div`
    display: block;
    margin-bottom: 1em;
`

const Latex = (props) => {
    // split by \begin{...} and \end{...} flags
    const els = props.content.split(/(\\begin\{.*\}[\s\S]*?\\end\{.*\})/gm).map(line => {
        // line doesnt start with \begin{...}, safe to split on \\
        if (!line.match(/^(\\begin\{.*\})/)) {
            return line.split("\\\\")
        } else {
            return line
        }
    }).flat()

    // if <=1 lines, just render block
    if (els.length <= 1) {
        return (
            <BlockMath>
                {props.content}
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

const StyledLatex = styled(Latex)`
    /* fix weird symbol height in render mode */
    .large-op {
        transform: translateY(-0.55em);
    }
    
    .small-op {
        transform: translateY(-0.1em);
    }
`

export default StyledLatex