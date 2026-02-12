# 🎨 Showcase Website voor Lovable.dev

## Concept: Template Galerij + Live Previews

Een visueel impressive showcase van alle landing page templates met:
- Hero section met statistieken
- Template galerij met filters
- Live preview modals
- Direct naar intake form CTA

---

## 1. HOMEPAGE STRUCTURE

```
/ (Homepage)
├── Hero Section
│   ├── "5 Templates, Oneindig Veel Mogelijkheden"
│   ├── Statistieken: 95% sneller | 5 min live | 3x conversie
│   └── CTA: "Bekijk Templates"
│
├── Filter Bar
│   ├── Alle Sectoren
│   ├── IT & Software
│   ├── Finance & Accounting
│   ├── Zorg & Welzijn
│   ├── Techniek & Engineering
│   └── Marketing & Creative
│
├── Template Cards (Grid 3x2)
│   ├── Screenshot/Preview
│   ├── Sector badge
│   ├── Kleur indicator
│   ├── "Live Preview" button
│   └── "Gebruik Template" button
│
└── CTA Section
    └── "Start met jouw template" → intake form
```

---

## 2. COMPONENT CODE

### Hero Component

```tsx
// Hero.tsx
export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600">
      <div className="container mx-auto px-4 py-20 sm:py-32">
        <div className="text-center text-white">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium">Live Template Showcase</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold mb-6">
            5 Templates,<br />
            Oneindig Veel<br />
            <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
              Mogelijkheden
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
            Kies je favoriete design. Pas aan met AI. Live in 5 minuten.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mb-12">
            <div>
              <div className="text-4xl sm:text-5xl font-bold">95%</div>
              <div className="text-white/80">Sneller Live</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-bold">5 min</div>
              <div className="text-white/80">Tot Publicatie</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-bold">3x</div>
              <div className="text-white/80">Meer Conversie</div>
            </div>
          </div>

          <a
            href="#templates"
            className="inline-block px-8 py-4 bg-white text-purple-600 rounded-lg hover:scale-105 transition-transform font-bold text-lg shadow-xl"
          >
            Bekijk Templates →
          </a>
        </div>
      </div>

      {/* Animated background blobs */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
    </div>
  );
}
```

### Template Card Component

```tsx
// TemplateCard.tsx
interface Template {
  id: string;
  name: string;
  sector: string;
  gradient: string;
  previewUrl: string;
  thumbnailUrl: string;
  description: string;
}

export default function TemplateCard({ template }: { template: Template }) {
  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden border border-gray-100">
      {/* Thumbnail */}
      <div className="relative h-64 overflow-hidden bg-gradient-to-br" style={{ background: template.gradient }}>
        <img
          src={template.thumbnailUrl}
          alt={template.name}
          className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-300"
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button className="px-6 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:scale-105 transition-transform">
            👁️ Live Preview
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Sector Badge */}
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
            {template.sector}
          </span>
          <div className="w-6 h-6 rounded-full" style={{ background: template.gradient }}></div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2">{template.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{template.description}</p>

        <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-shadow font-semibold">
          Gebruik Template →
        </button>
      </div>
    </div>
  );
}
```

### Template Gallery

```tsx
// TemplateGallery.tsx
import { useState } from 'react';
import TemplateCard from './TemplateCard';

const TEMPLATES = [
  {
    id: 'tech',
    name: 'TechVision AI',
    sector: 'IT & Software',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    previewUrl: 'http://localhost:3002/v/techvision-ai-senior-full-stack-developer',
    thumbnailUrl: '/thumbnails/tech.jpg',
    description: 'Purple/Indigo gradient voor tech & software bedrijven',
  },
  {
    id: 'finance',
    name: 'GreenCapital',
    sector: 'Finance & Accounting',
    gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    previewUrl: 'http://localhost:3002/v/greencapital-invest-investment-analyst',
    thumbnailUrl: '/thumbnails/finance.jpg',
    description: 'Emerald green voor finance & investment',
  },
  {
    id: 'healthcare',
    name: 'CarePlus',
    sector: 'Zorg & Welzijn',
    gradient: 'linear-gradient(135deg, #0093E9 0%, #80D0C7 100%)',
    previewUrl: 'http://localhost:3002/v/careplus-zorggroep-verpleegkundige-ic',
    thumbnailUrl: '/thumbnails/healthcare.jpg',
    description: 'Cyan/Teal gradient voor healthcare',
  },
  {
    id: 'engineering',
    name: 'Precision Systems',
    sector: 'Techniek & Engineering',
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
    previewUrl: 'http://localhost:3002/v/precision-systems-bv-mechatronics-engineer',
    thumbnailUrl: '/thumbnails/engineering.jpg',
    description: 'Blue gradient voor engineering',
  },
  {
    id: 'creative',
    name: 'Supernova Creative',
    sector: 'Marketing & Creative',
    gradient: 'linear-gradient(135deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%)',
    previewUrl: 'http://localhost:3002/v/supernova-creative-studio-creative-content-strategist',
    thumbnailUrl: '/thumbnails/creative.jpg',
    description: 'Multi-color gradient voor creative agencies',
  },
];

export default function TemplateGallery() {
  const [filter, setFilter] = useState('all');

  const sectors = ['all', 'IT & Software', 'Finance & Accounting', 'Zorg & Welzijn', 'Techniek & Engineering', 'Marketing & Creative'];

  const filtered = filter === 'all'
    ? TEMPLATES
    : TEMPLATES.filter(t => t.sector === filter);

  return (
    <div id="templates" className="container mx-auto px-4 py-20">
      {/* Filter Bar */}
      <div className="flex flex-wrap gap-3 justify-center mb-12">
        {sectors.map(sector => (
          <button
            key={sector}
            onClick={() => setFilter(sector)}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              filter === sector
                ? 'bg-purple-600 text-white shadow-lg scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {sector === 'all' ? '🌟 Alle Sectoren' : sector}
          </button>
        ))}
      </div>

      {/* Template Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map(template => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-20 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Klaar om te starten?
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Kies je template en pas aan met AI in 5 minuten
        </p>
        <a
          href="http://localhost:3002/admin/nieuw"
          className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-xl hover:scale-105 transition-all font-bold text-lg"
        >
          Start Nu Gratis →
        </a>
      </div>
    </div>
  );
}
```

---

## 3. FULL PAGE LAYOUT

```tsx
// App.tsx (Main)
import Hero from './components/Hero';
import TemplateGallery from './components/TemplateGallery';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      <TemplateGallery />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="text-2xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Kandidatentekort.nl
            </span>
          </div>
          <p className="text-gray-400">
            Geautomatiseerde recruitment landing pages
          </p>
        </div>
      </footer>
    </div>
  );
}
```

---

## 4. DEPLOYMENT STAPPEN

### In Lovable.dev:

1. **Nieuw Project**
   - Go to: https://lovable.dev/dashboard/projects
   - Klik "New Project"
   - Naam: "Landing Page Showcase"

2. **Components Toevoegen**
   - Maak `Hero.tsx` component
   - Maak `TemplateCard.tsx` component
   - Maak `TemplateGallery.tsx` component
   - Update `App.tsx`

3. **Styling**
   - Lovable heeft Tailwind CSS ingebouwd
   - Alle classes werken out-of-the-box
   - Gradients & animations zijn supported

4. **Deploy**
   - Klik "Deploy" in Lovable
   - URL: `your-project.lovable.app`
   - Klaar!

---

## 5. SCREENSHOTS MAKEN

Voor de thumbnails heb je screenshots nodig van elke template:

```bash
# In je terminal:
cd ~/Projects/landing-page-recruitment

# Install screenshot tool
npm install -D puppeteer

# Create screenshot script
node screenshot-templates.js
```

```javascript
// screenshot-templates.js
import puppeteer from 'puppeteer';

const templates = [
  { slug: 'techvision-ai-senior-full-stack-developer', name: 'tech' },
  { slug: 'greencapital-invest-investment-analyst', name: 'finance' },
  { slug: 'careplus-zorggroep-verpleegkundige-ic', name: 'healthcare' },
  { slug: 'precision-systems-bv-mechatronics-engineer', name: 'engineering' },
  { slug: 'supernova-creative-studio-creative-content-strategist', name: 'creative' },
];

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });

  for (const template of templates) {
    console.log(`📸 Screenshotting ${template.name}...`);
    await page.goto(`http://localhost:3002/v/${template.slug}`);
    await page.waitForTimeout(2000);
    await page.screenshot({
      path: `public/thumbnails/${template.name}.jpg`,
      quality: 85
    });
  }

  await browser.close();
  console.log('✅ All screenshots done!');
})();
```

---

## RESULT

**Timeline:** 30-60 minuten in Lovable.dev

**Je krijgt:**
- 🎨 Visueel impressive showcase
- 📱 Fully responsive
- ⚡ Lightning fast
- 🔗 Direct naar intake form
- 🌐 Live op `yourname.lovable.app`

**Perfect voor:**
- Sales demos
- Client presentaties
- Marketing materiaal
- Social media shares

---

## NEXT: Client Portal in Main System

Daarna bouwen we de **Client Portal** in het huidige systeem met:
- Authenticatie
- Dashboard
- Approve/feedback
- Analytics

**Wil je dat ik dit nu in Lovable voor je bouw?** 🚀
