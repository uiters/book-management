import axios from 'axios';

const axiosPrivateClient = axios.create({
    baseURL: 'https://localhost:5001/api/',
});

axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')

axiosPrivateClient.interceptors.request.use(async (config) => {
    const contentType = config.headers["Content-Type"];
    if (!contentType) {
        config.headers["Content-Type"] = "application/json";
    }
    config.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')
    return config;
});

export default axiosPrivateClient;