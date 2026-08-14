# GetAll — everything is here

A simple e-commerce storefront built with React (Vite). Includes product
browsing, product detail pages, a shopping cart, user registration/login,
and a checkout / order-processing flow.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
getall-store/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx              # App entry point (Router + CSS)
    ├── App.jsx                # Route definitions + providers
    ├── App.css                # All app styling (design tokens at top)
    ├── assets/
    │   ├── brand/getall-logo.svg
    │   └── products/          # One image per product
    ├── context/
    │   ├── AuthContext.jsx    # Register / login / logout (localStorage)
    │   └── CartContext.jsx    # Cart state (localStorage)
    ├── data/
    │   └── products.js        # Product catalog — add products here
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   ├── ProductCard.jsx
    │   └── ProtectedRoute.jsx # Guards checkout behind login
    └── pages/
        ├── Home.jsx           # Hero + filterable/sortable product grid
        ├── ProductDetails.jsx
        ├── Cart.jsx
        ├── Checkout.jsx       # Order processing (address + payment form)
        ├── OrderSuccess.jsx
        ├── Login.jsx
        ├── Register.jsx
        └── NotFound.jsx
```

## Adding a new product

1. Drop a product photo into `src/assets/products/`, named after the
   product (e.g. `watch.jpg`).
2. Open `src/data/products.js`, import the image at the top, then add a
   new object to the `products` array with an `id`, `name`, `category`,
   `price`, `image`, `description`, `highlights`, and `stock`.

The homepage, category filters, and search will pick it up automatically.

## Notes on this demo

- **No backend.** Accounts, cart contents, and past orders are stored in
  the browser's `localStorage`, so data is per-browser and not shared
  between devices. This is fine for a demo/portfolio build, but a real
  store should move auth, cart, and orders to a real backend/database
  (and never store passwords in plain text).
- **Checkout is simulated.** No real payment is processed — the card
  form is validated client-side and the "order" is just saved to
  `localStorage` and shown on the confirmation page.
- **Fonts** (Sora + Inter) are loaded from Google Fonts via `index.html`,
  so an internet connection is needed for them to render; the app falls
  back to system fonts otherwise.
