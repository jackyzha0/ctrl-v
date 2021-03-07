import axios from 'axios';

// uncomment for local dev
// const base = `http://localhost:8080/api`
const base = `https://api.ctrl-v.app/api`
export function fetchPaste(hash, pass = "") {
  const serverURL = `${base}/${hash}`

  if (pass === "") {
    return axios.get(serverURL)
  } else {
    const bodyFormData = new FormData();
    bodyFormData.set('password', pass);
    return axios({
      method: 'post',
      url: `${base}/${hash}`,
      data: bodyFormData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  }
}

export function newPaste(paste) {
  const {title, content, language, pass, expiry} = paste
  const bodyFormData = new FormData();
  bodyFormData.set('title', title);
  bodyFormData.set('content', content);
  bodyFormData.set('language', language);
  bodyFormData.set('password', pass);
  bodyFormData.set('expiry', parseExpiry(expiry));

  return axios({
    method: 'post',
    url: base,
    data: bodyFormData,
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export function parseExpiry(e) {
  var cur = new Date();
  var inSeconds = 0
  switch (e) {
    case '5 years':
      inSeconds = 600 * 6 * 24 * 7 * 4 * 12 * 5
      break;
    case '1 year':
      inSeconds = 600 * 6 * 24 * 7 * 4 * 12
      break;
    case '1 month':
      inSeconds = 600 * 6 * 24 * 7 * 4
      break;
    case '1 day':
      inSeconds = 600 * 6 * 24
      break;
    case '1 hour':
      inSeconds = 600 * 6
      break;
    case '10 min':
      inSeconds = 600
      break;
    case '1 week':
    default:
      inSeconds = 600 * 6 * 24 * 7
      break;
  }
  return new Date(cur.getTime() + inSeconds * 1000).toISOString();
}

export function fmtDateStr(dateString) {
  const d = new Date(dateString)
  const options = { hour: '2-digit', minute: '2-digit', year: 'numeric', month: 'long', day: 'numeric' }
  return d.toLocaleDateString("en-US", options).toLocaleLowerCase()
}