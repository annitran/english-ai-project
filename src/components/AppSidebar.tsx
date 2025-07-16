// AppSidebar.tsx
import { Link, useLocation } from 'react-router-dom'
import { Inbox, BookOpenText, User } from "lucide-react"
import { useAuth } from '../contexts/AuthContext'
import { useEffect, useState } from 'react'
import api from '../services/api'

type IHistory = {
  id: number
  title: string
}

function AppSidebar() {
  const { user } = useAuth()
  const id = user?.id
  const location = useLocation()

  const [histories, setHistories] = useState<IHistory[]>([])

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get<{ histories: IHistory[] }>('/histories')
        setHistories(res.data.histories)
      } catch (err) {
        console.error('Load history failed:', err)
      }
    }

    if (user) fetch()
  }, [user])

  return (
    <div className="flex flex-col h-full w-64 bg-base-200">
      {/* PHẦN ĐẦU: New chat, MyWords */}
      <div className="p-4">
        <ul className="space-y-2">
          <li>
            <Link to="/" className="flex items-center space-x-2">
              <Inbox className="w-5 h-5" />
              <span>New Chat</span>
            </Link>
          </li>
          <li>
            <Link to="/users/words" className="flex items-center space-x-2">
              <BookOpenText className="w-5 h-5" />
              <span>My Words</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* PHẦN GIỮA: List History (cuộn được) */}
      <div className="flex-1 overflow-y-auto p-4">
        <h2 className="text-sm mb-2 text-gray-500">Histories</h2>
        <ul className="space-y-1">
          {histories.map((h) => (
            <li key={h.id}>
              <Link
                to={`/chat/${h.id}`}
                className={`block px-2 py-1 rounded hover:bg-base-300 ${
                  location.pathname === `/chat/${h.id}` ? 'bg-base-300 font-semibold' : ''
                }`}
              >
                {h.title.length > 30 ? h.title.slice(0, 30) + '…' : h.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* PHẦN CUỐI: Profile */}
      <div className="p-4">
        <Link to={`/user/${id}`} className="flex items-center space-x-2">
          <User className="w-5 h-5" />
          <span>Profile</span>
        </Link>
      </div>
    </div>
  )
}

export default AppSidebar
