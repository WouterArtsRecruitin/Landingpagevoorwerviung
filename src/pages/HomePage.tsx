import { Link } from 'react-router-dom';
import { useState } from 'react';
import FAQSection from '@/components/FAQSection';
import VideoSection from '@/components/VideoSection';

const TEMPLATES = [
  {
    id: 'modern',
    name: 'Modern Professional',
    emoji: '💼',
    sector: 'Alle Sectoren',
    color: '#3B82F6',
    gradient: 'linear-gradient(135deg, #1E293B 0%, #3B82F6 100%)',
    description: 'Dark modern design met professionele uitstraling - Perfect voor alle sectoren',
    demoUrl: '/v/template-a-modern',
    demoCompany: 'TechVision AI'
  },
  // Template B & C - Beschikbaar later
  // {
  //   id: 'dynamic',
  //   name: 'Bold & Dynamic',
  //   emoji: '⚡',
  //   sector: 'Alle Sectoren',
  //   color: '#10B981',
  //   gradient: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
  //   description: 'Energiek groen design - Ideaal voor innovatieve organisaties',
  //   demoUrl: '/v/template-b-dynamic',
  //   demoCompany: 'GreenBuild Solutions'
  // },
  // {
  //   id: 'corporate',
  //   name: 'Classic Corporate',
  //   emoji: '🏢',
  //   sector: 'Alle Sectoren',
  //   color: '#6366F1',
  //   gradient: 'linear-gradient(135deg, #FFFFFF 0%, #6366F1 100%)',
  //   description: 'Clean corporate stijl - Perfect voor finance & traditionele bedrijven',
  //   demoUrl: '/v/template-c-corporate',
  //   demoCompany: 'Fintech Partners'
  // },
];

export default function HomePage() {
  const [showAllTemplates, setShowAllTemplates] = useState(false);
  const templatesToShow = showAllTemplates ? TEMPLATES : TEMPLATES.slice(0, 2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="container mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Kandidatentekort.nl
          </div>
          <Link
            to="/admin"
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            Login →
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 py-20 sm:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            Geautomatiseerde vacaturepagina's in 5 minuten
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Stop met zoeken naar kandidaten.
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Laat ze je vinden.
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Genereer conversiegerichte vacaturepagina's met AI in enkele klikken.
            Geen designers, geen developers, geen gedoe.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/admin/nieuw"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all font-semibold text-lg"
            >
              Start gratis trial →
            </Link>
            <a
              href="#hoe-werkt-het"
              className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-lg hover:border-gray-300 transition-all font-semibold text-lg"
            >
              Bekijk demo
            </a>
          </div>

          <p className="text-sm text-gray-500 mt-6">
            ✓ Geen creditcard nodig &nbsp; · &nbsp; ✓ Direct aan de slag &nbsp; · &nbsp; ✓ Opzeggen wanneer je wilt
          </p>
        </div>
      </section>

      {/* Social Proof */}
      <section className="container mx-auto px-4 sm:px-6 py-12 border-y border-gray-200 bg-white/50">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-sm text-gray-500 mb-6">Templates geschikt voor alle sectoren</p>
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 opacity-60">
            <div className="text-lg font-semibold text-gray-400">Tech & IT</div>
            <div className="text-lg font-semibold text-gray-400">Bouw & Vastgoed</div>
            <div className="text-lg font-semibold text-gray-400">Finance</div>
            <div className="text-lg font-semibold text-gray-400">Zorg & Welzijn</div>
            <div className="text-lg font-semibold text-gray-400">Industrie</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="hoe-werkt-het" className="container mx-auto px-4 sm:px-6 py-20 sm:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Van intake tot live in 5 minuten
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Geen technische kennis nodig. Geen design skills vereist. Gewoon resultaat.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all border border-gray-100">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">1. Vul intake formulier</h3>
              <p className="text-gray-600 leading-relaxed">
                Beantwoord een paar vragen over de vacature. Ons AI-systeem analyseert en optimaliseert direct.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all border border-gray-100">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">2. Automatische generatie</h3>
              <p className="text-gray-600 leading-relaxed">
                Binnen 5 seconden staat je conversiegerichte vacaturepagina klaar. Met SEO en mobile-first design.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all border border-gray-100">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">3. Approve & Live</h3>
              <p className="text-gray-600 leading-relaxed">
                Deel met je klant voor approval. Eén klik en de pagina is live. Sollicitaties komen binnen op je inbox.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Tutorial */}
      <VideoSection />

      {/* Templates Showcase */}
      <section className="container mx-auto px-4 sm:px-6 py-20 sm:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Professioneel Template voor Alle Sectoren
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Modern dark design met professionele uitstraling.
              Werkt perfect voor tech, bouw, finance, zorg en alle andere branches.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {templatesToShow.map(template => (
              <div
                key={template.id}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden border border-gray-100"
              >
                <div
                  className="h-48 flex items-center justify-center text-white relative overflow-hidden"
                  style={{ background: template.gradient }}
                >
                  <div className="text-8xl opacity-50">{template.emoji}</div>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="text-center px-4">
                      <div className="text-white font-bold text-lg mb-2">Bekijk Preview</div>
                      <div className="text-white/80 text-sm">Klik voor details</div>
                    </div>
                  </div>
                </div>

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

                  <div className="space-y-2">
                    <Link
                      to={template.demoUrl}
                      className="block w-full py-3 rounded-lg font-semibold text-white text-center transition-all hover:scale-105 shadow"
                      style={{ background: template.gradient }}
                    >
                      Bekijk Demo ({template.demoCompany}) →
                    </Link>
                    <Link
                      to="/admin/nieuw"
                      className="block w-full py-2 rounded-lg font-medium text-gray-700 text-center border-2 border-gray-300 hover:border-gray-400 transition-all text-sm"
                    >
                      Maak jouw eigen pagina
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {!showAllTemplates && (
            <div className="text-center">
              <button
                onClick={() => setShowAllTemplates(true)}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-xl hover:scale-105 transition-all font-bold text-lg"
              >
                Toon meer templates ({TEMPLATES.length - 2} meer)
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-gray-900 text-white py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                Waarom recruitment teams kiezen voor ons
              </h2>
              <p className="text-xl text-gray-400">
                Bespaar 95% tijd op het maken van vacaturepaginas
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  95%
                </div>
                <p className="text-gray-400">Sneller live</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  5 min
                </div>
                <p className="text-gray-400">Tot publicatie</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  3x
                </div>
                <p className="text-gray-400">Meer conversie</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  0
                </div>
                <p className="text-gray-400">Technische kennis</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection />

      {/* CTA */}
      <section className="container mx-auto px-4 sm:px-6 py-20 sm:py-32">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-12 sm:p-16 text-white shadow-2xl">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Klaar om te beginnen?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Start vandaag nog met het automatisch genereren van conversiegerichte vacaturepaginas
          </p>
          <Link
            to="/admin/nieuw"
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg hover:shadow-xl hover:scale-105 transition-all font-bold text-lg"
          >
            Start gratis trial →
          </Link>
          <p className="text-sm text-blue-100 mt-6">
            Geen creditcard nodig · Direct aan de slag
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  Kandidatentekort.nl
                </div>
                <p className="text-sm text-gray-600">
                  Geautomatiseerde recruitment landing pages
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Product</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><a href="#" className="hover:text-gray-900">Features</a></li>
                  <li><a href="#" className="hover:text-gray-900">Pricing</a></li>
                  <li><a href="#" className="hover:text-gray-900">Demo</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Resources</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><a href="#" className="hover:text-gray-900">Blog</a></li>
                  <li><a href="#" className="hover:text-gray-900">Support</a></li>
                  <li><a href="#" className="hover:text-gray-900">Docs</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Contact</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>wouter@kandidatentekort.nl</li>
                  <li>+31 6 12345678</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
              © 2026 Kandidatentekort.nl · Alle rechten voorbehouden
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
