import rawProducts from './products.json'

// Eagerly import every image in src/assets/products so any file dropped in
// that folder is automatically available — no manual import statements
// needed. Vite resolves this at build time.
const imageModules = import.meta.glob('../assets/products/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})

function resolveImage(filename) {
  const match = Object.keys(imageModules).find((path) => path.endsWith(`/${filename}`))
  return match ? imageModules[match] : null
}

const CATEGORY_COPY = {
  Phones: {
    description:
      'A capable, everyday smartphone with a sharp display and dependable battery life — ready for calls, cameras, and everything in between.',
    highlights: ['High-resolution display', 'All-day battery life', 'Fast charging support', '12-month warranty'],
  },
  Computers: {
    description:
      'A well-built computer for work, study, or creative projects, balancing performance and portability for daily use.',
    highlights: ['Reliable everyday performance', 'Lightweight, portable build', 'Full-size keyboard', '12-month warranty'],
  },
  Audio: {
    description:
      'Clear, balanced sound in a comfortable, everyday design — built for music, calls, and everything you listen to in between.',
    highlights: ['Balanced, clear sound', 'Comfortable for long sessions', 'Reliable wireless or wired connection', '12-month warranty'],
  },
  Accessories: {
    description:
      'A handy everyday accessory built to make your devices a little easier and more comfortable to use.',
    highlights: ['Compact, everyday design', 'Reliable connection', 'Easy plug-and-play setup', '12-month warranty'],
  },
  Beauty: {
    description:
      'A carefully made beauty pick designed to fit easily into your everyday routine.',
    highlights: ['Dermatologically considerate formula', 'Everyday routine friendly', 'Long-lasting results', 'Cruelty-free'],
  },
  Health: {
    description:
      'A practical health and hygiene essential, made for reliable everyday protection.',
    highlights: ['Comfortable everyday fit', 'Reliable protection', 'Sold in a convenient multi-pack', 'Latex-free options'],
  },
  Kitchen: {
    description:
      'A dependable kitchen tool that makes everyday prep and cooking a little faster and easier.',
    highlights: ['Durable, food-safe materials', 'Easy to clean', 'Comfortable everyday grip', 'Compact storage'],
  },
  Cleaning: {
    description:
      'A simple, effective cleaning essential for keeping everyday messes under control.',
    highlights: ['Effective on everyday messes', 'Durable, reusable design', 'Easy to rinse and reuse', 'Fits most households'],
  },
  Home: {
    description:
      'A practical pick for the home, made to fit easily into everyday living spaces.',
    highlights: ['Sturdy, everyday-use build', 'Fits most home styles', 'Straightforward setup', '12-month warranty'],
  },
  Fashion: {
    description:
      'A versatile everyday piece designed for comfort, durability, and easy styling.',
    highlights: ['Comfortable, breathable materials', 'Versatile everyday styling', 'Durable stitching', 'True-to-size fit'],
  },
  Electronics: {
    description:
      'A practical everyday electronic that\u2019s built to be reliable, portable, and easy to use.',
    highlights: ['Reliable everyday performance', 'Compact and portable', 'Easy plug-and-play setup', '12-month warranty'],
  },
  General: {
    description:
      'A GetAll staff pick — a practical, well-reviewed find worth adding to your everyday shopping list.',
    highlights: ['Popular with GetAll shoppers', 'Everyday practical use', 'Good value for the price', '12-month warranty'],
  },
}

export const products = rawProducts
  .map((p) => {
    const image = resolveImage(p.image)
    if (!image) return null
    const copy = CATEGORY_COPY[p.category] || CATEGORY_COPY.General
    return {
      ...p,
      image,
      description: copy.description,
      highlights: copy.highlights,
    }
  })
  .filter(Boolean)

export const categories = ['All', ...new Set(products.map((p) => p.category))]

export function getProductById(id) {
  return products.find((p) => p.id === id)
}
