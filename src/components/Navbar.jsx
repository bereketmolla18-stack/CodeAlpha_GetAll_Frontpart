import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/brand/getall-logo.svg'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { itemCount } = useCart()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  function handleSearch(e) {
    e.preventDefault()
    navigate(query.trim() ? `/?search=${encodeURIComponent(query.trim())}` : '/')
    setMenuOpen(false)
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand" onClick={() => setMenuOpen(false)}>
          <img src={logo} alt="GetAll logo" className="brand-logo" />
          <span className="brand-text">
            <span className="brand-name">GetAll</span>
            <span className="brand-slogan">everything is here</span>
          </span>
        </Link>

        <form className="navbar-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for phones, laptops, home goods..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search products"
          />
          <button type="submit" aria-label="Search">
            🔍
          </button>
        </form>

        <button
          className="navbar-toggle"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          ☰
        </button>

        <nav className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Shop
          </Link>
          <Link to="/cart" className="cart-link" onClick={() => setMenuOpen(false)}>
            Cart
            {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
          </Link>
          {user ? (
            <div className="user-menu">
              <span className="user-greeting">Hi, {user.name.split(' ')[0]}</span>
              <button
                className="link-button"
                onClick={() => {
                  logout()
                  setMenuOpen(false)
                  navigate('/')
                }}
              >
                Log out
              </button>
            </div>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              Login / Register
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
