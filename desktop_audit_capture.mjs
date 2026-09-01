import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const OUT_DIR = '/home/consigliere/.gemini/antigravity-cli/brain/4be2585c-fae0-4ccc-83a1-640399e7793e/desktop_audit';
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function runAudit() {
  const browser = await puppeteer.launch({
    executablePath: '/usr/sbin/chromium',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  // 1. PUBLIC ROUTES
  console.log('Capturing Public Routes...');
  const publicRoutes = [
    { name: '01_home', url: 'http://localhost:3000/' },
    { name: '02_search', url: 'http://localhost:3000/search' },
    { name: '03_product_detail', url: 'http://localhost:3000/product/prod-1' },
    { name: '04_cart', url: 'http://localhost:3000/cart' },
    { name: '05_checkout', url: 'http://localhost:3000/checkout' },
    { name: '06_storefront', url: 'http://localhost:3000/store/v-1' },
    { name: '07_login', url: 'http://localhost:3000/login' },
  ];

  for (const r of publicRoutes) {
    await page.goto(r.url, { waitUntil: 'networkidle0' });
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    });
    await new Promise(res => setTimeout(res, 1200));
    await page.screenshot({ path: path.join(OUT_DIR, `${r.name}.png`), fullPage: false });
    console.log(`Captured ${r.name}`);
  }

  // Helper to login
  async function loginAs(demoButtonText) {
    await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle0' });
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    });
    await new Promise(res => setTimeout(res, 400));
    const buttons = await page.$$('button');
    for (const b of buttons) {
      const text = await page.evaluate(el => el.textContent, b);
      if (text && text.includes(demoButtonText)) {
        await b.click();
        break;
      }
    }
    await new Promise(res => setTimeout(res, 300));
    const submitButtons = await page.$$('button');
    for (const b of submitButtons) {
      const text = await page.evaluate(el => el.textContent, b);
      if (text && text.includes('Sign In to Portal')) {
        await b.click();
        break;
      }
    }
    await new Promise(res => setTimeout(res, 1500));
  }

  // 2. BUYER ROUTES
  console.log('Capturing Buyer Routes...');
  await loginAs('Demo Buyer');
  const buyerRoutes = [
    { name: '10_buyer_overview', url: 'http://localhost:3000/buyer/overview' },
    { name: '11_buyer_orders', url: 'http://localhost:3000/buyer/orders' },
    { name: '12_buyer_order_detail', url: 'http://localhost:3000/buyer/orders/ord-1' },
    { name: '13_buyer_wishlist', url: 'http://localhost:3000/buyer/wishlist' },
    { name: '14_buyer_addresses', url: 'http://localhost:3000/buyer/addresses' },
    { name: '15_buyer_reviews', url: 'http://localhost:3000/buyer/reviews' },
    { name: '16_buyer_disputes', url: 'http://localhost:3000/buyer/disputes' },
    { name: '17_buyer_stores', url: 'http://localhost:3000/buyer/stores' },
    { name: '18_buyer_wallet', url: 'http://localhost:3000/buyer/wallet' },
    { name: '19_buyer_settings', url: 'http://localhost:3000/buyer/settings' },
  ];

  for (const r of buyerRoutes) {
    await page.goto(r.url, { waitUntil: 'networkidle0' });
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    });
    await new Promise(res => setTimeout(res, 600));
    await page.screenshot({ path: path.join(OUT_DIR, `${r.name}.png`), fullPage: false });
    console.log(`Captured ${r.name}`);
  }

  // 3. VENDOR ROUTES
  console.log('Capturing Vendor Routes...');
  await loginAs('Demo Vendor');
  const vendorRoutes = [
    { name: '20_vendor_overview', url: 'http://localhost:3000/vendor/overview' },
    { name: '21_vendor_products', url: 'http://localhost:3000/vendor/products' },
    { name: '22_vendor_add_product', url: 'http://localhost:3000/vendor/products/new' },
    { name: '23_vendor_orders', url: 'http://localhost:3000/vendor/orders' },
    { name: '24_vendor_payouts', url: 'http://localhost:3000/vendor/payouts' },
    { name: '25_vendor_analytics', url: 'http://localhost:3000/vendor/analytics' },
    { name: '26_vendor_storefront', url: 'http://localhost:3000/vendor/storefront' },
    { name: '27_vendor_settings', url: 'http://localhost:3000/vendor/settings' },
  ];

  for (const r of vendorRoutes) {
    await page.goto(r.url, { waitUntil: 'networkidle0' });
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    });
    await new Promise(res => setTimeout(res, 600));
    await page.screenshot({ path: path.join(OUT_DIR, `${r.name}.png`), fullPage: false });
    console.log(`Captured ${r.name}`);
  }

  // 4. ADMIN ROUTES
  console.log('Capturing Admin Routes...');
  await loginAs('Demo Admin');
  const adminRoutes = [
    { name: '30_admin_overview', url: 'http://localhost:3000/admin/overview' },
    { name: '31_admin_products', url: 'http://localhost:3000/admin/products' },
    { name: '32_admin_vendors', url: 'http://localhost:3000/admin/vendors' },
    { name: '33_admin_buyers', url: 'http://localhost:3000/admin/buyers' },
    { name: '34_admin_categories', url: 'http://localhost:3000/admin/categories' },
    { name: '35_admin_payouts', url: 'http://localhost:3000/admin/payouts' },
    { name: '36_admin_disputes', url: 'http://localhost:3000/admin/disputes' },
    { name: '37_admin_banners', url: 'http://localhost:3000/admin/banners' },
    { name: '38_admin_audit_logs', url: 'http://localhost:3000/admin/audit-logs' },
    { name: '39_admin_roles', url: 'http://localhost:3000/admin/roles' },
    { name: '40_admin_settings', url: 'http://localhost:3000/admin/settings' },
  ];

  for (const r of adminRoutes) {
    await page.goto(r.url, { waitUntil: 'networkidle0' });
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    });
    await new Promise(res => setTimeout(res, 600));
    await page.screenshot({ path: path.join(OUT_DIR, `${r.name}.png`), fullPage: false });
    console.log(`Captured ${r.name}`);
  }

  await browser.close();
  console.log('Desktop Audit Capture Finished Successfully!');
}

runAudit();
