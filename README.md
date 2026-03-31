# Nara Guia — Moda e Estilo 🖤✨

E-commerce moderno desenvolvido com **React + Vite**, consumindo a [Fake Store API](https://fakestoreapi.com/docs). Projeto de estudo cobrindo 4 sprints completas de desenvolvimento frontend.


---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Uso |
|---|---|---|
| React | 18.x | Framework UI |
| Vite | 6.x | Build tool & dev server |
| React Router DOM | 6.x | Roteamento SPA |
| Framer Motion | 11.x | Animações (opcional) |
| Fake Store API | — | Dados dos produtos |

---

## ✅ Funcionalidades Implementadas

### Sprint 1 — Estrutura e API
- [x] Projeto iniciado com Vite + React
- [x] Consumo do endpoint `/products` da Fake Store API
- [x] Header funcional com logo, navegação e busca
- [x] Grid de produtos responsivo
- [x] Card de produto com imagem, título e preço em R$

### Sprint 2 — Roteamento e Categorização
- [x] React Router configurado
- [x] Rota `/` — Home com grid de produtos
- [x] Rota `/product/:id` — Página de detalhes
- [x] Nova chamada à API para buscar produto por ID
- [x] Sidebar com filtro por categoria
- [x] Categorias: Eletrônicos, Joias, Feminino, Masculino

### Sprint 3 — Carrinho com Estado Global
- [x] Context API para estado global do carrinho
- [x] Adicionar produto ao carrinho
- [x] Incrementar quantidade se produto já existe
- [x] Remover produto do carrinho
- [x] Decrementar quantidade
- [x] Limpar carrinho completo
- [x] Calcular total em tempo real (em R$)
- [x] Loading state com spinner
- [x] Tratamento de erros da API

### Sprint 4 — Organização, UX e Entrega
- [x] Arquitetura de pastas: `components/`, `hooks/`, `services/`, `pages/`, `styles/`, `context/`
- [x] Persistência com `localStorage` (carrinho salvo ao recarregar)
- [x] Barra de busca em tempo real ⭐
- [x] README profissional ⭐
- [x] Design system com identidade visual (preto & dourado)
- [x] Totalmente responsivo (mobile-first)

---

## 📁 Estrutura de Pastas

```
src/
├── components/
│   ├── Header.jsx / Header.css
│   ├── CartDrawer.jsx / CartDrawer.css
│   ├── ProductCard.jsx / ProductCard.css
│   └── Sidebar.jsx / Sidebar.css
├── context/
│   └── CartContext.jsx
├── hooks/
│   └── useFetch.js
├── pages/
│   ├── Home.jsx / Home.css
│   └── ProductDetail.jsx / ProductDetail.css
├── services/
│   └── api.js
├── styles/
│   ├── global.css
│   └── footer.css
├── App.jsx
└── main.jsx
```

---

## 🎨 Design System

- **Paleta:** Preto (`#0A0A0A`) + Dourado (`#C9A84C`)
- **Fontes:** Cinzel (display) · Cormorant Garamond (body) · Raleway (UI)
- **Tema:** Luxury Fashion — elegante, sofisticado e moderno

---

## 📡 Endpoints da API Utilizados

| Método | Endpoint | Uso |
|---|---|---|
| GET | `/products` | Listar todos os produtos |
| GET | `/products/:id` | Buscar produto por ID |
| GET | `/products/categories` | Listar categorias |
| GET | `/products/category/:cat` | Produtos por categoria |

---

## 👩‍💻 Desenvolvido para

**Nara Guiã — Moda e Estilo**  
Desafio de desenvolvimento frontend — 4 Sprints

---

*Feito com 🖤 e muito ✨*
