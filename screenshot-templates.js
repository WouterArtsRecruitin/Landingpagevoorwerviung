import puppeteer from 'puppeteer';
import { mkdir } from 'fs/promises';

const templates = [
  { slug: 'techvision-ai-senior-full-stack-developer', name: 'tech' },
  { slug: 'greencapital-invest-investment-analyst', name: 'finance' },
  { slug: 'careplus-zorggroep-verpleegkundige-ic', name: 'healthcare' },
  { slug: 'precision-systems-bv-mechatronics-engineer', name: 'engineering' },
  { slug: 'supernova-creative-studio-creative-content-strategist', name: 'creative' },
];

(async () => {
  // Create thumbnails directory
  await mkdir('public/thumbnails', { recursive: true });

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });

  for (const template of templates) {
    console.log(`📸 Screenshotting ${template.name}...`);

    try {
      await page.goto(`http://localhost:3002/v/${template.slug}`, {
        waitUntil: 'networkidle0',
        timeout: 10000
      });

      // Wait for page to be fully loaded
      await new Promise(resolve => setTimeout(resolve, 2000));

      await page.screenshot({
        path: `public/thumbnails/${template.name}.jpg`,
        quality: 85,
        type: 'jpeg'
      });

      console.log(`✅ ${template.name}.jpg saved`);
    } catch (error) {
      console.error(`❌ Failed ${template.name}:`, error.message);
    }
  }

  await browser.close();
  console.log('\n🎉 All screenshots done! Check public/thumbnails/');
})();
