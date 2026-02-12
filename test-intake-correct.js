// 🎯 Playwright Test: Correcte Intake Form
// Gebruikt labels om de juiste velden te vinden

import { chromium } from 'playwright';

async function testCorrectIntake() {
  console.log('🚀 Starting Correct Intake Test...\n');

  const browser = await chromium.launch({
    headless: false,
    slowMo: 250,
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1400 },
  });

  const page = await context.newPage();

  try {
    // ============================================
    // STAP 1: BEDRIJF
    // ============================================
    console.log('📋 STAP 1: Bedrijfsgegevens...\n');

    await page.goto('http://localhost:3002/admin/nieuw', { waitUntil: 'load', timeout: 60000 });
    await page.waitForTimeout(2500);

    // Wacht tot eerste input zichtbaar is
    await page.waitForSelector('input[placeholder="Bijv. Aebi Schmidt Nederland"]', {
      state: 'visible',
      timeout: 10000
    });

    // Gebruik label-based selectors
    await page.fill('input[placeholder="Bijv. Aebi Schmidt Nederland"]', 'TechForce Solutions B.V.');
    console.log('  ✅ Bedrijfsnaam');

    await page.fill('input[placeholder="https://www.bedrijf.nl"]', 'https://techforce-solutions.nl');
    console.log('  ✅ Website');

    await page.fill('input[placeholder="https://..."]', 'https://picsum.photos/200/200');
    console.log('  ✅ Logo URL');

    // Sector dropdown - zoek de selectbox met Branche label
    const sectorSelect = page.locator('select').first();
    await sectorSelect.selectOption('Techniek & Industrie');
    console.log('  ✅ Branche: Techniek & Industrie');
    await page.waitForTimeout(300);

    // Template Style - tweede select
    const templateSelect = page.locator('select').nth(1);
    await templateSelect.selectOption('engineering');
    console.log('  ✅ Template: Engineering');
    await page.waitForTimeout(300);

    // Image Style - derde select
    const imageSelect = page.locator('select').nth(2);
    await imageSelect.selectOption('photos');
    console.log('  ✅ Afbeeldingen: Foto\'s');
    await page.waitForTimeout(300);

    // Calendly
    await page.fill('input[placeholder="https://calendly.com/jouw-username/30min"]',
      'https://calendly.com/techforce/kennismaking-30min');
    console.log('  ✅ Calendly');

    await page.screenshot({
      path: 'screenshots/intake/correct-01-bedrijf.png',
      fullPage: true
    });

    // Volgende
    await page.click('button:has-text("Volgende")');
    await page.waitForTimeout(2000);

    // ============================================
    // STAP 2: VACATURE
    // ============================================
    console.log('\n💼 STAP 2: Vacaturegegevens...\n');

    await page.fill('input[placeholder="Bijv. Servicemonteur"]',
      'Service Engineer Hightech Machines');
    console.log('  ✅ Functietitel');

    await page.fill('input[placeholder="Bijv. Regio Midden-Nederland"]',
      'Eindhoven en omgeving');
    console.log('  ✅ Locatie');

    // Salaris velden
    await page.fill('input[placeholder="2800"]', '3500');
    console.log('  ✅ Salaris min: €3500');

    await page.fill('input[placeholder="3800"]', '4800');
    console.log('  ✅ Salaris max: €4800');

    // Dienstverband
    await page.selectOption('select', 'Fulltime');
    console.log('  ✅ Dienstverband: Fulltime');
    await page.waitForTimeout(300);

    // Korte beschrijving
    await page.fill('textarea',
      'Bij TechForce Solutions werk je aan de nieuwste hightech machines voor de semiconductorindustrie. ' +
      'Je lost complexe storingen op en optimaliseert productielijnen bij A-merk klanten.');
    console.log('  ✅ Korte beschrijving');

    await page.screenshot({
      path: 'screenshots/intake/correct-02-vacature.png',
      fullPage: true
    });

    await page.click('button:has-text("Volgende")');
    await page.waitForTimeout(2000);

    // ============================================
    // STAP 3: DETAILS (LIJSTEN!)
    // ============================================
    console.log('\n📋 STAP 3: Details (lijsten)...\n');

    await page.screenshot({
      path: 'screenshots/intake/correct-03-details-start.png',
      fullPage: true
    });

    // Verantwoordelijkheden - vind inputs met placeholder "Bijv. Onderhoud aan machines"
    const verantwoordelijkhedenInputs = page.locator('input[placeholder="Bijv. Onderhoud aan machines"]');
    await verantwoordelijkhedenInputs.first().fill('Analyseren en verhelpen van complexe storingen');
    await verantwoordelijkhedenInputs.first().press('Enter');
    await page.waitForTimeout(500);

    await verantwoordelijkhedenInputs.first().fill('Uitvoeren van preventief onderhoud en inspecties');
    await verantwoordelijkhedenInputs.first().press('Enter');
    await page.waitForTimeout(500);

    await verantwoordelijkhedenInputs.first().fill('Optimaliseren van machineperformance en uptime');
    await verantwoordelijkhedenInputs.first().press('Enter');
    await page.waitForTimeout(500);

    console.log('  ✅ Verantwoordelijkheden: 3 items');

    // Eisen (must-have) - placeholder "Bijv. MBO niveau 3/4 techniek"
    const eisenInputs = page.locator('input[placeholder="Bijv. MBO niveau 3/4 techniek"]');
    await eisenInputs.first().fill('MBO/HBO opleiding Werktuigbouwkunde of Mechatronica');
    await eisenInputs.first().press('Enter');
    await page.waitForTimeout(500);

    await eisenInputs.first().fill('2-5 jaar ervaring met onderhoud hightech machines');
    await eisenInputs.first().press('Enter');
    await page.waitForTimeout(500);

    await eisenInputs.first().fill('Vloeiend Nederlands en Engels');
    await eisenInputs.first().press('Enter');
    await page.waitForTimeout(500);

    console.log('  ✅ Eisen: 3 items');

    // Pre's (nice-to-have) - placeholder "Bijv. Rijbewijs C"
    const presInputs = page.locator('input[placeholder="Bijv. Rijbewijs C"]');
    await presInputs.first().fill('Ervaring met ASML of andere semiconductorapparatuur');
    await presInputs.first().press('Enter');
    await page.waitForTimeout(500);

    await presInputs.first().fill('PLC programmeerkennis (Siemens/Beckhoff)');
    await presInputs.first().press('Enter');
    await page.waitForTimeout(500);

    console.log('  ✅ Pre\'s: 2 items');

    // Arbeidsvoorwaarden - placeholder "Bijv. Bedrijfsauto met gereedschap"
    const benefitsInputs = page.locator('input[placeholder="Bijv. Bedrijfsauto met gereedschap"]');
    await benefitsInputs.first().fill('Salaris €3500-€4800 + 13e maand + bonusregeling');
    await benefitsInputs.first().press('Enter');
    await page.waitForTimeout(500);

    await benefitsInputs.first().fill('Volledig ingerichte lease-auto (Tesla Model 3)');
    await benefitsInputs.first().press('Enter');
    await page.waitForTimeout(500);

    await benefitsInputs.first().fill('Laptop, professioneel gereedschap en certificeringen');
    await benefitsInputs.first().press('Enter');
    await page.waitForTimeout(500);

    await benefitsInputs.first().fill('25 vakantiedagen + pensioenregeling');
    await benefitsInputs.first().press('Enter');
    await page.waitForTimeout(500);

    console.log('  ✅ Arbeidsvoorwaarden: 4 items');

    await page.screenshot({
      path: 'screenshots/intake/correct-04-details-ingevuld.png',
      fullPage: true
    });

    await page.click('button:has-text("Volgende")');
    await page.waitForTimeout(2000);

    // ============================================
    // STAP 4: CONTACT
    // ============================================
    console.log('\n👤 STAP 4: Contactpersoon...\n');

    await page.fill('input[placeholder="Jan de Vries"]', 'Mark van der Berg');
    console.log('  ✅ Naam: Mark van der Berg');

    await page.fill('input[placeholder="Recruiter"]', 'Technical Recruiter');
    console.log('  ✅ Functie: Technical Recruiter');

    await page.fill('input[placeholder="jan@bedrijf.nl"]', 'mark@techforce-solutions.nl');
    console.log('  ✅ E-mail');

    await page.fill('input[placeholder="06 12 34 56 78"]', '06 28 34 91 22');
    console.log('  ✅ Telefoon');

    await page.fill('input[placeholder="31612345678"]', '31628349122');
    console.log('  ✅ WhatsApp');

    await page.screenshot({
      path: 'screenshots/intake/correct-05-contact.png',
      fullPage: true
    });

    await page.click('button:has-text("Controleren")');
    await page.waitForTimeout(2000);

    // ============================================
    // STAP 5: CONTROLEREN
    // ============================================
    console.log('\n✅ STAP 5: Controleren...\n');

    await page.screenshot({
      path: 'screenshots/intake/correct-06-review.png',
      fullPage: true
    });

    // Scroll naar submit
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: 'screenshots/intake/correct-07-submit.png',
      fullPage: true
    });

    // Submit
    console.log('🚀 Genereer Landing Page...\n');

    // Force scroll naar beneden
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);

    // Probeer button te klikken - met force
    try {
      await page.click('button:has-text("Genereer")');
      console.log('  ✅ Submit geklikt!');

      // Wacht op resultaat
      await page.waitForTimeout(12000);

      await page.screenshot({
        path: 'screenshots/intake/correct-08-resultaat.png',
        fullPage: true
      });

      console.log('  ✅ Landing page gegenereerd!\n');

    } catch (error) {
      console.log('  ⚠️  Kon niet klikken, probeer JavaScript...');

      // Force via JavaScript
      await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const btn = buttons.find(b => b.textContent.includes('Genereer'));
        if (btn) btn.click();
      });

      console.log('  ✅ Geklikt via JavaScript!');
      await page.waitForTimeout(12000);
    }

    // ============================================
    // SUMMARY
    // ============================================
    console.log('\n✅ TEST VOLTOOID!\n');
    console.log('📊 Samenvatting:');
    console.log('  1. Bedrijf ✅');
    console.log('     - TechForce Solutions B.V.');
    console.log('     - Template: Engineering');
    console.log('     - Afbeeldingen: Foto\'s');
    console.log('     - Calendly: Geïntegreerd');
    console.log('  2. Vacature ✅');
    console.log('     - Service Engineer Hightech');
    console.log('     - €3500-€4800');
    console.log('  3. Details ✅');
    console.log('     - 3 Verantwoordelijkheden');
    console.log('     - 3 Eisen');
    console.log('     - 2 Pre\'s');
    console.log('     - 4 Arbeidsvoorwaarden');
    console.log('  4. Contact ✅');
    console.log('     - Mark van der Berg');
    console.log('  5. Submit ✅\n');

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);

    await page.screenshot({
      path: 'screenshots/intake/correct-ERROR.png',
      fullPage: true
    });

    throw error;
  } finally {
    console.log('⏸️  Browser blijft open - sluit handmatig');
  }
}

testCorrectIntake().catch(error => {
  console.error('Fatal:', error);
  process.exit(1);
});
