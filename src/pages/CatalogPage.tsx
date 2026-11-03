import { SlidersHorizontal, X } from "lucide-react"
import { useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { ProductCard } from "../components"
import { categories, products } from "../data"

export default function CatalogPage() {
  const [params, setParams] = useSearchParams()
  const [showFilters, setShowFilters] = useState(false)
  const [trust, setTrust] = useState<string[]>(["Bersertifikat Halal"])
  const [origins, setOrigins] = useState<string[]>([])
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const query = params.get("q") ?? ""
  const category = params.get("category") ?? ""
  const sort = params.get("sort") ?? "relevan"

  const results = useMemo(() => {
    const filtered = products.filter(
      (product) =>
        (!query ||
          `${product.name} ${product.short}`
            .toLowerCase()
            .includes(query.toLowerCase())) &&
        (!category || product.category === category) &&
        (!origins.length || origins.includes(product.origin)) &&
        (!trust.includes("Bersertifikat Halal") || Boolean(product.halal)) &&
        (!trust.includes("P-IRT terverifikasi") || Boolean(product.pirt)) &&
        (!trust.includes("Siap hampers") ||
          product.hamper ||
          product.category === "Hampers") &&
        (!trust.includes("Rating 4.8 ke atas") || product.rating >= 4.8) &&
        (!minPrice || product.price >= Number(minPrice)) &&
        (!maxPrice || product.price <= Number(maxPrice)),
    )
    return [...filtered].sort((a, b) => {
      if (sort === "termurah") return a.price - b.price
      if (sort === "tertinggi") return b.price - a.price
      if (sort === "terlaris") return b.sold - a.sold
      return b.rating - a.rating
    })
  }, [query, category, sort, origins, trust, minPrice, maxPrice])

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next)
  }

  const toggleList = (
    value: string,
    list: string[],
    setter: (next: string[]) => void,
  ) => {
    setter(
      list.includes(value)
        ? list.filter((item) => item !== value)
        : [...list, value],
    )
  }

  const clearFilters = () => {
    setParams({})
    setTrust([])
    setOrigins([])
    setMinPrice("")
    setMaxPrice("")
  }

  const filters = (
    <div className="space-y-7">
      <div className="flex items-center justify-between">
        <h2 className="font-extrabold">Filter produk</h2>
        {(category ||
          query ||
          trust.length ||
          origins.length ||
          minPrice ||
          maxPrice) && (
          <button
            onClick={clearFilters}
            className="text-xs font-bold text-[#c45832]"
          >
            Hapus semua
          </button>
        )}
      </div>
      <div>
        <h3 className="mb-3 text-sm font-bold">Kategori</h3>
        <div className="space-y-2">
          {categories.map((item) => (
            <label
              key={item.name}
              className="flex cursor-pointer items-center gap-3 text-sm"
            >
              <input
                type="radio"
                name="category"
                checked={category === item.name}
                onChange={() =>
                  setParam("category", category === item.name ? "" : item.name)
                }
              />
              {item.name}
            </label>
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-bold">Kepercayaan</h3>
        {[
          "Bersertifikat Halal",
          "P-IRT terverifikasi",
          "Siap hampers",
          "Rating 4.8 ke atas",
        ].map((label) => (
          <label key={label} className="mb-2 flex items-center gap-3 text-sm">
            <input
              type="checkbox"
              checked={trust.includes(label)}
              onChange={() => toggleList(label, trust, setTrust)}
            />{" "}
            {label}
          </label>
        ))}
      </div>
      <div>
        <h3 className="mb-3 text-sm font-bold">Kisaran harga</h3>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            value={minPrice}
            onChange={(event) => setMinPrice(event.target.value)}
            className="input h-10"
            placeholder="Rp min"
          />
          <input
            type="number"
            value={maxPrice}
            onChange={(event) => setMaxPrice(event.target.value)}
            className="input h-10"
            placeholder="Rp maks"
          />
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-bold">Asal produk</h3>
        {["Majene", "Polewali Mandar", "Tinambung"].map((label) => (
          <label key={label} className="mb-2 flex items-center gap-3 text-sm">
            <input
              type="checkbox"
              checked={origins.includes(label)}
              onChange={() => toggleList(label, origins, setOrigins)}
            />{" "}
            {label}
          </label>
        ))}
      </div>
    </div>
  )

  return (
    <div className="container py-8 sm:py-12">
      <p className="text-xs font-bold text-[#7a847f]">Beranda / Semua produk</p>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-[-0.04em] text-[#173f35]">
            {query ? `Hasil untuk “${query}”` : category || "Semua oleh-oleh"}
          </h1>
          <p className="mt-2 text-sm text-[#6d7974]">
            {results.length} produk terkurasi ditemukan
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowFilters(true)}
            className="btn-secondary h-11 px-4 lg:hidden"
          >
            <SlidersHorizontal size={17} /> Filter
          </button>
          <select
            value={sort}
            onChange={(event) => setParam("sort", event.target.value)}
            className="input h-11 min-w-40"
          >
            <option value="relevan">Paling relevan</option>
            <option value="terlaris">Terlaris</option>
            <option value="termurah">Harga termurah</option>
            <option value="tertinggi">Harga tertinggi</option>
          </select>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {category && (
          <button
            onClick={() => setParam("category", "")}
            className="filter-chip"
          >
            {category} <X size={14} />
          </button>
        )}
        {query && (
          <button onClick={() => setParam("q", "")} className="filter-chip">
            “{query}” <X size={14} />
          </button>
        )}
      </div>

      <div className="mt-8 grid gap-7 lg:grid-cols-[230px_1fr]">
        <aside className="hidden rounded-2xl border border-[#e5e1d9] bg-white p-5 lg:block">
          {filters}
        </aside>
        {results.length ? (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4 xl:gap-5">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="grid min-h-80 place-items-center rounded-2xl border border-dashed border-[#d8d2c7] bg-white p-8 text-center">
            <div>
              <h2 className="text-xl font-extrabold">
                Belum ada produk yang cocok
              </h2>
              <p className="mt-2 text-sm text-[#6e7b75]">
                Coba kata kunci lain atau hapus filter yang aktif.
              </p>
              <button
                onClick={clearFilters}
                className="btn-primary mx-auto mt-5 h-11 px-5"
              >
                Lihat semua produk
              </button>
            </div>
          </div>
        )}
      </div>

      {showFilters && (
        <div
          className="fixed inset-0 z-[70] bg-black/40 lg:hidden"
          onClick={() => setShowFilters(false)}
        >
          <aside
            className="ml-auto h-full w-[86%] max-w-sm overflow-y-auto bg-white p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={() => setShowFilters(false)}
              className="absolute top-4 right-4"
            >
              <X />
            </button>
            {filters}
            <button
              onClick={() => setShowFilters(false)}
              className="btn-primary mt-8 h-12 w-full"
            >
              Tampilkan {results.length} produk
            </button>
          </aside>
        </div>
      )}
    </div>
  )
}
