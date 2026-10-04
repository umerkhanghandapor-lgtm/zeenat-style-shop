import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import heroImg from "@/assets/hero.jpg";
import lawnSuit from "@/assets/lawn-suit.jpg";
import kurta from "@/assets/kurta.jpg";
import crochetBag from "@/assets/crochet-bag.jpg";
import bangles from "@/assets/bangles.jpg";
import khussa from "@/assets/khussa.jpg";
import sunglasses from "@/assets/sunglasses.jpg";
import schoolBag from "@/assets/school-bag.jpg";
import dupatta from "@/assets/dupatta.jpg";
import makeup from "@/assets/makeup.jpg";
import kidsFrock from "@/assets/kids-frock.jpg";
import handbag from "@/assets/handbag.jpg";
import caps from "@/assets/caps.jpg";
import umbrella from "@/assets/umbrella.jpg";
import bracelet from "@/assets/bracelet.jpg";
import gentsShoes from "@/assets/gents-shoes.jpg";
import partyFrock from "@/assets/party-frock.jpg";
import gentsJeans from "@/assets/gents-jeans.jpg";
import abaya from "@/assets/abaya.jpg";
import bridalMaxi from "@/assets/bridal-maxi.jpg";

const WHATSAPP_NUMBER = "923001234567"; // TODO: apna WhatsApp number yahan likhein

type Product = {
  id: number;
  name: string;
  category: string;
  brand: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  tag?: "sale" | "new";
};

const CATEGORIES = [
  "Sab",
  "Ladies",
  "Gents",
  "Kids",
  "Shoes",
  "Makeup",
  "Jewellery",
  "Bags",
  "Dupatta",
  "Chasma",
  "Crochet",
  "Caps & Umbrella",
];

const PRODUCTS: Product[] = [
  { id: 1, name: "Embroidered Lawn 3-Piece", category: "Ladies", brand: "Zeenat Lawn", price: 4900, oldPrice: 7000, rating: 4.8, reviews: 342, image: lawnSuit, tag: "sale" },
  { id: 2, name: "Cotton Kurta Shalwar", category: "Gents", brand: "Zeenat Gents", price: 3600, rating: 4.6, reviews: 187, image: kurta, tag: "new" },
  { id: 3, name: "Handmade Crochet Tote", category: "Crochet", brand: "Zeenat Handmade", price: 1700, oldPrice: 2000, rating: 4.9, reviews: 156, image: crochetBag, tag: "sale" },
  { id: 4, name: "Kundan Bangle Set", category: "Jewellery", brand: "Zeenat Jewels", price: 2450, oldPrice: 2900, rating: 4.7, reviews: 203, image: bangles, tag: "sale" },
  { id: 5, name: "Gold Embroidered Khussa", category: "Shoes", brand: "Zeenat Steps", price: 2800, rating: 4.8, reviews: 174, image: khussa, tag: "new" },
  { id: 6, name: "Fashion Chasma UV400", category: "Chasma", brand: "Zeenat Optics", price: 1500, oldPrice: 2200, rating: 4.5, reviews: 128, image: sunglasses, tag: "sale" },
  { id: 7, name: "Floral School Bag", category: "Kids", brand: "Zeenat Kids", price: 1600, oldPrice: 2100, rating: 4.6, reviews: 96, image: schoolBag, tag: "sale" },
  { id: 8, name: "Chiffon Embroidered Dupatta", category: "Dupatta", brand: "Zeenat Lawn", price: 1450, oldPrice: 2400, rating: 4.9, reviews: 231, image: dupatta, tag: "sale" },
  { id: 9, name: "Luxury Makeup Set", category: "Makeup", brand: "Zeenat Beauty", price: 3200, rating: 4.7, reviews: 185, image: makeup, tag: "new" },
  { id: 10, name: "Kids Embroidered Frock", category: "Kids", brand: "Zeenat Kids", price: 1950, rating: 4.8, reviews: 143, image: kidsFrock, tag: "new" },
  { id: 11, name: "Ladies Leather Handbag", category: "Bags", brand: "Zeenat Bags", price: 3400, oldPrice: 4200, rating: 4.6, reviews: 167, image: handbag, tag: "sale" },
  { id: 12, name: "Crochet Baby Cardigan", category: "Crochet", brand: "Zeenat Handmade", price: 980, rating: 4.9, reviews: 118, image: crochetBag, tag: "new" },
  { id: 13, name: "Stylish Caps (3 Colors)", category: "Caps & Umbrella", brand: "Zeenat Gents", price: 850, oldPrice: 1200, rating: 4.5, reviews: 210, image: caps, tag: "sale" },
  { id: 14, name: "Floral Folding Umbrella", category: "Caps & Umbrella", brand: "Zeenat Daily", price: 1100, rating: 4.4, reviews: 89, image: umbrella, tag: "new" },
  { id: 15, name: "Pearl Gold Bracelet", category: "Jewellery", brand: "Zeenat Jewels", price: 1250, oldPrice: 1800, rating: 4.8, reviews: 176, image: bracelet, tag: "sale" },
  { id: 16, name: "Gents Leather Oxford", category: "Shoes", brand: "Zeenat Steps", price: 4800, oldPrice: 6000, rating: 4.7, reviews: 152, image: gentsShoes, tag: "sale" },
  { id: 17, name: "Velvet Embroidered Party Frock", category: "Ladies", brand: "Zeenat Bridal", price: 7900, oldPrice: 9500, rating: 4.9, reviews: 214, image: partyFrock, tag: "sale" },
  { id: 18, name: "Denim Jeans & Shirt Set", category: "Gents", brand: "Zeenat Gents", price: 4400, oldPrice: 5500, rating: 4.7, reviews: 189, image: gentsJeans, tag: "sale" },
  { id: 19, name: "Embroidered Black Abaya", category: "Ladies", brand: "Zeenat Bridal", price: 6500, rating: 4.8, reviews: 132, image: abaya, tag: "new" },
  { id: 20, name: "Bridal Zardozi Maxi", category: "Ladies", brand: "Zeenat Bridal", price: 18500, oldPrice: 24000, rating: 5.0, reviews: 96, image: bridalMaxi, tag: "sale" },
  { id: 21, name: "Silk Wedding Clutch", category: "Bags", brand: "Zeenat Bags", price: 1900, rating: 4.6, reviews: 78, image: handbag, tag: "new" },
  { id: 22, name: "Handmade Crochet Shawl", category: "Crochet", brand: "Zeenat Handmade", price: 2200, oldPrice: 2800, rating: 4.9, reviews: 141, image: crochetBag, tag: "sale" },
  { id: 23, name: "Glam Makeup Brush Set", category: "Makeup", brand: "Zeenat Beauty", price: 1350, oldPrice: 1800, rating: 4.5, reviews: 203, image: makeup, tag: "sale" },
  { id: 24, name: "Gents Casual Sneakers", category: "Shoes", brand: "Zeenat Steps", price: 3900, rating: 4.7, reviews: 167, image: gentsShoes, tag: "new" },
];

const DELIVERY = [
  { label: "Karachi ke andar", value: "Rs 200" },
  { label: "Doosre shehar", value: "Rs 350" },
  { label: "Rs 5,000 se zyada order", value: "FREE" },
  { label: "Cash on Delivery", value: "Available" },
];

function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function formatRs(n: number) {
  return `Rs ${n.toLocaleString("en-PK")}`;
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zeenat Collection — Ladies, Gents & Kids Fashion" },
      {
        name: "description",
        content:
          "Zeenat Collection — ladies, gents aur kids ke kapre, shoes, makeup, jewellery, bags, dupattay aur handmade crochet. WhatsApp par order karein, cash on delivery.",
      },
      { property: "og:title", content: "Zeenat Collection — Ladies, Gents & Kids Fashion" },
      {
        property: "og:description",
        content:
          "Kapre, shoes, makeup, jewellery, bags aur crochet — sab ek jagah. WhatsApp par order karein.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ZeenatApp,
});

function ZeenatApp() {
  const [category, setCategory] = useState("Sab");
  const [saleOnly, setSaleOnly] = useState(false);
  const [scanOpen, setScanOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () =>
      PRODUCTS.filter(
        (p) =>
          (category === "Sab" || p.category === category) &&
          (!saleOnly || p.tag === "sale") &&
          (!search.trim() ||
            `${p.name} ${p.category} ${p.brand}`
              .toLowerCase()
              .includes(search.trim().toLowerCase())),
      ),
    [category, saleOnly, search],
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sale marquee */}
      <div className="overflow-hidden bg-primary py-2 text-primary-foreground">
        <div className="marquee-track flex w-max whitespace-nowrap text-xs font-semibold tracking-[0.2em] uppercase">
          {[0, 1].map((i) => (
            <span key={i} className="px-4">
              ✦ Sale — 40% tak discount ✦ Cash on Delivery ✦ Poore Pakistan mein
              delivery ✦ WhatsApp par order karein ✦ Sale — 40% tak discount ✦
              Cash on Delivery ✦ Poore Pakistan mein delivery ✦ WhatsApp par
              order karein ✦
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
              Cloths · Fashion · Crochet
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setScanOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-2 text-xs font-semibold transition hover:border-gold"
            >
              <ScanIcon /> Scan
            </button>
            <a
              href={waLink("Assalam o Alaikum! Mujhe Zeenat Collection se order karna hai.")}
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
                Nayi Collection 2026
              </span>
              <h1 className="mt-2 text-4xl leading-[1.05] font-bold text-balance sm:text-6xl">
                Pehniya Zeenat har mauqay per
              </h1>
              <p className="mt-3 text-sm text-primary-foreground/85 text-pretty">
                Fashion ka poora bazaar, ek jagah — ladies, gents aur kids ke
                kapre, shoes, makeup, jewellery, bags aur handmade crochet,
                ghar baithe order karein.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="#shop"
                  className="rounded-full bg-gold px-6 py-3 text-sm font-bold text-gold-foreground transition hover:brightness-105"
                >
                  Abhi Khareedain
                </a>
                <a
                  href={waLink("Assalam o Alaikum! Mujhe Zeenat Collection ki new collection dekhni hai.")}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-primary-foreground/40 px-6 py-3 text-sm font-semibold transition hover:bg-primary-foreground/10"
                >
                  WhatsApp par rabta
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
            { icon: "🚚", label: "Har shehar delivery" },
            { icon: "💵", label: "Cash on Delivery" },
            { icon: "🔄", label: "7 din return" },
            { icon: "⭐", label: "100% asli items" },
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
              {saleOnly ? "Sale Items" : category === "Sab" ? "Hamari Collection" : category}
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
              placeholder="Kya dhoond rahe hain?"
              aria-label="Products search karein"
              className="w-full rounded-full border border-border bg-card py-2.5 pr-4 pl-9 text-sm outline-none transition placeholder:text-muted-foreground focus:border-gold"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
            <p className="font-display text-xl font-bold">Koi item nahi mila</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Doosra naam try karein ya WhatsApp par poochein — hum dhoond kar bata dein ge.
            </p>
            <a
              href={waLink(`Assalam o Alaikum! Mujhe ye item chahiye: ${search || "..."}`)}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 text-sm font-bold text-whatsapp-foreground"
            >
              <WhatsAppIcon /> WhatsApp par poochein
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
                  {p.name}
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
                <a
                  href={waLink(`Assalam o Alaikum! Mujhe ye item chahiye: ${p.name} (${formatRs(p.price)}) — Zeenat Collection`)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 flex items-center justify-center gap-1.5 rounded-full bg-whatsapp py-2 text-xs font-bold text-whatsapp-foreground transition hover:opacity-90"
                >
                  <WhatsAppIcon /> Order on WhatsApp
                </a>
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
            <h3 className="font-display text-xl font-bold">WhatsApp par Order</h3>
            <p className="mt-2 text-sm text-muted-foreground text-pretty">
              Koi bhi item pasand aaye to photo ya naam WhatsApp kar dein. Hum
              foran confirm karein ge aur cash on delivery se bhej dein ge.
            </p>
            <a
              href={waLink("Assalam o Alaikum! Mujhe order karna hai.")}
              target="_blank"
              rel="noreferrer"
              className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-3 pt-3 text-sm font-bold text-whatsapp-foreground transition hover:opacity-90"
            >
              <WhatsAppIcon /> Abhi baat karein
            </a>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-display text-xl font-bold">Scan se Dhoondain</h3>
            <p className="mt-2 text-sm text-muted-foreground text-pretty">
              Dukaan par kisi bhi price tag ka barcode scan karein aur item ki
              price aur details foran dekhein.
            </p>
            <button
              onClick={() => setScanOpen(true)}
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold transition hover:border-gold"
            >
              <ScanIcon /> Scanner kholein
            </button>
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
              Karachi · Poore Pakistan mein delivery
            </p>
          </div>
          <div className="flex gap-6 text-xs font-semibold tracking-wider text-primary-foreground/80 uppercase sm:ml-auto">
            <span>7 din return</span>
            <span>Cash on Delivery</span>
            <span>12 Brands</span>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp button */}
      <a
        href={waLink("Assalam o Alaikum! Mujhe Zeenat Collection se order karna hai.")}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp par order karein"
        className="fixed right-4 bottom-4 z-50 inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-3.5 text-sm font-bold text-whatsapp-foreground shadow-xl transition hover:scale-105"
      >
        <WhatsAppIcon /> Order on WhatsApp
      </a>

      {scanOpen && <ScanDialog onClose={() => setScanOpen(false)} />}
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
    // BarcodeDetector sirf kuch browsers mein hota hai
    const BD = (window as unknown as { BarcodeDetector?: new (o?: object) => { detect: (v: HTMLVideoElement) => Promise<{ rawValue: string }[]> } }).BarcodeDetector;
    if (!BD) {
      setError("Aap ka browser scan support nahi karta. Barcode number likh kar WhatsApp kar dein.");
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
      setError("Camera ki ijazat nahi mili. Barcode number likh kar WhatsApp kar dein.");
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
            Band karein
          </button>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Camera ko price tag ke barcode ke saamne rakhein.
        </p>
        <video
          id="scan-video"
          className="mt-4 aspect-[4/3] w-full rounded-2xl bg-foreground/5 object-cover"
          muted
          playsInline
        />
        {result && (
          <div className="mt-4 rounded-2xl bg-secondary p-4 text-sm">
            <p className="font-bold">Barcode mil gaya: {result}</p>
            <a
              href={waLink(`Assalam o Alaikum! Mujhe is barcode wala item chahiye: ${result}`)}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-whatsapp px-4 py-2 text-xs font-bold text-whatsapp-foreground"
            >
              <WhatsAppIcon /> Ye item WhatsApp par poochein
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
            Camera se Scan karein
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
