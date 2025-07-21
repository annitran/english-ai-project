import { Routes, Route } from 'react-router-dom'
import Profile from '../pages/Profile.tsx'
import Chat from '../pages/Chat.tsx'
import History from '../pages/History.tsx'
import MyWords from '../pages/MyWords.tsx'
import Login from '../pages/Login.tsx'
import Register from '../pages/Register.tsx'
import Logout from '../pages/Logout.tsx'

import AppLayout from '../layouts/AppLayout'

export default function AppRouter() {
  return (
    <Routes>
      {/* Public pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      {/* Protected pages (đã login mới vào) */}
      <Route element={<AppLayout />}>
        <Route path="/" element={<Chat />} />
        <Route path="/history/:id" element={<History />} />
        <Route path="/users/words" element={<MyWords />} />
        <Route path="/user/:id" element={<Profile />} />
        <Route path="/logout" element={<Logout />} />
      </Route>
    </Routes>
  )
}
