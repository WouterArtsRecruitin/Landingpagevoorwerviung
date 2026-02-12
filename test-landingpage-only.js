// 🎥 MTEE Landing Page Demo - Alleen de werkende pagina tonen
// Navigeert direct naar de landing page en scrollt er doorheen

import { chromium } from 'playwright';

async function recordLandingPageOnly() {
  console.log('🎥 MTEE Landing Page Demo - Showcase van werkende pagina\n');

  const browser = await chromium.launch({
    headless: false,
    slowMo: 150,
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1200 },
    recordVideo: {
      dir: 'videos/',
      size: { width: 1920, height: 1200 }
    }
  });

  const page = await context.newPage();

  try {
    console.log('🎬 Recording started...\n');

    // Direct naar de MTEE landing page
    console.log('🌐 Navigeren naar MTEE landing page...');
    await page.goto('http://localhost:3002/v/mitsubishi-turbocharger-and-engine-europe-bv-teamlead-mainte', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    console.log('✅ Landing page geladen!\n');

    // Wacht even zodat alles zichtbaar is
    await page.waitForTimeout(4000);

    console.log('📜 Hero Section - Teamlead Maintenance Corrective');
    await page.waitForTimeout(3000);

    // Scroll geleidelijk naar beneden door alle secties
    console.log('📜 Scrolling door secties...');

    // Section 1: Wat ga je doen?
    await page.evaluate(() => window.scrollBy(0, window.innerHeight * 0.7));
    await page.waitForTimeout(3000);
    console.log('  ✅ Sectie: Wat ga je doen?');

    // Section 2: Benefits
    await page.evaluate(() => window.scrollBy(0, window.innerHeight * 0.7));
    await page.waitForTimeout(3000);
    console.log('  ✅ Sectie: Wat bieden wij?');

    // Section 3: Salaris
    await page.evaluate(() => window.scrollBy(0, window.innerHeight * 0.7));
    await page.waitForTimeout(3000);
    console.log('  ✅ Sectie: Wat verdien je?');

    // Section 4: Requirements
    await page.evaluate(() => window.scrollBy(0, window.innerHeight * 0.7));
    await page.waitForTimeout(3000);
    console.log('  ✅ Sectie: Wat vragen wij?');

    // Section 5: FAQ
    await page.evaluate(() => window.scrollBy(0, window.innerHeight * 0.7));
    await page.waitForTimeout(3000);
    console.log('  ✅ Sectie: Veelgestelde vragen');

    // Section 6: Sollicitatie formulier
    await page.evaluate(() => window.scrollBy(0, window.innerHeight * 0.7));
    await page.waitForTimeout(3000);
    console.log('  ✅ Sectie: Sollicitatie formulier');

    // Section 7: Final CTA
    await page.evaluate(() => window.scrollBy(0, window.innerHeight * 0.7));
    await page.waitForTimeout(3000);
    console.log('  ✅ Sectie: Final CTA');

    // Scroll helemaal naar beneden (footer)
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(3000);
    console.log('  ✅ Footer bereikt');

    // Scroll terug naar boven voor finale hero shot
    console.log('\n🔝 Scrolling terug naar hero...');
    await page.evaluate(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    await page.waitForTimeout(4000);

    console.log('✅ Hero section - finale shot');
    await page.waitForTimeout(4000);

    console.log('\n🎬 Recording complete! Saving video...\n');

    // ============================================
    // SUMMARY
    // ============================================
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ LANDING PAGE DEMO OPGENOMEN!');
    console.log('');
    console.log('🎯 MTEE Teamlead Maintenance Corrective');
    console.log('');
    console.log('📊 Secties getoond:');
    console.log('  ✅ Hero met Teamlead functie');
    console.log('  ✅ Wat ga je doen?');
    console.log('  ✅ Wat bieden wij? (Benefits)');
    console.log('  ✅ Wat verdien je? (Salaris)');
    console.log('  ✅ Wat vragen wij? (Requirements)');
    console.log('  ✅ Veelgestelde vragen (FAQ)');
    console.log('  ✅ Sollicitatie formulier');
    console.log('  ✅ Final CTA');
    console.log('');
    console.log('📁 Video: videos/ folder');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    throw error;
  } finally {
    await context.close();
    await browser.close();
  }
}

recordLandingPageOnly().catch(error => {
  console.error('Fatal:', error);
  process.exit(1);
});
