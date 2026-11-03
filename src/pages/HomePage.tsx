import {
  ArrowRight,
  BadgeCheck,
  Box,
  ChevronRight,
  Gift,
  PackageCheck,
  ShieldCheck,
  Star,
  Store,
  Truck,
} from "lucide-react"
import { Link } from "react-router-dom"
import {
  ProductCard,
  SectionHeading,
  TrustBadge,
  categoryIcon,
} from "../components"
import { categories, products } from "../data"

export default function HomePage() {
  return (
    <>
      <section className="hero-pattern overflow-hidden bg-[#eef1e8]">
        <div className="container grid min-h-[560px] items-center gap-10 py-14 lg:grid-cols-[1.05fr_.95fr] lg:py-16">
          <div className="relative z-10">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#2b6857]/15 bg-white/80 px-3 py-2 text-xs font-extrabold text-[#1c5a49]">
              <BadgeCheck size={16} />
              Pilihan UMKM asli Sulawesi Barat
            </div>
            <h1 className="max-w-2xl text-4xl leading-[1.08] font-black tracking-[-0.05em] text-[#14382f] sm:text-5xl lg:text-6xl">
              Rasa kampung,{" "}
              <span className="text-[#c85d36]">sampai ke rumahmu.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#566862] lg:text-lg">
              Temukan golla kambu, baje, kasippi, dan oleh-oleh Mandar autentik
              dengan kemasan aman dan cerita dari pembuatnya.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/produk" className="btn-primary h-12 px-6">
                Belanja sekarang <ArrowRight size={18} />
              </Link>
              <Link to="/hampers" className="btn-secondary h-12 px-6">
                <Gift size={18} /> Buat hampers
              </Link>
            </div>
            <div className="mt-9 grid max-w-xl grid-cols-3 gap-3 border-t border-[#bfc9c1] pt-6">
              {[
                ["20+", "UMKM lokal"],
                ["4.9/5", "Rating pembeli"],
                ["100%", "Produk terkurasi"],
              ].map(([value, label]) => (
                <div key={label}>
                  <b className="block text-lg text-[#173f35]">{value}</b>
                  <span className="text-[11px] text-[#66766f] sm:text-xs">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[580px]">
            <div className="absolute -top-7 -left-6 z-20 hidden rounded-2xl bg-white p-4 shadow-xl sm:flex sm:items-center sm:gap-3">
              <div className="grid size-10 place-items-center rounded-xl bg-[#fff3d7] text-[#bf7c08]">
                <PackageCheck size={21} />
              </div>
              <div>
                <b className="block text-sm">Kemasan aman</b>
                <span className="text-xs text-[#708079]">
                  Siap kirim antarpulau
                </span>
              </div>
            </div>
            <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] shadow-2xl shadow-[#173f35]/15">
              <img
                src="https://images.unsplash.com/photo-1738225734433-9fb17ed770a4?auto=format&fit=crop&w=1400&q=90"
                alt="Aneka sajian tradisional Indonesia"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-7 pt-20 text-white">
                <span className="text-xs font-bold tracking-widest uppercase">
                  Pilihan minggu ini
                </span>
                <h2 className="mt-1 text-2xl font-bold">Paket Rindu Mandar</h2>
              </div>
            </div>
            <div className="absolute -right-3 -bottom-5 z-20 rounded-2xl bg-[#f4b942] p-4 text-[#173f35] shadow-xl sm:right-[-22px] sm:p-5">
              <span className="text-xs font-bold">Mulai dari</span>
              <b className="block text-xl">Rp25.000</b>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-14">
        <SectionHeading
          title="Belanja berdasarkan kategori"
          text="Mulai dari rasa yang paling kamu rindukan."
        />
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/produk?category=${encodeURIComponent(category.name)}`}
              className="group flex min-h-28 items-center gap-4 rounded-2xl border border-[#e2ded5] bg-white p-4 transition hover:border-[#2d6a59] hover:shadow-lg"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#edf2ed] text-[#1d6a54] transition group-hover:bg-[#1d6a54] group-hover:text-white">
                {categoryIcon(category.icon)}
              </span>
              <span>
                <b className="block text-sm sm:text-base">{category.name}</b>
                <small className="text-[#74817b]">{category.caption}</small>
              </span>
              <ChevronRight
                className="ml-auto hidden text-[#a8b0ac] sm:block"
                size={18}
              />
            </Link>
          ))}
        </div>
      </section>

      <section className="container py-8">
        <SectionHeading
          eyebrow="Paling disukai"
          title="Pilihan dari Mandar"
          text="Rasa autentik yang paling sering dipesan pelanggan kami."
          action={
            <Link
              to="/produk"
              className="hidden items-center gap-1 text-sm font-bold text-[#1d6a54] sm:flex"
            >
              Lihat semua <ArrowRight size={16} />
            </Link>
          }
        />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="container py-16">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#173f35] px-6 py-10 text-white sm:px-10 lg:grid lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:px-14 lg:py-12">
          <div className="relative z-10">
            <span className="text-xs font-bold tracking-[.18em] text-[#f4c761] uppercase">
              Lebih hemat bersama
            </span>
            <h2 className="mt-3 max-w-xl text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">
              Isi satu box, kirim banyak rasa.
            </h2>
            <p className="mt-4 max-w-lg leading-7 text-white/70">
              Gabungkan camilan favoritmu dalam paket hampers. Lebih rapi,
              personal, dan hemat ongkir.
            </p>
            <Link
              to="/hampers"
              className="mt-7 inline-flex h-12 items-center gap-2 rounded-xl bg-[#f4b942] px-6 font-bold text-[#173f35]"
            >
              Susun hampers <ArrowRight size={17} />
            </Link>
          </div>
          <div className="relative mt-8 lg:mt-0">
            <img
              src="https://images.unsplash.com/photo-1647168672642-695e96782922?auto=format&fit=crop&w=1000&q=85"
              alt="Kotak hampers berisi aneka makanan"
              className="ml-auto aspect-[5/3] w-full max-w-md rounded-2xl object-cover lg:-rotate-2"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-[#e4e1da] bg-white">
        <div className="container grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
          <TrustBadge
            icon={<ShieldCheck />}
            title="Garansi kesegaran"
            text="Ganti jika produk tiba rusak."
          />
          <TrustBadge
            icon={<Box />}
            title="Kemasan terstandar"
            text="Vakum dan pelindung antarguncang."
          />
          <TrustBadge
            icon={<Truck />}
            title="Ongkir transparan"
            text="Estimasi sebelum kamu membayar."
          />
          <TrustBadge
            icon={<Store />}
            title="Langsung dari UMKM"
            text="Mendukung perajin lokal Mandar."
          />
        </div>
      </section>

      <section className="container grid gap-8 py-20 lg:grid-cols-2 lg:items-center">
        <div className="overflow-hidden rounded-[2rem]">
          <img
            src="https://images.unsplash.com/photo-1738225735048-d3c9f5ad0869?auto=format&fit=crop&w=1200&q=85"
            alt="Sajian kue tradisional"
            className="aspect-[6/5] h-full w-full object-cover"
          />
        </div>
        <div className="lg:pl-10">
          <p className="text-xs font-extrabold tracking-[.18em] text-[#c15b35] uppercase">
            Bukan sekadar camilan
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.04em] text-[#173f35] sm:text-4xl">
            Setiap rasa menyimpan cerita.
          </h2>
          <p className="mt-5 leading-8 text-[#61716a]">
            Dari dapur keluarga di Majene hingga kelompok usaha perempuan di
            Polewali Mandar, setiap produk dibuat dengan resep yang menjaga
            ingatan akan rumah.
          </p>
          <div className="mt-7 flex items-center gap-4 rounded-2xl bg-[#f2eee5] p-4">
            <div className="grid size-12 place-items-center rounded-full bg-[#f4b942]">
              <Star fill="#173f35" size={20} />
            </div>
            <div>
              <b className="block">
                “Rasanya seperti oleh-oleh dari keluarga sendiri.”
              </b>
              <span className="text-sm text-[#687770]">
                Ilham, pelanggan dari Makassar
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
