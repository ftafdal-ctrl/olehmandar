import {
  ArrowRight,
  Check,
  CheckCircle2,
  Copy,
  Gift,
  PackageCheck,
  RotateCcw,
  Search,
  Star,
  Truck,
} from "lucide-react"
import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useCommerce } from "../commerce"
import { formatRupiah, products } from "../data"
import { ProductCard } from "../components"

export function OrderSuccessPage() {
  const { id } = useParams()
  const { orders } = useCommerce()
  const order = orders.find((item) => item.id === id)
  if (!order) return <NotFoundPage />
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-2xl rounded-3xl border border-[#e1ddd4] bg-white p-6 text-center sm:p-10">
        <span className="mx-auto grid size-20 place-items-center rounded-full bg-[#e7f2ed] text-[#1d6a54]">
          <CheckCircle2 size={38} />
        </span>
        <p className="mt-5 text-xs font-extrabold tracking-widest text-[#c15b35] uppercase">
          Pesanan simulasi berhasil
        </p>
        <h1 className="mt-2 text-3xl font-extrabold text-[#173f35]">
          Terima kasih, {order.address.name}!
        </h1>
        <p className="mt-3 text-[#68766f]">
          Pesananmu akan mulai disiapkan oleh mitra UMKM.
        </p>
        <div className="mt-7 rounded-2xl bg-[#f5f1e9] p-5 text-left">
          <div className="flex justify-between">
            <span className="text-sm text-[#6e7b75]">Nomor pesanan</span>
            <b>{order.id}</b>
          </div>
          <div className="mt-3 flex justify-between">
            <span className="text-sm text-[#6e7b75]">Total</span>
            <b>{formatRupiah(order.total)}</b>
          </div>
          <div className="mt-3 flex justify-between">
            <span className="text-sm text-[#6e7b75]">Estimasi tiba</span>
            <b>3–5 hari</b>
          </div>
        </div>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to={`/lacak-pesanan/${order.id}`}
            className="btn-primary h-12 px-6"
          >
            Lacak pesanan <ArrowRight size={17} />
          </Link>
          <Link to="/produk" className="btn-secondary h-12 px-6">
            Kembali belanja
          </Link>
        </div>
        <p className="mt-6 text-xs leading-5 text-[#7a847f]">
          Notifikasi WhatsApp dan pembayaran pada prototipe ini hanya simulasi
          UI.
        </p>
      </div>
    </div>
  )
}

export function TrackingPage() {
  const { id } = useParams()
  const { orders } = useCommerce()
  const [input, setInput] = useState(id ?? "")
  const navigate = useNavigate()
  const order = orders.find((item) => item.id === id)
  const search = (event: React.FormEvent) => {
    event.preventDefault()
    if (input.trim()) navigate(`/lacak-pesanan/${input.trim()}`)
  }
  const events = [
    "Pesanan dibuat",
    "Dikemas UMKM",
    "Diserahkan ke kurir",
    "Dalam perjalanan",
    "Tiba di kota tujuan",
    "Selesai",
  ]
  const active = order ? 1 : -1
  return (
    <div className="container py-10 sm:py-14">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-extrabold tracking-[.16em] text-[#c15b35] uppercase">
          Pantau kiriman
        </p>
        <h1 className="mt-2 text-3xl font-extrabold text-[#173f35]">
          Lacak pesananmu
        </h1>
        <form
          onSubmit={search}
          className="mt-6 flex gap-2 rounded-2xl border border-[#dfdbd2] bg-white p-2 shadow-sm"
        >
          <Search className="ml-2 self-center text-[#6f7b75]" size={19} />
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            className="min-w-0 flex-1 outline-none"
            placeholder="Contoh: OM2026ABCDE"
          />
          <button className="btn-primary h-11 px-5">Lacak</button>
        </form>
        {id && !order && (
          <div className="mt-8 rounded-2xl border border-dashed border-[#d8d2c7] bg-white p-8 text-center">
            <h2 className="font-extrabold">Pesanan tidak ditemukan</h2>
            <p className="mt-2 text-sm text-[#6d7974]">
              Periksa kembali nomor pesanan atau buat pesanan simulasi dari
              checkout.
            </p>
          </div>
        )}
        {!id && orders.length > 0 && (
          <div className="mt-6 rounded-2xl bg-[#edf3ef] p-4 text-sm">
            Pesanan terakhirmu:{" "}
            <Link
              className="font-bold text-[#1d6a54]"
              to={`/lacak-pesanan/${orders[0].id}`}
            >
              {orders[0].id}
            </Link>
          </div>
        )}
        {order && (
          <div className="mt-8 rounded-3xl border border-[#e1ddd4] bg-white p-6 sm:p-8">
            <div className="flex flex-wrap justify-between gap-4 border-b border-[#e8e4dc] pb-6">
              <div>
                <span className="text-xs text-[#748079]">Nomor pesanan</span>
                <b className="block">{order.id}</b>
              </div>
              <span className="h-fit rounded-full bg-[#fff0cd] px-3 py-1.5 text-xs font-bold text-[#8a6211]">
                {order.status}
              </span>
            </div>
            <div className="mt-8">
              {events.map((event, index) => (
                <div key={event} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span
                      className={`grid size-9 place-items-center rounded-full ${
                        index <= active
                          ? "bg-[#1d6a54] text-white"
                          : "bg-[#ece9e2] text-[#929a96]"
                      }`}
                    >
                      {index <= active ? (
                        <Check size={16} />
                      ) : (
                        <PackageCheck size={16} />
                      )}
                    </span>
                    {index < events.length - 1 && (
                      <span
                        className={`h-14 w-0.5 ${
                          index < active ? "bg-[#1d6a54]" : "bg-[#e4e0d8]"
                        }`}
                      />
                    )}
                  </div>
                  <div className="pt-2">
                    <b
                      className={`text-sm ${
                        index > active ? "text-[#8a938f]" : ""
                      }`}
                    >
                      {event}
                    </b>
                    {index <= active && (
                      <small className="mt-1 block text-[#78827d]">
                        {index === 0
                          ? new Date(order.createdAt).toLocaleString("id-ID")
                          : "Sedang diproses hari ini"}
                      </small>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex gap-3 rounded-2xl bg-[#f5f1e9] p-4 text-sm">
              <Truck className="shrink-0 text-[#1d6a54]" />
              <span>
                <b className="block">Estimasi tiba 3–5 hari</b>Produk dikemas
                aman sebelum diserahkan ke kurir.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export function AccountPage() {
  const { orders, wishlist, repeatOrder, notify } = useCommerce()
  const wishlistProducts = products.filter((item) => wishlist.includes(item.id))
  return (
    <div className="container py-10 sm:py-14">
      <div className="rounded-3xl bg-[#173f35] p-6 text-white sm:flex sm:items-center sm:justify-between sm:p-8">
        <div>
          <p className="text-sm text-white/60">Selamat datang kembali</p>
          <h1 className="mt-1 text-3xl font-extrabold">Kak Ilham</h1>
          <p className="mt-2 text-sm text-white/65">
            Pencinta rasa Mandar • Makassar
          </p>
        </div>
        <div className="mt-6 rounded-2xl bg-white/10 p-5 sm:mt-0 sm:min-w-64">
          <div className="flex items-center gap-2 text-[#f4c45b]">
            <Star fill="currentColor" size={18} />
            <b>Mandar Rasa</b>
          </div>
          <div className="mt-3 flex items-end justify-between">
            <b className="text-2xl">1.250</b>
            <span className="text-xs text-white/60">poin</span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[62%] bg-[#f4b942]" />
          </div>
          <small className="mt-2 block text-white/55">
            750 poin lagi ke Mandar Bangga
          </small>
        </div>
      </div>
      <div className="mt-8 grid gap-7 lg:grid-cols-[1fr_320px]">
        <section>
          <h2 className="text-2xl font-extrabold text-[#173f35]">
            Pesanan saya
          </h2>
          {orders.length ? (
            <div className="mt-5 space-y-3">
              {orders.map((order) => (
                <article
                  key={order.id}
                  className="rounded-2xl border border-[#e1ddd5] bg-white p-5"
                >
                  <div className="flex flex-wrap justify-between gap-3">
                    <div>
                      <small className="text-[#748079]">
                        {new Date(order.createdAt).toLocaleDateString("id-ID")}
                      </small>
                      <b className="block">{order.id}</b>
                    </div>
                    <span className="h-fit rounded-full bg-[#fff0cd] px-3 py-1 text-xs font-bold text-[#845d10]">
                      {order.status}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <img
                      src={order.items[0]?.image}
                      alt=""
                      className="size-14 rounded-lg object-cover"
                    />
                    <span className="flex-1 text-sm">
                      {order.items[0]?.name}
                      <small className="block text-[#748079]">
                        +{Math.max(0, order.items.length - 1)} produk lain
                      </small>
                    </span>
                    <b>{formatRupiah(order.total)}</b>
                  </div>
                  <div className="mt-4 flex justify-end gap-2">
                    <Link
                      to={`/lacak-pesanan/${order.id}`}
                      className="btn-secondary h-9 px-3 text-xs"
                    >
                      Lacak
                    </Link>
                    <button
                      onClick={() => repeatOrder(order)}
                      className="btn-primary h-9 px-3 text-xs"
                    >
                      <RotateCcw size={14} /> Beli lagi
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-2xl border border-dashed border-[#d8d2c7] bg-white p-8 text-center">
              <p>Belum ada pesanan simulasi.</p>
              <Link
                to="/produk"
                className="mt-3 inline-block font-bold text-[#1d6a54]"
              >
                Mulai belanja
              </Link>
            </div>
          )}
        </section>
        <aside>
          <h2 className="text-2xl font-extrabold text-[#173f35]">Ajak teman</h2>
          <div className="mt-5 rounded-2xl bg-[#f4b942] p-6 text-[#173f35]">
            <Gift size={28} />
            <h3 className="mt-4 text-xl font-extrabold">
              Berbagi rasa, dapat poin.
            </h3>
            <p className="mt-2 text-sm leading-6">
              Temanmu dapat diskon 10%, kamu dapat 250 poin.
            </p>
            <button
              onClick={() => {
                navigator.clipboard?.writeText("MANDARILHAM")
                notify("Kode referral tersalin")
              }}
              className="mt-5 flex w-full items-center justify-between rounded-xl bg-white px-4 py-3 font-bold"
            >
              MANDARILHAM <Copy size={16} />
            </button>
          </div>
          <div className="mt-4 rounded-2xl border border-[#e0dcd4] bg-white p-5">
            <b>Reward tersedia</b>
            <div className="mt-4 rounded-xl bg-[#edf4f0] p-3 text-sm">
              <b>Voucher ongkir Rp20.000</b>
              <small className="block text-[#6d7974]">Tukar 800 poin</small>
            </div>
          </div>
        </aside>
      </div>
      {wishlistProducts.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-6 text-2xl font-extrabold text-[#173f35]">
            Produk favorit
          </h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:gap-5">
            {wishlistProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export function NotFoundPage() {
  return (
    <div className="container grid min-h-[55vh] place-items-center text-center">
      <div>
        <span className="text-7xl font-black text-[#d7ded9]">404</span>
        <h1 className="mt-2 text-3xl font-extrabold text-[#173f35]">
          Halaman tidak ditemukan
        </h1>
        <p className="mt-2 text-[#6d7974]">
          Mungkin halaman sudah berpindah atau alamatnya kurang tepat.
        </p>
        <Link to="/" className="btn-primary mx-auto mt-6 h-11 px-5">
          Kembali ke beranda
        </Link>
      </div>
    </div>
  )
}
