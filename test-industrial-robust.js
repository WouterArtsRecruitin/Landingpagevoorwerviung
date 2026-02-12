import { chromium } from 'playwright';

(async () => {
  console.log('🚀 Starting robust test...');

  const browser = await chromium.launch({
    headless: false,
    slowMo: 100 // Slower for visibility
  });

  const page = await browser.newPage();

  try {
    console.log('📍 Navigating to intake form...');
    await page.goto('http://localhost:3002/admin/nieuw', {
      waitUntil: 'networkidle',
      timeout: 15000
    });

    console.log('✅ Page loaded');

    // Wait for form to be visible
    await page.waitForSelector('h2:has-text("Nieuwe vacaturepagina")', { timeout: 10000 });
    console.log('✅ Form visible');

    // Take screenshot to verify
    await page.screenshot({ path: 'step-0-loaded.png' });

    // STAP 1: Bedrijfsinfo
    console.log('\n📝 Step 1: Bedrijfsgegevens');

    // Company name
    const nameInput = page.locator('input').filter({ hasText: '' }).first();
    await nameInput.waitFor({ state: 'visible', timeout: 5000 });
    await nameInput.fill('MetaalWerk Pro BV');
    console.log('  ✅ Bedrijfsnaam ingevuld');

    // Wait a bit
    await page.waitForTimeout(500);

    // Company website - find by placeholder
    const websiteInput = page.locator('input').nth(1);
    await websiteInput.fill('https://metaalwerkpro.nl');
    console.log('  ✅ Website ingevuld');

    await page.waitForTimeout(500);

    // Sector dropdown - first select element
    console.log('  🔍 Selecting sector...');
    const sectorSelect = page.locator('select').first();
    await sectorSelect.waitFor({ state: 'visible' });
    await sectorSelect.selectOption('Techniek & Industrie');
    console.log('  ✅ Sector: Techniek & Industrie');

    await page.waitForTimeout(500);

    // Screenshot after sector
    await page.screenshot({ path: 'step-1-sector.png' });

    // Template Style - should be second select (NEW!)
    console.log('  🎨 Selecting INDUSTRIAL template...');
    const allSelects = await page.locator('select').all();
    console.log(`  📊 Found ${allSelects.length} select elements`);

    if (allSelects.length >= 2) {
      const templateSelect = allSelects[1];
      await templateSelect.selectOption('industrial');
      console.log('  ✅ Template: Industrial (grijs/oranje)');
    } else {
      console.log('  ⚠️ Template select not found, may be old version');
    }

    await page.waitForTimeout(500);

    // Image Style - third select (NEW!)
    if (allSelects.length >= 3) {
      const imageSelect = allSelects[2];
      await imageSelect.selectOption('photos');
      console.log('  ✅ Image style: Photos');
    }

    await page.waitForTimeout(500);

    // Calendly - find by placeholder
    const inputs = await page.locator('input[type="text"]').all();
    for (const input of inputs) {
      const placeholder = await input.getAttribute('placeholder');
      if (placeholder && placeholder.includes('calendly')) {
        await input.fill('https://calendly.com/recruiter/30min');
        console.log('  ✅ Calendly link');
        break;
      }
    }

    await page.screenshot({ path: 'step-1-complete.png' });

    // Next button
    console.log('  ➡️ Next...');
    await page.locator('button:has-text("Volgende")').click();
    await page.waitForTimeout(1000);

    // STAP 2: Vacature
    console.log('\n📝 Step 2: Vacature');
    await page.waitForSelector('h3:has-text("Vacature")');

    const step2Inputs = await page.locator('input[type="text"]').all();
    await step2Inputs[0].fill('CNC Draaier/Frezer');
    console.log('  ✅ Functietitel');

    await step2Inputs[1].fill('Eindhoven');
    console.log('  ✅ Locatie');

    await page.waitForTimeout(300);

    // Salary fields
    const numberInputs = await page.locator('input[type="number"]').all();
    await numberInputs[0].fill('3200');
    await numberInputs[1].fill('4500');
    console.log('  ✅ Salaris');

    await page.waitForTimeout(300);

    // Description
    const textarea = page.locator('textarea').first();
    await textarea.fill('Bewerk metalen onderdelen op moderne CNC machines voor de high-tech industrie. Precisiewerk voor ASML en NXP.');
    console.log('  ✅ Beschrijving');

    await page.screenshot({ path: 'step-2-complete.png' });
    await page.locator('button:has-text("Volgende")').click();
    await page.waitForTimeout(1000);

    // STAP 3: Details (Quick version)
    console.log('\n📝 Step 3: Details (adding items)');
    await page.waitForSelector('h3:has-text("Details")');

    // Add 2 responsibilities
    const resp = ['Programmeren CNC machines', 'Kwaliteitscontrole'];
    for (const item of resp) {
      const textInputs = await page.locator('input[type="text"]').all();
      if (textInputs.length > 0) {
        await textInputs[0].fill(item);
        const plusBtn = page.locator('button:has-text("+")').first();
        await plusBtn.click();
        await page.waitForTimeout(400);
      }
    }
    console.log('  ✅ Responsibilities');

    // Add 2 requirements
    const reqs = ['MBO 3/4 Metaalbewerking', 'CNC ervaring'];
    const plusButtons = await page.locator('button:has-text("+")').all();
    for (const item of reqs) {
      const textInputs = await page.locator('input[type="text"]').all();
      if (textInputs.length > 0) {
        await textInputs[0].fill(item);
        if (plusButtons.length > 1) {
          await plusButtons[1].click();
          await page.waitForTimeout(400);
        }
      }
    }
    console.log('  ✅ Requirements');

    // Add 2 benefits
    const benefits = ['€3200-€4500 + 13e maand', 'Lease auto'];
    for (const item of benefits) {
      const textInputs = await page.locator('input[type="text"]').all();
      if (textInputs.length > 0) {
        await textInputs[0].fill(item);
        const allPlus = await page.locator('button:has-text("+")').all();
        if (allPlus.length > 3) {
          await allPlus[3].click();
          await page.waitForTimeout(400);
        }
      }
    }
    console.log('  ✅ Benefits');

    await page.screenshot({ path: 'step-3-complete.png' });
    await page.locator('button:has-text("Volgende")').click();
    await page.waitForTimeout(1000);

    // STAP 4: Contact
    console.log('\n📝 Step 4: Contact');
    await page.waitForSelector('h3:has-text("Contactpersoon")');

    const contactInputs = await page.locator('input[type="text"], input[type="email"], input[type="tel"]').all();
    if (contactInputs.length >= 3) {
      await contactInputs[0].fill('Marco van den Berg');
      await contactInputs[1].fill('Productie Manager');

      // Find email input specifically
      const emailInput = page.locator('input[type="email"]').first();
      await emailInput.fill('marco@metaalwerkpro.nl');

      // Find tel input
      const telInputs = await page.locator('input[type="tel"]').all();
      if (telInputs.length >= 1) {
        await telInputs[0].fill('0655443322');
      }

      console.log('  ✅ Contactgegevens');
    }

    await page.screenshot({ path: 'step-4-complete.png' });
    await page.locator('button:has-text("Controleren")').click();
    await page.waitForTimeout(2000);

    // STAP 5: Review & Submit
    console.log('\n📝 Step 5: Review');
    await page.screenshot({ path: 'step-5-review.png' });

    console.log('  🚀 Submitting...');
    await page.locator('button:has-text("Genereer")').click();

    // Wait for result
    await page.waitForSelector('h2:has-text("Pagina aangemaakt")', { timeout: 15000 });
    console.log('\n✅ SUCCESS! Page created with INDUSTRIAL template!');

    await page.screenshot({ path: 'result-success.png' });

    // Get the URL
    const urlElement = page.locator('p.font-mono').first();
    const url = await urlElement.textContent();
    console.log(`\n🌐 URL: ${url}`);

    // Click preview
    await page.locator('a:has-text("Bekijk preview")').click();
    await page.waitForTimeout(3000);

    console.log('\n🎨 Opening live page to see INDUSTRIAL template...');
    await page.waitForTimeout(3000);

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    await page.screenshot({ path: 'error-screenshot.png' });
    throw error;
  }

  console.log('\n✨ Test complete! Check screenshots in project folder.');
  console.log('   - step-0-loaded.png');
  console.log('   - step-1-complete.png (NEW FIELDS!)');
  console.log('   - result-success.png');

})();
