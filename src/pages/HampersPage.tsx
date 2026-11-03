import {
  ArrowLeft,
  ArrowRight,
  Check,
  Gift,
  Minus,
  Plus,
  Sparkles,
} from "lucide-react"
import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCommerce } from "../commerce"
import { formatRupiah, products } from "../data"

const boxes = [
  {
    name: "Box Sapa",
    capacity: 2,
    price: 22000,
    text: "Ringkas untuk hadiah personal",
  },
  {
    name: "Box Rindu",
    capacity: 4,
    price: 35000,
    text: "Favorit untuk keluarga & sahabat",
  },
  {
    name: "Box Perayaan",
    capacity: 6,
    price: 52000,
    text: "Lengkap untuk relasi dan acara",
  },
]

export default function HampersPage() {
  const [step, setStep] = useState(1)
  const [boxIndex, setBoxIndex] = useState(1)
  const [selected, setSelected] = useState<Record<string, number>>({})
  const [theme, setTheme] = useState("Hangat Mandar")
  const [note, setNote] = useState("")
  const { addHamper } = useCommerce()
  const navigate = useNavigate()
  const box = boxes[boxIndex]
  const selectedCount = Object.values(selected).reduce(
    (sum, value) => sum + value,
    0,
  )
  const chosenProducts = products.filter((product) => selected[product.id])
  const total = useMemo(
    () =>
      box.price +
      chosenProducts.reduce(
        (sum, product) => sum + product.price * selected[product.id],
        0,
      ),
    [box, chosenProducts, selected],
  )

  const changeItem = (id: string, delta: number) => {
    setSelected((current) => {
      const nextValue = Math.max(0, (current[id] ?? 0) + delta)
      const currentTotal = Object.values(current).reduce(
        (sum, value) => sum + value,
        0,
      )
      if (delta > 0 && currentTotal >= box.capacity) return current
      return { ...current, [id]: nextValue }
    })
  }

  const finish = () => {
    addHamper({
      id: `hamper-${Date.now()}`,
      name: `${box.name} — ${theme}`,
      image:
        "https://images.unsplash.com/photo-1647168672642-695e96782922?auto=format&fit=crop&w=900&q=85",
      price: total,
      quantity: 1,
      packaging: "Box Hampers",
      note,
      hamperItems: chosenProducts.map(
        (product) => `${selected[product.id]}× ${product.name}`,
      ),
    })
    navigate("/keranjang")
  }

  return (
    <div>
      <section className="bg-[#173f35] text-white">
        <div className="container grid gap-7 py-12 lg:grid-cols-[1fr_420px] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-extrabold tracking-[.16em] text-[#f4c45b] uppercase">
              <Sparkles size={16} /> Buat hadiahmu sendiri
            </span>
            <h1 className="mt-3 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
              Custom Hampers Mandar
            </h1>
            <p className="mt-4 max-w-xl leading-7 text-white/70">
              Pilih box, isi dengan rasa favorit, lalu tambahkan sentuhan
              personal. Kami kemas rapi dan aman.
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1647168672642-695e96782922?auto=format&fit=crop&w=1000&q=85"
            alt="Hampers makanan dalam kotak"
            className="aspect-[5/3] w-full rounded-2xl object-cover"
          />
        </div>
      </section>

      <div className="container py-10">
        <div className="mb-10 flex items-center justify-center">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="flex items-center">
              <span
                className={`grid size-9 place-items-center rounded-full text-sm font-bold ${
                  step >= item
                    ? "bg-[#1d6a54] text-white"
                    : "bg-[#e6e3dc] text-[#7a837f]"
                }`}
              >
                {step > item ? <Check size={16} /> : item}
              </span>
              {item < 4 && (
                <span
                  className={`h-0.5 w-10 sm:w-20 ${
                    step > item ? "bg-[#1d6a54]" : "bg-[#e1ddd5]"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid gap-7 lg:grid-cols-[1fr_340px]">
          <section className="rounded-3xl border border-[#e4e0d8] bg-white p-5 sm:p-8">
            {step === 1 && (
              <>
                <h2 className="text-2xl font-extrabold text-[#173f35]">
                  Pilih ukuran box
                </h2>
                <p className="mt-2 text-sm text-[#6d7974]">
                  Sesuaikan dengan jumlah rasa dan momen pemberian.
                </p>
                <div className="mt-7 grid gap-4 md:grid-cols-3">
                  {boxes.map((item, index) => (
                    <button
                      key={item.name}
                      onClick={() => {
                        setBoxIndex(index)
                        setSelected({})
                      }}
                      className={`rounded-2xl border p-5 text-left transition ${
                        boxIndex === index
                          ? "border-[#1d6a54] bg-[#edf4f0] ring-2 ring-[#1d6a54]/10"
                          : "border-[#dedad1]"
                      }`}
                    >
                      <Gift className="text-[#c15b35]" />
                      <b className="mt-4 block">{item.name}</b>
                      <span className="mt-1 block text-xs leading-5 text-[#6e7a74]">
                        {item.text}
                      </span>
                      <span className="mt-4 block text-sm font-extrabold">
                        {formatRupiah(item.price)}
                      </span>
                      <span className="text-[11px] text-[#738079]">
                        Muat {item.capacity} produk
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <div className="flex items-end justify-between">
                  <div>
                    <h2 className="text-2xl font-extrabold text-[#173f35]">
                      Isi dengan rasa pilihan
                    </h2>
                    <p className="mt-2 text-sm text-[#6d7974]">
                      Kapasitas {box.name}: {box.capacity} produk.
                    </p>
                  </div>
                  <b className="text-sm text-[#1d6a54]">
                    {selectedCount}/{box.capacity} terisi
                  </b>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#ece8df]">
                  <div
                    className="h-full bg-[#1d6a54] transition-all"
                    style={{
                      width: `${(selectedCount / box.capacity) * 100}%`,
                    }}
                  />
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {products
                    .filter((product) => product.hamper)
                    .map((product) => (
                      <div
                        key={product.id}
                        className="flex gap-3 rounded-2xl border border-[#e5e1d9] p-3"
                      >
                        <img
                          src={product.image}
                          alt=""
                          className="size-20 rounded-xl object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <b className="line-clamp-1 text-sm">{product.name}</b>
                          <span className="mt-1 block text-xs font-bold text-[#1d6a54]">
                            {formatRupiah(product.price)}
                          </span>
                          <div className="mt-2 flex w-fit items-center rounded-lg border border-[#ded9d0]">
                            <button
                              onClick={() => changeItem(product.id, -1)}
                              className="grid size-8 place-items-center"
                            >
                              <Minus size={13} />
                            </button>
                            <span className="w-6 text-center text-xs font-bold">
                              {selected[product.id] ?? 0}
                            </span>
                            <button
                              onClick={() => changeItem(product.id, 1)}
                              disabled={selectedCount >= box.capacity}
                              className="grid size-8 place-items-center disabled:opacity-30"
                            >
                              <Plus size={13} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <h2 className="text-2xl font-extrabold text-[#173f35]">
                  Pilih tampilan & pesan
                </h2>
                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  {["Hangat Mandar", "Minimal Natural", "Perayaan Emas"].map(
                    (item, index) => (
                      <button
                        key={item}
                        onClick={() => setTheme(item)}
                        className={`overflow-hidden rounded-2xl border text-left ${
                          theme === item
                            ? "border-[#1d6a54] ring-2 ring-[#1d6a54]/10"
                            : "border-[#ddd8cf]"
                        }`}
                      >
                        <div
                          className={`h-20 ${
                            index === 0
                              ? "mandar-pattern"
                              : index === 1
                                ? "bg-[#ded6c5]"
                                : "bg-[#d4a642]"
                          }`}
                        />
                        <b className="block p-3 text-sm">{item}</b>
                      </button>
                    ),
                  )}
                </div>
                <label
                  className="mt-7 block text-sm font-bold"
                  htmlFor="gift-note"
                >
                  Kartu ucapan
                </label>
                <textarea
                  id="gift-note"
                  value={note}
                  maxLength={140}
                  onChange={(event) => setNote(event.target.value)}
                  className="input mt-2 min-h-28 resize-none p-4"
                  placeholder="Tulis pesan hangat untuk penerima..."
                />
                <p className="mt-1 text-right text-xs text-[#7a8580]">
                  {note.length}/140
                </p>
              </>
            )}
            {step === 4 && (
              <>
                <h2 className="text-2xl font-extrabold text-[#173f35]">
                  Hampersmu siap
                </h2>
                <p className="mt-2 text-sm text-[#6d7974]">
                  Periksa pilihan sebelum masuk ke keranjang.
                </p>
                <div className="mt-7 rounded-2xl bg-[#f4f0e8] p-5">
                  <b>
                    {box.name} — {theme}
                  </b>
                  <ul className="mt-4 space-y-2 text-sm">
                    {chosenProducts.map((product) => (
                      <li key={product.id} className="flex justify-between">
                        <span>
                          {selected[product.id]}× {product.name}
                        </span>
                        <span>
                          {formatRupiah(product.price * selected[product.id])}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {note && (
                    <p className="mt-5 border-t border-[#d9d3c8] pt-4 text-sm italic">
                      “{note}”
                    </p>
                  )}
                </div>
              </>
            )}

            <div className="mt-8 flex justify-between border-t border-[#ebe7df] pt-5">
              <button
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
                className="btn-secondary h-11 px-4 disabled:opacity-0"
              >
                <ArrowLeft size={17} /> Kembali
              </button>
              {step < 4 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  disabled={step === 2 && selectedCount === 0}
                  className="btn-primary h-11 px-5 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Lanjut <ArrowRight size={17} />
                </button>
              ) : (
                <button onClick={finish} className="btn-primary h-11 px-5">
                  Tambah ke keranjang
                </button>
              )}
            </div>
          </section>

          <aside className="h-fit rounded-3xl border border-[#e0dcd3] bg-white p-5 lg:sticky lg:top-32">
            <div className="flex items-center justify-between">
              <h2 className="font-extrabold">Ringkasan hampers</h2>
              <span className="rounded-full bg-[#e8f2ed] px-2 py-1 text-[10px] font-bold text-[#1d6a54]">
                {selectedCount}/{box.capacity}
              </span>
            </div>
            <img
              src="https://images.unsplash.com/photo-1647168672642-695e96782922?auto=format&fit=crop&w=800&q=85"
              alt=""
              className="mt-4 aspect-[5/3] w-full rounded-xl object-cover"
            />
            <div className="mt-4 flex justify-between text-sm">
              <span>{box.name}</span>
              <b>{formatRupiah(box.price)}</b>
            </div>
            {chosenProducts.map((product) => (
              <div
                key={product.id}
                className="mt-2 flex justify-between text-xs text-[#6d7974]"
              >
                <span>
                  {selected[product.id]}× {product.name}
                </span>
                <span>
                  {formatRupiah(product.price * selected[product.id])}
                </span>
              </div>
            ))}
            <div className="mt-5 flex justify-between border-t border-[#e3dfd7] pt-4">
              <b>Total</b>
              <b className="text-lg text-[#173f35]">{formatRupiah(total)}</b>
            </div>
            <p className="mt-3 text-[11px] leading-5 text-[#7b847f]">
              Sudah termasuk box, pita, kartu ucapan, dan kemasan pengiriman.
            </p>
          </aside>
        </div>
      </div>
    </div>
  )
}
