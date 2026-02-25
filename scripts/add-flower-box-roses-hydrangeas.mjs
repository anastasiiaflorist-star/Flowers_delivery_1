// scripts/add-flower-box-roses-hydrangeas.mjs
// Run with: node scripts/add-flower-box-roses-hydrangeas.mjs

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

const SLUG = "flower-box-with-roses-and-hydrangeas";
const IMAGE_DIR = resolve(__dirname, "../src/app/images");
const IMAGE_FILES = [
  "flower-box-with-roses-and-hydrangeas_1.JPG",
  "flower-box-with-roses-and-hydrangeas_2.JPG",
  "flower-box-with-roses-and-hydrangeas_3.JPG",
  "flower-box-with-roses-and-hydrangeas_4.JPG",
  "flower-box-with-roses-and-hydrangeas_5.JPG",
  "flower-box-with-roses-and-hydrangeas_6.JPG",
  "flower-box-with-roses-and-hydrangeas_7.JPG",
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
      { filename },
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
    title: "Flower Box with Roses and Hydrangeas",
    slug: { _type: "slug", current: SLUG },
    price: 150,
    shortDescription:
      "A charming flower box with roses and hydrangeas — a lovely gift for any occasion",
    category: "flowers-in-a-box",
    inStock: true,
    featured: true,
    tags: ["roses", "hydrangeas", "flower box"],
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
            text: "A charming flower box with roses and hydrangeas. A lovely complimentary gift — perfect for a child or as a sweet gesture for any occasion.",
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
