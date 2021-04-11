import {useEffect, useState} from 'react'
import {fetchPaste, fmtDateStr} from './shared'
import {LANGS} from "../components/renderers/Code";

const useFetchPaste = (id) => {
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState()
  const [requiresAuth, setRequiresAuth] = useState(false)
  const [validPass, setValidPass] = useState(false)
  const [result, setResult] = useState({
    title: 'fetching paste...',
    content: '',
    language: LANGS.detect,
    expiry: '',
  })

  const handleErr = error => {
    const resp = error.response

    // network err
    if (!resp) {
      setErr(error.toString())
      return
    }

    // password protected
    if (resp.status === 401) {
      setRequiresAuth(true)
      return
    }

    // catch all
    const errTxt = `${resp.status}: ${resp.data}`
    setErr(errTxt)
  }

  // callback to try verifying with password
  const getWithPassword = (password, errorCallback) => {
    fetchPaste(id, password)
      .then(resp => {
        setValidPass(true)
        setStateFromData(resp.data)
      })
      .catch(e => errorCallback(e.response.data))
  }


  const setStateFromData = (data) => {
    document.title = data.title
    setResult({
      title: data.title,
      content: data.content,
      language: data.language,
      expiry: fmtDateStr(data.expiry)
    })
  }

  // initial fetch
  useEffect(() => {
    fetchPaste(id)
      .then(resp => setStateFromData(resp.data))
      .catch(handleErr)
      .finally(() => setLoading(false))
  }, [id])

  return { loading, err, requiresAuth, validPass, getWithPassword, result }
}

export default useFetchPaste