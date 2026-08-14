import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

const USERS_KEY = 'getall_users'
const SESSION_KEY = 'getall_session'

function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || []
  } catch {
    return []
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(SESSION_KEY))
      if (saved) setUser(saved)
    } catch {
      // ignore corrupted session
    }
    setReady(true)
  }, [])

  function register({ name, email, password }) {
    const users = loadUsers()
    const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase())
    if (exists) {
      return { ok: false, error: 'An account with this email already exists.' }
    }
    const newUser = { id: `u_${Date.now()}`, name, email, password }
    saveUsers([...users, newUser])
    const publicUser = { id: newUser.id, name: newUser.name, email: newUser.email }
    setUser(publicUser)
    localStorage.setItem(SESSION_KEY, JSON.stringify(publicUser))
    return { ok: true }
  }

  function login({ email, password }) {
    const users = loadUsers()
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    )
    if (!found) {
      return { ok: false, error: 'Incorrect email or password.' }
    }
    const publicUser = { id: found.id, name: found.name, email: found.email }
    setUser(publicUser)
    localStorage.setItem(SESSION_KEY, JSON.stringify(publicUser))
    return { ok: true }
  }

  function logout() {
    setUser(null)
    localStorage.removeItem(SESSION_KEY)
  }

  return (
    <AuthContext.Provider value={{ user, ready, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
