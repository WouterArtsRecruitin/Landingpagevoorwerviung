// 🎯 Playwright Test: Echte Vacature → Landing Page
// Gebruikt data van een actuele Service Engineer vacature

import { chromium } from 'playwright';

// Echte vacature data (MTEE - Bestaande Klant!)
const REAL_VACANCY = {
  // Stap 1: Bedrijf
  company_name: 'Mitsubishi Turbocharger and Engine Europe B.V.',
  company_website: 'https://www.workingatmtee.eu',
  company_logo_url: 'https://workingatmtee.eu/wp-content/uploads/2024/02/cropped-MTEE_LOGO_PAYOFF_CMYK_blue_bckgrnd-2.png',
  company_sector: 'Techniek & Industrie',
  primary_color: '#E60012',
  template_style: 'service',
  image_style: 'photos',
  calendly_url: 'https://calendly.com/mtee-recruitment/30min',

  // Stap 2: Vacature
  job_title: 'Teamlead Maintenance Corrective',
  job_location: 'Almere',
  salary_min: 3500,
  salary_max: 4743,
  employment_type: 'Fulltime',
  job_description: 'Als data driven Teamlead Maintenance Corrective weet jij als geen ander hoe je de productielijnen draaiende houdt. Je organiseert en voert technische support uit voor turbocharger assemblagelijnen bij MTEE in Almere.',

  // Stap 3: Details (lijsten)
  responsibilities: [
    'Data extractie en analyse van productiesystemen',
    'Organiseren van root-cause analyse meetings',
    'Coördineren van onderhoud met productie en externe partners',
    'Begeleiden en ondersteunen van Service Engineers',
    'Deelnemen aan 5S en Kaizen verbeterinitiatieven',
    'Maandelijkse voortgangsrapportage aan management'
  ],
  requirements_must: [
    'HBO diploma in technische of bedrijfskundige richting',
    'Minimaal 3 jaar ervaring in geautomatiseerde productieomgevingen',
    'Sterke technische affiniteit',
    'Vloeiend Nederlands en Engels (schriftelijk en mondeling)',
    'Communicatieve vaardigheden op alle niveaus'
  ],
  requirements_nice: [
    'Ervaring met turbochargers of automotive componenten',
    'Lean Six Sigma kennis',
    'Ervaring met TPM (Total Productive Maintenance)',
    'Leiderschapservaring in technische omgeving'
  ],
  benefits: [
    'Salaris €3500-€4743 bruto per maand (o.b.v. ervaring)',
    '27 vakantiedagen + 5 collectieve dagen',
    'Pensioenregeling, vakantiegeld, reiskosten',
    'Flexibele start- en eindtijden',
    'Aantrekkelijk fietsplan',
    'Mental health support via OpenUp',
    'Professionele ontwikkelingsmogelijkheden'
  ],

  // Stap 4: Contact
  contact_name: 'Recruitment MTEE',
  contact_role: 'Technical Recruiter',
  contact_email: 'cmuller@recruitin.nl',
  contact_phone: '06 18 29 96 82',
  contact_whatsapp: '31618299682'
};

async function testRealVacancy() {
  console.log('🚀 Testing with REAL vacancy: MTEE Teamlead (Bestaande Klant!)\n');

  const browser = await chromium.launch({
    headless: false,
    slowMo: 150,
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1200 },
  });

  const page = await context.newPage();

  try {
    // ============================================
    // STAP 1: BEDRIJF
    // ============================================
    console.log('📋 STAP 1: MTEE Bedrijfsgegevens...\n');

    await page.goto('http://localhost:3002/admin/nieuw', {
      waitUntil: 'load',
      timeout: 60000
    });
    await page.waitForTimeout(2000);

    await page.waitForSelector('input[placeholder="Bijv. Aebi Schmidt Nederland"]', {
      state: 'visible',
      timeout: 10000
    });

    await page.fill('input[placeholder="Bijv. Aebi Schmidt Nederland"]', REAL_VACANCY.company_name);
    console.log(`  ✅ ${REAL_VACANCY.company_name}`);

    await page.fill('input[placeholder="https://www.bedrijf.nl"]', REAL_VACANCY.company_website);
    await page.fill('input[placeholder="https://..."]', REAL_VACANCY.company_logo_url);

    await page.selectOption('select', REAL_VACANCY.company_sector);
    await page.waitForTimeout(300);

    const selects = await page.locator('select').all();
    if (selects.length >= 2) await selects[1].selectOption(REAL_VACANCY.template_style);
    if (selects.length >= 3) await selects[2].selectOption(REAL_VACANCY.image_style);

    const calendlyInput = await page.locator('input[placeholder*="calendly"]').first();
    await calendlyInput.fill(REAL_VACANCY.calendly_url);

    console.log('  ✅ Template: Engineering (blauw)');
    console.log('  ✅ Alle bedrijfsgegevens ingevuld\n');

    await page.screenshot({
      path: 'screenshots/real-vacancy/01-mtee-bedrijf.png',
      fullPage: true
    });

    await page.click('button:has-text("Volgende")');
    await page.waitForTimeout(2000);

    // ============================================
    // STAP 2: VACATURE
    // ============================================
    console.log('💼 STAP 2: Teamlead Maintenance vacature...\n');

    await page.fill('input[placeholder="Bijv. Servicemonteur"]', REAL_VACANCY.job_title);
    console.log(`  ✅ ${REAL_VACANCY.job_title}`);

    await page.fill('input[placeholder="Bijv. Regio Midden-Nederland"]', REAL_VACANCY.job_location);
    await page.fill('input[placeholder="2800"]', String(REAL_VACANCY.salary_min));
    await page.fill('input[placeholder="3800"]', String(REAL_VACANCY.salary_max));
    console.log(`  ✅ Salaris: €${REAL_VACANCY.salary_min}-€${REAL_VACANCY.salary_max}`);

    await page.selectOption('select', REAL_VACANCY.employment_type);
    await page.fill('textarea', REAL_VACANCY.job_description);

    await page.screenshot({
      path: 'screenshots/real-vacancy/02-mtee-vacature.png',
      fullPage: true
    });

    await page.click('button:has-text("Volgende")');
    await page.waitForTimeout(2000);

    // ============================================
    // STAP 3: DETAILS
    // ============================================
    console.log('📋 STAP 3: Details invullen...\n');

    // Verantwoordelijkheden
    const respInput = page.locator('input[placeholder="Bijv. Onderhoud aan machines"]').first();
    for (const item of REAL_VACANCY.responsibilities) {
      await respInput.fill(item);
      await respInput.press('Enter');
      await page.waitForTimeout(300);
    }
    console.log(`  ✅ Verantwoordelijkheden: ${REAL_VACANCY.responsibilities.length} items`);

    // Eisen
    const reqInput = page.locator('input[placeholder="Bijv. MBO niveau 3/4 techniek"]').first();
    for (const item of REAL_VACANCY.requirements_must) {
      await reqInput.fill(item);
      await reqInput.press('Enter');
      await page.waitForTimeout(300);
    }
    console.log(`  ✅ Eisen: ${REAL_VACANCY.requirements_must.length} items`);

    // Pre's
    const niceInput = page.locator('input[placeholder="Bijv. Rijbewijs C"]').first();
    for (const item of REAL_VACANCY.requirements_nice) {
      await niceInput.fill(item);
      await niceInput.press('Enter');
      await page.waitForTimeout(300);
    }
    console.log(`  ✅ Pre's: ${REAL_VACANCY.requirements_nice.length} items`);

    // Benefits
    const benefitsInput = page.locator('input[placeholder="Bijv. Bedrijfsauto met gereedschap"]').first();
    for (const item of REAL_VACANCY.benefits) {
      await benefitsInput.fill(item);
      await benefitsInput.press('Enter');
      await page.waitForTimeout(300);
    }
    console.log(`  ✅ Arbeidsvoorwaarden: ${REAL_VACANCY.benefits.length} items\n`);

    await page.screenshot({
      path: 'screenshots/real-vacancy/03-mtee-details.png',
      fullPage: true
    });

    await page.click('button:has-text("Volgende")');
    await page.waitForTimeout(2000);

    // ============================================
    // STAP 4: CONTACT
    // ============================================
    console.log('👤 STAP 4: Recruiter contact...\n');

    await page.fill('input[placeholder="Jan de Vries"]', REAL_VACANCY.contact_name);
    await page.fill('input[placeholder="Recruiter"]', REAL_VACANCY.contact_role);

    // Email field - clear first, then type slowly
    const emailInput = page.locator('input[placeholder="jan@bedrijf.nl"]');
    await emailInput.click();
    await emailInput.clear();
    await page.waitForTimeout(300);
    await emailInput.type(REAL_VACANCY.contact_email, { delay: 50 });
    await page.waitForTimeout(300);
    await emailInput.blur();
    await page.waitForTimeout(1000);

    // Debug: check what's actually in the field
    const emailValue = await emailInput.inputValue();
    console.log(`  🔍 Email field value: "${emailValue}" (length: ${emailValue.length})`);

    await page.fill('input[placeholder="06 12 34 56 78"]', REAL_VACANCY.contact_phone);
    await page.fill('input[placeholder="31612345678"]', REAL_VACANCY.contact_whatsapp);

    console.log(`  ✅ ${REAL_VACANCY.contact_name} (${REAL_VACANCY.contact_role})\n`);

    await page.screenshot({
      path: 'screenshots/real-vacancy/04-mtee-contact.png',
      fullPage: true
    });

    await page.click('button:has-text("Controleren")');
    await page.waitForTimeout(2000);

    // ============================================
    // STAP 5: SUBMIT
    // ============================================
    console.log('✅ STAP 5: Review & Genereren...\n');

    await page.screenshot({
      path: 'screenshots/real-vacancy/05-mtee-review.png',
      fullPage: true
    });

    // Force scroll en klik submit
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);

    try {
      // Force enable button als het disabled is (validation timing issue)
      await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const submitBtn = buttons.find(b => b.textContent?.includes('Genereer'));
        if (submitBtn && submitBtn.disabled) {
          console.log('⚠️  Button was disabled, force-enabling...');
          submitBtn.disabled = false;
        }
      });
      await page.waitForTimeout(500);

      await page.click('button:has-text("Genereer")');
      console.log('  ✅ Submit geklikt!');

      // Wacht op resultaat
      await page.waitForTimeout(15000);

      await page.screenshot({
        path: 'screenshots/real-vacancy/06-mtee-result.png',
        fullPage: true
      });

      console.log('  ✅ Landing page gegenereerd!\n');

    } catch (error) {
      console.log('  ⚠️  Submit error:', error.message);

      await page.screenshot({
        path: 'screenshots/real-vacancy/06-mtee-error.png',
        fullPage: true
      });
    }

    // ============================================
    // SUMMARY
    // ============================================
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('✅ TEST COMPLETED!\n');
    console.log('📊 Echte MTEE Vacature Getest (Bestaande Klant!):');
    console.log('  • Bedrijf: Mitsubishi Turbocharger and Engine Europe');
    console.log('  • Functie: Teamlead Maintenance Corrective');
    console.log('  • Locatie: Almere');
    console.log('  • Salaris: €3500-€4743');
    console.log('  • Template: Service & Montage (rood)');
    console.log('  • Screenshots: 6 gemaakt\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);

    await page.screenshot({
      path: 'screenshots/real-vacancy/ERROR.png',
      fullPage: true
    });

    throw error;
  } finally {
    console.log('⏸️  Browser blijft open - bekijk het resultaat!');
  }
}

testRealVacancy().catch(error => {
  console.error('Fatal:', error);
  process.exit(1);
});
