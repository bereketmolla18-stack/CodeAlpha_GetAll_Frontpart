import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const ORDERS_KEY = 'getall_orders'

function saveOrder(order) {
  const orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]')
  orders.unshift(order)
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
}

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    fullName: user?.name || '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  })
  const [errors, setErrors] = useState({})
  const [processing, setProcessing] = useState(false)

  if (items.length === 0) {
    return <Navigate to="/cart" replace />
  }

  const shipping = subtotal > 75 ? 0 : 6.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  function validate() {
    const errs = {}
    if (!form.fullName.trim()) errs.fullName = 'Full name is required.'
    if (!form.address.trim()) errs.address = 'Address is required.'
    if (!form.city.trim()) errs.city = 'City is required.'
    if (!form.postalCode.trim()) errs.postalCode = 'Postal code is required.'
    if (!form.country.trim()) errs.country = 'Country is required.'
    if (!/^\d{13,19}$/.test(form.cardNumber.replace(/\s/g, '')))
      errs.cardNumber = 'Enter a valid card number.'
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiry)) errs.expiry = 'Use MM/YY format.'
    if (!/^\d{3,4}$/.test(form.cvc)) errs.cvc = 'Enter a valid CVC.'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return

    setProcessing(true)
    // Simulate order processing (payment authorization, inventory hold, etc.)
    setTimeout(() => {
      const order = {
        id: `ORD-${Date.now().toString().slice(-8)}`,
        date: new Date().toISOString(),
        items,
        subtotal,
        shipping,
        tax,
        total,
        shippingAddress: {
          fullName: form.fullName,
          address: form.address,
          city: form.city,
          postalCode: form.postalCode,
          country: form.country,
        },
        customerEmail: user?.email || 'guest',
      }
      saveOrder(order)
      clearCart()
      setProcessing(false)
      navigate('/order-success', { state: { order } })
    }, 1200)
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <div className="checkout-grid">
        <form className="checkout-form" onSubmit={handleSubmit} noValidate>
          <h2>Shipping Details</h2>
          <div className="form-field">
            <label htmlFor="fullName">Full name</label>
            <input id="fullName" name="fullName" value={form.fullName} onChange={handleChange} />
            {errors.fullName && <p className="field-error">{errors.fullName}</p>}
          </div>
          <div className="form-field">
            <label htmlFor="address">Street address</label>
            <input id="address" name="address" value={form.address} onChange={handleChange} />
            {errors.address && <p className="field-error">{errors.address}</p>}
          </div>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="city">City</label>
              <input id="city" name="city" value={form.city} onChange={handleChange} />
              {errors.city && <p className="field-error">{errors.city}</p>}
            </div>
            <div className="form-field">
              <label htmlFor="postalCode">Postal code</label>
              <input id="postalCode" name="postalCode" value={form.postalCode} onChange={handleChange} />
              {errors.postalCode && <p className="field-error">{errors.postalCode}</p>}
            </div>
          </div>
          <div className="form-field">
            <label htmlFor="country">Country</label>
            <input id="country" name="country" value={form.country} onChange={handleChange} />
            {errors.country && <p className="field-error">{errors.country}</p>}
          </div>

          <h2>Payment</h2>
          <p className="payment-note">Demo checkout — no real payment is processed.</p>
          <div className="form-field">
            <label htmlFor="cardNumber">Card number</label>
            <input
              id="cardNumber"
              name="cardNumber"
              placeholder="4242 4242 4242 4242"
              value={form.cardNumber}
              onChange={handleChange}
            />
            {errors.cardNumber && <p className="field-error">{errors.cardNumber}</p>}
          </div>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="expiry">Expiry (MM/YY)</label>
              <input id="expiry" name="expiry" placeholder="08/28" value={form.expiry} onChange={handleChange} />
              {errors.expiry && <p className="field-error">{errors.expiry}</p>}
            </div>
            <div className="form-field">
              <label htmlFor="cvc">CVC</label>
              <input id="cvc" name="cvc" placeholder="123" value={form.cvc} onChange={handleChange} />
              {errors.cvc && <p className="field-error">{errors.cvc}</p>}
            </div>
          </div>

          <button className="btn-primary full-width" type="submit" disabled={processing}>
            {processing ? 'Processing order…' : `Place Order — $${total.toFixed(2)}`}
          </button>
        </form>

        <aside className="order-summary">
          <h2>Order Summary</h2>
          <ul className="summary-items">
            {items.map((item) => (
              <li key={item.id}>
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="summary-row">
            <span>Estimated Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="summary-row summary-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </aside>
      </div>
    </div>
  )
}
