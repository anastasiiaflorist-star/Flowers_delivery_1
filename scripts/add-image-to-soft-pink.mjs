// scripts/add-image-to-soft-pink.mjs
// Run with: node scripts/add-image-to-soft-pink.mjs

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
const FILENAME = "soft-pink-mixed-bouquet_3.jpg";

async function run() {
  const docId = await client.fetch(
    `*[_type == "product" && slug.current == $slug][0]._id`,
    { slug: SLUG },
  );
  if (!docId) {
    console.error(`Product "${SLUG}" not found.`);
    process.exit(1);
  }

  console.log(`\n📸 Uploading ${FILENAME}...`);
  const filePath = resolve(__dirname, "../src/app/images", FILENAME);
  const asset = await client.assets.upload(
    "image",
    createReadStream(filePath),
    { filename: FILENAME },
  );
  console.log(`  ✅ ${FILENAME} → ${asset._id}`);

  console.log(`\n🔧 Appending image to product ${docId}...`);
  await client
    .patch(docId)
    .append("images", [
      {
        _type: "image",
        _key: asset._id,
        asset: { _type: "reference", _ref: asset._id },
      },
    ])
    .commit();

  console.log(`\n✨ Done!\n`);
}

run().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});
