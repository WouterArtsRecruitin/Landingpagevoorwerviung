/**
 * Automated test for Landing Page Form
 * Fills in the entire form and creates a landing page
 */

import { chromium } from 'playwright';

async function testLandingPageForm() {
  console.log('🚀 Starting landing page form test...\n');

  const browser = await chromium.launch({ headless: false, slowMo: 300 });
  const page = await browser.newPage();

  try {
    // Navigate to form
    console.log('📍 Navigating to form...');
    await page.goto('http://localhost:3000/admin/nieuw');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // ====== STAP 1: BEDRIJF ======
    console.log('📝 Stap 1: Bedrijfsgegevens invullen...');

    // Fill company name using placeholder
    await page.getByPlaceholder(/Aebi Schmidt|Bedrijfsnaam/i).fill('ASML');

    // Fill website
    await page.getByPlaceholder(/bedrijf\.nl/i).fill('https://www.asml.com');

    // Select sector
    try {
      const sectorSelect = page.locator('select').first();
      await sectorSelect.selectOption('Technologie / Engineering');
    } catch (e) {
      console.log('  ⚠️  Sector dropdown not found, skipping');
    }

    // Set primary color
    await page.locator('input[type="color"]').fill('#0066CC');
    await page.locator('input[type="text"][value*="#"]').last().fill('#0066CC');

    console.log('✅ Bedrijfsgegevens ingevuld');

    // Click Next
    await page.getByRole('button', { name: 'Volgende' }).click();
    await page.waitForTimeout(1000);

    // ====== STAP 2: VACATURE ======
    console.log('📝 Stap 2: Vacature invullen...');

    await page.getByLabel('Functietitel', { exact: false }).fill('Service Engineer');
    await page.getByLabel('Locatie', { exact: false }).fill('Veldhoven, Noord-Brabant');
    await page.getByLabel(/Salaris minimum/i).fill('45000');
    await page.getByLabel(/Salaris maximum/i).fill('55000');

    // Select employment type
    try {
      await page.getByLabel('Dienstverband', { exact: false }).selectOption('fulltime');
    } catch (e) {
      console.log('  ⚠️  Employment type dropdown not found, skipping');
    }

    // Fill description
    await page.getByLabel(/beschrijving/i).fill(
      'Als Service Engineer ben je verantwoordelijk voor het onderhoud en de installatie van geavanceerde lithografie systemen bij klanten wereldwijd.'
    );

    console.log('✅ Vacature ingevuld');

    await page.getByRole('button', { name: 'Volgende' }).click();
    await page.waitForTimeout(1000);

    // ====== STAP 3: DETAILS ======
    console.log('📝 Stap 3: Details invullen...');

    // Responsibilities
    const responsibilities = [
      'Preventief en correctief onderhoud uitvoeren',
      'Storingen diagnosticeren en oplossen',
      'Technische documentatie bijhouden',
      'Training geven aan klanten'
    ];

    for (let i = 0; i < responsibilities.length; i++) {
      const respInput = page.locator('input').filter({ hasText: '' }).nth(i);
      await respInput.fill(responsibilities[i]);
      await page.keyboard.press('Enter');
      await page.waitForTimeout(500);
    }

    console.log('✅ Details ingevuld (vereenvoudigd)');

    await page.getByRole('button', { name: 'Volgende' }).click();
    await page.waitForTimeout(1000);

    // ====== STAP 4: CONTACT ======
    console.log('📝 Stap 4: Contactgegevens invullen...');

    await page.getByLabel(/^Naam/i).fill('Wouter Arts');
    await page.getByLabel('Functie', { exact: false }).fill('Technical Recruiter');
    await page.locator('input[type="email"]').fill('warts@recruitin.nl');
    await page.locator('input[type="tel"]').fill('0612345678');

    console.log('✅ Contact ingevuld');

    await page.getByRole('button', { name: /Controleren|Volgende/ }).click();
    await page.waitForTimeout(1000);

    // ====== STAP 5: REVIEW & SUBMIT ======
    console.log('📝 Stap 5: Controleren en aanmaken...');

    // Take screenshot before submit
    await page.screenshot({ path: '/tmp/landing-page-review.png', fullPage: true });
    console.log('📸 Screenshot opgeslagen: /tmp/landing-page-review.png');

    // Click submit button
    await page.getByRole('button', { name: /Pagina aanmaken|Aanmaken/i }).click();

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
    console.error('Full error:', error);
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
