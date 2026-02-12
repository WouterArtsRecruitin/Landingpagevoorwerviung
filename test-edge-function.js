// 🔍 Test Edge Function Direct
// Roept de Edge Function direct aan om exacte error te zien

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
  job_description: 'Als data driven Teamlead Maintenance Corrective weet jij als geen ander hoe je de productielijnen draaiende houdt.',
  responsibilities: [
    'Data extractie en analyse van productiesystemen',
    'Organiseren van root-cause analyse meetings',
  ],
  requirements_must: [
    'HBO diploma in technische of bedrijfskundige richting',
    'Minimaal 3 jaar ervaring in geautomatiseerde productieomgevingen',
  ],
  requirements_nice: [
    'Ervaring met turbochargers of automotive componenten',
  ],
  benefits: [
    'Salaris €3500-€4743 bruto per maand',
    '27 vakantiedagen + 5 collectieve dagen',
  ],
  contact_name: 'Recruitment MTEE',
  contact_role: 'Technical Recruiter',
  contact_email: 'cmuller@recruitin.nl',
  contact_phone: '06 18 29 96 82',
  contact_whatsapp: '31618299682',
  created_by: 'cmuller@recruitin.nl'
};

async function testEdgeFunction() {
  console.log('🔍 Testing Edge Function Direct Call\n');

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  try {
    console.log('📡 Intercepting network requests...\n');

    // Capture network responses
    page.on('response', async (response) => {
      const url = response.url();
      if (url.includes('generate-landing-page')) {
        console.log(`\n🌐 Edge Function Response:`);
        console.log(`   Status: ${response.status()}`);
        console.log(`   Status Text: ${response.statusText()}`);

        try {
          const body = await response.json();
          console.log(`   Response Body:`, JSON.stringify(body, null, 2));
        } catch (e) {
          const text = await response.text();
          console.log(`   Response Text:`, text);
        }
      }
    });

    // Listen for console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log(`❌ Browser Console Error:`, msg.text());
      }
    });

    console.log('🌐 Opening page and submitting form...\n');

    await page.goto('http://localhost:3002/admin/nieuw', {
      waitUntil: 'load',
      timeout: 60000
    });

    // Wait for page to be ready
    await page.waitForTimeout(2000);

    console.log('📝 Filling form via JavaScript for speed...\n');

    // Use JavaScript to fill form directly
    await page.evaluate((data) => {
      // This is a hack to fill the React form state directly
      // Find the form component and update its state
      console.log('Filling form with data:', data);
    }, REAL_VACANCY);

    // Actually, let's just use the UI normally but fast
    await page.waitForSelector('input[placeholder="Bijv. Aebi Schmidt Nederland"]');

    console.log('Step 1: Bedrijf...');
    await page.fill('input[placeholder="Bijv. Aebi Schmidt Nederland"]', REAL_VACANCY.company_name);
    await page.fill('input[placeholder="https://www.bedrijf.nl"]', REAL_VACANCY.company_website);
    await page.fill('input[placeholder="https://..."]', REAL_VACANCY.company_logo_url);
    await page.selectOption('select', REAL_VACANCY.company_sector);

    const selects = await page.locator('select').all();
    if (selects.length >= 2) await selects[1].selectOption(REAL_VACANCY.template_style);
    if (selects.length >= 3) await selects[2].selectOption(REAL_VACANCY.image_style);

    const calendlyInput = await page.locator('input[placeholder*="calendly"]').first();
    await calendlyInput.fill(REAL_VACANCY.calendly_url);

    await page.click('button:has-text("Volgende")');
    await page.waitForTimeout(1500);

    console.log('Step 2: Vacature...');
    await page.fill('input[placeholder="Bijv. Servicemonteur"]', REAL_VACANCY.job_title);
    await page.fill('input[placeholder="Bijv. Regio Midden-Nederland"]', REAL_VACANCY.job_location);
    await page.fill('input[placeholder="2800"]', String(REAL_VACANCY.salary_min));
    await page.fill('input[placeholder="3800"]', String(REAL_VACANCY.salary_max));
    await page.selectOption('select', REAL_VACANCY.employment_type);
    await page.fill('textarea', REAL_VACANCY.job_description);

    await page.click('button:has-text("Volgende")');
    await page.waitForTimeout(1500);

    console.log('Step 3: Details...');
    const respInput = page.locator('input[placeholder="Bijv. Onderhoud aan machines"]').first();
    for (const item of REAL_VACANCY.responsibilities) {
      await respInput.fill(item);
      await respInput.press('Enter');
      await page.waitForTimeout(200);
    }

    const reqInput = page.locator('input[placeholder="Bijv. MBO niveau 3/4 techniek"]').first();
    for (const item of REAL_VACANCY.requirements_must) {
      await reqInput.fill(item);
      await reqInput.press('Enter');
      await page.waitForTimeout(200);
    }

    const niceInput = page.locator('input[placeholder="Bijv. Rijbewijs C"]').first();
    for (const item of REAL_VACANCY.requirements_nice) {
      await niceInput.fill(item);
      await niceInput.press('Enter');
      await page.waitForTimeout(200);
    }

    const benefitsInput = page.locator('input[placeholder="Bijv. Bedrijfsauto met gereedschap"]').first();
    for (const item of REAL_VACANCY.benefits) {
      await benefitsInput.fill(item);
      await benefitsInput.press('Enter');
      await page.waitForTimeout(200);
    }

    await page.click('button:has-text("Volgende")');
    await page.waitForTimeout(1500);

    console.log('Step 4: Contact...');
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

    await page.click('button:has-text("Controleren")');
    await page.waitForTimeout(2000);

    console.log('Step 5: Submit...');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);

    // Force enable button
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const submitBtn = buttons.find(b => b.textContent?.includes('Genereer'));
      if (submitBtn && submitBtn.disabled) {
        submitBtn.disabled = false;
      }
    });
    await page.waitForTimeout(500);

    console.log('🚀 Clicking submit...\n');
    await page.click('button:has-text("Genereer")');

    // Wait for response
    console.log('⏳ Waiting for Edge Function response...\n');
    await page.waitForTimeout(20000);

    console.log('\n✅ Check output above for Edge Function response details');

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
  } finally {
    console.log('\n⏸️  Browser blijft open - check het resultaat!');
  }
}

testEdgeFunction().catch(error => {
  console.error('Fatal:', error);
  process.exit(1);
});
