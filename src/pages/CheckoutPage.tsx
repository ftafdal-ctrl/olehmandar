import {
  ArrowLeft,
  ArrowRight,
  Check,
  CreditCard,
  MapPin,
  PackageCheck,
  ShieldCheck,
  Truck,
} from "lucide-react"
import { useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { useCommerce } from "../commerce"
import { formatRupiah } from "../data"
import type { Address } from "../types"

const initialAddress: Address = {
  name: "",
  phone: "",
  street: "",
  city: "",
  province: "Sulawesi Selatan",
  postal: "",
}
const shippingOptions = [
  { name: "Hemat", detail: "5–7 hari", price: 18000 },
  { name: "Reguler", detail: "3–5 hari", price: 26000 },
  { name: "Prioritas", detail: "1–3 hari", price: 42000 },
]

export default function CheckoutPage() {
  const { cart, subtotal, createOrder } = useCommerce()
  const [step, setStep] = useState(1)
  const [address, setAddress] = useState(initialAddress)
  const [shipping, setShipping] = useState(1)
  const [payment, setPayment] = useState("Virtual Account")
  const [voucher, setVoucher] = useState("")
  const [voucherApplied, setVoucherApplied] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const navigate = useNavigate()

  if (!cart.length) return <Navigate to="/keranjang" replace />

  const shippingCost = subtotal >= 150000 ? 0 : shippingOptions[shipping].price
  const discount = voucherApplied ? Math.round(subtotal * 0.1) : 0
  const total = subtotal + shippingCost - discount

  const validateAddress = () => {
    const next: Record<string, string> = {}
    if (!address.name.trim()) next.name = "Nama wajib diisi"
    if (!/^08\d{8,12}$/.test(address.phone))
      next.phone = "Gunakan nomor aktif, contoh 081234567890"
    if (!address.street.trim()) next.street = "Alamat lengkap wajib diisi"
    if (!address.city.trim()) next.city = "Kota wajib diisi"
    if (!/^\d{5}$/.test(address.postal)) next.postal = "Kode pos harus 5 angka"
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const next = () => {
    if (step === 1 && !validateAddress()) return
    setStep(Math.min(4, step + 1))
  }

  const submit = () => {
    const order = createOrder({
      address,
      shipping: shippingOptions[shipping].name,
      payment,
      shippingCost,
      discount,
    })
    navigate(`/pesanan-berhasil/${order.id}`)
  }

  return (
    <div className="container py-8 sm:py-12">
      <Link
        to="/keranjang"
        className="inline-flex items-center gap-2 text-sm font-bold text-[#52645d]"
      >
        <ArrowLeft size={16} /> Kembali ke keranjang
      </Link>
      <h1 className="mt-5 text-3xl font-extrabold tracking-[-0.04em] text-[#173f35]">
        Checkout
      </h1>
      <div className="mt-6 flex max-w-3xl items-center">
        {["Alamat", "Pengiriman", "Pembayaran", "Review"].map(
          (label, index) => (
            <div
              key={label}
              className="flex flex-1 items-center last:flex-none"
            >
              <div className="text-center">
                <span
                  className={`mx-auto grid size-8 place-items-center rounded-full text-xs font-bold ${
                    step >= index + 1
                      ? "bg-[#1d6a54] text-white"
                      : "bg-[#e5e2db] text-[#74807a]"
                  }`}
                >
                  {step > index + 1 ? <Check size={14} /> : index + 1}
                </span>
                <small className="mt-1 hidden text-[10px] sm:block">
                  {label}
                </small>
              </div>
              {index < 3 && (
                <span
                  className={`mx-2 h-0.5 flex-1 ${
                    step > index + 1 ? "bg-[#1d6a54]" : "bg-[#e2ded6]"
                  }`}
                />
              )}
            </div>
          ),
        )}
      </div>

      <div className="mt-8 grid gap-7 lg:grid-cols-[1fr_360px]">
        <section className="rounded-3xl border border-[#e3dfd7] bg-white p-5 sm:p-8">
          {step === 1 && (
            <>
              <div className="flex items-center gap-3">
                <MapPin className="text-[#1d6a54]" />
                <div>
                  <h2 className="text-xl font-extrabold">Alamat pengiriman</h2>
                  <p className="text-sm text-[#6c7872]">
                    Pastikan kurir mudah menemukan lokasi.
                  </p>
                </div>
              </div>
              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                {[
                  ["name", "Nama penerima", "Kak Ilham"],
                  ["phone", "Nomor WhatsApp", "081234567890"],
                  ["city", "Kota / Kabupaten", "Makassar"],
                  ["province", "Provinsi", "Sulawesi Selatan"],
                  ["postal", "Kode pos", "90111"],
                ].map(([key, label, placeholder]) => (
                  <label key={key} className={key === "province" ? "" : ""}>
                    <span className="text-sm font-bold">{label}</span>
                    <input
                      value={address[(key as keyof Address)]}
                      onChange={(event) =>
                        setAddress({ ...address, [key]: event.target.value })
                      }
                      className={`input mt-2 ${
                        errors[key] ? "border-red-500" : ""
                      }`}
                      placeholder={placeholder}
                    />
                    {errors[key] && (
                      <small className="mt-1 block text-red-600">
                        {errors[key]}
                      </small>
                    )}
                  </label>
                ))}
                <label className="sm:col-span-2">
                  <span className="text-sm font-bold">Alamat lengkap</span>
                  <textarea
                    value={address.street}
                    onChange={(event) =>
                      setAddress({ ...address, street: event.target.value })
                    }
                    className={`input mt-2 min-h-24 resize-none p-3 ${
                      errors.street ? "border-red-500" : ""
                    }`}
                    placeholder="Nama jalan, nomor rumah, RT/RW, patokan"
                  />
                  {errors.street && (
                    <small className="mt-1 block text-red-600">
                      {errors.street}
                    </small>
                  )}
                </label>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <div className="flex items-center gap-3">
                <Truck className="text-[#1d6a54]" />
                <div>
                  <h2 className="text-xl font-extrabold">Pilih pengiriman</h2>
                  <p className="text-sm text-[#6c7872]">
                    Estimasi ongkir prototipe ke {address.city}.
                  </p>
                </div>
              </div>
              <div className="mt-7 space-y-3">
                {shippingOptions.map((option, index) => (
                  <label
                    key={option.name}
                    className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-5 ${
                      shipping === index
                        ? "border-[#1d6a54] bg-[#edf4f0]"
                        : "border-[#dedad2]"
                    }`}
                  >
                    <input
                      type="radio"
                      checked={shipping === index}
                      onChange={() => setShipping(index)}
                    />
                    <PackageCheck className="text-[#1d6a54]" />
                    <span className="flex-1">
                      <b className="block">{option.name}</b>
                      <small className="text-[#6e7b75]">
                        Estimasi tiba {option.detail}
                      </small>
                    </span>
                    <b>
                      {subtotal >= 150000
                        ? "Gratis"
                        : formatRupiah(option.price)}
                    </b>
                  </label>
                ))}
              </div>
              {shipping === 0 &&
                cart.some((item) => item.name.includes("Bolu")) && (
                  <p className="mt-4 rounded-xl bg-[#fff2d7] p-4 text-sm text-[#75581c]">
                    Untuk Bolu Paranggi, kami menyarankan Reguler agar tiba
                    dalam masa segar terbaik.
                  </p>
                )}
            </>
          )}
          {step === 3 && (
            <>
              <div className="flex items-center gap-3">
                <CreditCard className="text-[#1d6a54]" />
                <div>
                  <h2 className="text-xl font-extrabold">Metode pembayaran</h2>
                  <p className="text-sm text-[#6c7872]">
                    Tidak ada transaksi finansial nyata.
                  </p>
                </div>
              </div>
              <div className="mt-7 space-y-3">
                {["Virtual Account", "Transfer Bank", "E-Wallet"].map(
                  (option) => (
                    <label
                      key={option}
                      className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-5 ${
                        payment === option
                          ? "border-[#1d6a54] bg-[#edf4f0]"
                          : "border-[#dedad2]"
                      }`}
                    >
                      <input
                        type="radio"
                        checked={payment === option}
                        onChange={() => setPayment(option)}
                      />
                      <span className="grid size-10 place-items-center rounded-xl bg-white">
                        <CreditCard size={19} />
                      </span>
                      <span>
                        <b className="block">{option}</b>
                        <small className="text-[#6e7b75]">
                          Simulasi pembayaran aman
                        </small>
                      </span>
                    </label>
                  ),
                )}
              </div>
              <div className="mt-5 flex items-start gap-3 rounded-xl bg-[#f4f0e8] p-4 text-xs text-[#675f50]">
                <ShieldCheck className="shrink-0" size={18} /> Prototipe tidak
                akan meminta PIN, nomor kartu, atau memproses dana.
              </div>
            </>
          )}
          {step === 4 && (
            <>
              <h2 className="text-xl font-extrabold">Periksa pesanan</h2>
              <div className="mt-6 space-y-5">
                <div className="rounded-2xl bg-[#f5f2eb] p-5">
                  <b className="text-sm">Dikirim ke</b>
                  <p className="mt-2 text-sm leading-6">
                    {address.name} • {address.phone}
                    <br />
                    {address.street}, {address.city}, {address.province}{" "}
                    {address.postal}
                  </p>
                </div>
                <div>
                  <b className="text-sm">Produk</b>
                  {cart.map((item) => (
                    <div key={item.id} className="mt-3 flex items-center gap-3">
                      <img
                        src={item.image}
                        alt=""
                        className="size-14 rounded-lg object-cover"
                      />
                      <span className="flex-1 text-sm">
                        {item.quantity}× {item.name}
                        <small className="block text-[#748079]">
                          {item.packaging}
                        </small>
                      </span>
                      <b className="text-sm">
                        {formatRupiah(item.price * item.quantity)}
                      </b>
                    </div>
                  ))}
                </div>
                <div className="grid gap-3 border-t border-[#e5e1d9] pt-5 text-sm sm:grid-cols-2">
                  <span>
                    <b>Pengiriman</b>
                    <small className="mt-1 block">
                      {shippingOptions[shipping].name} •{" "}
                      {shippingOptions[shipping].detail}
                    </small>
                  </span>
                  <span>
                    <b>Pembayaran</b>
                    <small className="mt-1 block">{payment} (simulasi)</small>
                  </span>
                </div>
              </div>
            </>
          )}
          <div className="mt-8 flex justify-between border-t border-[#e6e2da] pt-5">
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="btn-secondary h-11 px-4 disabled:opacity-0"
            >
              <ArrowLeft size={16} /> Kembali
            </button>
            {step < 4 ? (
              <button onClick={next} className="btn-primary h-11 px-5">
                Lanjut <ArrowRight size={16} />
              </button>
            ) : (
              <button onClick={submit} className="btn-primary h-11 px-5">
                Buat pesanan simulasi
              </button>
            )}
          </div>
        </section>

        <aside className="h-fit rounded-3xl border border-[#dfdbd3] bg-white p-6 lg:sticky lg:top-32">
          <h2 className="text-xl font-extrabold">Ringkasan</h2>
          <div className="mt-4 max-h-44 space-y-3 overflow-auto">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-3">
                <img
                  src={item.image}
                  alt=""
                  className="size-12 rounded-lg object-cover"
                />
                <span className="min-w-0 flex-1 text-xs">
                  <b className="line-clamp-1">{item.name}</b>
                  {item.quantity} item
                </span>
                <b className="text-xs">
                  {formatRupiah(item.price * item.quantity)}
                </b>
              </div>
            ))}
          </div>
          <div className="mt-5 flex gap-2">
            <input
              value={voucher}
              onChange={(event) => setVoucher(event.target.value)}
              className="input h-10 flex-1"
              placeholder="MANDAR10"
            />
            <button
              onClick={() =>
                setVoucherApplied(voucher.toUpperCase() === "MANDAR10")
              }
              className="btn-secondary h-10 px-3 text-xs"
            >
              Pakai
            </button>
          </div>
          {voucher && !voucherApplied && (
            <small className="text-[#b64f31]">Gunakan kode MANDAR10</small>
          )}
          {voucherApplied && (
            <small className="text-[#1d6a54]">Voucher berhasil dipakai</small>
          )}
          <div className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatRupiah(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Ongkir</span>
              <span>
                {shippingCost ? formatRupiah(shippingCost) : "Gratis"}
              </span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-[#1d6a54]">
                <span>Diskon</span>
                <span>-{formatRupiah(discount)}</span>
              </div>
            )}
          </div>
          <div className="mt-5 flex justify-between border-t border-[#e4e0d8] pt-5">
            <b>Total</b>
            <b className="text-xl text-[#173f35]">{formatRupiah(total)}</b>
          </div>
        </aside>
      </div>
    </div>
  )
}
