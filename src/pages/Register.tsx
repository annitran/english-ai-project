import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../services/auth'
import axios from 'axios'

export default function SignUpPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await register({ name, email, password })
      navigate('/login')
    } catch (err) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || 'Register failed')
      } else {
        console.error('Unexpected error', err)
      }
    }
  }

  return (
    <form
      onSubmit={handleRegister}
      className="max-w-sm mx-auto mt-10 p-6 shadow bg-base-100 rounded"
    >
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

      <input
        type="text"
        placeholder="Pedro Duarte"
        className="input input-bordered w-full mb-4"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="you123@example.com"
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
        Register
      </button>

      <p className="text-sm mt-4 text-center">
        Already have an account?{' '}
        <Link to="/login" className="link link-primary">
          Log In
        </Link>
      </p>
    </form>
  )
}
