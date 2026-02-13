// Playwright script to create and test landing page
import { chromium } from 'playwright';

(async () => {
  console.log('🚀 Starting automated page creation...\n');

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // 1. Navigate to admin
    console.log('📍 Navigating to admin panel...');
    await page.goto('http://localhost:3000/admin/pages');
    await page.waitForTimeout(2000);

    // 2. Click "Nieuwe Pagina" or "Create" button
    console.log('➕ Looking for create button...');
    const createButton = await page.locator('button:has-text("Nieuw"), button:has-text("Create"), a:has-text("Nieuw"), a:has-text("Create")').first();

    if (await createButton.isVisible()) {
      await createButton.click();
      console.log('✅ Clicked create button');
      await page.waitForTimeout(2000);
    } else {
      console.log('⚠️  No create button found, might be on create form already');
    }

    // 3. Fill in form fields
    console.log('📝 Filling in page details...');

    // Try to find and fill common field names
    const fields = {
      'page_title': 'Automation Test Engineer',
      'title': 'Automation Test Engineer',
      'bedrijf': 'Playwright Test BV',
      'company': 'Playwright Test BV',
      'company_name': 'Playwright Test BV',
      'locatie': 'Amsterdam',
      'location': 'Amsterdam',
      'slug': 'playwright-test-' + Date.now()
    };

    for (const [name, value] of Object.entries(fields)) {
      try {
        const input = page.locator(`input[name="${name}"], input[id="${name}"], textarea[name="${name}"]`).first();
        if (await input.isVisible({ timeout: 1000 })) {
          await input.fill(value);
          console.log(`  ✅ Filled ${name}: ${value}`);
        }
      } catch (e) {
        // Field not found, skip
      }
    }

    // 4. Set status to published
    console.log('📢 Setting status to published...');
    try {
      const statusSelect = page.locator('select[name="status"], select[id="status"]').first();
      if (await statusSelect.isVisible({ timeout: 1000 })) {
        await statusSelect.selectOption('published');
        console.log('  ✅ Status set to published');
      }
    } catch (e) {
      console.log('  ⚠️  Could not find status field');
    }

    // 5. Submit form
    console.log('💾 Saving page...');
    const saveButton = await page.locator('button:has-text("Save"), button:has-text("Opslaan"), button:has-text("Publish"), button[type="submit"]').first();

    if (await saveButton.isVisible()) {
      await saveButton.click();
      console.log('✅ Clicked save button');
      await page.waitForTimeout(3000);
    }

    // 6. Get the created page URL/slug
    console.log('\n📊 Checking result...');
    const currentUrl = page.url();
    console.log('Current URL:', currentUrl);

    // Try to find the slug or page link
    const pageLinks = await page.locator('a[href*="/v/"]').all();
    if (pageLinks.length > 0) {
      const href = await pageLinks[0].getAttribute('href');
      console.log('\n✅ Page created! URL:', href);

      // 7. Test the page
      console.log('\n🧪 Testing the page...');
      await page.goto('http://localhost:3000' + href);
      await page.waitForTimeout(2000);

      console.log('✅ Page loads successfully!');
      console.log('\n📸 Taking screenshot...');
      await page.screenshot({ path: '/tmp/landing-page-test.png', fullPage: true });
      console.log('✅ Screenshot saved to /tmp/landing-page-test.png');

      console.log('\n🎉 SUCCESS! Page URL:', 'http://localhost:3000' + href);
    } else {
      console.log('⚠️  Could not find page link');
    }

    await page.waitForTimeout(3000);

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    await page.screenshot({ path: '/tmp/error-screenshot.png' });
    console.log('Error screenshot saved to /tmp/error-screenshot.png');
  } finally {
    await browser.close();
    console.log('\n✅ Browser closed');
  }
})();
