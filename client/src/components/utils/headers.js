import axios from 'axios';

const getFromStorage = key => window.sessionStorage.getItem(key);

const getHeader = () => ({ headers: { 'X-User-Token': `${getFromStorage('token')}` } });

export const get = url => axios.get('/api/v1' + url, getHeader());

export const post = (url, data) => axios.post('/api/v1' + url, data, getHeader());

export const put = (url, data) => axios.put('/api/v1' + url, data, getHeader());

export const del = url => axios.delete('/api/v1' + url, getHeader());
