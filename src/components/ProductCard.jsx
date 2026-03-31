import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './ProductCard.css'

function formatBRL(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value * 5.8)
}

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  function handleAdd(e) {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)

    // Ripple feedback
    const btn = e.currentTarget
    btn.classList.add('added')
    setTimeout(() => btn.classList.remove('added'), 600)
  }

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-card__img-wrap">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
        />
        <div className="product-card__overlay">
          <span className="product-card__view">Ver Detalhes</span>
        </div>
        <span className="product-card__category">{product.category}</span>
      </div>

      <div className="product-card__body">
        <h3 className="product-card__title">{product.title}</h3>

        <div className="product-card__footer">
          <div className="product-card__pricing">
            <span className="product-card__price">{formatBRL(product.price)}</span>
            <span className="product-card__rating">
              ★ {product.rating?.rate?.toFixed(1)}
              <span className="product-card__rating-count">({product.rating?.count})</span>
            </span>
          </div>
          <button
            className="product-card__add-btn"
            onClick={handleAdd}
            aria-label="Adicionar ao carrinho"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </button>
        </div>
      </div>
    </Link>
  )
}
