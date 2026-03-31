import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Header from './components/Header'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import './styles/global.css'

function AppLayout() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <>
      <Header onSearch={setSearchQuery} />
      <main>
        <Routes>
          <Route path="/" element={<Home searchQuery={searchQuery} />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </main>
      <footer className="app-footer">
        <div className="container">
          <div className="app-footer__inner">
            <div className="app-footer__brand">
              <img src="/logo.jpg" alt="Nara Guiã" />
              <div>
                <p className="app-footer__name">Nara Guia</p>
                <p className="app-footer__tagline">Moda e Estilo</p>
              </div>
            </div>
            <p className="app-footer__copy">
              © {new Date().getFullYear()} Nara Guia — Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppLayout />
      </CartProvider>
    </BrowserRouter>
  )
}
