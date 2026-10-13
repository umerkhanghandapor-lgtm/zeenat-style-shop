export { default as heroImg } from "@/assets/hero.jpg";

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

export const WHATSAPP_NUMBER = "923001234567"; // TODO: replace with the store’s real WhatsApp number

export type Product = {
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

export const CATEGORIES = [
  "All",
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
];

export const PRODUCTS: Product[] = [
  { id: 1, name: "Embroidered Lawn 3-Piece", category: "Ladies", brand: "Zeenat Lawn", price: 4900, oldPrice: 7000, rating: 4.8, reviews: 342, image: lawnSuit, tag: "sale" },
  { id: 2, name: "Cotton Kurta Shalwar", category: "Gents", brand: "Zeenat Gents", price: 3600, rating: 4.6, reviews: 187, image: kurta, tag: "new" },
  { id: 3, name: "Handmade Crochet Tote", category: "Crochet", brand: "Zeenat Handmade", price: 1700, oldPrice: 2000, rating: 4.9, reviews: 156, image: crochetBag, tag: "sale" },
  { id: 4, name: "Kundan Bangle Set", category: "Jewellery", brand: "Zeenat Jewels", price: 2450, oldPrice: 2900, rating: 4.7, reviews: 203, image: bangles, tag: "sale" },
  { id: 5, name: "Gold Embroidered Khussa", category: "Shoes", brand: "Zeenat Steps", price: 2800, rating: 4.8, reviews: 174, image: khussa, tag: "new" },
  { id: 6, name: "Fashion Sunglasses UV400", category: "Sunglasses", brand: "Zeenat Optics", price: 1500, oldPrice: 2200, rating: 4.5, reviews: 128, image: sunglasses, tag: "sale" },
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

export const DELIVERY = [
  { label: "Within Karachi", value: "Rs 200" },
  { label: "Other cities", value: "Rs 350" },
  { label: "Orders of Rs 5,000 or more", value: "FREE" },
  { label: "Cash on Delivery", value: "Available" },
];

/** Opens the in-app Inbox message form (handled by InboxDialog). */
export function waLink(message: string) {
  return `#message=${encodeURIComponent(message)}`;
}

export const FAQS = [
  { q: "How do I place an order?", a: "Add products to your cart and select 'Order on WhatsApp'. We will contact you on WhatsApp to confirm your order." },
  { q: "What are the delivery charges?", a: "Delivery is free for orders of Rs 5,000 or more. Delivery costs Rs 200 within Karachi and Rs 350 elsewhere in Pakistan." },
  { q: "Is cash on delivery available?", a: "Yes, cash on delivery is available across Pakistan. Pay when you receive your parcel." },
  { q: "How long does delivery take?", a: "Orders arrive in 1–2 days within Karachi and 3–5 working days in other cities." },
  { q: "Can I return or exchange a product?", a: "Yes, unused products can be returned or exchanged within 7 days. Contact us on WhatsApp." },
];

export function formatRs(n: number) {
  return `Rs ${n.toLocaleString("en-PK")}`;
}
