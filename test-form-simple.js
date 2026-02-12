/**
 * Simple automated test for Landing Page Form
 * Uses simple selectors based on input order
 */

import { chromium } from 'playwright';

async function testLandingPageForm() {
  console.log('🚀 Starting landing page form test...\n');

  const browser = await chromium.launch({ headless: false, slowMo: 400 });
  const page = await browser.newPage();

  try {
    // Navigate to form
    console.log('📍 Navigating to form...');
    await page.goto('http://localhost:3000/admin/nieuw');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);

    // ====== STAP 1: BEDRIJF ======
    console.log('📝 Stap 1: Bedrijfsgegevens invullen...');

    // Fill inputs in order
    const inputs1 = await page.locator('input[type="text"]').all();
    await inputs1[0].fill('ASML');  // Bedrijfsnaam
    await inputs1[1].fill('https://www.asml.com');  // Website
    // Logo URL skip (optional)

    // Select sector (optional, skip if not working)
    try {
      const sectorSelect = await page.locator('select').first();
      // Try to select any valid option
      const options = await sectorSelect.locator('option').allTextContents();
      if (options.length > 1) {
        await sectorSelect.selectOption({ index: 1 });  // Select first real option
      }
    } catch (e) {
      console.log('  ⚠️  Sector selection skipped');
    }

    // Primary color
    await page.locator('input[type="color"]').fill('#0066CC');

    console.log('✅ Bedrijfsgegevens ingevuld');

    // Click Next
    await page.getByRole('button', { name: 'Volgende' }).click();
    await page.waitForTimeout(1500);

    // ====== STAP 2: VACATURE ======
    console.log('📝 Stap 2: Vacature invullen...');

    const allInputs2 = await page.locator('input').all();
    let textInputs2 = [];
    for (const input of allInputs2) {
      const type = await input.getAttribute('type');
      if (type === 'text' || type === 'number' || type === null) {
        textInputs2.push(input);
      }
    }

    if (textInputs2.length >= 4) {
      await textInputs2[0].fill('Service Engineer');  // Functietitel
      await textInputs2[1].fill('Veldhoven, Noord-Brabant');  // Locatie
      await textInputs2[2].fill('45000');  // Salaris min
      await textInputs2[3].fill('55000');  // Salaris max
    }

    // Fill description
    const textareas = await page.locator('textarea').all();
    if (textareas.length > 0) {
      await textareas[0].fill(
        'Als Service Engineer ben je verantwoordelijk voor het onderhoud en de installatie van geavanceerde lithografie systemen bij klanten wereldwijd.'
      );
    }

    console.log('✅ Vacature ingevuld');

    await page.getByRole('button', { name: 'Volgende' }).click();
    await page.waitForTimeout(1500);

    // ====== STAP 3: DETAILS ======
    console.log('📝 Stap 3: Details invullen...');

    // Wait for the page to load
    await page.waitForTimeout(1000);

    // Responsibilities - find inputs and add items
    const responsibilities = [
      'Preventief en correctief onderhoud uitvoeren',
      'Storingen diagnosticeren en oplossen',
      'Technische documentatie bijhouden'
    ];

    console.log('  Adding responsibilities...');
    for (const resp of responsibilities) {
      // Find visible input fields
      const inputs = await page.locator('input[type="text"]:visible').all();
      if (inputs.length > 0) {
        await inputs[0].fill(resp);
        await page.keyboard.press('Enter');
        await page.waitForTimeout(500);
      }
    }

    // Requirements (must-have)
    const requirements = [
      'HBO werk- en denkniveau',
      '3+ jaar ervaring in technisch onderhoud',
      'Goede communicatieve vaardigheden'
    ];

    console.log('  Adding requirements...');
    for (const req of requirements) {
      const inputs = await page.locator('input[type="text"]:visible').all();
      // Try to find the right input (might need to skip already filled ones)
      for (const input of inputs) {
        const value = await input.inputValue();
        if (value === '') {
          await input.fill(req);
          await page.keyboard.press('Enter');
          await page.waitForTimeout(500);
          break;
        }
      }
    }

    // Benefits
    const benefits = [
      'Competitief salaris €45.000-€55.000',
      '27 vakantiedagen + 13 ADV',
      'Lease auto van de zaak'
    ];

    console.log('  Adding benefits...');
    for (const benefit of benefits) {
      const inputs = await page.locator('input[type="text"]:visible').all();
      for (const input of inputs) {
        const value = await input.inputValue();
        if (value === '') {
          await input.fill(benefit);
          await page.keyboard.press('Enter');
          await page.waitForTimeout(500);
          break;
        }
      }
    }

    console.log('✅ Details ingevuld');

    await page.getByRole('button', { name: 'Volgende' }).click();
    await page.waitForTimeout(1500);

    // ====== STAP 4: CONTACT ======
    console.log('📝 Stap 4: Contactgegevens invullen...');

    const inputs4 = await page.locator('input[type="text"]').all();
    await inputs4[0].fill('Wouter Arts');  // Naam
    await inputs4[1].fill('Technical Recruiter');  // Functie

    await page.locator('input[type="email"]').fill('warts@recruitin.nl');
    await page.locator('input[type="tel"]').fill('0612345678');

    console.log('✅ Contact ingevuld');

    await page.getByRole('button', { name: /Controleren|Volgende/ }).click();
    await page.waitForTimeout(1500);

    // ====== STAP 5: REVIEW & SUBMIT ======
    console.log('📝 Stap 5: Controleren en aanmaken...');

    // Take screenshot before submit
    await page.screenshot({ path: '/tmp/landing-page-review.png', fullPage: true });
    console.log('📸 Screenshot opgeslagen: /tmp/landing-page-review.png');

    // Click submit button (green button at bottom)
    const submitButton = page.getByRole('button', { name: /Genereer landingspagina|Pagina aanmaken|Aanmaken/i });
    await submitButton.click();

    console.log('⏳ Wachten op resultaat...');

    // Wait for success screen
    await page.waitForSelector('text=Pagina aangemaakt', { timeout: 30000 });

    console.log('🎉 SUCCESS! Pagina is aangemaakt!');

    // Get the URL
    const urlElement = await page.locator('p.font-mono').first();
    const pageUrl = await urlElement.textContent();
    console.log('🔗 URL:', pageUrl);

    // Take screenshot of success
    await page.screenshot({ path: '/tmp/landing-page-success.png' });
    console.log('📸 Success screenshot: /tmp/landing-page-success.png');

    // Click preview
    await page.getByRole('link', { name: /Bekijk preview/i }).click();
    await page.waitForTimeout(3000);

    // Take screenshot of landing page
    await page.screenshot({ path: '/tmp/landing-page-result.png', fullPage: true });
    console.log('📸 Landing page screenshot: /tmp/landing-page-result.png');

    console.log('\n✅ TEST GESLAAGD!');
    console.log('📊 Resultaten:');
    console.log('   - Form succesvol ingevuld');
    console.log('   - Landing page aangemaakt');
    console.log('   - URL:', pageUrl);
    console.log('   - Screenshots opgeslagen in /tmp/');

    await page.waitForTimeout(3000);

  } catch (error) {
    console.error('\n❌ TEST GEFAALD:', error.message);
    await page.screenshot({ path: '/tmp/landing-page-error.png', fullPage: true });
    console.log('📸 Error screenshot: /tmp/landing-page-error.png');
    console.error('\nFull error:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

// Run the test
testLandingPageForm()
  .then(() => {
    console.log('\n✨ Klaar!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Error:', error.message);
    process.exit(1);
  });
