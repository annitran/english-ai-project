import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  withCredentials: true,
})

// Request Interceptor: Tự động gắn token vào header nếu có
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response Interceptor: Bắt lỗi 401
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      // xoá token cũ
      localStorage.removeItem('token')

      // chỉ redirect nếu KHÔNG ở trang public & chưa redirect trước đó
      const publicPaths = ['/', '/login', '/register']
      const nowPath = window.location.pathname
      let hasRedirected = false  // flag chống redirect nhiều lần

      if (!publicPaths.includes(nowPath) && !hasRedirected) {
        hasRedirected = true
        window.location.replace('/login') // dùng replace để không đẩy thêm history
      }
    }
    return Promise.reject(err)
  }
)

export default api
