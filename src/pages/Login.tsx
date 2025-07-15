import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { login } from '../services/auth'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setUser } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault() // chặn reload mặc định khi submit form

    try {
      const res = await login({ email, password })
      setUser(res.data.user)
      navigate('/')
    } catch (err) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || 'Login failed')
      } else {
        console.error('Unknown error', err)
      }
    }
  }

  return (
    <form
      onSubmit={handleLogin}
      className="max-w-sm mx-auto mt-10 p-6 shadow bg-base-100 rounded"
    >
      <h2 className="text-2xl font-bold mb-4">Log In</h2>

      <input
        type="email"
        placeholder="you@example.com"
        className="input input-bordered w-full mb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="••••••••"
        className="input input-bordered w-full mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit" className="btn btn-primary w-full">
        Log In
      </button>

      <p className="text-sm mt-4 text-center">
        Don't have an account yet?{' '}
        <Link to="/register" className="link link-primary">
          Sign Up
        </Link>
      </p>
    </form>
  )
}
