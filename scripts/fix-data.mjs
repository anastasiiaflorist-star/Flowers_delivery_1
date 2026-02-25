// scripts/fix-data.mjs
// Fixes: 1) delete stray drafts  2) fix flower-boxes → flowers-in-a-box category
// Run with: node scripts/fix-data.mjs

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "dud2njyb",
  dataset: "production",
  apiVersion: "2024-01-01",
  token:
    "skwhhz2TTcIOzcUMmTTVB79e5wwb7xZCw1mM6JdhZkePL8E2wD2AhmdOypNBeKHB4zvzHNm5YslQsfZDy7mDP8v7XGdg0OL4seQP8pXVWobA60TLxnQ5B2fhvTrzULjyZC33TzfliWh3FxvEn2k8EmbrBWJ06kuDwwaHggOOTSIbgoPcu5vU",
  useCdn: false,
});

async function run() {
  // 1. Delete all stray drafts
  console.log("\n🗑  Deleting draft documents...");
  const drafts = await client.fetch('*[_id match "drafts.*"]._id');
  if (drafts.length === 0) {
    console.log("  No drafts found.");
  }
  for (const id of drafts) {
    await client.delete(id);
    console.log(`  ✅ Deleted ${id}`);
  }

  // 2. Fix wrong category value: flower-boxes → flowers-in-a-box
  console.log('\n🔧 Fixing category "flower-boxes" → "flowers-in-a-box"...');
  const wrongCat = await client.fetch(
    '*[_type == "product" && category == "flower-boxes"]._id',
  );
  if (wrongCat.length === 0) {
    console.log("  No documents to fix.");
  }
  for (const id of wrongCat) {
    await client.patch(id).set({ category: "flowers-in-a-box" }).commit();
    console.log(`  ✅ Fixed ${id}`);
  }

  // 3. Also fix gifts-balloons → baskets (if any, since the site uses baskets)
  console.log("\n🔧 Checking for other wrong categories...");
  const all = await client.fetch(
    '*[_type == "product"] { _id, title, "slug": slug.current, category }',
  );
  all.forEach((d) => console.log(`  ${d.slug?.padEnd(45)} | ${d.category}`));

  console.log("\n✨ Done!\n");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
