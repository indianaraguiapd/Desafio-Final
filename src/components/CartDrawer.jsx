import { useCart } from '../context/CartContext'
import './CartDrawer.css'

function formatBRL(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value * 5.8)
}

export default function CartDrawer({ open, onClose }) {
  const { cart, total, addToCart, removeFromCart, decrement, clearCart } = useCart()

  return (
    <>
      <div className={`cart-backdrop ${open ? 'cart-backdrop--open' : ''}`} onClick={onClose} />
      <aside className={`cart-drawer ${open ? 'cart-drawer--open' : ''}`}>
        <div className="cart-drawer__header">
          <div>
            <h2 className="cart-drawer__title">Carrinho</h2>
            <p className="cart-drawer__count">{cart.length} {cart.length === 1 ? 'item' : 'itens'}</p>
          </div>
          <button className="cart-drawer__close" onClick={onClose} aria-label="Fechar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div className="cart-drawer__divider" />

        {cart.length === 0 ? (
          <div className="cart-drawer__empty">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            <p>Seu carrinho está vazio</p>
            <span>Adicione produtos para continuar</span>
          </div>
        ) : (
          <>
            <ul className="cart-drawer__list">
              {cart.map(item => (
                <li key={item.id} className="cart-item">
                  <img src={item.image} alt={item.title} className="cart-item__img" />
                  <div className="cart-item__info">
                    <p className="cart-item__title">{item.title}</p>
                    <p className="cart-item__price">{formatBRL(item.price)}</p>
                    <div className="cart-item__controls">
                      <button onClick={() => decrement(item.id)}>−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => addToCart(item)}>+</button>
                      <button className="cart-item__remove" onClick={() => removeFromCart(item.id)}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 6 6 18M6 6l12 12"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="cart-drawer__footer">
              <div className="cart-drawer__divider" />
              <div className="cart-drawer__total">
                <span>Total</span>
                <span className="cart-drawer__total-value">{formatBRL(total)}</span>
              </div>
              <button className="btn-gold" style={{width:'100%', justifyContent:'center', marginTop:'1rem', clipPath:'none'}}>
                <span>Finalizar Compra</span>
              </button>
              <button className="cart-drawer__clear" onClick={clearCart}>Limpar carrinho</button>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
