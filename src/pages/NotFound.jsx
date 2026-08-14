import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="empty-state">
      <h1>404</h1>
      <p>We couldn't find that page.</p>
      <Link to="/" className="btn-primary">
        Back to shop
      </Link>
    </div>
  )
}
