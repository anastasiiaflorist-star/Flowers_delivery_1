# Florist Website - Copilot Instructions

## Project Overview

A luxury florist multi-page website built with Next.js 14 (App Router) and Sanity CMS.

## Tech Stack

- **Framework**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **CMS**: Sanity v3
- **Styling**: Tailwind CSS with a soft pink/white/green luxury palette

## Pages

- `/` — Homepage (hero, bestsellers, why us, packaging, reviews)
- `/products` — Products listing page (all products from Sanity)
- `/products/[slug]` — Individual product detail page
- `/studio/[[...tool]]` — Sanity Studio (embedded)

## Sanity Schemas

- `product` — title, slug, price, description, images, category, inStock, featured

## Key Decisions

- No shopping cart, no authentication
- Content managed via embedded Sanity Studio at `/studio`
- Sample/seed data included for development
