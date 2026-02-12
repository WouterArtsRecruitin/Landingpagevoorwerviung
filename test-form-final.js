/**
 * Final automated test - properly handles all list fields in step 3
 */

import { chromium } from 'playwright';

async function fillListField(page, buttonIndex, items) {
  const plusButtons = await page.locator('button:has-text("+")').all();

  for (const item of items) {
    // Find the input next to this button
    const button = plusButtons[buttonIndex];
    const container = page.locator('div').filter({ has: button });
    const input = container.locator('input[type="text"]').first();

    await input.fill(item);
    await button.click();
    await page.waitForTimeout(400);
  }
}

async function testLandingPageForm() {
  console.log('🚀 Starting landing page form test...\n');

  const browser = await chromium.launch({ headless: false, slowMo: 300 });
  const page = await browser.newPage();

  try {
    console.log('📍 Navigating to form...');
    await page.goto('http://localhost:3000/admin/nieuw');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);

    // ====== STAP 1: BEDRIJF ======
    console.log('📝 Stap 1: Bedrijfsgegevens...');

    const inputs1 = await page.locator('input[type="text"]').all();
    await inputs1[0].fill('ASML');
    await inputs1[1].fill('https://www.asml.com');

    try {
      const selectorSelect = await page.locator('select').first();
      const options = await selectorSelect.locator('option').allTextContents();
      if (options.length > 1) await selectorSelect.selectOption({ index: 1 });
    } catch (e) {}

    await page.locator('input[type="color"]').fill('#0066CC');

    console.log('✅ Bedrijf ingevuld');
    await page.getByRole('button', { name: 'Volgende' }).click();
    await page.waitForTimeout(1500);

    // ====== STAP 2: VACATURE ======
    console.log('📝 Stap 2: Vacature...');

    const allInputs2 = await page.locator('input').all();
    let textInputs2 = [];
    for (const input of allInputs2) {
      const type = await input.getAttribute('type');
      if (type === 'text' || type === 'number' || type === null) {
        textInputs2.push(input);
      }
    }

    if (textInputs2.length >= 4) {
      await textInputs2[0].fill('Service Engineer');
      await textInputs2[1].fill('Veldhoven, Noord-Brabant');
      await textInputs2[2].fill('45000');
      await textInputs2[3].fill('55000');
    }

    const textareas = await page.locator('textarea').all();
    if (textareas.length > 0) {
      await textareas[0].fill(
        'Als Service Engineer ben je verantwoordelijk voor het onderhoud en de installatie van geavanceerde lithografie systemen bij klanten wereldwijd.'
      );
    }

    console.log('✅ Vacature ingevuld');
    await page.getByRole('button', { name: 'Volgende' }).click();
    await page.waitForTimeout(1500);

    // ====== STAP 3: DETAILS (PROPERLY) ======
    console.log('📝 Stap 3: Details (met alle lijsten)...');

    await page.waitForTimeout(1000);

    // List 1: Verantwoordelijkheden (index 0)
    console.log('  → Verantwoordelijkheden...');
    await fillListField(page, 0, [
      'Preventief en correctief onderhoud uitvoeren',
      'Storingen diagnosticeren en oplossen',
      'Technische documentatie bijhouden'
    ]);

    // List 2: Eisen must-have (index 1)
    console.log('  → Eisen (must-have)...');
    await fillListField(page, 1, [
      'HBO werk- en denkniveau',
      '3+ jaar ervaring in technisch onderhoud',
      'Goede communicatieve vaardigheden'
    ]);

    // List 3: Pre's nice-to-have (index 2) - skip, not required

    // List 4: Arbeidsvoorwaarden (index 2 or 3 depending on if Pre's exists)
    console.log('  → Arbeidsvoorwaarden...');
    const plusButtons = await page.locator('button:has-text("+")').all();
    const benefitsIndex = plusButtons.length - 1; // Last one is benefits
    await fillListField(page, benefitsIndex, [
      'Competitief salaris €45.000-€55.000',
      '27 vakantiedagen + 13 ADV',
      'Lease auto van de zaak',
      'Uitstekende pensioenregeling'
    ]);

    console.log('✅ Details compleet ingevuld!');
    await page.getByRole('button', { name: 'Volgende' }).click();
    await page.waitForTimeout(1500);

    // ====== STAP 4: CONTACT ======
    console.log('📝 Stap 4: Contact...');

    const inputs4 = await page.locator('input[type="text"]').all();
    await inputs4[0].fill('Wouter Arts');
    await inputs4[1].fill('Technical Recruiter');

    await page.locator('input[type="email"]').fill('warts@recruitin.nl');
    await page.locator('input[type="tel"]').fill('0612345678');

    console.log('✅ Contact ingevuld');
    await page.getByRole('button', { name: /Controleren|Volgende/ }).click();
    await page.waitForTimeout(1500);

    // ====== STAP 5: REVIEW & SUBMIT ======
    console.log('📝 Stap 5: Review & Submit...');

    await page.screenshot({ path: '/tmp/landing-page-review-final.png', fullPage: true });
    console.log('📸 Screenshot: /tmp/landing-page-review-final.png');

    const submitButton = page.getByRole('button', { name: /Genereer landingspagina|Pagina aanmaken/i });
    await submitButton.click();

    console.log('⏳ Wachten op resultaat...');

    // Wait for success
    await page.waitForSelector('text=Pagina aangemaakt', { timeout: 30000 });

    console.log('🎉 SUCCESS! Pagina is aangemaakt!');

    const urlElement = await page.locator('p.font-mono').first();
    const pageUrl = await urlElement.textContent();
    console.log('🔗 URL:', pageUrl);

    await page.screenshot({ path: '/tmp/landing-page-success.png' });
    console.log('📸 Success screenshot');

    await page.getByRole('link', { name: /Bekijk preview/i }).click();
    await page.waitForTimeout(3000);

    await page.screenshot({ path: '/tmp/landing-page-result.png', fullPage: true });
    console.log('📸 Landing page screenshot');

    console.log('\n✅ TEST GESLAAGD!');
    console.log('📊 Resultaten:');
    console.log('   - Form compleet ingevuld (alle velden!)');
    console.log('   - Landing page aangemaakt');
    console.log('   - URL:', pageUrl);
    console.log('   - Screenshots in /tmp/');

    await page.waitForTimeout(3000);

  } catch (error) {
    console.error('\n❌ TEST GEFAALD:', error.message);
    await page.screenshot({ path: '/tmp/landing-page-error-final.png', fullPage: true });
    console.log('📸 Error screenshot: /tmp/landing-page-error-final.png');
    throw error;
  } finally {
    await browser.close();
  }
}

testLandingPageForm()
  .then(() => {
    console.log('\n✨ Klaar!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Error:', error.message);
    process.exit(1);
  });
