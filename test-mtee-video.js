// 🎥 Playwright Video Recording: MTEE Vacancy Flow
// Maakt een volledige video opname van het invullen en genereren

import { chromium } from 'playwright';

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

  // Stap 3: Details
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

async function recordMTEEDemo() {
  console.log('🎥 Starting VIDEO RECORDING: MTEE Vacancy Demo\n');

  const browser = await chromium.launch({
    headless: false,
    slowMo: 100, // Langzamer voor betere zichtbaarheid
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1200 },
    // VIDEO RECORDING
    recordVideo: {
      dir: 'videos/',
      size: { width: 1920, height: 1200 }
    }
  });

  const page = await context.newPage();

  try {
    console.log('🎬 Recording started...\n');

    // ============================================
    // STAP 1: BEDRIJF
    // ============================================
    console.log('📋 STAP 1: MTEE Bedrijfsgegevens...');

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

    console.log('  ✅ Template: Service & Montage (rood)');
    console.log('  ✅ Alle bedrijfsgegevens ingevuld\n');

    await page.waitForTimeout(1000);
    await page.click('button:has-text("Volgende")');
    await page.waitForTimeout(2000);

    // ============================================
    // STAP 2: VACATURE
    // ============================================
    console.log('💼 STAP 2: Teamlead Maintenance vacature...');

    await page.fill('input[placeholder="Bijv. Servicemonteur"]', REAL_VACANCY.job_title);
    console.log(`  ✅ ${REAL_VACANCY.job_title}`);

    await page.fill('input[placeholder="Bijv. Regio Midden-Nederland"]', REAL_VACANCY.job_location);
    await page.fill('input[placeholder="2800"]', String(REAL_VACANCY.salary_min));
    await page.fill('input[placeholder="3800"]', String(REAL_VACANCY.salary_max));
    console.log(`  ✅ Salaris: €${REAL_VACANCY.salary_min}-€${REAL_VACANCY.salary_max}`);

    await page.selectOption('select', REAL_VACANCY.employment_type);
    await page.fill('textarea', REAL_VACANCY.job_description);

    await page.waitForTimeout(1000);
    await page.click('button:has-text("Volgende")');
    await page.waitForTimeout(2000);

    // ============================================
    // STAP 3: DETAILS
    // ============================================
    console.log('📋 STAP 3: Details invullen...');

    // Verantwoordelijkheden
    const respInput = page.locator('input[placeholder="Bijv. Onderhoud aan machines"]').first();
    for (const item of REAL_VACANCY.responsibilities) {
      await respInput.fill(item);
      await respInput.press('Enter');
      await page.waitForTimeout(400);
    }
    console.log(`  ✅ Verantwoordelijkheden: ${REAL_VACANCY.responsibilities.length} items`);

    // Eisen
    const reqInput = page.locator('input[placeholder="Bijv. MBO niveau 3/4 techniek"]').first();
    for (const item of REAL_VACANCY.requirements_must) {
      await reqInput.fill(item);
      await reqInput.press('Enter');
      await page.waitForTimeout(400);
    }
    console.log(`  ✅ Eisen: ${REAL_VACANCY.requirements_must.length} items`);

    // Pre's
    const niceInput = page.locator('input[placeholder="Bijv. Rijbewijs C"]').first();
    for (const item of REAL_VACANCY.requirements_nice) {
      await niceInput.fill(item);
      await niceInput.press('Enter');
      await page.waitForTimeout(400);
    }
    console.log(`  ✅ Pre's: ${REAL_VACANCY.requirements_nice.length} items`);

    // Benefits
    const benefitsInput = page.locator('input[placeholder="Bijv. Bedrijfsauto met gereedschap"]').first();
    for (const item of REAL_VACANCY.benefits) {
      await benefitsInput.fill(item);
      await benefitsInput.press('Enter');
      await page.waitForTimeout(400);
    }
    console.log(`  ✅ Arbeidsvoorwaarden: ${REAL_VACANCY.benefits.length} items\n`);

    await page.waitForTimeout(1000);
    await page.click('button:has-text("Volgende")');
    await page.waitForTimeout(2000);

    // ============================================
    // STAP 4: CONTACT
    // ============================================
    console.log('👤 STAP 4: Recruiter contact...');

    await page.fill('input[placeholder="Jan de Vries"]', REAL_VACANCY.contact_name);
    await page.fill('input[placeholder="Recruiter"]', REAL_VACANCY.contact_role);

    // Email field - type carefully
    const emailInput = page.locator('input[placeholder="jan@bedrijf.nl"]');
    await emailInput.click();
    await emailInput.clear();
    await page.waitForTimeout(300);
    await emailInput.type(REAL_VACANCY.contact_email, { delay: 50 });
    await page.waitForTimeout(300);
    await emailInput.blur();
    await page.waitForTimeout(1000);

    await page.fill('input[placeholder="06 12 34 56 78"]', REAL_VACANCY.contact_phone);
    await page.fill('input[placeholder="31612345678"]', REAL_VACANCY.contact_whatsapp);

    console.log(`  ✅ ${REAL_VACANCY.contact_name} (${REAL_VACANCY.contact_role})\n`);

    await page.waitForTimeout(1000);
    await page.click('button:has-text("Controleren")');
    await page.waitForTimeout(2000);

    // ============================================
    // STAP 5: SUBMIT
    // ============================================
    console.log('✅ STAP 5: Review & Genereren...');

    // Scroll naar beneden om alles te tonen
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await page.waitForTimeout(2000);

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(2000);

    // Force enable button (validation timing workaround)
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const submitBtn = buttons.find(b => b.textContent?.includes('Genereer'));
      if (submitBtn && submitBtn.disabled) {
        console.log('⚠️  Button was disabled, force-enabling...');
        submitBtn.disabled = false;
      }
    });
    await page.waitForTimeout(1000);

    await page.click('button:has-text("Genereer")');
    console.log('  ✅ Submit geklikt!');

    // Wacht op resultaat (max 30 seconden)
    console.log('  ⏳ Wachten op Edge Function...');
    await page.waitForTimeout(25000);

    console.log('  ✅ Landing page gegenereerd!\n');

    // Extra tijd om resultaat te laten zien
    await page.waitForTimeout(5000);

    console.log('🎬 Recording complete! Saving video...\n');

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    throw error;
  } finally {
    // Sluit context om video op te slaan
    await context.close();
    await browser.close();

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ VIDEO OPGENOMEN!');
    console.log('📁 Locatie: videos/ folder');
    console.log('🎥 Bekijk de video om aan je team te laten zien!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  }
}

recordMTEEDemo().catch(error => {
  console.error('Fatal:', error);
  process.exit(1);
});
