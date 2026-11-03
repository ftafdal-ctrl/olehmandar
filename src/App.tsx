import { useEffect } from "react"
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"
import { CommerceProvider } from "./commerce"
import { Layout } from "./components"
import AccountPage from "./pages/AccountPage"
import CartPage from "./pages/CartPage"
import CatalogPage from "./pages/CatalogPage"
import CheckoutPage from "./pages/CheckoutPage"
import HampersPage from "./pages/HampersPage"
import HomePage from "./pages/HomePage"
import {
  NotFoundPage,
  OrderSuccessPage,
  TrackingPage,
} from "./pages/OrderPages"
import ProductDetailPage from "./pages/ProductDetailPage"

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <CommerceProvider>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/produk" element={<CatalogPage />} />
            <Route path="/produk/:slug" element={<ProductDetailPage />} />
            <Route path="/hampers" element={<HampersPage />} />
            <Route path="/keranjang" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route
              path="/pesanan-berhasil/:id"
              element={<OrderSuccessPage />}
            />
            <Route path="/lacak-pesanan" element={<TrackingPage />} />
            <Route path="/lacak-pesanan/:id" element={<TrackingPage />} />
            <Route path="/akun" element={<AccountPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </CommerceProvider>
    </BrowserRouter>
  )
}
