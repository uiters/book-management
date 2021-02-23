import axios from 'axios';

const axiosPublicClient = axios.create({
    baseURL: 'https://localhost:5001/api/',
});

axiosPublicClient.interceptors.request.use(async (config) => {
    const contentType = config.headers["Content-Type"];
    if (!contentType) {
        config.headers["Content-Type"] = "application/json";
    }
    return config;
});

export default axiosPublicClient;