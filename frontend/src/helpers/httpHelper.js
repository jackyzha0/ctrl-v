import axios from 'axios';

const base = `http://localhost:8080/api`

export function FetchPaste(hash) {
    const serverURL = `${base}/${hash}`
    console.log(serverURL)
    return axios.get(serverURL)
}

export function FetchPasswordPaste(hash, pass) {
    var bodyFormData = new FormData();
    bodyFormData.set('password', pass);

    return axios({
        method: 'post',
        url: `${base}/${hash}`,
        data: bodyFormData,
        headers: { 'Content-Type': 'multipart/form-data' },
    })
}

export function PostNewPaste(state) {
    var bodyFormData = new FormData();
    bodyFormData.set('title', state.title);
    bodyFormData.set('content', state.content);
    bodyFormData.set('language', state.language);
    bodyFormData.set('password', state.pass);
    bodyFormData.set('expiry', parseExpiry(state.expiry));

    return axios({
        method: 'post',
        url: base,
        data: bodyFormData,
        headers: { 'Content-Type': 'multipart/form-data' },
    })
}

function parseExpiry(e) {
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