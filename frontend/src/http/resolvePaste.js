import {useEffect, useState} from 'react'
import {fetchPaste, fmtDateStr} from './shared'
import {LANGS} from "../components/renderers/Code";

export const defaultResponse = {
  data: {
    title: '',
    content: '',
    language: LANGS.detect,
    expiry: '',
  },
  unauthorized: false,
  error: '',
}

const resolvePaste = async (id, password = "") => {
  const response = {...defaultResponse}
  try {
    return await fetchPaste(id, password)
      .then(resp => {
        const data = resp.data
        response.data = {
          ...data,
          expiry: fmtDateStr(data.expiry)
        }
        return response
      })
  } catch (err) {
    const resp = err.response
    if (!resp) {
      response.error = 'network error'
      return response
    }

    if (resp.status === 401) {
      response.error = 'unauthorized'
      response.unauthorized = true
      return response
    }

    response.error = `${resp.status}: ${resp.data}`
    return response
  }
}

export default resolvePaste