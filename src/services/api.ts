import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1', // Đổi thành URL backend của bạn
  withCredentials: true, // nếu bạn dùng cookie (ví dụ với JWT)
})

export default api
