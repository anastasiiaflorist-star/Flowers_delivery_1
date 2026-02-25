// scripts/add-soft-pink-mixed-bouquet.mjs
// Run with: node scripts/add-soft-pink-mixed-bouquet.mjs

import { createClient } from "@sanity/client";
import { createReadStream } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const client = createClient({
  projectId: "dud2njyb",
  dataset: "production",
  apiVersion: "2024-01-01",
  token:
    "skwhhz2TTcIOzcUMmTTVB79e5wwb7xZCw1mM6JdhZkePL8E2wD2AhmdOypNBeKHB4zvzHNm5YslQsfZDy7mDP8v7XGdg0OL4seQP8pXVWobA60TLxnQ5B2fhvTrzULjyZC33TzfliWh3FxvEn2k8EmbrBWJ06kuDwwaHggOOTSIbgoPcu5vU",
  useCdn: false,
});

const SLUG = "soft-pink-mixed-bouquet";
const IMAGE_DIR = resolve(__dirname, "../src/app/images");
const IMAGE_FILES = [
  "soft-pink-mixed-bouquet-1.JPG",
  "soft-pink-mixed-bouquet-2.JPG",
  // soft-pink-mixed-bouquet_3.HEIC — skipped: Sanity does not support HEIC format.
  // Convert to JPG and upload manually via Sanity Studio.
];

async function run() {
  const existingId = await client.fetch(
    `*[_type == "product" && slug.current == $slug][0]._id`,
    { slug: SLUG },
  );
  const publishedId = existingId ? existingId.replace(/^drafts\./, "") : null;

  // Upload images
  console.log("\n📸 Uploading images...");
  const imageRefs = [];
  for (const filename of IMAGE_FILES) {
    const filePath = resolve(IMAGE_DIR, filename);
    console.log(`  Uploading ${filename}...`);
    const asset = await client.assets.upload(
      "image",
      createReadStream(filePath),
      {
        filename,
      },
    );
    imageRefs.push({
      _type: "image",
      _key: asset._id,
      asset: { _type: "reference", _ref: asset._id },
    });
    console.log(`  ✅ ${filename} → ${asset._id}`);
  }

  // Build product document
  console.log("\n🌸 Creating/updating product...");
  const product = {
    _type: "product",
    title: "Soft Pink Mixed Bouquet",
    slug: { _type: "slug", current: SLUG },
    price: 150,
    shortDescription:
      "A delicate soft pink mixed bouquet (35–40 cm) in gentle pastel tones",
    category: "bouquets",
    inStock: true,
    featured: true,
    tags: ["pastel", "pink", "mixed bouquet"],
    images: imageRefs,
    description: [
      {
        _type: "block",
        _key: "desc1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "span1",
            text: "A delicate soft pink mixed bouquet (35–40 cm in diameter), arranged in gentle pastel tones. A lovely complimentary gift — perfect for a friend or a sweet special gesture.",
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
            text: "Please note: Flowers are seasonal. Availability may vary — please contact us to confirm.",
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
  };

  let doc;
  if (publishedId) {
    await client.delete(`drafts.${publishedId}`).catch(() => {});
    doc = await client.createOrReplace({ ...product, _id: publishedId });
    console.log(`\n✨ Updated & published "${doc._id}"\n`);
  } else {
    doc = await client.create(product);
    console.log(`\n✨ Created "${doc._id}"\n`);
  }
}

run().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});
