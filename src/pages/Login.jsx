import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const redirectTo = location.state?.from || '/'

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    const result = login(form)
    if (!result.ok) {
      setError(result.error)
      return
    }
    navigate(redirectTo)
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Welcome back</h1>
        <p className="auth-sub">Log in to your GetAll account.</p>
        {error && <p className="field-error banner-error">{error}</p>}
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" name="email" required value={form.email} onChange={handleChange} />
          </div>
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <button className="btn-primary full-width" type="submit">
            Log In
          </button>
        </form>
        <p className="auth-switch">
          New to GetAll? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  )
}
