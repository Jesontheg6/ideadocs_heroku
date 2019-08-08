import axios from 'axios';

const getFromStorage = key => {
    const value = window.sessionStorage.getItem(key);
    return JSON.parse(value);
}

const getHeader = () => ({ headers: { 'Authorization': `${getFromStorage('token')}` } });

export const get = url => (
    axios.get(url, getHeader)
);

export const post = (url, data) => (
    axios.post(url, data, getHeader)
);

export const put = (url, data) => (
    axios.post(url, data, getHeader)
);
