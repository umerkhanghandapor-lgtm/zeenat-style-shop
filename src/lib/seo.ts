import { DELIVERY, formatRs, type Product } from "@/lib/catalog";

export const SITE = "https://zeenat-style-shop.lovable.app";

export function productFaqs(p: Product) {
  return [
    { q: `Zeenat Collection ke ${p.name} ki price kya hai?`, a: `${p.name} ki price ${formatRs(p.price)} hai${p.oldPrice ? ` (pehle ${formatRs(p.oldPrice)} thi — sale chal rahi hai)` : ""}.` },
    { q: "Delivery kitne din mein hoti hai?", a: "Karachi mein 1-2 din aur baqi Pakistan mein 3-5 working days mein delivery hoti hai." },
    { q: "Delivery charges kitne hain?", a: `Karachi ${DELIVERY[0].value}, doosre shehar ${DELIVERY[1].value}. Rs 5,000 se zyada ke order par delivery free hai.` },
    { q: `${p.name} kaise order karein?`, a: "Cart mein add karein ya 'WhatsApp par order' button dabayein. Cash on delivery available hai." },
    { q: "Kya return ya exchange ho sakta hai?", a: "Ji haan, 7 din ke andar unused product exchange ya return ho sakta hai." },
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
