import {
  BadgeCheck,
  ChevronDown,
  CircleUserRound,
  Gift,
  Heart,
  Home,
  MapPin,
  Menu,
  PackageSearch,
  Search,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Star,
  Wheat,
  X,
} from "lucide-react"
import { useState, type ReactNode } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { useCommerce } from "./commerce"
import { formatRupiah } from "./data"
import type { Product } from "./types"

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link
      to="/"
      className="flex shrink-0 items-center gap-2"
      aria-label="OlehMandar — beranda"
    >
      <span
        className={`grid size-9 place-items-center rounded-xl ${
          light ? "bg-[#f4b942]" : "bg-[#173f35]"
        }`}
      >
        <span className="mandar-mark size-5" />
      </span>
      <span
        className={`text-xl font-extrabold tracking-[-0.04em] ${
          light ? "text-white" : "text-[#173f35]"
        }`}
      >
        Oleh
        <span className={light ? "text-[#f4b942]" : "text-[#d56b3f]"}>
          Mandar
        </span>
      </span>
    </Link>
  )
}

export function Layout({ children }: { children: ReactNode }) {
  const { count } = useCommerce()
  const [menu, setMenu] = useState(false)
  const [query, setQuery] = useState("")
  const navigate = useNavigate()
  const search = (event: React.FormEvent) => {
    event.preventDefault()
    navigate(`/produk${query ? `?q=${encodeURIComponent(query)}` : ""}`)
  }

  const mobileNav = [
    { to: "/", label: "Beranda", icon: Home },
    { to: "/produk", label: "Produk", icon: Search },
    { to: "/hampers", label: "Hampers", icon: Gift },
    { to: "/lacak-pesanan", label: "Pesanan", icon: PackageSearch },
    { to: "/akun", label: "Akun", icon: CircleUserRound },
  ]

  return (
    <div className="min-h-screen bg-[#fbfaf7] text-[#24332e]">
      <div className="bg-[#173f35] px-4 py-2 text-center text-[11px] font-semibold tracking-wide text-white sm:text-xs">
        Garansi kesegaran untuk setiap kiriman • Gratis kemasan aman
      </div>
      <header className="sticky top-0 z-50 border-b border-[#e8e4dc] bg-[#fbfaf7]/95 backdrop-blur-xl">
        <div className="container flex h-[72px] items-center gap-4">
          <button
            className="grid size-10 place-items-center rounded-xl border border-[#e4dfd5] lg:hidden"
            onClick={() => setMenu(!menu)}
            aria-label="Buka menu"
          >
            {menu ? <X size={20} /> : <Menu size={20} />}
          </button>
          <Logo />
          <form
            onSubmit={search}
            className="relative ml-auto hidden max-w-2xl flex-1 md:block"
          >
            <Search
              className="absolute top-1/2 left-4 -translate-y-1/2 text-[#6b7772]"
              size={19}
            />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="h-11 w-full rounded-xl border border-[#dcd8cf] bg-white pr-4 pl-11 text-sm outline-none transition focus:border-[#2d6a59] focus:ring-3 focus:ring-[#2d6a59]/10"
              placeholder="Cari golla kambu, baje, hampers..."
              aria-label="Cari produk"
            />
          </form>
          <button className="hidden items-center gap-2 text-sm font-semibold lg:flex">
            <MapPin size={18} />
            <span>
              Kirim ke <b className="block">Makassar</b>
            </span>
            <ChevronDown size={16} />
          </button>
          <div className="ml-auto flex items-center gap-1 md:ml-0">
            <Link
              className="header-icon hidden md:grid"
              to="/lacak-pesanan"
              aria-label="Lacak pesanan"
            >
              <PackageSearch size={21} />
            </Link>
            <Link
              className="header-icon hidden md:grid"
              to="/akun"
              aria-label="Akun"
            >
              <CircleUserRound size={21} />
            </Link>
            <Link
              className="header-icon relative"
              to="/keranjang"
              aria-label={`Keranjang, ${count} item`}
            >
              <ShoppingCart size={21} />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 grid size-5 place-items-center rounded-full bg-[#d56b3f] text-[10px] font-bold text-white">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>
        <nav className="hidden border-t border-[#eeeae2] lg:block">
          <div className="container flex h-11 items-center gap-8 text-sm font-semibold">
            <NavLink to="/produk" className="flex items-center gap-2">
              <Menu size={17} /> Semua Kategori
            </NavLink>
            <NavLink to="/produk?category=Kue%20%26%20Manisan">
              Kue & Manisan
            </NavLink>
            <NavLink to="/produk?category=Camilan%20Tradisional">
              Camilan Tradisional
            </NavLink>
            <NavLink to="/produk?category=Minyak%20%26%20Bumbu">
              Minyak & Bumbu
            </NavLink>
            <NavLink to="/hampers" className="text-[#c45832]">
              Buat Hampers
            </NavLink>
            <Link to="/lacak-pesanan" className="ml-auto">
              Lacak Pesanan
            </Link>
          </div>
        </nav>
        {menu && (
          <div className="border-t border-[#e8e4dc] bg-white p-4 lg:hidden">
            <form onSubmit={search} className="relative mb-4 md:hidden">
              <Search
                className="absolute top-1/2 left-3 -translate-y-1/2"
                size={18}
              />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="h-11 w-full rounded-xl border border-[#dcd8cf] pl-10"
                placeholder="Cari oleh-oleh..."
              />
            </form>
            <div className="grid gap-1">
              {[
                ["/produk", "Semua produk"],
                ["/produk?category=Kue%20%26%20Manisan", "Kue & manisan"],
                ["/hampers", "Buat hampers"],
                ["/keranjang", "Keranjang"],
              ].map(([to, label]) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMenu(false)}
                  className="rounded-lg px-3 py-3 font-semibold hover:bg-[#f4f1e9]"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>
      <main>{children}</main>
      <Footer />
      <nav className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-5 border-t border-[#dedad1] bg-white px-1 pb-[env(safe-area-inset-bottom)] md:hidden">
        {mobileNav.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex min-h-16 flex-col items-center justify-center gap-1 text-[10px] font-bold ${
                isActive ? "text-[#1d5b4a]" : "text-[#738079]"
              }`
            }
          >
            <Icon size={20} />
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

function Footer() {
  return (
    <footer className="mt-20 mb-16 bg-[#14382f] text-white md:mb-0">
      <div className="container grid gap-10 py-14 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Logo light />
          <p className="mt-5 max-w-sm text-sm leading-7 text-white/70">
            Marketplace pilihan untuk menemukan rasa autentik Mandar dari
            perajin lokal Sulawesi Barat.
          </p>
          <div className="mt-5 flex items-center gap-2 text-sm font-bold text-[#f6c862]">
            <BadgeCheck size={18} /> Produk terkurasi & kemasan terjamin
          </div>
        </div>
        {[
          ["Belanja", "Semua Produk|Hampers|Produk Terlaris|Promo"],
          ["Bantuan", "Cara Belanja|Pengiriman|Garansi|Hubungi Kami"],
          ["OlehMandar", "Tentang Kami|Mitra UMKM|Cerita Mandar|Kebijakan"],
        ].map(([heading, links]) => (
          <div key={heading}>
            <h3 className="font-bold">{heading}</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/65">
              {links.split("|").map((link) => (
                <li key={link}>
                  <Link to="/produk" className="hover:text-white">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">
        © 2026 OlehMandar. Prototipe edukasi — data produk dan transaksi
        bersifat simulasi.
      </div>
    </footer>
  )
}

export function ProductCard({ product }: { product: Product }) {
  const { addProduct, wishlist, toggleWishlist } = useCommerce()
  const loved = wishlist.includes(product.id)
  return (
    <article className="group overflow-hidden rounded-2xl border border-[#e5e1d9] bg-white transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#173f35]/8">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#eeeae3]">
        <Link to={`/produk/${product.slug}`}>
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>
        {product.compareAt && (
          <span className="absolute top-3 left-3 rounded-full bg-[#d45e36] px-2.5 py-1 text-[10px] font-extrabold text-white">
            HEMAT
          </span>
        )}
        <button
          onClick={() => toggleWishlist(product.id)}
          className="absolute top-3 right-3 grid size-9 place-items-center rounded-full bg-white/95 shadow-sm"
          aria-label={loved ? "Hapus dari favorit" : "Tambah ke favorit"}
        >
          <Heart
            size={17}
            fill={loved ? "#d45e36" : "none"}
            className={loved ? "text-[#d45e36]" : ""}
          />
        </button>
      </div>
      <div className="p-4">
        <p className="mb-1 text-[11px] font-bold tracking-wide text-[#79837e] uppercase">
          {product.origin}
        </p>
        <Link
          to={`/produk/${product.slug}`}
          className="line-clamp-1 font-bold text-[#20362f] hover:text-[#1d6a54]"
        >
          {product.name}
        </Link>
        <p className="mt-2 font-extrabold text-[#173f35]">
          {formatRupiah(product.price)}
        </p>
        <div className="mt-2 flex items-center gap-1 text-xs text-[#67736e]">
          <Star size={14} fill="#f4b942" className="text-[#f4b942]" />
          <b className="text-[#34453f]">{product.rating}</b>
          <span>• {product.sold.toLocaleString("id-ID")} terjual</span>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-[10px] font-bold text-[#1d6a54]">
          <BadgeCheck size={14} /> Halal & P-IRT
        </div>
        <button
          onClick={() => addProduct(product)}
          className="btn-primary mt-4 h-10 w-full text-sm"
        >
          <ShoppingBag size={16} /> Tambah
        </button>
      </div>
    </article>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  action,
}: {
  eyebrow?: string
  title: string
  text?: string
  action?: ReactNode
}) {
  return (
    <div className="mb-7 flex items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="mb-2 text-xs font-extrabold tracking-[0.16em] text-[#c15b35] uppercase">
            {eyebrow}
          </p>
        )}
        <h2 className="text-2xl font-extrabold tracking-[-0.03em] text-[#173f35] sm:text-3xl">
          {title}
        </h2>
        {text && (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6a7771]">
            {text}
          </p>
        )}
      </div>
      {action}
    </div>
  )
}

export function TrustBadge({
  icon,
  title,
  text,
}: {
  icon: ReactNode
  title: string
  text: string
}) {
  return (
    <div className="flex gap-3">
      <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#e7f0eb] text-[#1d6a54]">
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-bold">{title}</h3>
        <p className="mt-1 text-xs leading-5 text-[#708079]">{text}</p>
      </div>
    </div>
  )
}

export const categoryIcon = (icon: string) => {
  if (icon === "wheat") return <Wheat />
  if (icon === "gift") return <Gift />
  if (icon === "bottle") return <Sparkles />
  return <ShoppingBag />
}
