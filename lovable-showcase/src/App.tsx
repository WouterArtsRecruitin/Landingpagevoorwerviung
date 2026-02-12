// 🎨 MEGA APP - Complete Lovable Showcase in 1 File
// Copy-paste this ENTIRE file into Lovable's App.tsx

import { useState } from 'react';

// ============================================
// TEMPLATE DATA
// ============================================

const TEMPLATES = [
  {
    id: 'engineering',
    name: 'Engineering',
    emoji: '🔵',
    sector: 'Techniek & Industrie',
    color: '#3B82F6',
    gradient: 'linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)',
    description: 'Professional blauw voor engineering professionals',
    features: [
      'Betrouwbaar & professioneel design',
      'Focus op technische specs',
      'Geschikt voor: Engineers, Technici, Monteurs'
    ],
  },
  {
    id: 'tech',
    name: 'Tech & Software',
    emoji: '🟣',
    sector: 'ICT & Telecom',
    color: '#6366F1',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    description: 'Modern purple voor software developers & IT',
    features: [
      'Modern & innovatief design',
      'Tech-savvy uitstraling',
      'Geschikt voor: Developers, IT, Software Engineers'
    ],
  },
  {
    id: 'industrial',
    name: 'Industrie',
    emoji: '⚙️',
    sector: 'Productie & Metaal',
    color: '#F97316',
    gradient: 'linear-gradient(135deg, #4B5563 0%, #F97316 100%)',
    description: 'Stoer grijs/oranje voor productie & metaalbewerking',
    features: [
      'Robuust & krachtig design',
      'Focus op vakmanschap',
      'Geschikt voor: CNC, Lassers, Productie'
    ],
  },
  {
    id: 'service',
    name: 'Service & Montage',
    emoji: '🔧',
    sector: 'Technische Dienst',
    color: '#DC2626',
    gradient: 'linear-gradient(135deg, #DC2626 0%, #7F1D1D 100%)',
    description: 'Actie rood voor service monteurs & technici',
    features: [
      'Energiek & dynamisch',
      'Focus op actie & snelheid',
      'Geschikt voor: Servicemonteurs, Field Engineers'
    ],
  },
  {
    id: 'logistics',
    name: 'Logistiek',
    emoji: '🚚',
    sector: 'Transport & Distributie',
    color: '#10B981',
    gradient: 'linear-gradient(135deg, #10B981 0%, #047857 100%)',
    description: 'Helder groen voor logistiek & transport',
    features: [
      'Fris & helder design',
      'Focus op efficiency',
      'Geschikt voor: Chauffeurs, Logistiek, Warehouse'
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    emoji: '⭐',
    sector: 'Management & Executive',
    color: '#D97706',
    gradient: 'linear-gradient(135deg, #1F2937 0%, #D97706 100%)',
    description: 'Luxe zwart/goud voor senior posities',
    features: [
      'Exclusief & elegant',
      'Focus op kwaliteit',
      'Geschikt voor: Managers, Directors, Executives'
    ],
  },
];

// ============================================
// COMPONENTS
// ============================================

function TemplateCard({ template, onSelect }: any) {
  return (
    <div
      onClick={() => onSelect(template.id)}
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden border border-gray-100 cursor-pointer"
    >
      {/* Gradient Header */}
      <div
        className="h-48 flex items-center justify-center text-white relative overflow-hidden"
        style={{ background: template.gradient }}
      >
        <div className="text-8xl opacity-50">{template.emoji}</div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="text-center px-4">
            <div className="text-white font-bold text-lg mb-2">Bekijk Preview</div>
            <div className="text-white/80 text-sm">Klik voor details</div>
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

        {/* Features */}
        <ul className="space-y-1 mb-4">
          {template.features.slice(0, 2).map((feature: string, i: number) => (
            <li key={i} className="text-xs text-gray-500 flex items-start gap-1">
              <span className="text-green-500">✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <button
          className="w-full py-3 rounded-lg font-semibold text-white transition-all hover:scale-105 shadow"
          style={{ background: template.gradient }}
        >
          Gebruik Template →
        </button>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600">
      <div className="container mx-auto px-4 py-20 sm:py-32">
        <div className="text-center text-white">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium">6 Templates • Tech & Industrie Recruitment</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold mb-6 leading-tight">
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
              <div className="text-white/80 text-sm sm:text-base">Sneller Live</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-bold">5 min</div>
              <div className="text-white/80 text-sm sm:text-base">Tot Publicatie</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-bold">3x</div>
              <div className="text-white/80 text-sm sm:text-base">Meer Conversie</div>
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
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  );
}

function TemplateGallery() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    alert(`Je koos: ${TEMPLATES.find(t => t.id === id)?.name}`);
  };

  return (
    <div id="templates" className="container mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          6 Templates voor Tech & Industrie
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Elk template heeft een uniek kleurenschema en visuele identiteit.
          Kies wat past bij jouw vacature.
        </p>
      </div>

      {/* Template Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {TEMPLATES.map(template => (
          <TemplateCard
            key={template.id}
            template={template}
            onSelect={handleSelect}
          />
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-20 text-center bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl p-12 sm:p-16 text-white shadow-2xl">
        <h2 className="text-4xl font-bold mb-4">
          Klaar om te starten?
        </h2>
        <p className="text-xl mb-8 text-white/90">
          Kies je template en genereer een professionele vacaturepagina in 5 minuten
        </p>
        <button className="px-8 py-4 bg-white text-purple-600 rounded-lg hover:shadow-xl hover:scale-105 transition-all font-bold text-lg">
          Start Nu Gratis →
        </button>
        <p className="text-sm text-white/70 mt-4">
          Geen creditcard nodig • Direct aan de slag
        </p>
      </div>
    </div>
  );
}

// ============================================
// MAIN APP
// ============================================

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
          <p className="text-gray-400 mb-2">
            AI-Powered Recruitment Landing Pages
          </p>
          <p className="text-gray-500 text-sm">
            © 2026 • Tech & Industrie Specialist
          </p>
        </div>
      </footer>
    </div>
  );
}
