# 🚀 Lovable.dev Quick Start - Template Showcase

## 5-Minuten Setup

### Stap 1: Nieuw Project (1 min)
1. Ga naar: https://lovable.dev/dashboard/projects
2. Klik **"New Project"**
3. Naam: **"Landing Page Templates"**
4. Template: **"Blank" (start from scratch)**
5. Klik **"Create"**

---

### Stap 2: Upload Screenshots (1 min)
Upload deze 5 files naar Lovable project assets:
```
public/thumbnails/tech.jpg
public/thumbnails/finance.jpg
public/thumbnails/healthcare.jpg
public/thumbnails/engineering.jpg
public/thumbnails/creative.jpg
```

In Lovable:
- Klik **"Assets"** (linker menu)
- Drag & drop alle 5 JPG files
- Lovable genereert URLs automatisch

---

### Stap 3: Main App Component (2 min)

Vervang inhoud van `App.tsx` met:

```tsx
import Hero from './components/Hero';
import TemplateGallery from './components/TemplateGallery';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      <TemplateGallery />

      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="container mx-auto px-4 text-center">
          <div className="text-2xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Kandidatentekort.nl
            </span>
          </div>
          <p className="text-gray-400">
            Recruitment Landing Pages op Steroïden
          </p>
        </div>
      </footer>
    </div>
  );
}
```

---

### Stap 4: Hero Component (2 min)

Maak nieuw bestand: `components/Hero.tsx`

```tsx
export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600">
      <div className="container mx-auto px-4 py-20 sm:py-32">
        <div className="text-center text-white">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium">6 Templates • Tech & Industrie</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold mb-6">
            Van 4,5 uur naar<br />
            <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
              5 minuten
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
            AI-powered recruitment landing pages.<br />
            Kies je template. Pas aan. Live.
          </p>

          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mb-12">
            <div>
              <div className="text-4xl sm:text-5xl font-bold">95%</div>
              <div className="text-white/80">Sneller</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-bold">5 min</div>
              <div className="text-white/80">Live</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-bold">3x</div>
              <div className="text-white/80">Conversie</div>
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

      {/* Animated blobs */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  );
}
```

---

### Stap 5: Template Gallery (5 min)

Maak: `components/TemplateGallery.tsx`

```tsx
import { useState } from 'react';

const TEMPLATES = [
  {
    id: 'engineering',
    name: 'Engineering',
    sector: 'Techniek & Industrie',
    color: '#3B82F6',
    gradient: 'linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)',
    description: 'Professional blauw voor engineering vacatures',
    emoji: '🔵',
  },
  {
    id: 'tech',
    name: 'Tech & Software',
    sector: 'ICT & Telecom',
    color: '#6366F1',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    description: 'Modern purple voor software developers',
    emoji: '🟣',
  },
  {
    id: 'industrial',
    name: 'Industrie',
    sector: 'Productie & Metaal',
    color: '#F97316',
    gradient: 'linear-gradient(135deg, #4B5563 0%, #F97316 100%)',
    description: 'Stoer grijs/oranje voor productie',
    emoji: '⚙️',
  },
  {
    id: 'service',
    name: 'Service & Montage',
    sector: 'Technische Dienst',
    color: '#DC2626',
    gradient: 'linear-gradient(135deg, #DC2626 0%, #7F1D1D 100%)',
    description: 'Actie rood voor servicemonteurs',
    emoji: '🔧',
  },
  {
    id: 'logistics',
    name: 'Logistiek',
    sector: 'Transport & Distributie',
    color: '#10B981',
    gradient: 'linear-gradient(135deg, #10B981 0%, #047857 100%)',
    description: 'Helder groen voor logistiek professionals',
    emoji: '🚚',
  },
  {
    id: 'premium',
    name: 'Premium',
    sector: 'Management & Executive',
    color: '#D97706',
    gradient: 'linear-gradient(135deg, #1F2937 0%, #D97706 100%)',
    description: 'Luxe zwart/goud voor senior posities',
    emoji: '⭐',
  },
];

export default function TemplateGallery() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div id="templates" className="container mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          6 Templates voor Tech & Industrie
        </h2>
        <p className="text-xl text-gray-600">
          Elk met eigen kleurenschema en visuele identiteit
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {TEMPLATES.map(template => (
          <div
            key={template.id}
            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden border border-gray-100 cursor-pointer"
            onClick={() => setSelected(template.id)}
          >
            {/* Gradient Header */}
            <div
              className="h-48 flex items-center justify-center text-white relative overflow-hidden"
              style={{ background: template.gradient }}
            >
              <div className="text-8xl opacity-50">{template.emoji}</div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="text-center">
                  <div className="text-white font-bold text-lg mb-2">Preview</div>
                  <div className="text-white/80 text-sm">Klik voor demo</div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                  {template.sector}
                </span>
                <div
                  className="w-6 h-6 rounded-full border-2 border-white shadow"
                  style={{ background: template.color }}
                ></div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {template.emoji} {template.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {template.description}
              </p>

              <button
                className="w-full py-3 rounded-lg font-semibold text-white transition-all hover:scale-105"
                style={{ background: template.gradient }}
              >
                Gebruik Template →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-20 text-center bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl p-12 text-white shadow-2xl">
        <h2 className="text-4xl font-bold mb-4">
          Klaar om te starten?
        </h2>
        <p className="text-xl mb-8 text-white/90">
          Kies je template en pas aan met AI in 5 minuten
        </p>
        <button className="px-8 py-4 bg-white text-purple-600 rounded-lg hover:shadow-xl hover:scale-105 transition-all font-bold text-lg">
          Start Nu Gratis →
        </button>
      </div>
    </div>
  );
}
```

---

### Stap 6: Deploy (30 sec)

1. Klik **"Deploy"** (rechtsboven in Lovable)
2. Wacht 30 seconden
3. Krijg live URL: `your-project.lovable.app`
4. **Klaar!** 🎉

---

## Result

Je hebt nu een **professionele showcase site** met:
- ✅ Hero met gradient & animaties
- ✅ 6 Templates met hover effects
- ✅ Responsive design
- ✅ Live binnen 10 minuten

**Perfect voor:**
- Sales demos
- Client presentaties
- LinkedIn posts
- Portfolio

---

**Total tijd: 10-15 minuten** ⚡
