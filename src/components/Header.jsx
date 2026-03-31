import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import CartDrawer from './CartDrawer'
import './Header.css'

export default function Header({ onSearch }) {
  const { count } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  function handleSearch(e) {
    e.preventDefault()
    if (onSearch) onSearch(search)
    navigate('/')
  }

  return (
    <>
      <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
        <div className="header__inner">

          {/* Mobile menu toggle */}
          <button
            className="header__hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menu"
          >
            <span className={menuOpen ? 'open' : ''} />
            <span className={menuOpen ? 'open' : ''} />
            <span className={menuOpen ? 'open' : ''} />
          </button>

          {/* Logo */}
          <Link to="/" className="header__logo" onClick={() => { setMenuOpen(false); setSearch(''); if(onSearch) onSearch('') }}>
            <img src="/logo.jpg" alt="Nara Guiã" />
            <div className="header__logo-text">
              <span className="header__logo-name">Nara Guia</span>
              <span className="header__logo-sub">Moda e Estilo</span>
            </div>
          </Link>

          {/* Nav */}
          <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
            <Link to="/" className="header__nav-link" onClick={() => { setMenuOpen(false); if(onSearch) onSearch('') }}>
              Início
            </Link>
            <Link to="/?cat=electronics" className="header__nav-link" onClick={() => setMenuOpen(false)}>
              Eletrônicos
            </Link>
            <Link to="/?cat=jewelery" className="header__nav-link" onClick={() => setMenuOpen(false)}>
              Joias
            </Link>
            <Link to="/?cat=women's clothing" className="header__nav-link" onClick={() => setMenuOpen(false)}>
              Feminino
            </Link>
            <Link to="/?cat=men's clothing" className="header__nav-link" onClick={() => setMenuOpen(false)}>
              Masculino
            </Link>
          </nav>

          {/* Actions */}
          <div className="header__actions">
            {/* Search */}
            <form
              className={`header__search-form ${searchOpen ? 'header__search-form--open' : ''}`}
              onSubmit={handleSearch}
            >
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={search}
                onChange={e => { setSearch(e.target.value); if(onSearch) onSearch(e.target.value) }}
              />
              <button type="submit" aria-label="Buscar">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
              </button>
            </form>

            <button
              className="header__icon-btn"
              onClick={() => setSearchOpen(o => !o)}
              aria-label="Buscar"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </button>

            {/* Cart */}
            <button
              className="header__icon-btn header__cart-btn"
              onClick={() => setCartOpen(true)}
              aria-label={`Carrinho, ${count} itens`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {count > 0 && (
                <span className="header__cart-badge">{count}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
