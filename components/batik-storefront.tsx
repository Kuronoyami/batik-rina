'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Instagram,
  Menu,
  Minus,
  Plus,
  Search,
  X,
} from 'lucide-react'
import {
  benefits,
  brandDescription,
  brandStory,
  categories,
  categoryTiles,
  collections,
  colors,
  filterProducts,
  formatRupiah,
  heroEyebrow,
  heroImage,
  heroSubtitle,
  heroTitle,
  instagramAccountNote,
  instagramUrl,
  latestProducts,
  orderWhatsAppUrl,
  productSortOptions,
  products,
  sortProducts,
  whatsappContactNote,
  whatsappNumberIsConfigured,
} from '@/src/data/products'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const links = [
    { label: 'Home', href: '#home' },
    { label: 'Shop', href: '#shop' },
    { label: 'Collections', href: '#collections' },
    { label: 'About Us', href: '#about' },
  ]

  return (
    <>
      <div className="announcement-bar">
        <span>Keindahan batik, untuk setiap cerita.</span>
        <a href="#shop">Temukan koleksi <ArrowUpRight aria-hidden="true" /></a>
      </div>
      <header className="site-header">
        <a className="brand-mark" href="#home" aria-label="Batik Rina, beranda">
          <span className="brand-name">batik rina</span>
          <span className="brand-caption">GARIS CERITA NUSANTARA</span>
        </a>
        <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Navigasi utama">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>
          ))}
        </nav>
        <div className="header-actions">
          <a className="icon-link search-link" href="#shop" aria-label="Cari produk"><Search aria-hidden="true" /></a>
          <a className="header-whatsapp" href="https://wa.me/?text=Halo%20Batik%20Rina%2C%20saya%20ingin%20bertanya%20tentang%20koleksi%20batik." target="_blank" rel="noreferrer">
            Pesan via WhatsApp <ArrowUpRight aria-hidden="true" />
          </a>
          <button className="mobile-menu-button" type="button" aria-label={menuOpen ? 'Tutup navigasi' : 'Buka navigasi'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </header>
    </>
  )
}

function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow"><span className="eyebrow-line" />{heroEyebrow}</p>
        <h1 id="hero-title">Elegansi Batik<br /><em>untuk Setiap Momen</em></h1>
        <p className="hero-description">{heroSubtitle}</p>
        <div className="hero-actions">
          <a className="button button-dark" href="#collections">Lihat Koleksi <ArrowRight aria-hidden="true" /></a>
          <a className="text-link" href="#about">Tentang Kami <ArrowUpRight aria-hidden="true" /></a>
        </div>
        <div className="hero-note"><span className="hero-note-mark">✳</span><span>Motif penuh makna,<br />dikenakan dengan cara Anda.</span></div>
      </div>
      <div className="hero-visual">
        <Image src={heroImage} alt="Model mengenakan busana batik elegan dalam suasana hangat" fill priority sizes="(max-width: 760px) 100vw, 58vw" className="hero-image" />
        <div className="hero-photo-label"><span>01 / 04</span><span>KOLEKSI LARAS</span></div>
        <div className="hero-roundel" aria-hidden="true"><span>BATIK</span><span className="roundel-star">✳</span><span>UNTUK SETIAP CERITA</span></div>
      </div>
      <a href="#collections" className="scroll-cue"><span>GULIR UNTUK MENJELAJAH</span><ArrowDown aria-hidden="true" /></a>
    </section>
  )
}

function SectionHeading({ eyebrow, title, detail, href, linkLabel }: { eyebrow: string; title: string; detail?: string; href?: string; linkLabel?: string }) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow"><span className="eyebrow-line" />{eyebrow}</p>
        <h2>{title}</h2>
        {detail && <p className="section-detail">{detail}</p>}
      </div>
      {href && linkLabel && <a className="text-link section-link" href={href}>{linkLabel}<ArrowUpRight aria-hidden="true" /></a>}
    </div>
  )
}

function ProductCard({ product, onSelect }: { product: (typeof products)[number]; onSelect: (product: (typeof products)[number]) => void }) {
  return (
    <article className="product-card">
      <button className="product-image-button" onClick={() => onSelect(product)} aria-label={`Lihat detail ${product.name}`}>
        <span className="product-image-wrap">
          <Image src={product.image} alt={product.alt} fill sizes="(max-width: 650px) 48vw, (max-width: 1050px) 30vw, 22vw" className="product-image" />
        </span>
        {product.isNew && <span className="product-badge">PILIHAN BARU</span>}
        <span className="product-open" aria-hidden="true"><ArrowUpRight /></span>
      </button>
      <div className="product-meta"><span>{product.collection}</span><span>{product.category}</span></div>
      <button className="product-name-button" onClick={() => onSelect(product)}>{product.name}</button>
      <div className="product-bottom"><span>{formatRupiah(product.price)}</span><button onClick={() => onSelect(product)} aria-label={`Pilih ${product.name}`}><ArrowRight aria-hidden="true" /></button></div>
    </article>
  )
}

function ProductGrid({ items, onSelect }: { items: typeof products; onSelect: (product: (typeof products)[number]) => void }) {
  if (!items.length) return <div className="empty-results"><Search aria-hidden="true" /><p>Belum ada produk yang sesuai.</p><span>Coba kata kunci atau kategori lain.</span></div>
  return <div className="product-grid">{items.map((product) => <ProductCard key={product.id} product={product} onSelect={onSelect} />)}</div>
}

function ProductDialog({ product, onClose }: { product: (typeof products)[number]; onClose: () => void }) {
  const [size, setSize] = useState('M')
  const [color, setColor] = useState(product.colors[0])
  const [quantity, setQuantity] = useState(1)
  const orderUrl = orderWhatsAppUrl({ product, size, color, quantity })

  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section className="product-dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-product-title">
        <button className="dialog-close" type="button" aria-label="Tutup detail produk" onClick={onClose}><X aria-hidden="true" /></button>
        <div className="dialog-image">
          <Image src={product.image} alt={product.alt} fill sizes="(max-width: 720px) 100vw, 48vw" className="product-image" />
          <span className="dialog-image-label">{product.collection}</span>
        </div>
        <div className="dialog-content">
          <p className="eyebrow"><span className="eyebrow-line" />{product.category}</p>
          <h2 id="dialog-product-title">{product.name}</h2>
          <p className="dialog-price">{formatRupiah(product.price)}</p>
          <p className="dialog-description">{product.description}</p>
          <div className="product-facts"><div><span>Motif</span><strong>{product.motif}</strong></div><div><span>Bahan</span><strong>{product.material}</strong></div></div>
          <div className="variant-group">
            <div className="variant-heading"><span>Ukuran</span><button type="button" className="size-guide" onClick={() => window.alert('Panduan ukuran dapat dikonfirmasi melalui WhatsApp sebelum memesan.')}>Panduan ukuran <ArrowUpRight aria-hidden="true" /></button></div>
            <div className="size-options" role="group" aria-label="Pilih ukuran">
              {product.sizes.map((option) => <button key={option} type="button" className={size === option ? 'size-option selected' : 'size-option'} aria-pressed={size === option} onClick={() => setSize(option)}>{option}</button>)}
            </div>
          </div>
          <div className="variant-group">
            <div className="variant-heading"><span>Warna</span><span className="selected-color">{color}</span></div>
            <div className="color-options" role="group" aria-label="Pilih warna">
              {product.colors.map((option) => <button key={option} type="button" className={`color-option ${color === option ? 'selected' : ''}`} aria-label={option} aria-pressed={color === option} onClick={() => setColor(option)}><span style={{ backgroundColor: colors[option as keyof typeof colors] }} />{color === option && <Check aria-hidden="true" />}</button>)}
            </div>
          </div>
          <div className="dialog-order-row"><div className="quantity-control" aria-label="Jumlah pesanan"><button type="button" aria-label="Kurangi jumlah" onClick={() => setQuantity((current) => Math.max(1, current - 1))}><Minus aria-hidden="true" /></button><span aria-live="polite">{quantity}</span><button type="button" aria-label="Tambah jumlah" onClick={() => setQuantity((current) => Math.min(10, current + 1))}><Plus aria-hidden="true" /></button></div><span className="dialog-total">{formatRupiah(product.price * quantity)}</span></div>
          <a className="button button-dark order-button" href={orderUrl} target="_blank" rel="noreferrer">Pesan via WhatsApp <ArrowUpRight aria-hidden="true" /></a>
          <p className="availability-note">Tanyakan ketersediaan ukuran dan warna melalui WhatsApp.</p>
          {!whatsappNumberIsConfigured && <p className="setup-note">{whatsappContactNote}</p>}
        </div>
      </section>
    </div>
  )
}

export default function BatikStorefront() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('Semua')
  const [sortOrder, setSortOrder] = useState('featured')
  const [selectedProduct, setSelectedProduct] = useState<(typeof products)[number] | null>(null)
  const filteredProducts = useMemo(() => sortProducts(filterProducts(products, query, category), sortOrder), [query, category, sortOrder])
  const featuredSelection = products.slice(0, 4)

  return (
    <main>
      <Header />
      <Hero />
      <section className="latest-strip" aria-label="Koleksi terbaru">
        <div className="latest-label"><span className="eyebrow-line" />TERBARU DARI BATIK RINA</div>
        <div className="latest-items">{latestProducts.slice(0, 3).map((product) => <a key={product.id} href="#shop" onClick={() => setCategory(product.category)}><span>{product.name}</span><ArrowUpRight aria-hidden="true" /></a>)}</div>
        <a href="#shop" className="latest-all">Lihat semua <ArrowRight aria-hidden="true" /></a>
      </section>

      <section className="collection-section section-pad" id="collections">
        <SectionHeading eyebrow="Dibuat untuk setiap momen" title="Cerita dalam setiap koleksi" detail="Temukan karakter yang paling dekat dengan gaya dan cerita Anda." />
        <div className="collection-grid">{collections.map((collection, index) => <a className={`collection-card collection-card-${index + 1}`} href="#shop" key={collection.name} onClick={() => setCategory(collection.category)}>
          <Image src={collection.image} alt={`Pilihan busana batik koleksi ${collection.name}`} fill sizes="(max-width: 720px) 100vw, 33vw" className="collection-image" />
          <span className="collection-number">0{index + 1} / 03</span><span className="collection-content"><span className="collection-subtitle">{collection.subtitle}</span><span className="collection-title">{collection.name}</span></span><span className="collection-arrow"><ArrowUpRight aria-hidden="true" /></span>
        </a>)}</div>
      </section>

      <section className="shop-section section-pad" id="shop">
        <SectionHeading eyebrow="Pilihan yang istimewa" title="Temukan batik pilihan Anda" detail="Motif yang berkarakter, siluet yang terasa modern." />
        <div className="shop-toolbar">
          <div className="category-tabs" role="group" aria-label="Filter kategori">
            {categories.map((item) => <button key={item} className={category === item ? 'category-tab active' : 'category-tab'} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}
          </div>
          <div className="shop-controls">
            <label className="search-field"><Search aria-hidden="true" /><span className="sr-only">Cari produk</span><input type="search" placeholder="Cari nama atau motif" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
            <label className="sort-field"><span className="sr-only">Urutkan produk</span><select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}>{productSortOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select><ChevronDown aria-hidden="true" /></label>
          </div>
        </div>
        <div className="catalog-count" aria-live="polite">{filteredProducts.length} produk</div>
        <ProductGrid items={filteredProducts} onSelect={setSelectedProduct} />
        <div className="catalog-footer"><span>Menampilkan {filteredProducts.length} dari {products.length} pilihan</span><a href="#shop" onClick={() => { setCategory('Semua'); setQuery(''); setSortOrder('featured') }}>Kembali ke pilihan kami <ArrowUpRight aria-hidden="true" /></a></div>
      </section>

      <section className="category-section section-pad">
        <div className="category-intro"><p className="eyebrow"><span className="eyebrow-line" />Jelajahi berdasarkan gaya</p><h2>Temukan yang<br /><em>terasa seperti Anda.</em></h2><p>Dari keseharian hingga acara istimewa, temukan batik yang paling cocok dengan gaya Anda.</p></div>
        <div className="category-grid">{categoryTiles.map((tile, index) => <a className={`category-tile category-tile-${index + 1}`} key={tile.label} href="#shop" onClick={() => setCategory(tile.label)}><Image src={tile.image} alt={`Kategori ${tile.label}`} fill sizes="(max-width: 720px) 48vw, 22vw" className="category-image" /><span className="category-tile-count">0{index + 1}</span><span className="category-tile-name">{tile.label}<ArrowUpRight aria-hidden="true" /></span></a>)}</div>
      </section>

      <section className="featured-section section-pad">
        <div className="featured-banner"><div className="featured-copy"><p className="eyebrow"><span className="eyebrow-line" />KOLEKSI BATIK RINA</p><h2>Satu motif,<br /><em>banyak cara untuk bersinar.</em></h2><p>Temukan batik yang menemani momen istimewa maupun hari-hari sederhana Anda.</p><a className="button button-light" href="#shop">Jelajahi koleksi <ArrowRight aria-hidden="true" /></a></div><div className="featured-image-wrap"><Image src="/images/batik-rina-fabric.png" alt="Detail kain batik dengan motif parang dan floral" fill sizes="(max-width: 760px) 100vw, 50vw" className="featured-image" /></div><span className="featured-index">BATIK RINA — 2026</span></div>
        <div className="featured-list"><div><span>01</span><strong>Motif pilihan</strong><small>Karakter yang menarik</small></div><div><span>02</span><strong>Gaya modern</strong><small>Nyaman untuk dikenakan</small></div><div><span>03</span><strong>Untuk setiap cerita</strong><small>Dari hari biasa hingga istimewa</small></div></div>
      </section>

      <section className="about-section section-pad" id="about">
        <div className="about-image-wrap"><Image src="/images/batik-rina-couple.png" alt="Pasangan mengenakan busana batik serasi bernuansa hangat" fill sizes="(max-width: 760px) 100vw, 45vw" className="about-image" /><span className="about-image-caption">KEINDAHAN DALAM SETIAP GARIS</span></div>
        <div className="about-copy"><p className="eyebrow"><span className="eyebrow-line" />Tentang Batik Rina</p><h2>Batik yang terasa dekat,<br /><em>di setiap cerita.</em></h2><p>{brandDescription}</p><p>{brandStory}</p><a className="text-link" href="#contact">Kenali Batik Rina <ArrowUpRight aria-hidden="true" /></a><span className="about-flourish" aria-hidden="true">✳</span></div>
      </section>

      <section className="benefits-section section-pad" aria-labelledby="benefits-title">
        <div className="benefit-heading"><p className="eyebrow"><span className="eyebrow-line" />Keistimewaan Batik Rina</p><h2 id="benefits-title">Dibuat untuk menemani<br /><em>berbagai suasana.</em></h2></div>
        <div className="benefit-list">{benefits.map((item) => <div className="benefit-item" key={item.number}><span className="benefit-number">{item.number}</span><div><h3>{item.title}</h3><p>{item.description}</p></div><ArrowUpRight aria-hidden="true" /></div>)}</div>
      </section>

      <section className="contact-band" id="contact"><div><p className="eyebrow"><span className="eyebrow-line" />Mari berbincang</p><h2>Ada yang ingin<br /><em>Anda tanyakan?</em></h2></div><div className="contact-actions"><p>Hubungi kami untuk bertanya tentang pilihan batik, ukuran, dan ketersediaan produk.</p><a className="button button-dark" href="https://wa.me/?text=Halo%20Batik%20Rina%2C%20saya%20ingin%20bertanya%20tentang%20koleksi%20batik." target="_blank" rel="noreferrer">Hubungi via WhatsApp <ArrowUpRight aria-hidden="true" /></a></div></section>

      <footer className="site-footer">
        <div className="footer-main"><div className="footer-brand"><a className="brand-mark" href="#home"><span className="brand-name">batik rina</span><span className="brand-caption">GARIS CERITA NUSANTARA</span></a><p>Keindahan batik, untuk setiap cerita.</p></div><div className="footer-column"><span className="footer-heading">Jelajahi</span><a href="#shop">Katalog</a><a href="#collections">Koleksi</a><a href="#about">Tentang kami</a></div><div className="footer-column"><span className="footer-heading">Hubungi</span><a href="https://wa.me/?text=Halo%20Batik%20Rina%2C%20saya%20ingin%20bertanya." target="_blank" rel="noreferrer">WhatsApp</a><a href={instagramUrl} target="_blank" rel="noreferrer">Instagram</a></div><div className="footer-social"><a href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram Batik Rina"><Instagram aria-hidden="true" /></a><a href="https://wa.me/?text=Halo%20Batik%20Rina%2C%20saya%20ingin%20bertanya." target="_blank" rel="noreferrer" aria-label="Hubungi Batik Rina via WhatsApp"><ArrowUpRight aria-hidden="true" /></a></div></div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Batik Rina. Seluruh hak cipta dilindungi.</span><span>Motif penuh makna, dikenakan dengan cara Anda.</span></div>
        <p className="footer-note">{instagramAccountNote} {whatsappContactNote}</p>
      </footer>
      {selectedProduct && <ProductDialog key={selectedProduct.id} product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </main>
  )
}

export { featuredSelection }
