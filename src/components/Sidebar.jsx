import './Sidebar.css'

const CAT_LABELS = {
  'electronics':      'Eletrônicos',
  'jewelery':         'Joias',
  "women's clothing": 'Feminino',
  "men's clothing":   'Masculino',
}

export default function Sidebar({ categories, activeCategory, onSelect }) {
  return (
    <aside className="sidebar">
      <p className="sidebar__label">Categorias</p>
      <ul className="sidebar__list">
        <li>
          <button
            className={`sidebar__item ${!activeCategory ? 'sidebar__item--active' : ''}`}
            onClick={() => onSelect('')}
          >
            <span className="sidebar__dot" />
            Todos os Produtos
          </button>
        </li>
        {categories.map(cat => (
          <li key={cat}>
            <button
              className={`sidebar__item ${activeCategory === cat ? 'sidebar__item--active' : ''}`}
              onClick={() => onSelect(cat)}
            >
              <span className="sidebar__dot" />
              {CAT_LABELS[cat] || cat}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  )
}
