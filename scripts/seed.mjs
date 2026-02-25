// scripts/seed.mjs
// Run with: node scripts/seed.mjs

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "dud2njyb",
  dataset: "production",
  apiVersion: "2024-01-01",
  token:
    "skwhhz2TTcIOzcUMmTTVB79e5wwb7xZCw1mM6JdhZkePL8E2wD2AhmdOypNBeKHB4zvzHNm5YslQsfZDy7mDP8v7XGdg0OL4seQP8pXVWobA60TLxnQ5B2fhvTrzULjyZC33TzfliWh3FxvEn2k8EmbrBWJ06kuDwwaHggOOTSIbgoPcu5vU",
  useCdn: false,
});

const products = [
  {
    _type: "product",
    title: "Garden Bliss Bouquet",
    slug: { _type: "slug", current: "garden-bliss-bouquet" },
    price: 125,
    shortDescription: "A lush mix of peonies, garden roses, and eucalyptus",
    category: "bouquets",
    inStock: true,
    featured: true,
    tags: ["peonies", "roses", "eucalyptus"],
    description: [
      {
        _type: "block",
        _key: "desc1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "span1",
            text: "A stunning bouquet bursting with the romance of garden roses, the luxury of peonies, and the freshness of eucalyptus. Hand-tied and finished with our signature ribbon, this arrangement is perfect for any occasion.",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        _key: "desc2",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "span2",
            text: "Sourced fresh from our trusted growers in the Netherlands and Ecuador, every bloom is selected for peak freshness and beauty.",
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
  },
  {
    _type: "product",
    title: "Côte d'Azur Flower Box",
    slug: { _type: "slug", current: "cote-dazur-flower-box" },
    price: 185,
    shortDescription: "French roses and delphiniums in an elegant hat box",
    category: "flower-boxes",
    inStock: true,
    featured: true,
    tags: ["roses", "delphiniums", "box"],
    description: [
      {
        _type: "block",
        _key: "desc1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "span1",
            text: "Inspired by the colours of the French Riviera, this luxurious flower box combines premium French roses with delicate delphiniums in a curated palette of soft blues, blushes, and creams.",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        _key: "desc2",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "span2",
            text: "Presented in our signature keepsake hat box — a gift that keeps giving long after the flowers bloom.",
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
  },
  {
    _type: "product",
    title: "Rose Petal Romance",
    slug: { _type: "slug", current: "rose-petal-romance" },
    price: 95,
    shortDescription: "50 premium roses in soft blush and ivory tones",
    category: "bouquets",
    inStock: true,
    featured: true,
    tags: ["roses"],
    description: [
      {
        _type: "block",
        _key: "desc1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "span1",
            text: "Fifty premium roses hand-selected in the most romantic soft blush and ivory hues. This classic arrangement speaks the language of love and elegance.",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        _key: "desc2",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "span2",
            text: "Ideal for anniversaries, Valentine's Day, or any moment that deserves to feel extraordinary. Wrapped in our signature craft paper with a satin ribbon.",
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
  },
  {
    _type: "product",
    title: "Wildflower Meadow",
    slug: { _type: "slug", current: "wildflower-meadow" },
    price: 80,
    shortDescription: "A free-spirited mix of seasonal wildflowers",
    category: "bouquets",
    inStock: true,
    featured: false,
    tags: ["wildflowers", "seasonal"],
    description: [
      {
        _type: "block",
        _key: "desc1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "span1",
            text: "A free-spirited, effortlessly beautiful bouquet brimming with the best seasonal wildflowers. Think cosmos, cornflowers, lisianthus, and more — arranged in a loose, garden-picked style.",
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
  },
  {
    _type: "product",
    title: "Luxe Bridal Arrangement",
    slug: { _type: "slug", current: "luxe-bridal-arrangement" },
    price: 350,
    shortDescription:
      "An opulent wedding arrangement with white orchids and ranunculus",
    category: "wedding",
    inStock: true,
    featured: false,
    tags: ["orchids", "ranunculus", "wedding"],
    description: [
      {
        _type: "block",
        _key: "desc1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "span1",
            text: "An opulent bridal arrangement crafted with pristine white orchids, soft ranunculus, and sweeping greenery. Designed to make your wedding day unforgettable.",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        _key: "desc2",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "span2",
            text: "Every bridal piece is custom-created. Contact us to discuss your vision and personalise your arrangement to perfectly match your big day.",
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
  },
  {
    _type: "product",
    title: "Teddy Bear & Roses Bundle",
    slug: { _type: "slug", current: "teddy-bear-roses-bundle" },
    price: 140,
    shortDescription: "A soft teddy bear paired with 12 premium red roses",
    category: "gifts-balloons",
    inStock: true,
    featured: true,
    tags: ["gift", "roses", "teddy"],
    description: [
      {
        _type: "block",
        _key: "desc1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "span1",
            text: "The ultimate gift bundle — a soft, huggable teddy bear paired with a dozen long-stemmed premium Ecuadorian red roses. Perfect for birthdays, anniversaries, or just because.",
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
  },
  {
    _type: "product",
    title: "Sunrise Tulip Bouquet",
    slug: { _type: "slug", current: "sunrise-tulip-bouquet" },
    price: 70,
    shortDescription: "Cheerful tulips in warm orange and yellow hues",
    category: "bouquets",
    inStock: true,
    featured: false,
    tags: ["tulips"],
    description: [
      {
        _type: "block",
        _key: "desc1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "span1",
            text: "Bright, cheerful, and full of life — this bouquet of premium Dutch tulips in warm sunrise tones of orange, coral, and golden yellow is the perfect pick-me-up.",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        _key: "desc2",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "span2",
            text: "Sourced directly from our partner growers in the Netherlands, these tulips arrive at peak freshness and will bloom beautifully over 5–7 days.",
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
  },
  {
    _type: "product",
    title: "Pink Champagne Box",
    slug: { _type: "slug", current: "pink-champagne-box" },
    price: 220,
    shortDescription: "Blush spray roses and peonies in a premium keepsake box",
    category: "flower-boxes",
    inStock: true,
    featured: true,
    tags: ["roses", "peonies", "box"],
    description: [
      {
        _type: "block",
        _key: "desc1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "span1",
            text: "Pure luxury in a box. Blush spray roses and full-bloom peonies are nestled together in our premium signature keepsake box — an arrangement as beautiful as the moment it marks.",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        _key: "desc2",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "span2",
            text: "The keepsake box can be repurposed long after the flowers have bloomed, making it a truly lasting gift.",
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
  },
];

async function seed() {
  console.log(
    `\n🌸 Seeding ${products.length} products to Sanity (project: dud2njyb)...\n`,
  );

  // Check for existing slugs to avoid duplicates
  const existing = await client.fetch(`*[_type == "product"].slug.current`);
  console.log(`Found ${existing.length} existing product(s) in dataset.`);

  let created = 0;
  let skipped = 0;

  for (const product of products) {
    const slug = product.slug.current;
    if (existing.includes(slug)) {
      console.log(`  ⏭  Skipping "${product.title}" (already exists)`);
      skipped++;
      continue;
    }

    try {
      const doc = await client.create(product);
      console.log(`  ✅ Created "${product.title}" (id: ${doc._id})`);
      created++;
    } catch (err) {
      console.error(`  ❌ Failed to create "${product.title}":`, err.message);
    }
  }

  console.log(`\n✨ Done! Created: ${created}, Skipped: ${skipped}\n`);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
