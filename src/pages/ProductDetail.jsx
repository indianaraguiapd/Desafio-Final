import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../services/api'
import { useFetch } from '../hooks/useFetch'
import { useCart } from '../context/CartContext'
import './ProductDetail.css'

function formatBRL(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value * 5.8)
}

const CAT_LABELS = {
  'electronics':      'Eletrônicos',
  'jewelery':         'Joias',
  "women's clothing": 'Feminino',
  "men's clothing":   'Masculino',
}

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const { data: product, loading, error } = useFetch(() => api.getProduct(id), [id])

  if (loading) return (
    <div style={{ paddingTop: 'var(--nav-height)' }}>
      <div className="spinner-wrapper"><div className="spinner" /><p className="spinner-text">Carregando produto</p></div>
    </div>
  )

  if (error) return (
    <div style={{ paddingTop: 'var(--nav-height)' }}>
      <div className="error-wrapper"><h2>Produto não encontrado</h2><p>{error}</p></div>
    </div>
  )

  if (!product) return null

  const stars = Math.round(product.rating?.rate || 0)

  return (
    <div className="detail">
      <div className="detail__inner container">
        {/* Breadcrumb */}
        <nav className="detail__breadcrumb">
          <button onClick={() => navigate(-1)} className="detail__back">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            Voltar
          </button>
          <span className="detail__breadcrumb-sep">·</span>
          <span>{CAT_LABELS[product.category] || product.category}</span>
        </nav>

        <div className="detail__layout">
          {/* Image */}
          <div className="detail__img-wrap">
            <div className="detail__img-inner">
              <img src={product.image} alt={product.title} />
            </div>
            <div className="detail__img-deco" aria-hidden="true" />
          </div>

          {/* Info */}
          <div className="detail__info">
            <span className="detail__category">{CAT_LABELS[product.category] || product.category}</span>

            <h1 className="detail__title">{product.title}</h1>

            <div className="detail__rating">
              <div className="detail__stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={i < stars ? 'star star--filled' : 'star'}>★</span>
                ))}
              </div>
              <span className="detail__rating-text">
                {product.rating?.rate?.toFixed(1)} · {product.rating?.count} avaliações
              </span>
            </div>

            <div className="detail__divider" />

            <p className="detail__price">{formatBRL(product.price)}</p>
            <p className="detail__price-note">em até 12× sem juros</p>

            <div className="detail__divider" />

            <p className="detail__description">{product.description}</p>

            <div className="detail__actions">
              <button className="btn-gold" onClick={() => addToCart(product)} style={{clipPath:'none'}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                <span>Adicionar ao Carrinho</span>
              </button>
              <button className="btn-outline" onClick={() => navigate(-1)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m15 18-6-6 6-6"/>
                </svg>
                Continuar Comprando
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
