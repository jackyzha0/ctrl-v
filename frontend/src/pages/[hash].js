import React, { useEffect, useState } from 'react';
import { Text } from '../components/Inputs';
import CodeRenderer from '../components/renderers/Code'
import PasteInfo from '../components/PasteInfo';
import PasswordModal from '../components/modals/PasswordModal'
import RenderDispatch from '../components/renderers/RenderDispatch'
import {Watermark} from "../components/Watermark";
import { useRouter } from 'next/router'
import resolvePaste from "../http/resolvePaste";
import NextHead from "../components/NextHead";

export async function getServerSideProps(ctx) {
  const data = await resolvePaste(ctx.params.hash)
  return { props: { ...data } }
}

const ViewPaste = ({data, unauthorized, error}) => {
  const router = useRouter()
  const { hash } = router.query
  const [theme, setTheme] = useState('atom');
  const [isRenderMode, setIsRenderMode] = useState(false);
  const [enteredPass, setEnteredPass] = useState('');
  const [correctPass, setCorrectPass] = useState(!unauthorized);
  const [clientData, setClientData] = useState(data)
  const {content, language, expiry, title} = clientData;

  const getWithPassword = (password, errorCallback) => {
    resolvePaste(hash, password)
      .then(resp => {
        setCorrectPass(true)
        setClientData(resp.data)
      })
      .catch(e => errorCallback(e.response.data))
  }

  useEffect(() => {
    setIsRenderMode(language === 'latex' || language === 'markdown')
  }, [language])

  function getDisplay() {
    return isRenderMode ? <RenderDispatch
      language={language}
      content={content}
    /> : <CodeRenderer
      content={content}
      lang={language}
      theme={theme}
      id="pasteInput" />
  }

  return (
    <div>
      {!error && <NextHead data={data} />}
      <PasswordModal
        hasPass={unauthorized}
        validPass={correctPass}
        value={enteredPass}
        onChange={(e) => setEnteredPass(e.target.value)}
        validateCallback={getWithPassword} />
      <Text
        label="title"
        value={title}
        id="titleInput"
        readOnly />
      {getDisplay()}
      <PasteInfo
        hash={hash}
        lang={language}
        theme={theme}
        expiry={expiry}
        toggleRenderCallback={() => setIsRenderMode(!isRenderMode)}
        isRenderMode={isRenderMode}
        onChange={(e) => setTheme(e.target.value)}
        err={unauthorized ? '' : error}
      />
      <Watermark/>
    </div>
  );
}

export default ViewPaste