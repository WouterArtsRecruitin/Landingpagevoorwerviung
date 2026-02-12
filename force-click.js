// Force click de submit button via JavaScript
import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 100
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });

  const page = await context.newPage();

  // Ga naar de pagina
  await page.goto('http://localhost:3002/admin/nieuw');
  await page.waitForTimeout(2000);

  console.log('🔍 Zoeken naar submit button...');

  // Probeer de button te vinden en klikken
  try {
    // Probeer 1: Normale klik met scroll
    const button = page.locator('button:has-text("Genereer landingspagina")');

    if (await button.count() > 0) {
      console.log('✅ Button gevonden!');

      // Scroll naar button
      await button.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);

      // Klik
      await button.click();
      console.log('✅ Button geklikt!');

      // Wacht op resultaat
      await page.waitForTimeout(10000);

      // Screenshot
      await page.screenshot({ path: '/tmp/after-submit.png', fullPage: true });
      console.log('📸 Screenshot gemaakt: /tmp/after-submit.png');

    } else {
      console.log('❌ Button niet gevonden');

      // Force click via JavaScript
      await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const submitButton = buttons.find(b => b.textContent.includes('Genereer'));
        if (submitButton) {
          submitButton.click();
          return true;
        }
        return false;
      });

      console.log('✅ Geforceerd geklikt via JavaScript!');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }

  console.log('⏸️  Browser blijft open');
})();
