import { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext(null)

const STORAGE_KEY = 'nara-guia-cart'

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.find(i => i.id === action.product.id)
      if (existing) {
        return state.map(i =>
          i.id === action.product.id ? { ...i, qty: i.qty + 1 } : i
        )
      }
      return [...state, { ...action.product, qty: 1 }]
    }
    case 'REMOVE':
      return state.filter(i => i.id !== action.id)
    case 'DECREMENT': {
      const item = state.find(i => i.id === action.id)
      if (item?.qty <= 1) return state.filter(i => i.id !== action.id)
      return state.map(i => i.id === action.id ? { ...i, qty: i.qty - 1 } : i)
    }
    case 'CLEAR':
      return []
    case 'LOAD':
      return action.payload
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, [], () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
  }, [cart])

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0)
  const count = cart.reduce((sum, i) => sum + i.qty, 0)

  const addToCart = (product) => dispatch({ type: 'ADD', product })
  const removeFromCart = (id) => dispatch({ type: 'REMOVE', id })
  const decrement = (id) => dispatch({ type: 'DECREMENT', id })
  const clearCart = () => dispatch({ type: 'CLEAR' })

  return (
    <CartContext.Provider value={{ cart, total, count, addToCart, removeFromCart, decrement, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
