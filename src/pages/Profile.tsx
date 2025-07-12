import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/api'

type User = {
  id: number
  name: string
  email: string
}

export default function Profile() {
  const { id } = useParams()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/user/${id}`)
        setUser(res.data.user)
      } catch (err) {
        console.error('User not found', err)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchUser()
  }, [id])

  if (loading) {
    return <div className="text-center mt-10"></div>
  }

  if (!user) {
    return <div className="alert alert-error mt-10 text-center">Cannot view this user's profile!!!</div>
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-base-100 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  )
}
