import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://192.168.40.15:8085/api",
    headers: {
        "Accept": "application/json",
    }
});


apiClient.interceptors.request.use((config) => {

    if (config.data instanceof FormData) {
        config.headers["Content-Type"] = "multipart/form-data";
    }
    return config;
});


// Response interceptor for error handling
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {

        if (!error.response) {
            throw {
                success: false,
                message: 'Network error - please check your connection'
            };
        }
        return Promise.reject(error);
    }
);

export default apiClient;