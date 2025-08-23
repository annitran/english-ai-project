import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/api'
import type { IUser } from '../services/auth'

export default function Profile() {
  const { id } = useParams()
  const [user, setUser] = useState<IUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPasswordMode, setIsPasswordMode] = useState(false)

  const [formData, setFormData] = useState<Partial<IUser>>({})
  const [passwordData, setPasswordData] = useState({ old_password: '', new_password: '', confirm_password: '' })

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

  const handleOpenModal = (mode: 'profile' | 'password') => {
    setIsPasswordMode(mode === 'password')
    if (user && mode === 'profile') setFormData({ name: user.name, email: user.email })
    setIsModalOpen(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (isPasswordMode) {
        if (passwordData.new_password !== passwordData.confirm_password) {
          alert("Confirm password does not match!")
          return
        }
        await api.put(`/user/${id}/password`, {
          old_password: passwordData.old_password,
          new_password: passwordData.new_password,
        })
      } else {
        const res = await api.put(`/user/${id}`, formData)
        setUser(res.data.user)
      }
      setIsModalOpen(false)
    } catch (err) {
      console.error('Update failed', err)
    }
  }

  if (loading) return <div className="text-center mt-10">Loading...</div>
  if (!user) return <div className="alert alert-error mt-10 text-center">Cannot view this user's profile!!!</div>

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-base-100 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>

      <div className="flex gap-2 mt-4">
        <button className="btn btn-primary" onClick={() => handleOpenModal('profile')}>Edit</button>
        <button className="btn btn-secondary" onClick={() => handleOpenModal('password')}>Change Password</button>
      </div>

      {isModalOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">
              {isPasswordMode ? 'Change Password' : 'Edit Profile'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              {!isPasswordMode ? (
                <>
                  <div>
                    <label className="block text-sm font-medium">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name || ''}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email || ''}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium">Old Password</label>
                    <input
                      type="password"
                      name="old_password"
                      value={passwordData.old_password}
                      onChange={handlePasswordChange}
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">New Password</label>
                    <input
                      type="password"
                      name="new_password"
                      value={passwordData.new_password}
                      onChange={handlePasswordChange}
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Confirm Password</label>
                    <input
                      type="password"
                      name="confirm_password"
                      value={passwordData.confirm_password}
                      onChange={handlePasswordChange}
                      className="input input-bordered w-full"
                    />
                  </div>
                </>
              )}
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">Save</button>
                <button type="button" className="btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  )
}
