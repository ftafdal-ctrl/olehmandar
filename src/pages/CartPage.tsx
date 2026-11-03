import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"
import { useCommerce } from "../commerce"
import { formatRupiah, products } from "../data"
import { ProductCard } from "../components"

export default function CartPage() {
  const { cart, subtotal, updateQty, removeItem } = useCommerce()
  const shipping = subtotal >= 150000 ? 0 : 24000

  if (!cart.length) {
    return (
      <div className="container grid min-h-[60vh] place-items-center text-center">
        <div>
          <span className="mx-auto grid size-20 place-items-center rounded-full bg-[#eaf1ed] text-[#1d6a54]">
            <ShoppingBag size={32} />
          </span>
          <h1 className="mt-5 text-3xl font-extrabold text-[#173f35]">
            Keranjangmu masih kosong
          </h1>
          <p className="mt-2 text-[#6d7974]">
            Yuk, isi dengan rasa Mandar yang kamu rindukan.
          </p>
          <Link to="/produk" className="btn-primary mx-auto mt-6 h-12 px-6">
            Mulai belanja <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-9 sm:py-12">
      <h1 className="text-3xl font-extrabold tracking-[-0.04em] text-[#173f35]">
        Keranjang belanja
      </h1>
      <p className="mt-2 text-sm text-[#6c7872]">
        {cart.length} pilihan siap dikirim dari Sulawesi Barat
      </p>
      <div className="mt-8 grid gap-7 lg:grid-cols-[1fr_360px]">
        <section className="space-y-3">
          {cart.map((item) => (
            <article
              key={item.id}
              className="flex gap-4 rounded-2xl border border-[#e3dfd7] bg-white p-4"
            >
              <img
                src={item.image}
                alt=""
                className="size-24 shrink-0 rounded-xl object-cover sm:size-28"
              />
              <div className="min-w-0 flex-1">
                <div className="flex justify-between gap-3">
                  <div>
                    <b className="line-clamp-1">{item.name}</b>
                    <span className="mt-1 block text-xs text-[#718079]">
                      {item.packaging}
                    </span>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-[#9b6b59]"
                    aria-label="Hapus produk"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                {item.hamperItems && (
                  <p className="mt-2 line-clamp-1 text-xs text-[#6d7974]">
                    {item.hamperItems.join(", ")}
                  </p>
                )}
                <div className="mt-5 flex items-end justify-between">
                  <b className="text-[#173f35]">{formatRupiah(item.price)}</b>
                  <div className="flex items-center rounded-lg border border-[#ddd8cf]">
                    <button
                      onClick={() =>
                        updateQty(item.id, Math.max(1, item.quantity - 1))
                      }
                      className="grid size-8 place-items-center"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="w-7 text-center text-xs font-bold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQty(item.id, item.quantity + 1)}
                      className="grid size-8 place-items-center"
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
          <div className="rounded-2xl bg-[#fff5da] p-4 text-sm text-[#75591e]">
            <b>
              {subtotal >= 150000
                ? "Kamu dapat gratis estimasi ongkir!"
                : `Tambah ${formatRupiah(150000 - subtotal)} lagi`}
            </b>
            <span className="block text-xs">
              untuk promo ongkir dalam simulasi checkout.
            </span>
          </div>
        </section>
        <aside className="h-fit rounded-3xl border border-[#dfdbd3] bg-white p-6 lg:sticky lg:top-32">
          <h2 className="text-xl font-extrabold">Ringkasan belanja</h2>
          <label className="mt-5 block text-xs font-bold" htmlFor="voucher">
            Kode voucher
          </label>
          <div className="mt-2 flex gap-2">
            <input
              id="voucher"
              className="input h-10 flex-1"
              placeholder="Coba MANDAR10"
            />
            <button className="btn-secondary h-10 px-3 text-xs">Pakai</button>
          </div>
          <div className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatRupiah(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimasi ongkir</span>
              <span>{shipping ? formatRupiah(shipping) : "Gratis"}</span>
            </div>
          </div>
          <div className="mt-5 flex justify-between border-t border-[#e4e0d8] pt-5">
            <b>Total estimasi</b>
            <b className="text-xl text-[#173f35]">
              {formatRupiah(subtotal + shipping)}
            </b>
          </div>
          <Link to="/checkout" className="btn-primary mt-6 h-12 w-full">
            Lanjut checkout <ArrowRight size={17} />
          </Link>
          <p className="mt-3 text-center text-[11px] text-[#78827e]">
            Transaksi pada prototipe ini tidak memproses pembayaran nyata.
          </p>
        </aside>
      </div>
      <section className="mt-16">
        <h2 className="mb-6 text-2xl font-extrabold text-[#173f35]">
          Lengkapi kirimanmu
        </h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:gap-5">
          {products.slice(2, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}
