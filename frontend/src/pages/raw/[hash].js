import React from 'react';
import resolvePaste from "../../http/resolvePaste";
import {CodeLike} from "../../components/Common/mixins";
import styled from 'styled-components'

const RawText = styled.pre`
    ${CodeLike}
    padding: 0 1em;
`

export async function getServerSideProps(ctx) {
  const data = await resolvePaste(ctx.params.hash)

  // Pass data to the page via props
  return { props: { ...data } }
}

const Raw = ({error, data}) => {
  return <RawText>
    {data?.content || error}
  </RawText>
}

export default Raw