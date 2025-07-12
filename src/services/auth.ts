import api from './api'

export const login = async (payload: { email: string; password: string }) => {
  return api.post('/login', payload)
}

export const register = async (payload: {
  name: string
  email: string
  password: string
}) => {
  return api.post('/register', payload)
}

export const logout = async () => {
  return api.post('/logout')
}

export const getAllMess = async () => {
  return api.get('message')
}
export const sendMess = async (payload: { message: string }) => {
  return api.post('message', payload)
}

export const getAllWords = async () => {
  return api.get('users/words')
}
