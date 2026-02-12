import { chromium } from 'playwright';

/**
 * Record complete landing page demo with smooth scrolling through ALL sections
 */

(async () => {
  console.log('🎬 Starting landing page recording...\n');

  const browser = await chromium.launch({
    headless: false,
    slowMo: 100, // Slower for better visibility
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: {
      dir: 'videos/',
      size: { width: 1920, height: 1080 }
    }
  });

  const page = await context.newPage();

  try {
    // Navigate to the demo landing page
    console.log('📄 Loading ASML demo page...');
    await page.goto('http://localhost:3000/v/asml-mechanical-engineer', {
      waitUntil: 'networkidle'
    });
    await page.waitForTimeout(2000);

    console.log('📹 Recording started - scrolling through all sections...\n');

    // Start at top
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1500);

    // Get total page height
    const totalHeight = await page.evaluate(() => document.body.scrollHeight);
    console.log(`📏 Total page height: ${totalHeight}px`);

    // Section 1: Hero
    console.log('✅ Section 1: Hero');
    await page.waitForTimeout(3000); // Stay longer on hero

    // Scroll through page in smooth increments
    const sections = [
      { name: 'Job Details', scroll: 900 },
      { name: 'Benefits', scroll: 1800 },
      { name: 'Salary Breakdown', scroll: 2700 },
      { name: 'Requirements', scroll: 3600 },
      { name: 'FAQ', scroll: 4500 },
      { name: 'Application Form', scroll: 5400 },
      { name: 'Final CTA', scroll: 6300 },
    ];

    for (const section of sections) {
      console.log(`✅ Section: ${section.name}`);
      await page.evaluate((scrollY) => {
        window.scrollTo({
          top: scrollY,
          behavior: 'smooth'
        });
      }, section.scroll);
      await page.waitForTimeout(2500); // Pause at each section
    }

    // Scroll back to top smoothly
    console.log('⬆️  Scrolling back to top...');
    await page.evaluate(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    await page.waitForTimeout(2000);

    // Final pause
    await page.waitForTimeout(2000);

    console.log('\n✅ Recording complete!');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await context.close();
    await browser.close();

    console.log('\n📹 Video saved to: videos/');
    console.log('💡 Tip: Rename the video to "landingpage-full-demo.webm"');
  }
})();
