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

  // 1. First capture actual Product Detail with valid CUID
  console.log('Capturing real Product Detail...');
  await page.goto('http://localhost:3000/product/cmrnk5sh2001r39sbjtbrfj6z', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  });
  await new Promise(res => setTimeout(res, 1500));
  await page.screenshot({ path: path.join(OUT_DIR, '03_product_detail_real.png'), fullPage: false });
  console.log('Captured 03_product_detail_real.png');

  // Helper to accurately log in and navigate
  async function performLogin(role) {
    await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle0' });
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    });
    await new Promise(r => setTimeout(r, 600));

    // Click demo button
    const demoButton = await page.$(`button::-p-text(Demo ${role})`);
    if (demoButton) {
      await demoButton.click();
    } else {
      const buttons = await page.$$('button');
      for (const b of buttons) {
        const text = await page.evaluate(el => el.textContent, b);
        if (text && text.includes(`Demo ${role}`)) {
          await b.click();
          break;
        }
      }
    }
    await new Promise(r => setTimeout(r, 400));

    // Click submit
    const submitButton = await page.$('button[type="submit"]');
    if (submitButton) {
      await submitButton.click();
    }
    await page.waitForNavigation({ waitUntil: 'networkidle0' }).catch(() => {});
    await new Promise(r => setTimeout(r, 1500));
  }

  // 2. BUYER PORTAL
  console.log('Logging in as Demo Buyer...');
  await performLogin('Buyer');

  const buyerPages = [
    { name: '10_buyer_overview', url: 'http://localhost:3000/buyer/overview' },
    { name: '11_buyer_orders', url: 'http://localhost:3000/buyer/orders' },
    { name: '13_buyer_wishlist', url: 'http://localhost:3000/buyer/wishlist' },
    { name: '14_buyer_addresses', url: 'http://localhost:3000/buyer/addresses' },
    { name: '18_buyer_wallet', url: 'http://localhost:3000/buyer/wallet' },
    { name: '19_buyer_settings', url: 'http://localhost:3000/buyer/settings' },
  ];

  for (const p of buyerPages) {
    await page.goto(p.url, { waitUntil: 'networkidle0' });
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(OUT_DIR, `${p.name}.png`), fullPage: false });
    console.log(`Captured ${p.name}`);
  }

  // 3. VENDOR PORTAL
  console.log('Logging in as Demo Vendor...');
  await performLogin('Vendor');

  const vendorPages = [
    { name: '20_vendor_overview', url: 'http://localhost:3000/vendor/overview' },
    { name: '21_vendor_products', url: 'http://localhost:3000/vendor/products' },
    { name: '22_vendor_add_product', url: 'http://localhost:3000/vendor/products/new' },
    { name: '24_vendor_payouts', url: 'http://localhost:3000/vendor/payouts' },
    { name: '25_vendor_analytics', url: 'http://localhost:3000/vendor/analytics' },
    { name: '26_vendor_storefront', url: 'http://localhost:3000/vendor/storefront' },
  ];

  for (const p of vendorPages) {
    await page.goto(p.url, { waitUntil: 'networkidle0' });
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(OUT_DIR, `${p.name}.png`), fullPage: false });
    console.log(`Captured ${p.name}`);
  }

  // 4. ADMIN PORTAL
  console.log('Logging in as Demo Admin...');
  await performLogin('Admin');

  const adminPages = [
    { name: '30_admin_overview', url: 'http://localhost:3000/admin/overview' },
    { name: '31_admin_products', url: 'http://localhost:3000/admin/products' },
    { name: '32_admin_vendors', url: 'http://localhost:3000/admin/vendors' },
    { name: '34_admin_categories', url: 'http://localhost:3000/admin/categories' },
    { name: '35_admin_payouts', url: 'http://localhost:3000/admin/payouts' },
    { name: '38_admin_audit_logs', url: 'http://localhost:3000/admin/audit-logs' },
    { name: '39_admin_roles', url: 'http://localhost:3000/admin/roles' },
    { name: '40_admin_settings', url: 'http://localhost:3000/admin/settings' },
  ];

  for (const p of adminPages) {
    await page.goto(p.url, { waitUntil: 'networkidle0' });
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(OUT_DIR, `${p.name}.png`), fullPage: false });
    console.log(`Captured ${p.name}`);
  }

  await browser.close();
  console.log('Done capturing authenticated portals!');
}

runAudit();
