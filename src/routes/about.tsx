import { createFileRoute, Link } from "@tanstack/react-router";
import { SITE, faqSchema } from "@/lib/seo";

const ABOUT_FAQS = [
  { q: "Zeenat Collection kya hai?", a: "Zeenat Collection Pakistan ka online fashion brand hai jo ladies, gents aur kids ke kapre, shoes, makeup, jewellery, bags, dupattay aur handmade crochet products bechta hai." },
  { q: "Zeenat Collection kahan se hai?", a: "Hum Karachi se kaam karte hain aur pooray Pakistan mein cash on delivery ke sath delivery karte hain." },
  { q: "Zeenat ke kapron ki price kya hai?", a: "Kids items Rs 980 se, ladies suits Rs 4,900 se aur bridal wear Rs 18,500 tak hain. Sale par 40% tak discount milta hai." },
  { q: "Delivery kitne din mein hoti hai?", a: "Karachi mein 1-2 din aur baqi shehron mein 3-5 working days." },
  { q: "Kya Zeenat Collection ke products original hain?", a: "Ji haan, har product quality check ke baad bheja jata hai aur 7 din ki return/exchange policy hai." },
];

const TITLE = "About Us — Zeenat Collection | Pakistan Fashion Brand";
const DESC = "Zeenat Collection ki kahani: Karachi ka fashion brand jo ladies, gents, kids clothing, shoes, makeup, jewellery aur handmade crochet pooray Pakistan mein deliver karta hai.";

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
      <Link to="/" className="text-sm text-muted-foreground underline">← Shop par wapas</Link>
      <h1 className="font-display mt-4 text-4xl font-bold">About Zeenat Collection</h1>
      <p className="mt-2 text-lg text-primary font-semibold">Pehniya Zeenat har mauqay per</p>

      <h2 className="font-display mt-8 text-2xl font-bold">Hamari Kahani</h2>
      <p className="mt-2">Zeenat Collection Karachi mein ek chhoti si handmade crochet dukaan ke taur par shuru hua. Customers ke pyaar aur bharose ki wajah se aaj hum Pakistan ka mukammal online fashion brand ban chuke hain — jahan ladies, gents aur kids sab ke liye ek hi jagah sab kuch milta hai.</p>

      <h2 className="font-display mt-8 text-2xl font-bold">Hum Kya Bechte Hain</h2>
      <ul className="mt-2 list-disc space-y-1 pl-6">
        <li><b>Ladies:</b> embroidered lawn suits, party frocks, abaya, bridal zardozi maxi, dupattay</li>
        <li><b>Gents:</b> kurta shalwar, jeans & shirts, caps, leather shoes aur sneakers</li>
        <li><b>Kids:</b> embroidered frocks aur school bags</li>
        <li><b>Accessories:</b> khussa, fashion chasma (UV400), handbags, clutches, umbrellas</li>
        <li><b>Beauty & Jewellery:</b> makeup sets, 12-piece brush sets, kundan bangles, bracelets</li>
        <li><b>Crochet:</b> handmade tote bags, shawls, baby cardigans aur crochet ka saman</li>
      </ul>

      <h2 className="font-display mt-8 text-2xl font-bold">Hamari Maharat (Expertise)</h2>
      <p className="mt-2">Hamari team ko Pakistani fabric, kaarigari aur embroidery ka bara tajurba hai. Har suit ka kapra, silai aur rang hum khud check karte hain. Crochet products hamare apne kaarigar haath se banate hain, aur 12 se zyada in-house brands (Zeenat Lawn, Zeenat Bridal, Zeenat Steps, Zeenat Jewels, Zeenat Handmade waghera) ke zariye hum quality aur munasib qeemat dono yaqeeni banate hain.</p>

      <h2 className="font-display mt-8 text-2xl font-bold">Hamara Wada</h2>
      <ul className="mt-2 list-disc space-y-1 pl-6">
        <li>Pooray Pakistan mein cash on delivery</li>
        <li>Karachi 1-2 din, baqi shehar 3-5 din mein delivery</li>
        <li>Rs 5,000 se zyada order par free delivery</li>
        <li>7 din return/exchange</li>
        <li>WhatsApp par seedha rabta aur order</li>
      </ul>

      <h2 className="font-display mt-8 text-2xl font-bold">Sawal-Jawab</h2>
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
