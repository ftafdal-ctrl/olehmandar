# Plan Desain & Prototipe E-Commerce OlehMandar

## 1. Tujuan

Membangun prototipe frontend e-commerce **OlehMandar** yang responsif dan interaktif untuk mempertemukan UMKM kuliner khas Mandar dengan konsumen nasional. Pengalaman belanja harus terasa seperti marketplace modern yang familiar, sekaligus menjawab kebutuhan khusus dalam proposal:

- memperkenalkan makanan Mandar melalui storytelling yang ringkas;
- menampilkan kejelasan legalitas, masa simpan, dan komposisi;
- membangun kepercayaan terhadap kemasan dan pengiriman antarpulau;
- menyediakan bundling hampers;
- mendukung repeat order, referral, dan loyalty point.

Prototipe menggunakan Bahasa Indonesia dan mencakup alur belanja end-to-end pada mobile maupun desktop.

## 2. Kondisi Awal Repository

- Stack: React 19, Vite 8, TypeScript, Tailwind CSS v4.
- `src/App.tsx` saat ini hanya berisi container kosong.
- `src/index.css` hanya mengimpor Tailwind.
- Belum ada routing, component library, data produk, backend, database, atau autentikasi.
- Development server sudah dikelola oleh Figma Make dan tidak perlu dijalankan manual.

## 3. Keputusan Produk dan Teknis

### Keputusan yang sudah disepakati

- Cakupan: alur belanja end-to-end.
- Gaya: marketplace modern dan praktis.
- Kedalaman: prototipe frontend interaktif, bukan e-commerce produksi.
- Responsivitas: mobile-first dengan tampilan desktop yang matang.

### Pendekatan implementasi

- Tambahkan `react-router-dom` untuk URL dan navigasi antarlayar yang nyata.
- Tambahkan `lucide-react` untuk ikon antarmuka yang konsisten; tidak menggunakan emoji sebagai ikon.
- Gunakan React Context + reducer untuk state keranjang, wishlist, checkout, pesanan simulasi, dan loyalty.
- Persist state utama di `localStorage` agar keranjang dan pesanan simulasi tidak hilang saat refresh.
- Semua produk, kategori, ulasan, artikel, ongkir, voucher, dan status pesanan berasal dari typed mock data lokal.
- Tidak ada API pembayaran, WhatsApp, ekspedisi, akun, atau CMS nyata. Integrasi tersebut direpresentasikan sebagai simulasi yang diberi label jelas.

## 4. Arsitektur Informasi dan Route

### Route utama

1. `/` — Beranda
2. `/produk` — Katalog dan hasil pencarian
3. `/produk/:slug` — Detail produk
4. `/hampers` — Builder hampers
5. `/keranjang` — Keranjang belanja
6. `/checkout` — Checkout bertahap
7. `/pesanan-berhasil/:id` — Konfirmasi pesanan
8. `/lacak-pesanan` — Form pencarian pesanan
9. `/lacak-pesanan/:id` — Timeline status pesanan
10. `/akun` — Ringkasan akun simulasi, pesanan, poin, dan referral
11. Fallback `*` — Halaman tidak ditemukan dengan aksi kembali ke beranda

### Navigasi global

- Desktop: logo, lokasi pengiriman, search bar dominan, kategori, tracking, akun, wishlist, dan keranjang dengan badge.
- Mobile: app bar berisi logo/search/cart dan bottom navigation untuk Beranda, Produk, Hampers, Pesanan, dan Akun.
- Promotional strip tipis untuk pesan ongkir atau garansi kesegaran.
- Breadcrumb pada katalog, detail produk, hampers, dan checkout.

## 5. Sistem Visual

### Arah desain

Marketplace yang bersih, cepat dipindai, dan berorientasi konversi. Identitas Mandar hadir sebagai aksen, bukan dekorasi dominan.

- Latar utama: off-white hangat.
- Surface/card: putih.
- Warna utama: hijau tua untuk kepercayaan dan CTA utama.
- Warna sekunder: terracotta/cokelat kemerahan untuk kuliner dan budaya.
- Aksen: kuning keemasan untuk promo, rating, dan poin.
- Teks: charcoal dengan hierarchy kontras yang memenuhi aksesibilitas.
- Pola tenun Mandar geometris digunakan sangat halus pada hero, divider, atau kemasan hampers; tidak dipakai di belakang teks panjang.
- Radius card medium, border tipis, shadow ringan, dan whitespace konsisten.

### Tipografi

- Gunakan satu keluarga font sans-serif modern yang mudah dibaca, seperti **Plus Jakarta Sans**, melalui Google Fonts CSS import.
- Heading tegas namun tidak terlalu editorial; body dan label mengutamakan keterbacaan.
- Skala tipografi responsif dan konsisten melalui theme variables Tailwind v4 di `src/index.css`.

### Photography dan aset

- Saat implementasi, gunakan skill Unsplash untuk mencari foto hero bernuansa kuliner Indonesia/Sulawesi dan konteks perajin.
- Gunakan foto produk yang konsisten dari segi crop, pencahayaan hangat, serta rasio kartu.
- Jika produk Mandar spesifik tidak tersedia, gunakan visual representatif yang jujur dan label data contoh; jangan mengklaim foto generik sebagai dokumentasi perajin tertentu.
- Buat motif dekoratif sederhana dengan CSS/SVG lokal, bukan ilustrasi emoji.

## 6. Struktur Layar

### A. Beranda

1. Header dan search bar dengan suggestion dropdown.
2. Hero:
   - headline tentang oleh-oleh asli Mandar;
   - CTA “Belanja sekarang” dan “Buat hampers”;
   - trust cues: kemasan aman, produk terkurasi, garansi kesegaran.
3. Shortcut kategori berbentuk icon cards:
   - Camilan Tradisional;
   - Kue & Manisan;
   - Minyak & Bumbu;
   - Hampers;
   - Produk Terlaris.
4. “Pilihan dari Mandar” berupa product carousel/grid.
5. Banner paket hemat ongkir/bundling.
6. Section “Kenapa OlehMandar” dengan tiga pilar proposal.
7. Storytelling feature tentang satu produk atau perajin.
8. Hampers builder teaser.
9. Ulasan pembeli dan indikator kepercayaan.
10. Artikel singkat “Kenal Rasa Mandar”.
11. Footer lengkap: bantuan, pengiriman, garansi, tentang, sosial, dan legal.

### B. Katalog Produk

- Search term dan jumlah hasil.
- Filter:
  - kategori;
  - rentang harga;
  - kota asal;
  - sertifikasi Halal/P-IRT;
  - masa simpan;
  - rating;
  - siap hampers.
- Sort: relevan, terlaris, rating, harga termurah, harga tertinggi.
- Filter drawer di mobile dan sidebar di desktop.
- Product cards memuat foto, nama, asal, harga, rating, jumlah terjual, badge legalitas, masa simpan, promo, wishlist, dan quick add.
- Active filter chips, clear all, pagination atau “Muat lebih banyak”.
- Empty state yang menawarkan penghapusan filter dan kategori populer.

### C. Detail Produk

- Gallery dengan thumbnail dan image fallback.
- Nama, asal perajin, rating, terjual, harga, stok, quantity stepper.
- Pilihan variasi/ukuran bila relevan.
- Opsi kemasan:
  - Standar Aman;
  - Vakum Ekstra;
  - Box Hampers.
- Estimasi ongkir simulasi berdasarkan kota tujuan.
- CTA “Tambah ke keranjang” dan “Beli sekarang”.
- Trust panel: Halal, P-IRT, tanggal produksi, masa simpan, garansi kesegaran.
- Tab/section:
  - Deskripsi;
  - Komposisi dan alergi;
  - Kisah & asal-usul;
  - Cara penyimpanan;
  - Ulasan.
- Card profil UMKM/perajin.
- Penjelasan standar pengemasan dalam timeline visual.
- Produk terkait dan rekomendasi bundling.

### D. Custom Hampers Builder

Alur bertahap dengan progress indicator:

1. Pilih ukuran box dan budget.
2. Pilih produk dengan indikator kapasitas dan subtotal.
3. Pilih tema/kemasan.
4. Isi kartu ucapan.
5. Review hasil.

Perilaku:

- kapasitas box dan batas budget diperbarui real-time;
- item yang tidak muat dinonaktifkan dengan alasan yang jelas;
- pengguna dapat kembali ke langkah sebelumnya tanpa kehilangan pilihan;
- preview ringkasan hampers sticky pada desktop dan collapsible pada mobile;
- hasil akhir dapat dimasukkan sebagai satu line item ke keranjang.

### E. Keranjang

- Daftar item dengan foto, varian kemasan, quantity, subtotal, edit, pindah ke wishlist, dan hapus.
- Grouping visual berdasarkan perajin/kota asal bila relevan.
- Rekomendasi threshold gratis/hemat ongkir.
- Input voucher dengan validasi mock.
- Ringkasan biaya: subtotal, kemasan, estimasi ongkir, diskon, total.
- Cross-sell produk ringan untuk bundling ongkir.
- Empty cart state dengan CTA kembali belanja.

### F. Checkout

Checkout dibuat sebagai flow bertahap:

1. **Alamat**
   - nama, nomor WhatsApp, alamat, provinsi, kota, kecamatan, kode pos;
   - validasi required, format nomor, dan kode pos.
2. **Pengiriman**
   - Reguler, Hemat, dan Prioritas;
   - estimasi hari, biaya, dan kompatibilitas dengan masa simpan produk;
   - warning bila layanan terlalu lama untuk produk tertentu.
3. **Pembayaran**
   - Transfer Bank, Virtual Account, dan E-Wallet sebagai opsi simulasi;
   - tidak meminta atau menyimpan data kartu nyata.
4. **Review**
   - ringkasan alamat, item, packing, ekspedisi, pembayaran, voucher, poin, dan total;
   - checkbox persetujuan syarat;
   - tombol “Buat pesanan simulasi”.

Setelah submit, buat order ID lokal, kosongkan item yang sudah dibeli, dan arahkan ke halaman berhasil.

### G. Konfirmasi dan Tracking

#### Konfirmasi

- order ID, status pembayaran simulasi, total, estimasi tiba;
- ringkasan barang dan alamat;
- CTA lacak pesanan, lihat pesanan, dan kembali belanja;
- informasi bahwa notifikasi WhatsApp hanyalah simulasi UI.

#### Tracking

- pencarian berdasarkan order ID;
- timeline: Pesanan dibuat, Dikemas UMKM, Diserahkan ke kurir, Dalam perjalanan, Tiba di kota tujuan, Selesai;
- status aktif dengan timestamp dan deskripsi;
- panel garansi/komplain jika barang rusak;
- invalid order state dengan instruksi yang jelas.

### H. Akun dan Loyalty

- Profil pengguna contoh.
- Ringkasan poin, tier, dan progress ke reward berikutnya.
- Tab pesanan aktif dan riwayat.
- Tombol repeat order yang mengembalikan item tersedia ke keranjang.
- Kode referral dengan tombol copy dan feedback “Tersalin”.
- Reward cards untuk voucher ongkir/diskon.
- Wishlist dengan CTA tambah ke keranjang.

## 7. Model Data Mock

### Product

- `id`, `slug`, `name`, `category`, `description`
- `price`, `compareAtPrice`, `stock`, `soldCount`, `rating`, `reviewCount`
- `originCity`, `artisanId`, `images`
- `ingredients`, `allergens`, `storageInstructions`
- `shelfLifeDays`, `weightGrams`
- `halalNumber`, `pirtNumber`
- `packagingOptions`, `variants`, `isHampersEligible`, `tags`
- `story`, `featured`

### Artisan

- `id`, `name`, `location`, `sinceYear`, `story`, `photo`, `verified`

### CartItem

- `productId`, `variantId`, `quantity`, `packagingOption`
- optional `hamperConfiguration`

### Order

- `id`, `createdAt`, `items`, `address`, `shippingMethod`
- `paymentMethod`, `pricing`, `status`, `trackingEvents`

### Supporting data

- Category, Review, Article, Voucher, ShippingMethod, Reward, HamperBox, PackagingOption.

Seed minimal produk mencakup item yang disebut dalam proposal: golla kambu, baje, lomo/minyak Mandar, kasippi, jepa, bolu paranggi, dan beberapa paket hampers. Semua informasi sertifikasi dan harga diberi status data contoh.

## 8. State, Data Flow, dan Interaksi

- `CommerceProvider` menjadi sumber state global untuk cart, wishlist, orders, user points, dan toast notifications.
- Product listing memperoleh filter dari URL query params agar hasil dapat dibagikan dan back button tetap bekerja.
- Checkout membaca cart state, menghitung pricing melalui utility murni, lalu membuat mock order.
- Shipping estimator menggunakan kota tujuan + total berat + metode kirim untuk menghasilkan angka simulasi yang deterministik.
- Hampers builder menyimpan draft selama sesi dan mengonversinya menjadi cart item khusus saat selesai.
- Toast digunakan untuk add to cart, wishlist, voucher, copy referral, dan error ringan.
- Modal konfirmasi digunakan sebelum menghapus item atau membatalkan draft.
- Semua control interaktif memiliki disabled, loading singkat, success, error, focus-visible, dan empty state.

## 9. Struktur File yang Direncanakan

```text
src/
  App.tsx
  main.tsx
  index.css
  components/
    layout/
    navigation/
    product/
    cart/
    checkout/
    hampers/
    feedback/
    ui/
  pages/
    HomePage.tsx
    CatalogPage.tsx
    ProductDetailPage.tsx
    HampersPage.tsx
    CartPage.tsx
    CheckoutPage.tsx
    OrderSuccessPage.tsx
    TrackingPage.tsx
    AccountPage.tsx
    NotFoundPage.tsx
  data/
    products.ts
    content.ts
    commerce.ts
  context/
    CommerceContext.tsx
  hooks/
    useLocalStorage.ts
  types/
    commerce.ts
  utils/
    pricing.ts
    shipping.ts
    format.ts
  assets/
    motif-mandar.svg
```

Komponen UI kecil dibuat lokal agar styling tetap konsisten tanpa menambah component framework besar.

## 10. Responsivitas dan Aksesibilitas

- Target utama: 360–430 px mobile, tablet, dan desktop hingga 1440 px.
- Product grid: 2 kolom mobile, 3 tablet, 4 desktop sesuai ruang.
- Sticky bottom CTA pada detail produk dan checkout mobile.
- Kontrol sentuh minimal sekitar 44 px.
- Semua input memiliki label nyata, bukan hanya placeholder.
- Navigasi keyboard lengkap dan focus ring terlihat.
- Semantic landmarks, heading hierarchy, alt text, serta `aria-live` untuk perubahan keranjang/toast.
- Kontras warna diuji untuk teks, CTA, badge, dan state disabled.
- Hormati `prefers-reduced-motion`; animasi hanya untuk feedback kecil, bukan dekorasi berlebihan.

## 11. Edge Cases dan Failure States

- URL produk tidak valid.
- Produk habis atau quantity melebihi stok.
- Filter menghasilkan nol produk.
- Gambar gagal dimuat.
- Keranjang kosong saat membuka checkout.
- Voucher tidak valid, kedaluwarsa, atau minimum belanja belum tercapai.
- Hampers melebihi kapasitas/budget.
- Kota tujuan belum dipilih sehingga ongkir belum bisa dihitung.
- Produk memiliki masa simpan lebih pendek dari estimasi pengiriman.
- Form alamat tidak lengkap atau nomor WhatsApp tidak valid.
- Order ID tracking tidak ditemukan.
- Local storage rusak/tidak bisa diparse: fallback ke state awal tanpa membuat app crash.

## 12. Verifikasi

### Pemeriksaan otomatis

- Jalankan `pnpm format` sesuai script repository.
- Jalankan `pnpm build`; hasil harus selesai tanpa error TypeScript/Vite.

### Pemeriksaan fungsional manual

1. Search dan filter katalog mengubah hasil serta query URL.
2. Tambah produk dari card dan detail memperbarui cart badge.
3. Quantity, kemasan, voucher, dan ongkir menghasilkan total yang benar.
4. Hampers builder menjaga pilihan antarstep dan menghasilkan line item keranjang.
5. Checkout menolak form invalid dan dapat membuat mock order ketika valid.
6. Pesanan baru muncul di halaman akun dan dapat dilacak dengan order ID.
7. Repeat order memasukkan ulang produk yang masih tersedia.
8. Cart/order tetap ada setelah refresh.
9. Semua route, back button, fallback 404, empty state, dan invalid state bekerja.

### Pemeriksaan visual

- Tinjau layout pada viewport mobile, tablet, dan desktop.
- Pastikan tidak ada horizontal overflow, teks terpotong, atau sticky element menutupi konten.
- Tinjau hierarchy, konsistensi spacing, crop foto, badge, hover/focus/pressed state.
- Pastikan identitas Mandar terlihat tetapi tidak mengurangi kemudahan scan ala marketplace.

## 13. Acceptance Criteria

- Seluruh route pada bagian 4 tersedia dan dapat dinavigasi tanpa dead end.
- Pengguna dapat menyelesaikan alur dari discovery hingga mock order dan tracking.
- Katalog, cart, hampers, checkout, wishlist, tracking, dan loyalty memiliki interaksi nyata berbasis local state.
- Informasi utama dari proposal—storytelling, legalitas, masa simpan, kemasan, ongkir, garansi, dan UMKM—terlihat pada titik keputusan yang tepat.
- Tampilan responsif dan usable pada mobile serta desktop.
- Tidak ada klaim bahwa pembayaran, sertifikasi, ongkir, tracking WhatsApp, atau data produk contoh merupakan data produksi.
- Build dan format repository lulus.

## 14. Di Luar Cakupan

- Backend, database, CMS/admin panel, autentikasi nyata, dan sinkronisasi lintas perangkat.
- Payment gateway, kalkulasi ongkir ekspedisi nyata, WhatsApp API, push notification, dan tracking kurir real-time.
- Upload sertifikat legalitas nyata.
- Checkout finansial atau penyimpanan kredensial pengguna.
- Dashboard penjual/UMKM.
