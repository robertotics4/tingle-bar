import axios from 'axios';

const api = axios.create({
    baseURL: `https://www.papya.com.br/api`,
    timeout: 7000
});

export default api;