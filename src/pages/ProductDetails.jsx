import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getProductById, products } from '../data/products'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = getProductById(id)
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [justAdded, setJustAdded] = useState(false)

  if (!product) {
    return (
      <div className="empty-state">
        <p>We couldn't find that product.</p>
        <Link to="/" className="btn-primary">
          Back to shop
        </Link>
      </div>
    )
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  function handleAddToCart() {
    addToCart(product, quantity)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1800)
  }

  function handleBuyNow() {
    addToCart(product, quantity)
    navigate('/cart')
  }

  return (
    <div className="product-details">
      <nav className="breadcrumbs">
        <Link to="/">Shop</Link> / <span>{product.category}</span> / <span>{product.name}</span>
      </nav>

      <div className="product-details-grid">
        <div className="product-details-image">
          {product.oldPrice && <span className="badge-sale">Sale</span>}
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-details-info">
          <p className="product-card-category">{product.category}</p>
          <h1>{product.name}</h1>
          <div className="product-card-rating">
            <span>★ {product.rating}</span>
            <span className="muted">({product.reviews} reviews)</span>
          </div>

          <div className="product-card-price details-price">
            <span className="price">${product.price.toFixed(2)}</span>
            {product.oldPrice && <span className="price-old">${product.oldPrice.toFixed(2)}</span>}
          </div>

          <p className="product-description">{product.description}</p>

          <ul className="highlight-list">
            {product.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>

          <p className={`stock-note ${product.stock < 10 ? 'low' : ''}`}>
            {product.stock < 10
              ? `Only ${product.stock} left in stock — order soon.`
              : `In stock: ${product.stock} available.`}
          </p>

          <div className="quantity-row">
            <label htmlFor="qty">Quantity</label>
            <div className="quantity-control">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
                −
              </button>
              <input
                id="qty"
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, Number(e.target.value) || 1)))}
              />
              <button
                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <div className="product-actions">
            <button className="btn-secondary" onClick={handleAddToCart}>
              {justAdded ? 'Added ✓' : 'Add to Cart'}
            </button>
            <button className="btn-primary" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="related-section">
          <h2>You might also like</h2>
          <div className="product-grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
