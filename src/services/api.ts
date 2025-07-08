import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1', // Đổi thành URL backend của bạn
  withCredentials: true, // nếu bạn dùng cookie (ví dụ với JWT)
})

// Tự động gắn token vào header nếu có
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
