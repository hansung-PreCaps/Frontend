import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://dev.enble.site/", // API의 기본 URL
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token"); // 토큰을 가져오는 로직
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Authorization 헤더 추가
    }
    return config;
});

export default axiosInstance;
