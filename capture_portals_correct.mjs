import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const OUT_DIR = '/home/consigliere/.gemini/antigravity-cli/brain/4be2585c-fae0-4ccc-83a1-640399e7793e/desktop_audit';

async function runAudit() {
  const browser = await puppeteer.launch({
    executablePath: '/usr/sbin/chromium',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  // 1. BUYER PORTAL
  console.log('Logging in as Demo Buyer...');
  await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  });
  
  // Click Demo Buyer button
  const buyerBtn = (await page.$$('button')).find(async (b) => {
    const text = await page.evaluate(el => el.textContent, b);
    return text && text.includes('Demo Buyer');
  });
  const buttons1 = await page.$$('button');
  for (const b of buttons1) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text && text.includes('Demo Buyer')) {
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 2000));

  const buyerPages = [
    { name: '10_buyer_overview', url: 'http://localhost:3000/buyer/overview' },
    { name: '11_buyer_orders', url: 'http://localhost:3000/buyer/orders' },
    { name: '13_buyer_wishlist', url: 'http://localhost:3000/buyer/wishlist' },
    { name: '14_buyer_addresses', url: 'http://localhost:3000/buyer/addresses' },
    { name: '15_buyer_reviews', url: 'http://localhost:3000/buyer/reviews' },
    { name: '16_buyer_disputes', url: 'http://localhost:3000/buyer/disputes' },
    { name: '17_buyer_stores', url: 'http://localhost:3000/buyer/stores' },
    { name: '18_buyer_wallet', url: 'http://localhost:3000/buyer/wallet' },
    { name: '19_buyer_settings', url: 'http://localhost:3000/buyer/settings' },
  ];

  for (const p of buyerPages) {
    await page.evaluate((targetUrl) => { window.location.href = targetUrl; }, p.url);
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(OUT_DIR, `${p.name}.png`), fullPage: false });
    console.log(`Captured ${p.name}`);
  }

  // 2. VENDOR PORTAL
  console.log('Logging in as Demo Vendor...');
  await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  });
  const buttons2 = await page.$$('button');
  for (const b of buttons2) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text && text.includes('Demo Vendor')) {
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 2000));

  const vendorPages = [
    { name: '20_vendor_overview', url: 'http://localhost:3000/vendor/overview' },
    { name: '21_vendor_products', url: 'http://localhost:3000/vendor/products' },
    { name: '22_vendor_add_product', url: 'http://localhost:3000/vendor/products/new' },
    { name: '23_vendor_orders', url: 'http://localhost:3000/vendor/orders' },
    { name: '24_vendor_payouts', url: 'http://localhost:3000/vendor/payouts' },
    { name: '25_vendor_analytics', url: 'http://localhost:3000/vendor/analytics' },
    { name: '26_vendor_storefront', url: 'http://localhost:3000/vendor/storefront' },
    { name: '27_vendor_settings', url: 'http://localhost:3000/vendor/settings' },
  ];

  for (const p of vendorPages) {
    await page.evaluate((targetUrl) => { window.location.href = targetUrl; }, p.url);
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(OUT_DIR, `${p.name}.png`), fullPage: false });
    console.log(`Captured ${p.name}`);
  }

  // 3. ADMIN PORTAL
  console.log('Logging in as Demo Admin...');
  await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  });
  const buttons3 = await page.$$('button');
  for (const b of buttons3) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text && text.includes('Demo Admin')) {
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 2000));

  const adminPages = [
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

  for (const p of adminPages) {
    await page.evaluate((targetUrl) => { window.location.href = targetUrl; }, p.url);
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(OUT_DIR, `${p.name}.png`), fullPage: false });
    console.log(`Captured ${p.name}`);
  }

  await browser.close();
  console.log('Capture finished perfectly!');
}

runAudit();
