import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PRODUCTS, formatRs, waLink } from "@/lib/catalog";
import { SITE, productFaqs, faqSchema } from "@/lib/seo";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = PRODUCTS.find((p) => String(p.id) === params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ params, loaderData }) => {
    const p = loaderData?.product;
    if (!p) return { meta: [{ title: "Product Not Found — Zeenat Collection" }] };
    const title = `${p.name} — ${formatRs(p.price)} | Zeenat Collection`;
    const desc = `Shop ${p.name} (${p.category}, ${p.brand}) for ${formatRs(p.price)}. Send Order Message with cash on delivery across Pakistan.`;
    const url = `${SITE}/product/${params.id}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { name: "keywords", content: `${p.name.toLowerCase()}, ${p.category.toLowerCase()} price pakistan, ${p.brand.toLowerCase()}, zeenat collection, online shopping pakistan` },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "product" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        faqSchema(productFaqs(p)),
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: p.name,
            brand: { "@type": "Brand", name: p.brand },
            category: p.category,
            aggregateRating: { "@type": "AggregateRating", ratingValue: p.rating, reviewCount: p.reviews },
            offers: { "@type": "Offer", price: p.price, priceCurrency: "PKR", availability: "https://schema.org/InStock", url },
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="p-10 text-center">
      Product not found. <Link to="/" className="underline">Back to Shop</Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product: p } = Route.useLoaderData();
  const faqs = productFaqs(p);
  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <Link to="/" className="text-sm text-muted-foreground underline">← Zeenat Collection</Link>
      <div className="mt-4 grid gap-6 sm:grid-cols-2">
        <img src={p.image} alt={p.name} className="w-full rounded-2xl object-cover" />
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">{p.category} · {p.brand}</p>
          <h1 className="font-display mt-1 text-3xl font-bold">{p.name}</h1>
          <p className="mt-3 text-2xl font-bold text-primary">
            {formatRs(p.price)}{" "}
            {p.oldPrice && <span className="text-base text-muted-foreground line-through">{formatRs(p.oldPrice)}</span>}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">★ {p.rating} ({p.reviews} reviews)</p>
          <a
            href={waLink(`Hello! I would like this item: ${p.name} (${formatRs(p.price)}) — Zeenat Collection`)}
           
            rel="noreferrer"
            className="mt-5 inline-block rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground"
          >
            Send Order Message
          </a>
        </div>
      </div>
      <section className="mt-10">
        <h2 className="font-display text-2xl font-bold">Frequently Asked Questions</h2>
        <div className="mt-4 space-y-2">
          {faqs.map((f) => (
            <details key={f.q} className="rounded-xl border border-border bg-card p-4">
              <summary className="cursor-pointer font-semibold">{f.q}</summary>
              <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
