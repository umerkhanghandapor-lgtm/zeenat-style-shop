import { createFileRoute, Link } from "@tanstack/react-router";
import { SITE, faqSchema } from "@/lib/seo";

const ABOUT_FAQS = [
  { q: "What is Zeenat Collection?", a: "Zeenat Collection is a Pakistani online fashion brand offering clothing for women, men and kids, shoes, makeup, jewellery, bags, dupattas and handmade crochet products." },
  { q: "Where is Zeenat Collection based?", a: "We are based in Karachi and deliver across Pakistan with cash on delivery." },
  { q: "What are the prices at Zeenat Collection?", a: "Kids items start at Rs 980, ladies suits at Rs 4,900, and bridal wear goes up to Rs 18,500. Sale discounts reach up to 40%." },
  { q: "How long does delivery take?", a: "Delivery takes 1–2 days within Karachi and 3–5 working days in other cities." },
  { q: "Are Zeenat Collection products authentic?", a: "Yes, every product is quality-checked before shipping, and we offer a 7-day return and exchange policy." },
];

const TITLE = "About Us — Zeenat Collection | Pakistan Fashion Brand";
const DESC = "Discover Zeenat Collection, a Karachi-based fashion brand delivering clothing for women, men and kids, shoes, makeup, jewellery and handmade crochet across Pakistan.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "keywords", content: "zeenat collection about, pakistani fashion brand, karachi clothing brand, handmade crochet pakistan, online fashion store pakistan" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/about` },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/about` }],
    scripts: [
      faqSchema(ABOUT_FAQS),
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Zeenat Collection",
          url: SITE,
          description: DESC,
          areaServed: "PK",
          address: { "@type": "PostalAddress", addressLocality: "Karachi", addressCountry: "PK" },
          knowsAbout: ["Pakistani fashion", "Ladies lawn suits", "Bridal wear", "Gents kurta shalwar", "Kids clothing", "Khussa shoes", "Makeup", "Jewellery", "Handmade crochet"],
        }),
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 leading-relaxed">
      <Link to="/" className="text-sm text-muted-foreground underline">← Back to Shop</Link>
      <h1 className="font-display mt-4 text-4xl font-bold">About Zeenat Collection</h1>
      <p className="mt-2 text-lg text-primary font-semibold">Wear Zeenat for every occasion</p>

      <h2 className="font-display mt-8 text-2xl font-bold">Our Story</h2>
      <p className="mt-2">Zeenat Collection began as a small handmade crochet shop in Karachi. With the love and trust of our customers, we have grown into a complete online fashion brand in Pakistan — bringing fashion for women, men and kids together in one place.</p>

      <h2 className="font-display mt-8 text-2xl font-bold">What We Offer</h2>
      <ul className="mt-2 list-disc space-y-1 pl-6">
        <li><b>Ladies:</b> embroidered lawn suits, party frocks, abaya, bridal zardozi maxi, dupattas</li>
        <li><b>Gents:</b> kurta shalwar, jeans & shirts, caps, leather shoes and sneakers</li>
        <li><b>Kids:</b> embroidered frocks and school bags</li>
        <li><b>Accessories:</b> khussa, fashion sunglasses (UV400), handbags, clutches, umbrellas</li>
        <li><b>Beauty & Jewellery:</b> makeup sets, 12-piece brush sets, kundan bangles, bracelets</li>
        <li><b>Crochet:</b> handmade tote bags, shawls, baby cardigans and crochet supplies</li>
      </ul>

      <h2 className="font-display mt-8 text-2xl font-bold">Our Expertise</h2>
      <p className="mt-2">Our team brings extensive experience in Pakistani fabrics, craftsmanship and embroidery. We inspect the fabric, stitching and colour of every suit. Our artisans handcraft our crochet products, and our in-house ranges — including Zeenat Lawn, Zeenat Bridal, Zeenat Steps, Zeenat Jewels and Zeenat Handmade — combine quality with affordable prices.</p>

      <h2 className="font-display mt-8 text-2xl font-bold">Our Promise</h2>
      <ul className="mt-2 list-disc space-y-1 pl-6">
        <li>Cash on delivery across Pakistan</li>
        <li>Delivery in 1–2 days within Karachi and 3–5 days in other cities</li>
        <li>Free delivery on orders of Rs 5,000 or more</li>
        <li>7-day returns and exchanges</li>
        <li>Direct contact and ordering on WhatsApp</li>
      </ul>

      <h2 className="font-display mt-8 text-2xl font-bold">Frequently Asked Questions</h2>
      <div className="mt-4 space-y-2">
        {ABOUT_FAQS.map((f) => (
          <details key={f.q} className="rounded-xl border border-border bg-card p-4">
            <summary className="cursor-pointer font-semibold">{f.q}</summary>
            <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
          </details>
        ))}
      </div>
    </main>
  );
}
