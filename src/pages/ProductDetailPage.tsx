import {
  BadgeCheck,
  Box,
  ChevronRight,
  CircleAlert,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react"
import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ProductCard, SectionHeading, TrustBadge } from "../components"
import { useCommerce } from "../commerce"
import { formatRupiah, products } from "../data"
import type { Packaging } from "../types"

export default function ProductDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const product = products.find((item) => item.slug === slug)
  const { addProduct, wishlist, toggleWishlist } = useCommerce()
  const [quantity, setQuantity] = useState(1)
  const [packaging, setPackaging] = useState<Packaging>("Standar Aman")
  const [image, setImage] = useState(product?.image ?? "")

  if (!product) {
    return (
      <div className="container grid min-h-[55vh] place-items-center text-center">
        <div>
          <h1 className="text-3xl font-extrabold">Produk tidak ditemukan</h1>
          <Link className="btn-primary mt-5 h-11 px-5" to="/produk">
            Kembali ke katalog
          </Link>
        </div>
      </div>
    )
  }

  const extra =
    packaging === "Vakum Ekstra"
      ? 5000
      : packaging === "Box Hampers"
        ? 18000
        : 0
  const buyNow = () => {
    addProduct(product, quantity, packaging)
    navigate("/keranjang")
  }

  return (
    <div className="container py-7 sm:py-10">
      <div className="flex items-center gap-1 text-xs text-[#77817d]">
        <Link to="/">Beranda</Link> <ChevronRight size={13} />{" "}
        <Link to="/produk">Produk</Link> <ChevronRight size={13} />{" "}
        <span className="line-clamp-1">{product.name}</span>
      </div>
      <div className="mt-6 grid gap-8 lg:grid-cols-[1.05fr_.95fr] xl:gap-14">
        <div>
          <div className="aspect-square overflow-hidden rounded-3xl bg-[#eeeae4]">
            <img
              src={image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {product.gallery.map((item, index) => (
              <button
                key={item}
                onClick={() => setImage(item)}
                className={`aspect-[4/3] overflow-hidden rounded-xl border-2 ${
                  image === item ? "border-[#1d6a54]" : "border-transparent"
                }`}
              >
                <img
                  src={item}
                  alt={`${product.name} tampilan ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-extrabold tracking-widest text-[#c15b35] uppercase">
            {product.origin}
          </p>
          <div className="mt-3 flex items-start gap-3">
            <h1 className="flex-1 text-3xl font-extrabold tracking-[-0.04em] text-[#173f35] sm:text-4xl">
              {product.name}
            </h1>
            <button
              onClick={() => toggleWishlist(product.id)}
              className="grid size-11 shrink-0 place-items-center rounded-full border border-[#ddd8cf]"
              aria-label="Simpan favorit"
            >
              <Heart
                size={20}
                fill={wishlist.includes(product.id) ? "#d45e36" : "none"}
                className={
                  wishlist.includes(product.id) ? "text-[#d45e36]" : ""
                }
              />
            </button>
          </div>
          <div className="mt-3 flex items-center gap-2 text-sm">
            <Star size={16} fill="#f4b942" className="text-[#f4b942]" />
            <b>{product.rating}</b>
            <span className="text-[#748079]">({product.reviews} ulasan)</span>
            <span className="text-[#c8c5be]">|</span>
            <span className="text-[#748079]">
              {product.sold.toLocaleString("id-ID")} terjual
            </span>
          </div>
          <div className="mt-6 flex items-end gap-3">
            <span className="text-3xl font-black text-[#173f35]">
              {formatRupiah(product.price + extra)}
            </span>
            {product.compareAt && (
              <span className="pb-1 text-sm text-[#89908d] line-through">
                {formatRupiah(product.compareAt)}
              </span>
            )}
          </div>
          <p className="mt-5 leading-7 text-[#62716b]">{product.description}</p>

          <div className="mt-7">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-bold">Pilih kemasan</h2>
              <span className="text-xs text-[#6d7974]">
                Standar aman gratis
              </span>
            </div>
            <div className="grid gap-2 sm:grid-cols-3">
              {[
                ["Standar Aman", "Gratis"],
                ["Vakum Ekstra", "+Rp5.000"],
                ["Box Hampers", "+Rp18.000"],
              ].map(([name, price]) => (
                <button
                  key={name}
                  onClick={() => setPackaging(name as Packaging)}
                  className={`rounded-xl border p-3 text-left ${
                    packaging === name
                      ? "border-[#1d6a54] bg-[#edf4f0]"
                      : "border-[#dedad1] bg-white"
                  }`}
                >
                  <b className="block text-xs">{name}</b>
                  <span className="mt-1 block text-[11px] text-[#6f7b75]">
                    {price}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex h-12 items-center rounded-xl border border-[#dcd7ce] bg-white">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="grid size-11 place-items-center"
                aria-label="Kurangi"
              >
                <Minus size={16} />
              </button>
              <b className="w-8 text-center">{quantity}</b>
              <button
                onClick={() =>
                  setQuantity(Math.min(product.stock, quantity + 1))
                }
                className="grid size-11 place-items-center"
                aria-label="Tambah"
              >
                <Plus size={16} />
              </button>
            </div>
            <button
              onClick={() => addProduct(product, quantity, packaging)}
              className="btn-secondary h-12 flex-1"
            >
              Tambah
            </button>
            <button onClick={buyNow} className="btn-primary h-12 flex-1">
              Beli sekarang
            </button>
          </div>
          <p className="mt-3 text-xs text-[#6f7d76]">
            Tersisa {product.stock} • Pengiriman dari {product.origin}
          </p>

          <div className="mt-7 rounded-2xl border border-[#dfe4df] bg-white p-5">
            <div className="grid gap-5 sm:grid-cols-3">
              <TrustBadge
                icon={<BadgeCheck size={20} />}
                title="Legalitas jelas"
                text="Halal & P-IRT"
              />
              <TrustBadge
                icon={<Box size={20} />}
                title={`${product.shelfLife} hari`}
                text="Masa simpan"
              />
              <TrustBadge
                icon={<ShieldCheck size={20} />}
                title="Garansi segar"
                text="Ganti jika rusak"
              />
            </div>
          </div>
        </div>
      </div>

      <section className="mt-16 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="rounded-3xl border border-[#e4e0d8] bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-extrabold text-[#173f35]">
            Cerita di balik rasa
          </h2>
          <p className="mt-5 leading-8 text-[#5e6d67]">{product.story}</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="font-bold">Komposisi</h3>
              <p className="mt-2 text-sm leading-6 text-[#6b7872]">
                {product.ingredients}
              </p>
            </div>
            <div>
              <h3 className="font-bold">Cara menyimpan</h3>
              <p className="mt-2 text-sm leading-6 text-[#6b7872]">
                Simpan di tempat sejuk dan kering. Tutup rapat kemasan setelah
                dibuka.
              </p>
            </div>
          </div>
          <div className="mt-8 rounded-2xl bg-[#f5f0e7] p-5">
            <h3 className="font-bold">Informasi legalitas</h3>
            <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
              <span>Halal: {product.halal}</span>
              <span>P-IRT: {product.pirt}</span>
            </div>
            <p className="mt-3 flex gap-2 text-xs text-[#86765b]">
              <CircleAlert size={15} className="shrink-0" /> Nomor sertifikasi
              pada prototipe ini merupakan data contoh.
            </p>
          </div>
        </div>
        <aside className="rounded-3xl bg-[#173f35] p-6 text-white">
          <Truck className="text-[#f4b942]" size={30} />
          <h2 className="mt-5 text-xl font-extrabold">
            Dikemas untuk perjalanan jauh
          </h2>
          <ol className="mt-6 space-y-5 text-sm">
            {[
              "Pemeriksaan produk",
              "Kemasan primer kedap",
              "Pelindung antarguncang",
              "Segel dan label tanggal",
            ].map((item, index) => (
              <li key={item} className="flex gap-3">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#f4b942] text-xs font-bold text-[#173f35]">
                  {index + 1}
                </span>
                <span className="text-white/80">{item}</span>
              </li>
            ))}
          </ol>
        </aside>
      </section>

      <section className="mt-16">
        <SectionHeading
          title="Sering dibeli bersama"
          text="Gabungkan kiriman untuk ongkir yang lebih hemat."
        />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:gap-5">
          {products
            .filter((item) => item.id !== product.id)
            .slice(0, 4)
            .map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
        </div>
      </section>
    </div>
  )
}
