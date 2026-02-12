import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  console.log('🎨 Creating CREATIVE marketing page with vibrant colors...');

  await page.goto('http://localhost:3002/admin/nieuw');
  await page.waitForTimeout(1000);

  // STAP 1: Bedrijfsinfo (Creative agency)
  console.log('Step 1: Company info');
  await page.locator('input[name="company_name"]').fill('Supernova Creative Studio');
  await page.locator('input[name="company_website"]').fill('https://supernovacreative.nl');

  // Sector dropdown - Marketing & Creative
  await page.locator('select').first().selectOption('Marketing & Creative');

  await page.locator('button:text("Volgende")').click();
  await page.waitForTimeout(500);

  // STAP 2: Vacature details
  console.log('Step 2: Job details');
  await page.locator('input[placeholder*="Bijv. Senior"]').fill('Creative Content Strategist');
  await page.locator('input[placeholder*="Amsterdam"]').fill('Amsterdam');
  await page.locator('input[placeholder*="5000"]').fill('4500');
  await page.locator('input[placeholder*="7000"]').fill('6500');

  // Employment type - Fulltime
  await page.locator('select').first().selectOption('fulltime');

  await page.locator('button:text("Volgende")').click();
  await page.waitForTimeout(500);

  // STAP 3: Taken, eisen, benefits
  console.log('Step 3: Details');

  // Job description
  const textareas = await page.locator('textarea').all();
  await textareas[0].fill('Creëer viral content strategieën voor toonaangevende merken. Jij bedenkt de campagnes waar heel Nederland over praat.');
  await page.waitForTimeout(300);

  // Responsibilities
  const responsibilities = [
    '🎯 Ontwikkelen van 360° content strategieën',
    '🚀 Leiden van creatieve brainstorm sessies',
    '📱 TikTok & Instagram content masteren',
    '💡 Innovatieve campagne concepten bedenken'
  ];

  const plusButtons = await page.locator('button:text("+")').all();
  for (let i = 0; i < responsibilities.length; i++) {
    const inputs = await page.locator('input[type="text"]').all();
    await inputs[0].fill(responsibilities[i]);
    await plusButtons[0].click();
    await page.waitForTimeout(400);
  }

  // Requirements (must-have)
  const requirements = [
    '5+ jaar ervaring in content strategy',
    'Portfolio met viral campaigns',
    'Expert in social media trends',
    'Perfecte beheersing Nederlands & Engels'
  ];

  for (let i = 0; i < requirements.length; i++) {
    const inputs = await page.locator('input[type="text"]').all();
    await inputs[0].fill(requirements[i]);
    await plusButtons[1].click();
    await page.waitForTimeout(400);
  }

  // Nice-to-have
  const niceToHave = [
    'Adobe Creative Suite skills',
    'Video editing ervaring',
    'Influencer netwerk'
  ];

  for (let i = 0; i < niceToHave.length; i++) {
    const inputs = await page.locator('input[type="text"]').all();
    await inputs[0].fill(niceToHave[i]);
    await plusButtons[2].click();
    await page.waitForTimeout(400);
  }

  // Benefits
  const benefits = [
    '💰 €4500-€6500 + bonussen',
    '🏖️ 30 vakantiedagen',
    '🎨 MacBook Pro + budget voor tools',
    '🚀 Werk met toonaangevende merken',
    '🎓 €2000 opleidingsbudget per jaar',
    '🏡 Hybride werken (3 dagen kantoor)',
    '🎉 Legendarische teamuitjes',
    '☕ Barista koffie & lunch verzorgd'
  ];

  for (let i = 0; i < benefits.length; i++) {
    const inputs = await page.locator('input[type="text"]').all();
    await inputs[0].fill(benefits[i]);
    await plusButtons[3].click();
    await page.waitForTimeout(400);
  }

  await page.locator('button:text("Volgende")').click();
  await page.waitForTimeout(500);

  // STAP 4: Contact
  console.log('Step 4: Contact info');
  await page.locator('input[placeholder*="Sarah"]').fill('Luna Martinez');
  await page.locator('input[placeholder*="Head"]').fill('Creative Director');
  await page.locator('input[placeholder*="sarah@"]').fill('luna@supernovacreative.nl');
  await page.locator('input[placeholder*="06 12"]').fill('06 87654321');
  await page.locator('input[placeholder*="31612"]').fill('31687654321');

  await page.locator('button:text("Volgende")').click();
  await page.waitForTimeout(1000);

  // REVIEW & SUBMIT
  console.log('✅ Reviewing...');
  await page.waitForTimeout(2000);

  console.log('🚀 Generating landing page...');
  await page.locator('button:has-text("Genereer")').click();

  await page.waitForTimeout(8000);

  console.log('✨ DONE! Check the result');

  // Don't close - let user see result
  await page.waitForTimeout(5000);

})();
