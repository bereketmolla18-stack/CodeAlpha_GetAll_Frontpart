import React, { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { products, categories } from '../data/products'
import ProductCard from '../components/ProductCard'

export default function Home() {
  const [searchParams] = useSearchParams()
  const search = (searchParams.get('search') || '').toLowerCase()
  const [activeCategory, setActiveCategory] = useState('All')
  const [sort, setSort] = useState('featured')

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory
      const matchesSearch =
        !search ||
        p.name.toLowerCase().includes(search) ||
        p.category.toLowerCase().includes(search)
      return matchesCategory && matchesSearch
    })
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
    if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating)
    return list
  }, [activeCategory, search, sort])

  return (
    <div>
      <section className="hero">
        <div className="hero-content">
          <p className="hero-eyebrow">Welcome to GetAll</p>
          <h1>
            Everything is here — <span>find it, add it, own it.</span>
          </h1>
          <p className="hero-sub">
            From the phone in your pocket to the chair under your desk — one store, thousands of
            everyday finds, checked out in a couple of taps.
          </p>
          <a href="#catalog" className="btn-primary hero-cta">
            Start Shopping
          </a>
        </div>
      </section>

      <section id="catalog" className="catalog-section">
        <div className="catalog-toolbar">
          <div className="category-pills">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`pill ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <select
            className="sort-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Sort products"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        <p className="search-result-note">
          {search
            ? `${filtered.length} result${filtered.length === 1 ? '' : 's'} for "${search}"`
            : `Showing ${filtered.length} of ${products.length} products`}
        </p>

        {filtered.length === 0 ? (
          <p className="empty-state">No products match your search. Try another keyword.</p>
        ) : (
          <div className="product-grid">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
