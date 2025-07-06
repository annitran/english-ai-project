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

export const chatGet = async () => {
  return api.get('message')
}
export const chatPost = async (payload: { message: string }) => {
  return api.post('message', payload)
}

export const word = async () => {
  return api.get('users/words')
}
