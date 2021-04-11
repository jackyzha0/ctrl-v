import React from 'react';
import resolvePaste from "../../http/resolvePaste";
import {CodeLike} from "../../components/Common/mixins";
import styled from 'styled-components'
import NextHead from "../../components/NextHead";

const RawText = styled.pre`
    ${CodeLike}
    padding: 0 1em;
`

export async function getServerSideProps(ctx) {
  const data = await resolvePaste(ctx.params.hash)
  return { props: { ...data } }
}

const Raw = ({error, data}) => {
  return <>
    {!error && <NextHead data={data} />}
    <RawText>
      {data?.content || error}
    </RawText>
  </>
}

export default Raw