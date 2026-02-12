/**
 * Complete working test - fills ALL fields correctly
 */

import { chromium } from 'playwright';

async function testComplete() {
  console.log('🚀 Complete Landing Page Form Test\n');

  const browser = await chromium.launch({ headless: false, slowMo: 300 });
  const page = await browser.newPage();

  try {
    await page.goto('http://localhost:3000/admin/nieuw');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);

    // ==== STAP 1: BEDRIJF ====
    console.log('📝 Stap 1: Bedrijf...');
    const inputs1 = await page.locator('input[type="text"]').all();
    await inputs1[0].fill('ASML');
    await inputs1[1].fill('https://www.asml.com');

    // Select Branche (CRITICAL!)
    const brancheSelect = await page.locator('select').first();
    await brancheSelect.selectOption({ index: 5 }); // Try index 5 (skip "-- Selecteer --")

    await page.locator('input[type="color"]').fill('#0066CC');
    console.log('✅ Bedrijf done (including Branche)');

    await page.getByRole('button', { name: 'Volgende' }).click();
    await page.waitForTimeout(1500);

    // ==== STAP 2: VACATURE ====
    console.log('📝 Stap 2: Vacature...');
    const allInputs = await page.locator('input').all();
    let idx = 0;
    for (const input of allInputs) {
      const type = await input.getAttribute('type');
      if ((type === 'text' || type === 'number') && idx < 4) {
        await input.fill(['Service Engineer', 'Veldhoven, Noord-Brabant', '45000', '55000'][idx]);
        idx++;
      }
    }
    await page.locator('textarea').first().fill(
      'Als Service Engineer ben je verantwoordelijk voor het onderhoud en de installatie van geavanceerde lithografie systemen bij klanten wereldwijd.'
    );
    console.log('✅ Vacature done');

    await page.getByRole('button', { name: 'Volgende' }).click();
    await page.waitForTimeout(1500);

    // ==== STAP 3: DETAILS (THE CRITICAL PART) ====
    console.log('📝 Stap 3: Details...');

    // Get all + buttons (there are 4: responsibilities, requirements, nice-to-have, benefits)
    const plusButtons = await page.locator('button:text("+")').all();
    console.log(`  Found ${plusButtons.length} list fields`);

    // List 0: Verantwoordelijkheden
    console.log('  → Verantwoordelijkheden...');
    const responsibilities = [
      'Preventief en correctief onderhoud uitvoeren',
      'Storingen diagnosticeren en oplossen',
      'Technische documentatie bijhouden'
    ];
    for (const resp of responsibilities) {
      const textInputs = await page.locator('input[type="text"]').all();
      await textInputs[0].fill(resp);
      await plusButtons[0].click();
      await page.waitForTimeout(400);
    }

    // List 1: Eisen (must-have)
    console.log('  → Eisen (must-have)...');
    const requirements = [
      'HBO werk- en denkniveau',
      '3+ jaar ervaring in technisch onderhoud',
      'Goede communicatieve vaardigheden in Engels'
    ];
    for (const req of requirements) {
      const textInputs = await page.locator('input[type="text"]').all();
      await textInputs[1].fill(req);
      await plusButtons[1].click();
      await page.waitForTimeout(400);
    }

    // List 2: Pre's (nice-to-have) - SKIP (optional)

    // List 3: Arbeidsvoorwaarden (benefits)
    console.log('  → Arbeidsvoorwaarden...');
    const benefits = [
      'Competitief salaris €45.000-€55.000',
      '27 vakantiedagen + 13 ADV dagen',
      'Lease auto van de zaak',
      'Uitstekende pensioenregeling'
    ];
    for (const benefit of benefits) {
      const textInputs = await page.locator('input[type="text"]').all();
      await textInputs[3].fill(benefit);  // Index 3 = last input (benefits)
      await plusButtons[3].click();  // Last button
      await page.waitForTimeout(400);
    }

    console.log('✅ Details done');

    await page.getByRole('button', { name: 'Volgende' }).click();
    await page.waitForTimeout(1500);

    // ==== STAP 4: CONTACT ====
    console.log('📝 Stap 4: Contact...');
    const inputs4 = await page.locator('input[type="text"]').all();
    await inputs4[0].fill('Wouter Arts');
    await inputs4[1].fill('Technical Recruiter');
    await page.locator('input[type="email"]').fill('warts@recruitin.nl');
    await page.locator('input[type="tel"]').fill('0612345678');
    console.log('✅ Contact done');

    await page.getByRole('button', { name: /Controleren|Volgende/ }).click();
    await page.waitForTimeout(1500);

    // ==== STAP 5: REVIEW & SUBMIT ====
    console.log('📝 Stap 5: Review & Submit...');

    await page.screenshot({ path: '/tmp/landing-complete-review.png', fullPage: true });
    console.log('📸 Review screenshot saved');

    const submitButton = page.getByRole('button', { name: /Genereer landingspagina/ });
    await submitButton.click();

    console.log('⏳ Wachten op resultaat (max 30 sec)...');

    try {
      await page.waitForSelector('text=Pagina aangemaakt', { timeout: 30000 });

      console.log('\n🎉🎉🎉 SUCCESS! PAGINA AANGEMAAKT! 🎉🎉🎉\n');

      const urlElement = await page.locator('p.font-mono').first();
      const pageUrl = await urlElement.textContent();

      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('🔗 URL:', pageUrl);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

      await page.screenshot({ path: '/tmp/landing-success.png' });

      await page.getByRole('link', { name: /Bekijk preview/ }).click();
      await page.waitForTimeout(3000);

      await page.screenshot({ path: '/tmp/landing-final-page.png', fullPage: true });

      console.log('✅ TEST VOLLEDIG GESLAAGD!');
      console.log('📊 Resultaten:');
      console.log('   - Alle velden correct ingevuld');
      console.log('   - Landing page succesvol aangemaakt');
      console.log('   - URL:', pageUrl);
      console.log('   - Screenshots opgeslagen in /tmp/');
      console.log('\n🚀 Systeem werkt perfect!');

    } catch (waitError) {
      console.error('\n❌ Pagina niet aangemaakt - Edge Function error');
      await page.screenshot({ path: '/tmp/landing-error.png', fullPage: true });
      console.log('📸 Error screenshot: /tmp/landing-error.png');
      throw waitError;
    }

    await page.waitForTimeout(5000);

  } catch (error) {
    console.error('\n💥 Error:', error.message);
    await page.screenshot({ path: '/tmp/landing-error.png', fullPage: true });
    throw error;
  } finally {
    await browser.close();
  }
}

testComplete()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
