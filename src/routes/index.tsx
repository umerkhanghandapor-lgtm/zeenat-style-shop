import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { heroImg, WHATSAPP_NUMBER, CATEGORIES, PRODUCTS, DELIVERY, waLink, FAQS, formatRs, type Product } from "@/lib/catalog";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zeenat Collection — Ladies, Gents & Kids Fashion Pakistan" },
      {
        name: "description",
        content:
          "Zeenat Collection — clothing for women, men and kids, shoes, makeup, jewellery, bags, dupattas and handmade crochet. Order on WhatsApp with cash on delivery across Pakistan.",
      },
      {
        name: "keywords",
        content:
          "zeenat collection, online shopping pakistan, ladies suit price pakistan, gents kurta shalwar, kids frock, khussa shoes, makeup online pakistan, jewellery online pakistan, crochet handmade bags, dupatta price, school bags, sunglasses, cash on delivery pakistan",
      },
      { property: "og:title", content: "Zeenat Collection — Ladies, Gents & Kids Fashion" },
      {
        property: "og:description",
        content:
          "Clothing, shoes, makeup, jewellery, bags and crochet — all in one place. Order on WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://zeenat-style-shop.lovable.app/" },
      { property: "og:site_name", content: "Zeenat Collection" },
      { property: "og:locale", content: "en_PK" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
    ],
    links: [{ rel: "canonical", href: "https://zeenat-style-shop.lovable.app/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Store",
          name: "Zeenat Collection",
          description:
            "Clothing for women, men and kids, shoes, makeup, jewellery, bags, dupattas and handmade crochet — all in one place.",
          url: "https://zeenat-style-shop.lovable.app/",
          areaServed: "PK",
          currenciesAccepted: "PKR",
          paymentAccepted: "Cash on Delivery",
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Zeenat Collection Categories",
            itemListElement: [
              "Ladies",
              "Gents",
              "Kids",
              "Shoes",
              "Makeup",
              "Jewellery",
              "Bags",
              "Dupatta",
              "Sunglasses",
              "Crochet",
              "Caps & Umbrella",
            ].map((name) => ({
              "@type": "Offer",
              itemOffered: { "@type": "CategoryCode", name },
            })),
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: ZeenatApp,
});

function ZeenatApp() {
  const [category, setCategory] = useState("All");
  const [saleOnly, setSaleOnly] = useState(false);
  const [scanOpen, setScanOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<Record<number, number>>({});
  const [cartOpen, setCartOpen] = useState(false);

  const filtered = useMemo(
    () =>
      PRODUCTS.filter(
        (p) =>
          (category === "All" || p.category === category) &&
          (!saleOnly || p.tag === "sale") &&
          (!search.trim() ||
            `${p.name} ${p.category} ${p.brand}`
              .toLowerCase()
              .includes(search.trim().toLowerCase())),
      ),
    [category, saleOnly, search],
  );

  const cartItems = useMemo(
    () =>
      Object.entries(cart).flatMap(([id, qty]) => {
        const product = PRODUCTS.find((p) => p.id === Number(id));
        return product ? [{ product, qty }] : [];
      }),
    [cart],
  );
  const cartCount = cartItems.reduce((n, x) => n + x.qty, 0);
  const subtotal = cartItems.reduce((n, x) => n + x.product.price * x.qty, 0);
  const deliveryFee = subtotal >= 5000 || subtotal === 0 ? 0 : 200;

  const addToCart = (id: number) => setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
  const setQty = (id: number, qty: number) =>
    setCart((c) => {
      const next = { ...c };
      if (qty <= 0) delete next[id];
      else next[id] = qty;
      return next;
    });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sale marquee */}
      <div className="overflow-hidden bg-primary py-2 text-primary-foreground">
        <div className="marquee-track flex w-max whitespace-nowrap text-xs font-semibold tracking-[0.2em] uppercase">
          {[0, 1].map((i) => (
            <span key={i} className="px-4">
              ✦ Sale — Up to 40% off ✦ Cash on Delivery ✦ Delivery across Pakistan
              ✦ Order on WhatsApp ✦ Sale — Up to 40% off ✦
              Cash on Delivery ✦ Delivery across Pakistan ✦ Order on WhatsApp ✦
            </span>
          ))}
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <div className="leading-tight">
            <span className="font-display text-2xl font-bold tracking-wide">
              Zeenat Collection
            </span>
            <span className="block text-[10px] font-semibold tracking-[0.3em] text-muted-foreground uppercase">
              Clothing · Fashion · Crochet
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCartOpen(true)}
              className="relative inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-2 text-xs font-semibold transition hover:border-gold"
            >
              <CartIcon /> Cart
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-sale text-[10px] font-bold text-sale-foreground">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setScanOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-2 text-xs font-semibold transition hover:border-gold"
            >
              <ScanIcon /> Scan
            </button>
            <a
              href={waLink("Hello! I would like to place an order with Zeenat Collection.")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-whatsapp px-4 py-2 text-xs font-bold text-whatsapp-foreground shadow-sm transition hover:opacity-90"
            >
              <WhatsAppIcon /> WhatsApp
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-6">
        <div className="relative overflow-hidden rounded-3xl">
          <img
            src={heroImg}
            alt="Zeenat Collection — embroidered fabrics and jewellery"
            width={1600}
            height={912}
            className="aspect-[16/10] w-full object-cover sm:aspect-[16/6]"
          />
          <div className="absolute inset-0 flex items-center bg-gradient-to-r from-foreground/70 via-foreground/30 to-transparent">
            <div className="fade-up max-w-md px-6 py-8 text-primary-foreground sm:px-10">
              <span className="text-xs font-bold tracking-[0.25em] text-gold uppercase">
                New Collection 2026
              </span>
              <h1 className="mt-2 text-4xl leading-[1.05] font-bold text-balance sm:text-6xl">
                Wear Zeenat for every occasion
              </h1>
              <p className="mt-3 text-sm text-primary-foreground/85 text-pretty">
                Your complete fashion shop — clothing for women, men and kids,
                shoes, makeup, jewellery, bags and handmade crochet.
                Order from the comfort of your home.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="#shop"
                  className="rounded-full bg-gold px-6 py-3 text-sm font-bold text-gold-foreground transition hover:brightness-105"
                >
                  Shop Now
                </a>
                <a
                  href={waLink("Hello! I would like to see the new collection at Zeenat Collection.")}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-primary-foreground/40 px-6 py-3 text-sm font-semibold transition hover:bg-primary-foreground/10"
                >
                  Contact on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="mx-auto max-w-6xl px-4 pt-4">
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {[
            { icon: "🚚", label: "Nationwide Delivery" },
            { icon: "💵", label: "Cash on Delivery" },
            { icon: "🔄", label: "7-Day Returns" },
            { icon: "⭐", label: "100% Authentic Items" },
          ].map((t) => (
            <div
              key={t.label}
              className="flex items-center gap-2 rounded-2xl border border-border bg-card px-3.5 py-3 text-xs font-bold"
            >
              <span className="text-base" aria-hidden="true">
                {t.icon}
              </span>
              {t.label}
            </div>
          ))}
        </div>
      </section>

      {/* Category chips */}
      <nav
        id="shop"
        className="sticky top-[57px] z-30 border-b border-border bg-background/90 backdrop-blur"
      >
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3 [&::-webkit-scrollbar]:hidden">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-bold tracking-wide uppercase transition ${
                category === c
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card text-muted-foreground hover:border-gold"
              }`}
            >
              {c}
            </button>
          ))}
          <button
            onClick={() => setSaleOnly((s) => !s)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-bold tracking-wide uppercase transition ${
              saleOnly
                ? "bg-sale text-sale-foreground"
                : "border border-sale/40 bg-card text-sale hover:bg-sale/10"
            }`}
          >
            % Sale
          </button>
        </div>
      </nav>

      {/* Products */}
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              {saleOnly ? "Sale Items" : category === "All" ? "Our Collection" : category}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {filtered.length} items · 12 brands · Cash on Delivery
            </p>
          </div>
          <div className="relative w-full max-w-xs">
            <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="What are you looking for?"
              aria-label="Search products"
              className="w-full rounded-full border border-border bg-card py-2.5 pr-4 pl-9 text-sm outline-none transition placeholder:text-muted-foreground focus:border-gold"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
            <p className="font-display text-xl font-bold">No products found</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try another name or ask us on WhatsApp — we will help you find it.
            </p>
            <a
              href={waLink(`Hello! I would like this item: ${search || "..."}`)}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 text-sm font-bold text-whatsapp-foreground"
            >
              <WhatsAppIcon /> Ask on WhatsApp
            </a>
          </div>
        ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p, i) => (
            <article
              key={p.id}
              className="fade-up group overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-lg"
              style={{ animationDelay: `${Math.min(i, 8) * 60}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  width={736}
                  height={912}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105"
                />
                {p.tag === "sale" && p.oldPrice && (
                  <span className="absolute top-2 left-2 -rotate-3 rounded-full bg-sale px-2.5 py-1 text-[10px] font-bold tracking-wider text-sale-foreground uppercase">
                    -{Math.round((1 - p.price / p.oldPrice) * 100)}% Sale
                  </span>
                )}
                {p.tag === "new" && (
                  <span className="absolute top-2 left-2 rounded-full bg-gold px-2.5 py-1 text-[10px] font-bold tracking-wider text-gold-foreground uppercase">
                    New
                  </span>
                )}
              </div>
              <div className="p-3.5">
                <h3 className="font-display text-base leading-tight font-bold">
                  <Link to="/product/$id" params={{ id: String(p.id) }} className="hover:underline">{p.name}</Link>
                </h3>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  {p.category} · {p.brand}
                </p>
                <Stars rating={p.rating} reviews={p.reviews} />
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-lg font-extrabold">{formatRs(p.price)}</span>
                  {p.oldPrice && (
                    <span className="text-xs text-muted-foreground line-through">
                      {formatRs(p.oldPrice)}
                    </span>
                  )}
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => addToCart(p.id)}
                    className="flex-1 rounded-full bg-primary py-2 text-xs font-bold text-primary-foreground transition hover:opacity-90"
                  >
                    {cart[p.id] ? `In cart (${cart[p.id]})` : "Add to cart"}
                  </button>
                  <a
                    href={waLink(`Hello! I would like this item: ${p.name} (${formatRs(p.price)}) — Zeenat Collection`)}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Order on WhatsApp: ${p.name}`}
                    className="flex items-center justify-center rounded-full bg-whatsapp px-3 text-whatsapp-foreground transition hover:opacity-90"
                  >
                    <WhatsAppIcon />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
        )}

        {/* Delivery + info cards */}
        <section className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-display text-xl font-bold">Delivery Charges</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {DELIVERY.map((d) => (
                <li
                  key={d.label}
                  className="flex items-center justify-between border-b border-border pb-2 last:border-0 last:pb-0"
                >
                  <span className="text-muted-foreground">{d.label}</span>
                  <span className="font-bold text-primary">{d.value}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col rounded-2xl border border-border bg-card p-6">
            <h3 className="font-display text-xl font-bold">Order on WhatsApp</h3>
            <p className="mt-2 text-sm text-muted-foreground text-pretty">
              Send us the name or photo of your favourite item on WhatsApp. We
              will confirm your order and send it with cash on delivery.
            </p>
            <a
              href={waLink("Hello! I would like to place an order.")}
              target="_blank"
              rel="noreferrer"
              className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-3 pt-3 text-sm font-bold text-whatsapp-foreground transition hover:opacity-90"
            >
              <WhatsAppIcon /> Chat Now
            </a>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-display text-xl font-bold">Find by Barcode</h3>
            <p className="mt-2 text-sm text-muted-foreground text-pretty">
              Scan a price tag barcode and ask us on WhatsApp for the
              product price and details.
            </p>
            <button
              onClick={() => setScanOpen(true)}
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold transition hover:border-gold"
            >
              <ScanIcon /> Open Scanner
            </button>
          </div>
        </section>

        <section className="mt-14" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="font-display text-3xl font-bold">
            Frequently Asked Questions
          </h2>
          <div className="mt-6 space-y-3">
            {FAQS.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-border bg-card p-5">
                <summary className="cursor-pointer list-none font-semibold">{f.q}</summary>
                <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center">
          <div>
            <span className="font-display text-2xl font-bold tracking-wide">
              Zeenat Collection
            </span>
            <p className="text-xs tracking-[0.2em] text-primary-foreground/70 uppercase">
              Karachi · Delivery across Pakistan
            </p>
          </div>
          <div className="flex gap-6 text-xs font-semibold tracking-wider text-primary-foreground/80 uppercase sm:ml-auto">
            <Link to="/about" className="underline">About Us</Link>
            <span>7-Day Returns</span>
            <span>Cash on Delivery</span>
            <span>12 Brands</span>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp button */}
      <a
        href={waLink("Hello! I would like to place an order with Zeenat Collection.")}
        target="_blank"
        rel="noreferrer"
        aria-label="Order on WhatsApp"
        className="fixed right-4 bottom-4 z-50 inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-3.5 text-sm font-bold text-whatsapp-foreground shadow-xl transition hover:scale-105"
      >
        <WhatsAppIcon /> Order on WhatsApp
      </a>

      {scanOpen && <ScanDialog onClose={() => setScanOpen(false)} />}
      {cartOpen && (
        <CartDrawer
          items={cartItems}
          subtotal={subtotal}
          deliveryFee={deliveryFee}
          onClose={() => setCartOpen(false)}
          onQty={setQty}
          onRemove={(id) => setQty(id, 0)}
        />
      )}
    </div>
  );
}

function Stars({ rating, reviews }: { rating: number; reviews: number }) {
  const full = Math.round(rating);
  return (
    <div
      className="mt-1.5 flex items-center gap-1"
      aria-label={`Rating: ${rating} out of 5 stars, ${reviews} reviews`}
    >
      <span className="flex text-gold" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((i) => (
          <svg
            key={i}
            viewBox="0 0 20 20"
            className={`size-3.5 fill-current ${i <= full ? "" : "opacity-30"}`}
          >
            <path d="M10 1.6l2.5 5.2 5.7.8-4.1 4 .9 5.7L10 14.6l-5 2.7.9-5.7-4.1-4 5.7-.8L10 1.6z" />
          </svg>
        ))}
      </span>
      <span className="text-[11px] font-bold">{rating.toFixed(1)}</span>
      <span className="text-[11px] text-muted-foreground">({reviews} reviews)</span>
    </div>
  );
}

function ScanDialog({ onClose }: { onClose: () => void }) {
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startScan = async () => {
    setError(null);
    setResult(null);
    // BarcodeDetector is available in some browsers only
    const BD = (window as unknown as { BarcodeDetector?: new (o?: object) => { detect: (v: HTMLVideoElement) => Promise<{ rawValue: string }[]> } }).BarcodeDetector;
    if (!BD) {
      setError("Your browser does not support scanning. Send the barcode number to us on WhatsApp.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      const video = document.getElementById("scan-video") as HTMLVideoElement;
      video.srcObject = stream;
      await video.play();
      const detector = new BD({ formats: ["ean_13", "ean_8", "code_128", "qr_code", "upc_a"] });
      const tick = async () => {
        if (video.readyState >= 2) {
          const codes = await detector.detect(video);
          if (codes.length > 0 && codes[0]) {
            setResult(codes[0].rawValue);
            stream.getTracks().forEach((t) => t.stop());
            return;
          }
        }
        if (!result) requestAnimationFrame(tick);
      };
      tick();
    } catch {
      setError("Camera access is unavailable. Send the barcode number to us on WhatsApp.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-3xl border border-border bg-card p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl font-bold">Barcode Scanner</h3>
          <button
            onClick={onClose}
            className="rounded-full border border-border px-3 py-1 text-sm font-semibold hover:border-gold"
          >
            Close
          </button>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Point your camera at the barcode on the price tag.
        </p>
        <video
          id="scan-video"
          className="mt-4 aspect-[4/3] w-full rounded-2xl bg-foreground/5 object-cover"
          muted
          playsInline
        />
        {result && (
          <div className="mt-4 rounded-2xl bg-secondary p-4 text-sm">
            <p className="font-bold">Barcode found: {result}</p>
            <a
              href={waLink(`Hello! I would like the item with this barcode: ${result}`)}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-whatsapp px-4 py-2 text-xs font-bold text-whatsapp-foreground"
            >
              <WhatsAppIcon /> Ask About This Item
            </a>
          </div>
        )}
        {error && (
          <p className="mt-4 rounded-2xl bg-sale/10 p-4 text-sm text-sale">{error}</p>
        )}
        {!result && (
          <button
            onClick={startScan}
            className="mt-4 w-full rounded-full bg-primary py-3 text-sm font-bold text-primary-foreground transition hover:opacity-90"
          >
            Scan with Camera
          </button>
        )}
      </div>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4 shrink-0" aria-hidden="true">
      <path d="M12.04 2a9.9 9.9 0 0 0-8.4 15.2L2 22l4.9-1.6A9.9 9.9 0 1 0 12.04 2Zm0 1.8a8.1 8.1 0 1 1-4.1 15.1l-.3-.2-2.9 1 1-2.9-.2-.3a8.1 8.1 0 0 1 6.5-12.7Zm-3.1 3.9c-.2 0-.5 0-.7.3-.2.3-.9.9-.9 2.1s.9 2.5 1 2.6c.1.2 1.8 2.8 4.4 3.9 2.2.9 2.6.7 3.1.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.2-.2-.5-.3l-1.7-.8c-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.1-.2 0-.4.1-.5l.5-.6c.1-.2.1-.3.2-.5v-.5L9.6 8c-.2-.4-.4-.3-.6-.3h-.1Z" />
    </svg>
  );
}

function ScanIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4 shrink-0" aria-hidden="true">
      <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2M4 12h16" strokeLinecap="round" />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" strokeLinecap="round" />
    </svg>
  );
}

function CartDrawer({
  items,
  subtotal,
  deliveryFee,
  onClose,
  onQty,
  onRemove,
}: {
  items: { product: Product; qty: number }[];
  subtotal: number;
  deliveryFee: number;
  onClose: () => void;
  onQty: (id: number, qty: number) => void;
  onRemove: (id: number) => void;
}) {
  const total = subtotal + deliveryFee;
  const orderLines = items
    .map((x, i) => `${i + 1}. ${x.product.name} x${x.qty} — ${formatRs(x.product.price * x.qty)}`)
    .join("\n");
  const msg = `Hello! I would like to place this order (Zeenat Collection):\n\n${orderLines}\n\nSubtotal: ${formatRs(subtotal)}\nDelivery: ${deliveryFee === 0 ? "FREE" : formatRs(deliveryFee)}\nTotal: ${formatRs(total)}\n\nName: \nCity: \nFull address: `;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-foreground/60" onClick={onClose}>
      <aside
        className="flex h-full w-full max-w-sm flex-col border-l border-border bg-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h3 className="font-display text-xl font-bold">Your Cart</h3>
          <button
            onClick={onClose}
            className="rounded-full border border-border px-3 py-1 text-sm font-semibold hover:border-gold"
          >
            Close
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 p-8 text-center">
            <span className="text-3xl" aria-hidden="true">🛍️</span>
            <p className="font-display text-lg font-bold">Your cart is empty</p>
            <p className="text-sm text-muted-foreground">
              Your next favourite is waiting in our collection.
            </p>
            <button
              onClick={onClose}
              className="mt-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {items.map((x) => (
                <div
                  key={x.product.id}
                  className="flex gap-3 rounded-2xl border border-border bg-background p-3"
                >
                  <img
                    src={x.product.image}
                    alt={x.product.name}
                    className="size-16 shrink-0 rounded-xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="truncate text-sm font-bold">{x.product.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      {formatRs(x.product.price)} each
                    </p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <button
                        onClick={() => onQty(x.product.id, x.qty - 1)}
                        aria-label={`${x.product.name} decrease quantity`}
                        className="size-6 rounded-full border border-border text-sm font-bold"
                      >
                        −
                      </button>
                      <span className="w-5 text-center text-sm font-bold">{x.qty}</span>
                      <button
                        onClick={() => onQty(x.product.id, x.qty + 1)}
                        aria-label={`${x.product.name} increase quantity`}
                        className="size-6 rounded-full border border-border text-sm font-bold"
                      >
                        +
                      </button>
                      <button
                        onClick={() => onRemove(x.product.id)}
                        className="ml-auto text-[11px] font-semibold text-sale underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <span className="text-sm font-extrabold">
                    {formatRs(x.product.price * x.qty)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-border p-4">
              {deliveryFee === 0 ? (
                <p className="mb-2 rounded-full bg-whatsapp/10 px-3 py-1.5 text-center text-xs font-bold text-whatsapp">
                  🎉 Your delivery is FREE
                </p>
              ) : (
                <p className="mb-2 rounded-full bg-accent px-3 py-1.5 text-center text-xs font-bold text-accent-foreground">
                  {formatRs(5000 - subtotal)} more for FREE delivery!
                </p>
              )}
              <dl className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd className="font-bold">{formatRs(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Delivery (Karachi)</dt>
                  <dd className="font-bold">{deliveryFee === 0 ? "FREE" : formatRs(deliveryFee)}</dd>
                </div>
                <div className="flex justify-between border-t border-border pt-1.5 text-base">
                  <dt className="font-bold">Total</dt>
                  <dd className="font-extrabold text-primary">{formatRs(total)}</dd>
                </div>
              </dl>
              <p className="mt-1 text-[11px] text-muted-foreground">
                Delivery to other cities is Rs 350 — confirmed on WhatsApp.
              </p>
              <a
                href={waLink(msg)}
                target="_blank"
                rel="noreferrer"
                className="mt-3 flex items-center justify-center gap-2 rounded-full bg-whatsapp py-3 text-sm font-bold text-whatsapp-foreground transition hover:opacity-90"
              >
                <WhatsAppIcon /> Order on WhatsApp
              </a>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

function CartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="size-4 shrink-0"
      aria-hidden="true"
    >
      <path d="M6 6h15l-1.5 9h-12L5 3H2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="18" cy="20" r="1.5" />
    </svg>
  );
}
