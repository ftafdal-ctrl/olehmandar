import type { Product } from "./types"

const food1 =
  "https://images.unsplash.com/photo-1738225734433-9fb17ed770a4?auto=format&fit=crop&w=1200&q=85"
const food2 =
  "https://images.unsplash.com/photo-1738225735048-d3c9f5ad0869?auto=format&fit=crop&w=1200&q=85"
const food3 =
  "https://images.unsplash.com/photo-1560739086-eb6fde4babfa?auto=format&fit=crop&w=1200&q=85"
const food4 =
  "https://images.unsplash.com/photo-1617694455303-59af55af7e58?auto=format&fit=crop&w=1200&q=85"
const hamper =
  "https://images.unsplash.com/photo-1647168672642-695e96782922?auto=format&fit=crop&w=1200&q=85"
const gift =
  "https://images.unsplash.com/photo-1639562954924-975ca13f454a?auto=format&fit=crop&w=1200&q=85"

export const products: Product[] = [
  {
    id: "p1",
    slug: "golla-kambu-original",
    name: "Golla Kambu Original",
    category: "Kue & Manisan",
    short: "Manis legit dari beras ketan, gula aren, dan kelapa.",
    description:
      "Camilan khas Mandar dengan rasa gula aren yang dalam dan tekstur lembut berserat. Dibuat dalam produksi kecil agar selalu segar.",
    price: 32000,
    compareAt: 38000,
    stock: 24,
    sold: 1240,
    rating: 4.9,
    reviews: 328,
    origin: "Polewali Mandar",
    image: food1,
    gallery: [food1, food2, food4],
    shelfLife: 21,
    weight: 250,
    halal: "ID321100001234",
    pirt: "2067602010012-28",
    ingredients: "Beras ketan, kelapa parut, gula aren Mandar, garam.",
    story:
      "Golla kambu telah lama hadir dalam perayaan keluarga Mandar. Resep ini dipertahankan oleh kelompok usaha perempuan Desa Campalagian.",
    featured: true,
    hamper: true,
  },
  {
    id: "p2",
    slug: "baje-kacang-mandar",
    name: "Baje Kacang Mandar",
    category: "Kue & Manisan",
    short: "Ketan lembut dengan kacang sangrai dan gula merah.",
    description:
      "Baje tradisional beraroma kelapa dengan potongan praktis untuk teman minum teh.",
    price: 28000,
    stock: 32,
    sold: 875,
    rating: 4.8,
    reviews: 194,
    origin: "Majene",
    image: food2,
    gallery: [food2, food1, food3],
    shelfLife: 18,
    weight: 220,
    halal: "ID321100005678",
    pirt: "2067602020015-28",
    ingredients: "Beras ketan, kacang tanah, kelapa, gula merah.",
    story:
      "Dimasak perlahan dalam wajan besar mengikuti teknik keluarga yang diwariskan tiga generasi.",
    featured: true,
    hamper: true,
  },
  {
    id: "p3",
    slug: "kasippi-renyah",
    name: "Kasippi Renyah",
    category: "Camilan Tradisional",
    short: "Kue tipis renyah dengan aroma wijen dan kelapa.",
    description:
      "Kasippi dipanggang satu per satu hingga tipis dan renyah, lalu dikemas kedap udara.",
    price: 25000,
    compareAt: 29000,
    stock: 48,
    sold: 1634,
    rating: 4.9,
    reviews: 421,
    origin: "Majene",
    image: food3,
    gallery: [food3, food2, food1],
    shelfLife: 45,
    weight: 180,
    halal: "ID321100009876",
    pirt: "2067602020077-28",
    ingredients: "Tepung beras, gula, telur, santan, wijen.",
    story:
      "Cetakan kasippi menghasilkan motif khas dan bunyi renyah yang akrab di meja tamu Mandar.",
    featured: true,
    hamper: true,
  },
  {
    id: "p4",
    slug: "bolu-paranggi",
    name: "Bolu Paranggi",
    category: "Kue & Manisan",
    short: "Bolu gula merah mungil, lembut, dan wangi.",
    description:
      "Bolu panggang dengan karamel gula merah dan tekstur lembap, dikemas per buah.",
    price: 35000,
    stock: 18,
    sold: 642,
    rating: 4.7,
    reviews: 112,
    origin: "Polewali Mandar",
    image: food4,
    gallery: [food4, food1, food2],
    shelfLife: 10,
    weight: 300,
    halal: "ID321100004321",
    pirt: "2067602010088-28",
    ingredients: "Tepung, telur, gula merah, santan.",
    story:
      "Bolu paranggi umum disajikan sebagai penyambut tamu dan bekal perjalanan di Sulawesi Barat.",
    featured: true,
    hamper: true,
  },
  {
    id: "p5",
    slug: "jepa-kering",
    name: "Jepa Kering Siap Santap",
    category: "Camilan Tradisional",
    short: "Olahan singkong dan kelapa, gurih serta mengenyangkan.",
    description:
      "Versi kering jepa yang praktis dipanaskan kembali untuk sarapan atau teman lauk.",
    price: 30000,
    stock: 27,
    sold: 506,
    rating: 4.7,
    reviews: 89,
    origin: "Majene",
    image: food3,
    gallery: [food3, food4, food1],
    shelfLife: 30,
    weight: 250,
    halal: "ID321100001907",
    pirt: "2067602020032-28",
    ingredients: "Singkong, kelapa, garam.",
    story:
      "Jepa adalah pangan pokok bersejarah masyarakat pesisir Mandar yang sederhana namun kaya makna.",
    hamper: true,
  },
  {
    id: "p6",
    slug: "lomo-mandar",
    name: "Lomo Mandar Murni",
    category: "Minyak & Bumbu",
    short: "Minyak kelapa tradisional beraroma lembut.",
    description:
      "Minyak kelapa murni produksi rumahan untuk memasak dan pelengkap sajian tradisional.",
    price: 48000,
    stock: 16,
    sold: 388,
    rating: 4.8,
    reviews: 76,
    origin: "Tinambung",
    image: food4,
    gallery: [food4, food2, food1],
    shelfLife: 180,
    weight: 450,
    halal: "ID321100006112",
    pirt: "2067602010092-28",
    ingredients: "100% kelapa tua pilihan.",
    story:
      "Kelapa diproses perlahan untuk menghasilkan minyak jernih yang menjadi bagian dapur Mandar.",
    hamper: true,
  },
  {
    id: "p7",
    slug: "hampers-rindu-mandar",
    name: "Hampers Rindu Mandar",
    category: "Hampers",
    short: "Empat rasa pilihan dalam box siap hadiah.",
    description:
      "Paket hadiah berisi golla kambu, baje, kasippi, dan jepa dengan kartu ucapan.",
    price: 139000,
    compareAt: 156000,
    stock: 12,
    sold: 214,
    rating: 4.9,
    reviews: 58,
    origin: "Kurasi Sulawesi Barat",
    image: hamper,
    gallery: [hamper, gift, food1],
    shelfLife: 18,
    weight: 1200,
    halal: "Produk terkurasi",
    pirt: "Tercantum per produk",
    ingredients: "Lihat komposisi masing-masing produk.",
    story:
      "Satu box yang membawa aneka rasa Mandar untuk keluarga, sahabat, dan relasi.",
    featured: true,
  },
  {
    id: "p8",
    slug: "hampers-sapa-mandar",
    name: "Hampers Sapa Mandar",
    category: "Hampers",
    short: "Paket ringkas untuk hadiah personal.",
    description:
      "Dua camilan pilihan, kain aksen Mandar, dan kartu ucapan personal.",
    price: 89000,
    stock: 20,
    sold: 169,
    rating: 4.8,
    reviews: 43,
    origin: "Kurasi Sulawesi Barat",
    image: gift,
    gallery: [gift, hamper, food2],
    shelfLife: 21,
    weight: 700,
    halal: "Produk terkurasi",
    pirt: "Tercantum per produk",
    ingredients: "Lihat komposisi masing-masing produk.",
    story: "Hadiah kecil dengan cerita besar tentang keramahan Mandar.",
  },
]

export const categories = [
  { name: "Kue & Manisan", caption: "Manis autentik", icon: "cookie" },
  { name: "Camilan Tradisional", caption: "Renyah & gurih", icon: "wheat" },
  { name: "Minyak & Bumbu", caption: "Dari dapur lokal", icon: "bottle" },
  { name: "Hampers", caption: "Siap jadi hadiah", icon: "gift" },
]

export const formatRupiah = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value)
