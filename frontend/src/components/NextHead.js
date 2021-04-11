import Head from 'next/head'

const NextHead = ({data}) => {
  const title = data.title || "untitled paste"
  const description = `${data.content.slice(0, 100)}... expires: ${data.expiry}`
  return (<Head>
    <title>ctrl-v | {title}</title>
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="description" content={description} />
  </Head>)
}

export default NextHead