import axios from 'axios';

const proxyURL = 'https://cors-anywhere.herokuapp.com';

const api = axios.create({
    baseURL: `${proxyURL}/http://52.45.128.89`,
    timeout: 10000
});

export default api;