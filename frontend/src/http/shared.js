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
  var inSeconds = 60;
  //!TODO: Laying out the basis for a more robust expiry parser
  let [num, unit] = e.split(" ")
  num = parseInt(num)
  switch (unit) {
    case "years" || "year":
      inSeconds *= 600 * 6 * 24 * 7 * 4 * 12 * num;
      break;
    case "months" || "month":
      inSeconds *= 600 * 6 * 24 * 7 * 4 * num;
      break;
    case "days" || "day":
      inSeconds *= 600 * 6 * 24 * num;
      break;
    case "hours" || "hour":
      inSeconds *= 600 * 6 * num;
      break;
    case "minutes" || "minute":
      inSeconds *= 60 * num;
      break;
    case "seconds" || "second":
      inSeconds *= num;
      break;
    default:
      inSeconds *= 600 * 6 * 24 * 7;
  }
  return new Date(cur.getTime() + inSeconds * 1000).toISOString();
}

export function fmtDateStr(dateString) {
  const d = new Date(dateString)
  const options = { hour: '2-digit', minute: '2-digit', year: 'numeric', month: 'long', day: 'numeric' }
  return d.toLocaleDateString("en-US", options).toLocaleLowerCase()
}