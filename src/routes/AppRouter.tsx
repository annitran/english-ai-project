import { Routes, Route } from 'react-router-dom'
import Profile from '../pages/Profile.tsx'
import Chat from '../pages/Chat.tsx'
import History from '../pages/History.tsx'
import MyWords from '../pages/MyWords.tsx'
import Login from '@/pages/Login.tsx'

function AppRouter() {
    return <>
        <Routes>
            <Route path="/" element={<Chat />} />
            <Route path="/history" element={<History />} />
            <Route path="/mywords" element={<MyWords />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    </>
}

export default AppRouter