/**
 * Debug version - check what's actually on the page
 */

import { chromium } from 'playwright';

async function debugForm() {
  const browser = await chromium.launch({ headless: false, slowMo: 500 });
  const page = await browser.newPage();

  try {
    await page.goto('http://localhost:3000/admin/nieuw');
    await page.waitForLoadState('networkidle');

    // Get through steps 1 and 2 quickly
    const inputs1 = await page.locator('input[type="text"]').all();
    await inputs1[0].fill('ASML');
    await inputs1[1].fill('https://www.asml.com');
    await page.locator('input[type="color"]').fill('#0066CC');
    await page.getByRole('button', { name: 'Volgende' }).click();
    await page.waitForTimeout(1500);

    const allInputs2 = await page.locator('input').all();
    let idx = 0;
    for (const input of allInputs2) {
      const type = await input.getAttribute('type');
      if ((type === 'text' || type === 'number') && idx < 4) {
        await input.fill(['Service Engineer', 'Veldhoven', '45000', '55000'][idx]);
        idx++;
      }
    }
    await page.locator('textarea').first().fill('Test beschrijving');
    await page.getByRole('button', { name: 'Volgende' }).click();
    await page.waitForTimeout(1500);

    // NOW WE'RE ON STEP 3 - DEBUG TIME
    console.log('\n📍 ON STEP 3 - Debugging...\n');

    // Count plus buttons
    const plusButtons = await page.locator('button:text("+")').all();
    console.log(`Found ${plusButtons.length} "+" buttons`);

    // Try to find all text inputs
    const textInputs = await page.locator('input[type="text"]').all();
    console.log(`Found ${textInputs.length} text inputs`);

    // Method 1: Try filling first visible input and clicking first + button
    console.log('\n→ Trying Method 1: First input + first button');
    if (textInputs.length > 0 && plusButtons.length > 0) {
      await textInputs[0].fill('Test verantwoordelijkheid 1');
      await plusButtons[0].click();
      await page.waitForTimeout(1000);

      // Check if it was added
      const items = await page.locator('.bg-gray-50').allTextContents();
      console.log(`Items after add: ${JSON.stringify(items)}`);

      // Try adding another
      await textInputs[0].fill('Test verantwoordelijkheid 2');
      await plusButtons[0].click();
      await page.waitForTimeout(1000);

      const items2 = await page.locator('.bg-gray-50').allTextContents();
      console.log(`Items after 2nd add: ${JSON.stringify(items2)}`);
    }

    // Take screenshot
    await page.screenshot({ path: '/tmp/debug-step3.png', fullPage: true });
    console.log('\n📸 Screenshot saved: /tmp/debug-step3.png');

    console.log('\n✅ Debug complete - check screenshot and console output');

    await page.waitForTimeout(10000); // Keep browser open

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

debugForm();
