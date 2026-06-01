import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import * as bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding Vendex database...");

  const hash = await bcrypt.hash("password", 10);
  
  const users = [
    { email: "buyer@vendex.com", passwordHash: hash, name: "Alexander Great", role: "BUYER" as const },
    { email: "vendor@vendex.com", passwordHash: hash, name: "Urban Goods Co.", role: "VENDOR" as const, vendorId: "v_nexus", status: "APPROVED" as const },
    { email: "admin@vendex.com", passwordHash: hash, name: "Platform Administrator", role: "ADMIN" as const },
  ];

  for (const u of users) {
    const existing = await prisma.user.findUnique({ where: { email: u.email } });
    if (!existing) { await prisma.user.create({ data: u }); console.log(`  Created: ${u.email}`); }
    else { console.log(`  Skipped: ${u.email}`); }
  }

  const cats = [
    { name: "Bespoke Tech", slug: "bespoke-tech" },
    { name: "Luxury Goods", slug: "luxury-goods" },
    { name: "Wellness & Ritual", slug: "wellness-ritual" },
    { name: "Home Studio", slug: "home-studio" },
  ];
  const catMap: Record<string, string> = {};
  for (const c of cats) {
    const ex = await prisma.category.findUnique({ where: { slug: c.slug } });
    if (!ex) { const r = await prisma.category.create({ data: c }); catMap[c.name] = r.id; console.log(`  Created: ${c.name}`); }
    else { catMap[c.name] = ex.id; console.log(`  Skipped: ${c.name}`); }
  }

  const prods = [
    { name: "Horizon Smartwatch Gen 4", vendorId: "v_nexus", vendorName: "Nexus Tech", categoryName: "Bespoke Tech", brand: "Nexus", price: 299, stock: 25, rating: 4.8, reviewsCount: 128 },
    { name: "Studio Pro ANC Wireless", vendorId: "v_nexus", vendorName: "Nexus Tech", categoryName: "Bespoke Tech", brand: "Nexus", price: 449, stock: 12, rating: 5.0, reviewsCount: 245 },
    { name: "Terraform Leather Boots", vendorId: "v_nexus", vendorName: "Vogue Minimal", categoryName: "Luxury Goods", brand: "Terraform", price: 185, stock: 18, rating: 4.6, reviewsCount: 82 },
    { name: "Velocity Run '24 Red", vendorId: "v_nexus", vendorName: "Aurum Collective", categoryName: "Wellness & Ritual", brand: "Velocity", price: 120, stock: 5, rating: 4.9, reviewsCount: 512 },
    { name: "Minimalist Desk Lamp", vendorId: "v_nexus", vendorName: "Elementa", categoryName: "Home Studio", brand: "Elementa", price: 89, stock: 42, rating: 4.5, reviewsCount: 67 },
    { name: "Mechanical Keycap Set", vendorId: "v_nexus", vendorName: "Elementa", categoryName: "Bespoke Tech", brand: "Elementa", price: 65, stock: 30, rating: 4.7, reviewsCount: 189 },
    { name: "Leather Weekend Bag", vendorId: "v_nexus", vendorName: "Vogue Minimal", categoryName: "Luxury Goods", brand: "Vogue", price: 340, stock: 8, rating: 4.9, reviewsCount: 56 },
    { name: "Professional Series Hybrid Controller Pro", vendorId: "v_nexus", vendorName: "Nexus Tech", categoryName: "Bespoke Tech", brand: "Nexus", price: 129.99, stock: 15, rating: 4.5, reviewsCount: 124 },
  ];
  for (const p of prods) {
    const ex = await prisma.product.findFirst({ where: { name: p.name } });
    if (!ex) {
      await prisma.product.create({ data: { ...p, categoryId: catMap[p.categoryName], images: [], description: "" } });
      console.log(`  Created: ${p.name}`);
    } else { console.log(`  Skipped: ${p.name}`); }
  }

  console.log("\nSeed complete!");
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
