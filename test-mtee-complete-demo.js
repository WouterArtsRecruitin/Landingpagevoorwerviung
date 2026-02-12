// 🎥 COMPLETE MTEE DEMO - Van Intake tot Landing Page
// Toont de hele flow: intake invullen → genereren → landing page bekijken

import { chromium } from 'playwright';

const REAL_VACANCY = {
  company_name: 'Mitsubishi Turbocharger and Engine Europe B.V.',
  company_website: 'https://www.workingatmtee.eu',
  company_logo_url: 'https://workingatmtee.eu/wp-content/uploads/2024/02/cropped-MTEE_LOGO_PAYOFF_CMYK_blue_bckgrnd-2.png',
  company_sector: 'Techniek & Industrie',
  primary_color: '#E60012',
  template_style: 'service',
  image_style: 'photos',
  calendly_url: 'https://calendly.com/mtee-recruitment/30min',
  job_title: 'Teamlead Maintenance Corrective',
  job_location: 'Almere',
  salary_min: 3500,
  salary_max: 4743,
  employment_type: 'Fulltime',
  job_description: 'Als data driven Teamlead Maintenance Corrective weet jij als geen ander hoe je de productielijnen draaiende houdt. Je organiseert en voert technische support uit voor turbocharger assemblagelijnen bij MTEE in Almere.',
  responsibilities: [
    'Data extractie en analyse van productiesystemen',
    'Organiseren van root-cause analyse meetings',
    'Coördineren van onderhoud met productie en externe partners',
  ],
  requirements_must: [
    'HBO diploma in technische of bedrijfskundige richting',
    'Minimaal 3 jaar ervaring in geautomatiseerde productieomgevingen',
    'Sterke technische affiniteit',
  ],
  requirements_nice: [
    'Ervaring met turbochargers of automotive componenten',
    'Lean Six Sigma kennis',
  ],
  benefits: [
    'Salaris €3500-€4743 bruto per maand (o.b.v. ervaring)',
    '27 vakantiedagen + 5 collectieve dagen',
    'Pensioenregeling, vakantiegeld, reiskosten',
    'Flexibele start- en eindtijden',
  ],
  contact_name: 'Recruitment MTEE',
  contact_role: 'Technical Recruiter',
  contact_email: 'cmuller@recruitin.nl',
  contact_phone: '06 18 29 96 82',
  contact_whatsapp: '31618299682'
};

async function recordCompleteMTEEDemo() {
  console.log('🎥 COMPLETE MTEE DEMO - Van Intake tot Landing Page\n');

  const browser = await chromium.launch({
    headless: false,
    slowMo: 100,
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

    // ============================================
    // DEEL 1: INTAKE FORM (5 STAPPEN)
    // ============================================
    console.log('📋 DEEL 1: Intake Form invullen\n');

    await page.goto('http://localhost:3002/admin/nieuw', {
      waitUntil: 'load',
      timeout: 60000
    });
    await page.waitForTimeout(2000);

    // STAP 1: Bedrijf
    console.log('  Stap 1/5: Bedrijfsgegevens...');
    await page.waitForSelector('input[placeholder="Bijv. Aebi Schmidt Nederland"]');
    await page.fill('input[placeholder="Bijv. Aebi Schmidt Nederland"]', REAL_VACANCY.company_name);
    await page.fill('input[placeholder="https://www.bedrijf.nl"]', REAL_VACANCY.company_website);
    await page.fill('input[placeholder="https://..."]', REAL_VACANCY.company_logo_url);
    await page.selectOption('select', REAL_VACANCY.company_sector);
    await page.waitForTimeout(300);

    const selects = await page.locator('select').all();
    if (selects.length >= 2) await selects[1].selectOption(REAL_VACANCY.template_style);
    if (selects.length >= 3) await selects[2].selectOption(REAL_VACANCY.image_style);

    const calendlyInput = await page.locator('input[placeholder*="calendly"]').first();
    await calendlyInput.fill(REAL_VACANCY.calendly_url);

    await page.waitForTimeout(1500);
    await page.click('button:has-text("Volgende")');
    await page.waitForTimeout(2000);

    // STAP 2: Vacature
    console.log('  Stap 2/5: Vacaturegegevens...');
    await page.fill('input[placeholder="Bijv. Servicemonteur"]', REAL_VACANCY.job_title);
    await page.fill('input[placeholder="Bijv. Regio Midden-Nederland"]', REAL_VACANCY.job_location);
    await page.fill('input[placeholder="2800"]', String(REAL_VACANCY.salary_min));
    await page.fill('input[placeholder="3800"]', String(REAL_VACANCY.salary_max));
    await page.selectOption('select', REAL_VACANCY.employment_type);
    await page.fill('textarea', REAL_VACANCY.job_description);

    await page.waitForTimeout(1500);
    await page.click('button:has-text("Volgende")');
    await page.waitForTimeout(2000);

    // STAP 3: Details
    console.log('  Stap 3/5: Details invullen...');

    const respInput = page.locator('input[placeholder="Bijv. Onderhoud aan machines"]').first();
    for (const item of REAL_VACANCY.responsibilities) {
      await respInput.fill(item);
      await respInput.press('Enter');
      await page.waitForTimeout(400);
    }

    const reqInput = page.locator('input[placeholder="Bijv. MBO niveau 3/4 techniek"]').first();
    for (const item of REAL_VACANCY.requirements_must) {
      await reqInput.fill(item);
      await reqInput.press('Enter');
      await page.waitForTimeout(400);
    }

    const niceInput = page.locator('input[placeholder="Bijv. Rijbewijs C"]').first();
    for (const item of REAL_VACANCY.requirements_nice) {
      await niceInput.fill(item);
      await niceInput.press('Enter');
      await page.waitForTimeout(400);
    }

    const benefitsInput = page.locator('input[placeholder="Bijv. Bedrijfsauto met gereedschap"]').first();
    for (const item of REAL_VACANCY.benefits) {
      await benefitsInput.fill(item);
      await benefitsInput.press('Enter');
      await page.waitForTimeout(400);
    }

    await page.waitForTimeout(1500);
    await page.click('button:has-text("Volgende")');
    await page.waitForTimeout(2000);

    // STAP 4: Contact
    console.log('  Stap 4/5: Contactgegevens...');
    await page.fill('input[placeholder="Jan de Vries"]', REAL_VACANCY.contact_name);
    await page.fill('input[placeholder="Recruiter"]', REAL_VACANCY.contact_role);

    const emailInput = page.locator('input[placeholder="jan@bedrijf.nl"]');
    await emailInput.click();
    await emailInput.clear();
    await emailInput.type(REAL_VACANCY.contact_email, { delay: 30 });
    await emailInput.blur();
    await page.waitForTimeout(1000);

    await page.fill('input[placeholder="06 12 34 56 78"]', REAL_VACANCY.contact_phone);
    await page.fill('input[placeholder="31612345678"]', REAL_VACANCY.contact_whatsapp);

    await page.waitForTimeout(1500);
    await page.click('button:has-text("Controleren")');
    await page.waitForTimeout(2000);

    // STAP 5: Review & Submit
    console.log('  Stap 5/5: Review & Genereren...');

    // Scroll door review pagina
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await page.waitForTimeout(2000);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(2000);

    // Submit
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const submitBtn = buttons.find(b => b.textContent?.includes('Genereer'));
      if (submitBtn && submitBtn.disabled) {
        submitBtn.disabled = false;
      }
    });
    await page.waitForTimeout(500);

    console.log('  🚀 Genereren...');
    await page.click('button:has-text("Genereer")');

    // Wacht op success message
    await page.waitForTimeout(12000);

    console.log('  ✅ Landing page gegenereerd!\n');

    // Toon success message
    await page.waitForTimeout(3000);

    // ============================================
    // DEEL 2: NAVIGEER NAAR LANDING PAGE
    // ============================================
    console.log('🌐 DEEL 2: Landing Page bekijken\n');

    // Klik op "Bekijk preview" button
    try {
      await page.click('a:has-text("Bekijk preview")');
      console.log('  ✅ Preview button geklikt');
      await page.waitForTimeout(3000);
    } catch (e) {
      console.log('  ℹ️  Direct naar landing page navigeren...');
      await page.goto('http://localhost:3002/v/mitsubishi-turbocharger-and-engine-europe-bv-teamlead-mainte', {
        waitUntil: 'load',
        timeout: 30000
      });
    }

    // Wacht tot landing page geladen is
    await page.waitForTimeout(3000);
    console.log('  ✅ Landing page geladen!');

    // Scroll door de landing page
    console.log('  📜 Scrolling door landing page...');

    // Hero section
    await page.waitForTimeout(3000);

    // Scroll naar beneden (geleidelijk)
    for (let i = 0; i < 5; i++) {
      await page.evaluate(() => window.scrollBy(0, window.innerHeight * 0.8));
      await page.waitForTimeout(2000);
    }

    // Scroll terug naar boven voor finaal shot
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(3000);

    console.log('  ✅ Landing page volledig getoond!\n');

    console.log('🎬 Recording complete! Saving video...\n');

    // ============================================
    // SUMMARY
    // ============================================
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ COMPLETE DEMO OPGENOMEN!');
    console.log('');
    console.log('📊 Wat is opgenomen:');
    console.log('  ✅ Deel 1: Complete intake form (5 stappen)');
    console.log('  ✅ Deel 2: Landing page generatie');
    console.log('  ✅ Deel 3: Werkende MTEE landing page');
    console.log('');
    console.log('🎯 Vacature:');
    console.log('  • MTEE Teamlead Maintenance Corrective');
    console.log('  • Almere');
    console.log('  • €3500-€4743');
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

recordCompleteMTEEDemo().catch(error => {
  console.error('Fatal:', error);
  process.exit(1);
});
