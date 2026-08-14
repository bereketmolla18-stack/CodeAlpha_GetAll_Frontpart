import React from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'

export default function OrderSuccess() {
  const location = useLocation()
  const order = location.state?.order

  if (!order) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="order-success">
      <div className="success-icon">✓</div>
      <h1>Order placed!</h1>
      <p>
        Thanks{order.shippingAddress?.fullName ? `, ${order.shippingAddress.fullName}` : ''} — your GetAll
        order is confirmed.
      </p>
      <div className="order-confirmation-card">
        <div className="summary-row">
          <span>Order number</span>
          <span>{order.id}</span>
        </div>
        <div className="summary-row">
          <span>Shipping to</span>
          <span>
            {order.shippingAddress.city}, {order.shippingAddress.country}
          </span>
        </div>
        <div className="summary-row summary-total">
          <span>Total paid</span>
          <span>${order.total.toFixed(2)}</span>
        </div>
      </div>
      <Link to="/" className="btn-primary">
        Continue Shopping
      </Link>
    </div>
  )
}
