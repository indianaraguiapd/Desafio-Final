import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { api } from '../services/api'
import { useFetch } from '../hooks/useFetch'
import ProductCard from '../components/ProductCard'
import Sidebar from '../components/Sidebar'
import './Home.css'

export default function Home({ searchQuery }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeCategory, setActiveCategory] = useState(searchParams.get('cat') || '')

  const { data: products, loading: pLoading, error: pError } = useFetch(() => api.getProducts(), [])
  const { data: categories } = useFetch(() => api.getCategories(), [])

  useEffect(() => {
    const cat = searchParams.get('cat') || ''
    setActiveCategory(cat)
  }, [searchParams])

  function handleCategory(cat) {
    setActiveCategory(cat)
    if (cat) setSearchParams({ cat })
    else setSearchParams({})
  }

  const filtered = useMemo(() => {
    if (!products) return []
    let list = products
    if (activeCategory) list = list.filter(p => p.category === activeCategory)
    if (searchQuery?.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      )
    }
    return list
  }, [products, activeCategory, searchQuery])

  return (
    <div className="home">
      {/* Hero */}
      <section className="home__hero">
        <div className="home__hero-inner">
          <p className="home__hero-eyebrow">Coleção Exclusiva</p>
          <h1 className="home__hero-title">
            Estilo que<br />
            <em>define você</em>
          </h1>
          <p className="home__hero-sub">
            Peças selecionadas com sofisticação e elegância para quem vive o luxo.
          </p>
          <div className="home__hero-actions">
            <button className="btn-gold" onClick={() => { document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' }) }}>
              <span>Explorar Coleção</span>
            </button>
          </div>
        </div>
        <div className="home__hero-deco" aria-hidden="true">
          <span className="home__hero-deco-ring" />
          <span className="home__hero-deco-ring home__hero-deco-ring--2" />
        </div>
      </section>

      {/* Catalog */}
      <section id="catalog" className="home__catalog container">
        <div className="home__catalog-header">
          <h2 className="home__catalog-title">
            {activeCategory
              ? `Categoria: ${activeCategory}`
              : searchQuery
                ? `Resultados para "${searchQuery}"`
                : 'Todos os Produtos'
            }
          </h2>
          {!pLoading && <span className="home__catalog-count">{filtered.length} produtos</span>}
        </div>

        <div className="home__layout">
          {categories && (
            <Sidebar
              categories={categories}
              activeCategory={activeCategory}
              onSelect={handleCategory}
            />
          )}

          <div className="home__products">
            {pLoading && (
              <div className="spinner-wrapper">
                <div className="spinner" />
                <p className="spinner-text">Carregando produtos</p>
              </div>
            )}

            {pError && (
              <div className="error-wrapper">
                <h2>Ops! Algo deu errado</h2>
                <p>{pError}</p>
              </div>
            )}

            {!pLoading && !pError && filtered.length === 0 && (
              <div className="error-wrapper">
                <h2>Nenhum produto encontrado</h2>
                <p>Tente outro termo ou categoria.</p>
              </div>
            )}

            {!pLoading && !pError && (
              <div className="products-grid">
                {filtered.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
