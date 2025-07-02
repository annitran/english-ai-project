import { createContext, useContext, useEffect, useState } from 'react'
import api from '../services/api'

type User = {
  id: number
  name: string
  email: string
}

type AuthContextType = {
  user: User | null
  setUser: (user: User | null) => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Nếu cookie đã có token thì tự lấy lại thông tin user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/user')
        setUser(res.data.user)
      } catch (err) {
        console.log('Not logged in or token expired', err)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
