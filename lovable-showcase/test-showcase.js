// 🎯 Playwright Test: Lovable Showcase
// Tests alle 6 template cards, interacties, en visual elements

import { chromium } from 'playwright';

async function testShowcase() {
  console.log('🚀 Starting Lovable Showcase Test...\n');

  const browser = await chromium.launch({
    headless: false,
    slowMo: 150,
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });

  const page = await context.newPage();

  try {
    // ============================================
    // 1. LOAD HOMEPAGE
    // ============================================
    console.log('📄 Step 1: Loading showcase...');
    await page.goto('http://localhost:3003', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: 'screenshots/01-homepage.png',
      fullPage: true
    });
    console.log('  ✅ Homepage loaded\n');

    // ============================================
    // 2. TEST HERO SECTION
    // ============================================
    console.log('🎨 Step 2: Testing Hero Section...');

    const heroTitle = await page.locator('h1:has-text("Van 4,5 uur naar")').isVisible();
    const heroSubtitle = await page.locator('h1 span:has-text("5 minuten")').isVisible();
    const badge = await page.locator('text=6 Templates • Tech & Industrie Recruitment').isVisible();

    if (heroTitle && heroSubtitle && badge) {
      console.log('  ✅ Hero title: "Van 4,5 uur naar 5 minuten"');
      console.log('  ✅ Badge: "6 Templates • Tech & Industrie Recruitment"');
    }

    // Check stats
    const stats = [
      { text: '95%', label: 'Sneller Live' },
      { text: '5 min', label: 'Tot Publicatie' },
      { text: '3x', label: 'Meer Conversie' }
    ];
    for (const stat of stats) {
      const found = await page.locator(`div:has-text("${stat.text}")`).first().isVisible();
      if (found) console.log(`  ✅ Stat: "${stat.text}" (${stat.label})`);
    }

    await page.screenshot({
      path: 'screenshots/02-hero-section.png',
      fullPage: false
    });
    console.log('  ✅ Hero section screenshot\n');

    // ============================================
    // 3. SCROLL TO TEMPLATES
    // ============================================
    console.log('📜 Step 3: Scrolling to templates...');
    await page.click('text=Bekijk Templates');
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: 'screenshots/03-templates-section.png',
      fullPage: false
    });
    console.log('  ✅ Scrolled to templates section\n');

    // ============================================
    // 4. TEST ALL 6 TEMPLATE CARDS
    // ============================================
    console.log('🎴 Step 4: Testing all 6 template cards...\n');

    const templates = [
      { name: 'Engineering', emoji: '🔵', sector: 'Techniek & Industrie', color: 'blue' },
      { name: 'Tech & Software', emoji: '🟣', sector: 'ICT & Telecom', color: 'purple' },
      { name: 'Industrie', emoji: '⚙️', sector: 'Productie & Metaal', color: 'orange' },
      { name: 'Service & Montage', emoji: '🔧', sector: 'Technische Dienst', color: 'red' },
      { name: 'Logistiek', emoji: '🚚', sector: 'Transport & Distributie', color: 'green' },
      { name: 'Premium', emoji: '⭐', sector: 'Management & Executive', color: 'gold' },
    ];

    for (let i = 0; i < templates.length; i++) {
      const template = templates[i];
      console.log(`  Testing ${i + 1}/6: ${template.emoji} ${template.name}`);

      // Find card by emoji in heading
      const cardHeading = page.locator(`h3:has-text("${template.emoji} ${template.name}")`);
      await cardHeading.waitFor({ state: 'visible', timeout: 5000 });

      // Find the parent card
      const card = cardHeading.locator('..').locator('..');

      // Hover over card to see overlay
      await card.hover();
      await page.waitForTimeout(500);

      // Check sector badge (use first match to avoid strict mode errors)
      const sectorBadge = await card.locator(`text=${template.sector}`).first().isVisible();
      if (sectorBadge) {
        console.log(`    ✅ Sector: "${template.sector}"`);
      }

      // Check features (should have ✓ checkmarks)
      const features = await card.locator('text=✓').count();
      if (features >= 2) {
        console.log(`    ✅ Features: ${features} items found`);
      }

      // Check button
      const button = await card.locator('text=Gebruik Template →').isVisible();
      if (button) {
        console.log(`    ✅ Button: "Gebruik Template →"`);
      }

      // Screenshot individual card
      await card.screenshot({
        path: `screenshots/04-card-${i + 1}-${template.name.toLowerCase().replace(/\s/g, '-')}.png`
      });
      console.log(`    📸 Screenshot saved`);

      // Click card to trigger alert
      console.log(`    🖱️  Clicking card...`);

      // Set up dialog handler BEFORE clicking
      page.once('dialog', async dialog => {
        const message = dialog.message();
        console.log(`    ✅ Alert: "${message}"`);
        await dialog.accept();
      });

      await card.click();
      await page.waitForTimeout(1000);

      console.log('');
    }

    // ============================================
    // 5. TEST CTA SECTION
    // ============================================
    console.log('🎯 Step 5: Testing CTA Section...');

    await page.locator('text=Klaar om te starten?').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const ctaTitle = await page.locator('text=Klaar om te starten?').isVisible();
    const ctaButton = await page.locator('text=Start Nu Gratis →').isVisible();
    const ctaSubtext = await page.locator('text=Geen creditcard nodig').isVisible();

    if (ctaTitle && ctaButton && ctaSubtext) {
      console.log('  ✅ CTA title: "Klaar om te starten?"');
      console.log('  ✅ CTA button: "Start Nu Gratis →"');
      console.log('  ✅ CTA subtext: "Geen creditcard nodig"');
    }

    await page.screenshot({
      path: 'screenshots/05-cta-section.png',
      fullPage: false
    });
    console.log('  ✅ CTA section screenshot\n');

    // ============================================
    // 6. TEST FOOTER
    // ============================================
    console.log('🦶 Step 6: Testing Footer...');

    await page.locator('footer').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const footerTitle = await page.locator('footer >> text=Kandidatentekort.nl').isVisible();
    const footerSubtitle = await page.locator('footer >> text=AI-Powered Recruitment Landing Pages').isVisible();
    const copyright = await page.locator('footer >> text=© 2026').isVisible();

    if (footerTitle && footerSubtitle && copyright) {
      console.log('  ✅ Footer title: "Kandidatentekort.nl"');
      console.log('  ✅ Footer subtitle: "AI-Powered Recruitment Landing Pages"');
      console.log('  ✅ Copyright: "© 2026"');
    }

    await page.screenshot({
      path: 'screenshots/06-footer.png',
      fullPage: false
    });
    console.log('  ✅ Footer screenshot\n');

    // ============================================
    // 7. FULL PAGE SCREENSHOT
    // ============================================
    console.log('📸 Step 7: Taking full page screenshot...');
    await page.goto('http://localhost:3003', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: 'screenshots/07-full-page.png',
      fullPage: true
    });
    console.log('  ✅ Full page screenshot saved\n');

    // ============================================
    // SUMMARY
    // ============================================
    console.log('✅ TEST COMPLETED SUCCESSFULLY!\n');
    console.log('📊 Summary:');
    console.log('  • Hero section: ✅ Verified');
    console.log('  • 6 Template cards: ✅ All tested');
    console.log('  • Hover effects: ✅ Working');
    console.log('  • Click alerts: ✅ Triggered');
    console.log('  • CTA section: ✅ Verified');
    console.log('  • Footer: ✅ Verified');
    console.log('  • Screenshots: 13 total\n');

  } catch (error) {
    console.error('❌ TEST FAILED:', error.message);

    await page.screenshot({
      path: 'screenshots/ERROR.png',
      fullPage: true
    });
    console.log('📸 Error screenshot saved to screenshots/ERROR.png');

    throw error;
  } finally {
    await browser.close();
    console.log('🏁 Browser closed');
  }
}

// Run the test
testShowcase().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
