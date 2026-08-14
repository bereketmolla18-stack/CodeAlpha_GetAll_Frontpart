import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-card-image-link">
        {product.oldPrice && <span className="badge-sale">Sale</span>}
        <img src={product.image} alt={product.name} loading="lazy" />
      </Link>
      <div className="product-card-body">
        <p className="product-card-category">{product.category}</p>
        <Link to={`/product/${product.id}`} className="product-card-name">
          {product.name}
        </Link>
        <div className="product-card-rating">
          <span>★ {product.rating}</span>
          <span className="muted">({product.reviews})</span>
        </div>
        <div className="product-card-footer">
          <div className="product-card-price">
            <span className="price">${product.price.toFixed(2)}</span>
            {product.oldPrice && (
              <span className="price-old">${product.oldPrice.toFixed(2)}</span>
            )}
          </div>
          <button
            className="btn-add"
            onClick={() => addToCart(product, 1)}
            aria-label={`Add ${product.name} to cart`}
          >
            Add
          </button>
        </div>
      </div>
    </article>
  )
}
