import axios from 'axios';
const axiosInstance = axios.create({ 
    baseURL: process.env.NEXT_PUBLIC_API_URL, // địa chỉ API backend 
    timeout: 5000, // thời gian chờ tối đa (5 giây) trước khi request bị hủy 
    headers: { 
        "Content-Type": "application/json"  // dữ liệu gửi lên server ở dạng 
    } 
}); 
 
axiosInstance.interceptors.request.use( 
    (config) => { 
        const token = localStorage.getItem("token"); 
        if (token) { 
            config.headers.Authorization = `Bearer ${token}`; 
        } 
        return config; 
    }, 
    (error) => { 
        return Promise.reject(error); 
    } 
); 
 
axiosInstance.interceptors.response.use( 
 
    (response) => response, 
 
    (error) => { 
 
        const errorData = { 
            message: error.response?.data?.message || "Server error", 
            status: error.response?.status || 500, 
            data: error.response?.data || null 
        }; 
 
        return Promise.reject(errorData); 
    } 
); 
 
export default axiosInstance;