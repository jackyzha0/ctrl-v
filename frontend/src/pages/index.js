import React, { useEffect, useState, useRef } from 'react';
import { Text, Code } from '../components/Inputs'
import OptionsContainer from '../components/Options'
import Error from '../components/Err'
import PasteModal from '../components/modals/PasteModal'
import styled from 'styled-components'
import CodeRenderer from '../components/renderers/Code'
import Latex from '../components/renderers/Latex'
import Markdown from '../components/renderers/Markdown'
import {Button, SubmitButton} from "../components/Common/Button";
import {newPaste} from "../http/shared";
import {Watermark} from "../components/Watermark";
import {Labelled} from "../components/decorators/Labelled";

const Container = styled.form`
  width: 100%;
`

const Flex = styled.div`
    display: flex;
    flex-direction: row;
`

const FlexLeft = styled.div`
    flex: 0 0 calc(50% - 1em - 2px);
`

const FlexRight = styled.div`
    flex: 0 0 50%;
    max-width: calc(50% - 1em + 2px);
    margin-left: 2em;
`

const PreviewWrapper = styled.div`
    margin: 2em;
`

const NewPaste = () =>  {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [pass, setPass] = useState('');
  const [language, setLanguage] = useState('detect');
  const [expiry, setExpiry] = useState('');
  const [hash, setHash] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const ErrorLabel = useRef(null);

  useEffect(() => {
    document.title = title === "" ? `ctrl-v` : `ctrl-v | ${title}`;
  }, [title])

  function handleSubmit(e) {
    e.preventDefault();

    // prevent resubmission
    if (!hash) {
      newPaste({title, content, language, pass, expiry})
        .then(resp => {setHash(resp.data.hash)})
        .catch((error) => {
          const resp = error.response

          // some weird err (e.g. network)
          if (!resp) {
            ErrorLabel.current.showMessage(error)
            return
          }

          // some weird err
          const errTxt = `${resp.status}: ${resp.data}`
          ErrorLabel.current.showMessage(errTxt)
        });
    }
  }

  function renderPreview() {
    const pasteInput = <Code
      setContentCallback={setContent}
      content={content}
      maxLength="100000" />

    if (isPreview) {
      var preview
      switch (language) {
        case 'latex':
          preview =
            <PreviewWrapper>
              <Latex
                content={content} />
            </PreviewWrapper>
          break
        case 'markdown':
          preview =
            <PreviewWrapper className='md' >
              <Markdown
                content={content} />
            </PreviewWrapper>
          break
        default:
          preview =
            <CodeRenderer
              lang={language}
              theme='atom'
              content={content} />
      }

      return (
        <Flex>
          <FlexLeft>
            <Labelled label="content">
              {pasteInput}
            </Labelled>
          </FlexLeft>
          <FlexRight className='preview' >
            <Labelled label="preview">
              {preview}
            </Labelled>
          </FlexRight>
        </Flex>
      );
    } else {
      return (
        <Labelled label="content">
          {pasteInput}
        </Labelled>
      );
    }
  }

  return (
    <Container onSubmit={handleSubmit}>
      <PasteModal hash={hash} />
      <Text
        label="title"
        onChange={(e) => {setTitle(e.target.value)}}
        value={title}
        autoFocus
        maxLength="100"
        id="titleInput" />
      {renderPreview()}
      <OptionsContainer
        pass={pass}
        expiry={expiry}
        lang={language}
        onPassChange={(e) => { setPass(e.target.value) }}
        onLangChange={(e) => { setLanguage(e.target.value) }}
        onExpiryChange={(e) => { setExpiry(e.target.value) }} />
      <div>
        <SubmitButton type="submit" value="new paste" />
        {language !== 'detect' && <Button
          secondary
          type="button"
          onClick={() => setIsPreview(!isPreview)}>
          preview
        </Button>}
      </div>
      <br />
      <Error ref={ErrorLabel} />
      <Watermark/>
    </Container>
  );
}

export default NewPaste