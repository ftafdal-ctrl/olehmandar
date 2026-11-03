import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react"
import type { Address, CartItem, Order, Packaging, Product } from "./types"

type CommerceValue = {
  cart: CartItem[]
  wishlist: string[]
  orders: Order[]
  toast: string
  count: number
  subtotal: number
  addProduct: (
    product: Product,
    quantity?: number,
    packaging?: Packaging,
  ) => void
  addHamper: (item: CartItem) => void
  updateQty: (id: string, quantity: number) => void
  removeItem: (id: string) => void
  toggleWishlist: (id: string) => void
  createOrder: (data: {
    address: Address
    shipping: string
    payment: string
    shippingCost: number
    discount: number
  }) => Order
  repeatOrder: (order: Order) => void
  notify: (message: string) => void
}

const CommerceContext = createContext<CommerceValue | null>(null)

function readLocal<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) as T : fallback
  } catch {
    return fallback
  }
}

export function CommerceProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() =>
    readLocal("olehmandar-cart", []),
  )
  const [wishlist, setWishlist] = useState<string[]>(() =>
    readLocal("olehmandar-wishlist", []),
  )
  const [orders, setOrders] = useState<Order[]>(() =>
    readLocal("olehmandar-orders", []),
  )
  const [toast, setToast] = useState("")
  const toastTimeoutRef = useRef<number | null>(null)

  useEffect(
    () => localStorage.setItem("olehmandar-cart", JSON.stringify(cart)),
    [cart],
  )
  useEffect(
    () => localStorage.setItem("olehmandar-wishlist", JSON.stringify(wishlist)),
    [wishlist],
  )
  useEffect(
    () => localStorage.setItem("olehmandar-orders", JSON.stringify(orders)),
    [orders],
  )

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current !== null) {
        window.clearTimeout(toastTimeoutRef.current)
      }
    }
  }, [])

  const notify = (message: string) => {
    setToast(message)
    if (toastTimeoutRef.current !== null) {
      window.clearTimeout(toastTimeoutRef.current)
    }
    toastTimeoutRef.current = window.setTimeout(() => setToast(""), 2600)
  }

  const addProduct = (
    product: Product,
    quantity = 1,
    packaging: Packaging = "Standar Aman",
  ) => {
    const id = `${product.id}-${packaging}`
    setCart((items) => {
      const found = items.find((item) => item.id === id)
      if (found) {
        return items.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: Math.min(item.quantity + quantity, product.stock),
              }
            : item,
        )
      }
      return [
        ...items,
        {
          id,
          productId: product.id,
          name: product.name,
          image: product.image,
          price:
            product.price +
            (packaging === "Vakum Ekstra"
              ? 5000
              : packaging === "Box Hampers"
                ? 18000
                : 0),
          quantity,
          packaging,
        },
      ]
    })
    notify(`${product.name} masuk keranjang`)
  }

  const addHamper = (item: CartItem) => {
    setCart((items) => [...items, item])
    notify("Hampers buatanmu masuk keranjang")
  }

  const updateQty = (id: string, quantity: number) => {
    if (quantity < 1) return
    setCart((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity } : item)),
    )
  }

  const removeItem = (id: string) => {
    setCart((items) => items.filter((item) => item.id !== id))
    notify("Produk dihapus dari keranjang")
  }

  const toggleWishlist = (id: string) => {
    const nextWishlist = wishlist.includes(id)
      ? wishlist.filter((item) => item !== id)
      : [...wishlist, id]

    setWishlist(nextWishlist)
    notify(nextWishlist.includes(id) ? "Disimpan ke favorit" : "Dihapus dari favorit")
  }

  const createOrder = (data: {
    address: Address
    shipping: string
    payment: string
    shippingCost: number
    discount: number
  }) => {
    const total =
      cart.reduce((sum, item) => sum + item.price * item.quantity, 0) +
      data.shippingCost -
      data.discount
    const order: Order = {
      id: `OM${new Date().getFullYear()}${Math.random().toString(36).slice(2, 7).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      items: cart,
      address: data.address,
      shipping: data.shipping,
      payment: data.payment,
      total,
      status: "Dikemas UMKM",
    }
    setOrders((items) => [order, ...items])
    setCart([])
    return order
  }

  const repeatOrder = (order: Order) => {
    setCart((items) => [
      ...items,
      ...order.items.map((item) => ({
        ...item,
        id: `${item.id}-${Date.now()}`,
      })),
    ])
    notify("Produk pesanan lama masuk keranjang")
  }

  const value = useMemo(
    () => ({
      cart,
      wishlist,
      orders,
      toast,
      count: cart.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      addProduct,
      addHamper,
      updateQty,
      removeItem,
      toggleWishlist,
      createOrder,
      repeatOrder,
      notify,
    }),
    [cart, wishlist, orders, toast],
  )

  return (
    <CommerceContext.Provider value={value}>
      {children}
      {toast && (
        <div
          aria-live="polite"
          className="fixed right-4 bottom-24 z-80 rounded-xl bg-[#173f35] px-5 py-3 text-sm font-bold text-white shadow-xl md:bottom-6"
        >
          {toast}
        </div>
      )}
    </CommerceContext.Provider>
  )
}

export function useCommerce() {
  const value = useContext(CommerceContext)
  if (!value)
    throw new Error("useCommerce must be used inside CommerceProvider")
  return value
}
