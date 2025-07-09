import api from './api'

// login
export interface IUser {
  id: number
  name: string
  email: string
}
interface IUserParam {
  email: string
  password: string
}
interface IUserResponse {
  token: string
  user: IUser
}

export const login = (user: IUserParam) => {
  return api.post<IUserResponse>('/login', user)
}

// register
interface IRegisterParam {
  name: string
  email: string
  password: string
}
export const register = (user: IRegisterParam) => {
  return api.post('/register', user)
}

// logout
export const logout = () => {
  return api.post('/logout')
}

// chat
export interface IChat {
  id: number
  message: string
  is_bot: boolean
}
interface IChatInput {
  message: string
}
interface IChatResponse {
  messages: IChat[]
}
export const chatGet = () => {
  return api.get<IChatResponse>('/message')
}
export const chatPost = (payload: IChatInput) => {
  return api.post<IChat[]>('/message', payload)
}

// word
export interface IWord {
  id: number
  word: string
  meaning: string
}
interface IWordResponse {
  words: IWord[]
}
export const wordGetList = () => {
  return api.get<IWordResponse>('users/words')
}
