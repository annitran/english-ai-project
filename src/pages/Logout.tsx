import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import api from '../services/api'

export default function Logout() {
  const navigate = useNavigate()
  const { setUser } = useAuth()

  useEffect(() => {
    const doLogout = async () => {
      try {
        await api.post('/logout')
        setUser(null)
        navigate('/')
      } catch (err) {
        console.error('Logout failed', err)
        navigate('/')
      }
    }

    doLogout()
  }, [navigate, setUser])

  return <p className="text-center p-4">Logging out...</p>
}
