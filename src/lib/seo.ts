import { formatRs, type Product } from "@/lib/catalog";

export const SITE = "https://zeenat-style-shop.lovable.app";

export function productFaqs(p: Product) {
  return [
    { q: `How much does ${p.name} cost at Zeenat Collection?`, a: `${p.name} costs ${formatRs(p.price)}${p.oldPrice ? ` (previously ${formatRs(p.oldPrice)} — now on sale)` : ""}.` },
    { q: "How long does delivery take?", a: "Delivery takes 1–2 days within Karachi and 3–5 working days elsewhere in Pakistan." },
    { q: "What are the delivery charges?", a: `Delivery costs Rs 200 within Karachi and Rs 350 to other cities. Orders of Rs 5,000 or more qualify for free delivery.` },
    { q: `How can I order ${p.name}?`, a: "Add it to your cart or select 'Send Order Message'. Cash on delivery is available." },
    { q: "Can I return or exchange this product?", a: "Yes, unused products can be returned or exchanged within 7 days." },
  ];
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    }),
  };
}
