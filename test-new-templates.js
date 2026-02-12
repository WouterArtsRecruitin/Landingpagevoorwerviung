import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  console.log('🎨 Testing NEW TEMPLATE OPTIONS...');

  await page.goto('http://localhost:3002/admin/nieuw');
  await page.waitForTimeout(1000);

  // TEST 1: INDUSTRIAL TEMPLATE
  console.log('\n1️⃣  TEST: Industrial (Stoer grijs/oranje)');

  // STAP 1: Bedrijfsinfo
  await page.locator('input[name="company_name"]').fill('MetaalWerk Pro');
  await page.locator('input[placeholder*="https://www.bedrijf.nl"]').fill('https://metaalwerkpro.nl');

  // Sector - Techniek & Industrie
  const sectorSelect = await page.locator('select').first();
  await sectorSelect.selectOption('Techniek & Industrie');

  // NEW: Template Stijl - Industrial
  const templateSelect = await page.locator('select').nth(1);
  await templateSelect.selectOption('industrial');
  console.log('   ✅ Template: Industrial (grijs/oranje)');

  // NEW: Image Style - Photos
  const imageSelect = await page.locator('select').nth(2);
  await imageSelect.selectOption('photos');
  console.log('   ✅ Image style: Photos');

  // NEW: Calendly (optioneel)
  await page.locator('input[placeholder*="calendly"]').fill('https://calendly.com/recruiter/30min');
  console.log('   ✅ Calendly link toegevoegd');

  await page.locator('button:text("Volgende")').click();
  await page.waitForTimeout(500);

  // STAP 2: Vacature
  console.log('\n   Step 2: Job details');
  await page.locator('input[placeholder*="Servicemonteur"]').fill('CNC Draaier/Frezer');
  await page.locator('input[placeholder*="Amsterdam"]').fill('Eindhoven');
  await page.locator('input[placeholder*="2800"]').fill('3200');
  await page.locator('input[placeholder*="3800"]').fill('4500');

  const emplSelect = await page.locator('select').first();
  await emplSelect.selectOption('fulltime');

  const textareas = await page.locator('textarea').all();
  await textareas[0].fill('Bewerk metalen onderdelen op moderne CNC machines voor de high-tech industrie. Precisiewerk voor ASML en NXP.');

  await page.locator('button:text("Volgende")').click();
  await page.waitForTimeout(500);

  // STAP 3: Details
  console.log('   Step 3: Details');

  const responsibilities = [
    '⚙️ Programmeren en bedienen CNC machines',
    '🔧 Instellen en afstellen gereedschappen',
    '📐 Kwaliteitscontrole met meetapparatuur',
    '🛠️ Klein onderhoud aan machines'
  ];

  const plusButtons = await page.locator('button:text("+")').all();
  for (let i = 0; i < responsibilities.length; i++) {
    const inputs = await page.locator('input[type="text"]').all();
    await inputs[0].fill(responsibilities[i]);
    await plusButtons[0].click();
    await page.waitForTimeout(400);
  }

  const requirements = [
    'MBO niveau 3/4 Metaalbewerking',
    '2+ jaar CNC ervaring',
    'Kunnen lezen technische tekeningen',
    'Nauwkeurig en precies werken'
  ];

  for (let i = 0; i < requirements.length; i++) {
    const inputs = await page.locator('input[type="text"]').all();
    await inputs[0].fill(requirements[i]);
    await plusButtons[1].click();
    await page.waitForTimeout(400);
  }

  const niceToHave = [
    'Siemens of Fanuc ervaring',
    'Heftruck certificaat',
    'VCA certificaat'
  ];

  for (let i = 0; i < niceToHave.length; i++) {
    const inputs = await page.locator('input[type="text"]').all();
    await inputs[0].fill(niceToHave[i]);
    await plusButtons[2].click();
    await page.waitForTimeout(400);
  }

  const benefits = [
    '💰 €3200-€4500 bruto per maand',
    '🚗 Lease auto van de zaak',
    '🏖️ 27 vakantiedagen + 13e maand',
    '🎓 Opleiding & certificaten betaald',
    '🔧 Modern machinepark (MAZAK)',
    '☕ Kantine met warme lunch',
    '🎉 Bedrijfsuitjes & teambuilding',
    '💪 Sportschool contributie'
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
  console.log('   Step 4: Contact');
  await page.locator('input[placeholder*="Jan"]').fill('Marco van den Berg');
  await page.locator('input[placeholder*="Recruiter"]').fill('Productie Manager');
  await page.locator('input[placeholder*="jan@"]').fill('marco@metaalwerkpro.nl');
  await page.locator('input[placeholder*="06 12"]').fill('06 55443322');
  await page.locator('input[placeholder*="31612"]').fill('31655443322');

  await page.locator('button:text("Controleren")').click();
  await page.waitForTimeout(2000);

  // REVIEW & SUBMIT
  console.log('\n   ✅ Reviewing...');
  await page.waitForTimeout(1000);

  console.log('   🚀 Generating landing page with INDUSTRIAL template...');
  await page.locator('button:has-text("Genereer")').click();

  await page.waitForTimeout(8000);

  console.log('\n✨ DONE! Check de nieuwe INDUSTRIAL template met:');
  console.log('   - Stoer grijs/oranje kleurenschema');
  console.log('   - Photo style images');
  console.log('   - Calendly integratie');

  await page.waitForTimeout(5000);

})();
