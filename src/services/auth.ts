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

// user
export const getUser = () => {
  return api.get<{ user: IUser }>('/user')
}

// chat
export interface IChat {
  id: number
  message: string
  is_bot: boolean
}
interface IChatInput {
  message: string
  history_id: number
}
interface IChatResponse {
  messages: IChat[],
  history_id: number
}
export const sendMess = (data: IChatInput) => {
  return api.post<IChatResponse>('/chat', data)
}

// word
export interface IWord {
  id: number
  word: string
  meaning: string
  example: string
}
interface IWordResponse {
  words: IWord[]
}
export const getWords = (search: string = "") => {
  return api.get<IWordResponse>(`/words?search=${search}`)
}
export const createWord = (data: { word: string; meaning: string; example: string }) => {
  return api.post<{ word: IWord }>('/words', data)
}
export const updateWord = (id: number, data: Partial<IWord>) => {
  return api.put(`/words/${id}`, data)
}
export const deleteWord = (id: number) => {
  return api.delete(`/words/${id}`)
}

// history
export interface IHistory {
  id: number
  title: string
  created_at: string
}
interface IHistoryMessagesResponse {
  messages: IChat[]
}
export const getHistoryMessages = (id: number) => {
  return api.get<IHistoryMessagesResponse>(`/chat/${id}`)
}
