import { Link } from 'react-router-dom'
import { Inbox, History, BookOpenText, User } from "lucide-react"
import { useAuth } from '../contexts/AuthContext'

function AppSidebar() {
  const { user } = useAuth()
  const id = user?.id

  const items = [
    {
      title: "Chat",
      url: "/",
      icon: Inbox,
    },
    {
      title: "My Words",
      url: "/users/words",
      icon: BookOpenText,
    },
    {
      title: "History",
      url: "/history",
      icon: History,
    },
    {
      title: "Profile",
      url: `/user/${id}`,
      icon: User,
    },
  ]
    return (
      <>
        <ul className="menu p-4 w-60 bg-base-200 min-h-screen">
            {items.map((item) => (
              <li key={item.title}>
                <Link to={item.url} className='flex items-center space-x-2'>
                  <item.icon className="w-5 h-5" />
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
        </ul>
      </>
    )
  }

export default AppSidebar
