import axios from 'axios';
import { BASE_URL } from './apiPaths';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000, // 10 seconds timeout
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

//Requet Interceptor to add token to headers

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('token');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


// Response Interceptor to handle errors globally
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        //handle common error cases
        if(error.response) {
            if(error.response.status === 401) {
               window.location.href = '/login'; // Redirect to login on unauthorized
            }else if(error.response.status === 500){
                console.error('Server error: Please try again later', error.response.data);
            }
        }
        else if (error.code === 'ECONNABORTED') {
            console.error('Request timeout: Please try again later');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;