import {useEffect, useState} from 'react'
import {fetchPaste, fmtDateStr} from './shared'
import {LANGS} from "../components/renderers/Code";

const resolvePaste = (id, password = "") => {
  const response = {
    data: {
      title: '',
      content: '',
      language: LANGS.detect,
      expiry: '',
    },
    unauthorized: false,
    error: '',
  }
  return fetchPaste(id, password)
    .then(resp => {
      const data = resp.data
      response.data = {
        ...data,
        expiry: fmtDateStr(data.expiry)
      }
      return response
    })
    .catch(error => {
      const resp = error.response
      if (!resp) {
        response.error = 'network error'
        return
      }

      if (resp.status === 401) {
        response.error = 'unauthorized'
        response.unauthorized = true
        return
      }

      response.error = `${resp.status}: ${resp.data}`
      return response
    })
}

export default resolvePaste