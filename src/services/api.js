import axios from 'axios';

const api = axios.create({
    baseURL: 'http://52.45.128.89/api',
});

export default api;