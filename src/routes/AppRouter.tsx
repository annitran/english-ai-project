import { Routes, Route } from 'react-router-dom'
import Profile from '../pages/Profile.tsx'
import Chat from '../pages/Chat.tsx'
import History from '../pages/History.tsx'
import MyWords from '../pages/MyWords.tsx'

function AppRouter() {
    return <>
        <Routes>
            <Route path="/" element={<Chat />} />
            <Route path="/history" element={<History />} />
            <Route path="/mywords" element={<MyWords />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    </>
}

export default AppRouter