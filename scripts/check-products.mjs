import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "dud2njyb",
  dataset: "production",
  apiVersion: "2024-01-01",
  token:
    "skwhhz2TTcIOzcUMmTTVB79e5wwb7xZCw1mM6JdhZkePL8E2wD2AhmdOypNBeKHB4zvzHNm5YslQsfZDy7mDP8v7XGdg0OL4seQP8pXVWobA60TLxnQ5B2fhvTrzULjyZC33TzfliWh3FxvEn2k8EmbrBWJ06kuDwwaHggOOTSIbgoPcu5vU",
  useCdn: false,
  perspective: "raw",
});

// All docs including drafts
const docs = await client.fetch(
  '*[_type == "product"] | order(_createdAt desc) { _id, title, "slug": slug.current, category, inStock, featured }',
);

const published = docs.filter((d) => !d._id.startsWith("drafts."));
const drafts = docs.filter((d) => d._id.startsWith("drafts."));

console.log(`\nPublished: ${published.length}`);
published.forEach((d) =>
  console.log(
    `  ✅ ${d._id.padEnd(50)} | ${(d.slug || "(no slug)").padEnd(45)} | ${d.category}`,
  ),
);

console.log(`\nDrafts (not visible on site): ${drafts.length}`);
if (drafts.length === 0) {
  console.log("  (none)");
} else {
  drafts.forEach((d) =>
    console.log(
      `  ⏳ ${d._id.padEnd(50)} | ${(d.slug || "(no slug)").padEnd(45)} | ${d.category}`,
    ),
  );
}
