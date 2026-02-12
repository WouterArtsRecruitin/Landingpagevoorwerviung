export default function VideoSection() {
  return (
    <section className="container mx-auto px-4 sm:px-6 py-20 sm:py-32 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-6">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
            </svg>
            Video Tutorial
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Zie hoe het werkt
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Van leeg formulier tot gepubliceerde vacaturepagina in 5 minuten
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Video 1: Intake Form */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className="aspect-video bg-black relative group">
              <video
                controls
                preload="metadata"
                className="w-full h-full object-contain bg-gray-900"
                poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Crect fill='%233B82F6' width='16' height='9'/%3E%3Ctext x='50%25' y='50%25' fill='white' text-anchor='middle' dy='.3em' font-size='2'%3EDeel 1%3C/text%3E%3C/svg%3E"
                onError={(e) => {
                  console.error('Video load error:', e);
                  const target = e.target as HTMLVideoElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = '<div class="flex items-center justify-center h-full bg-gray-100"><div class="text-center p-8"><p class="text-gray-600 mb-4">⚠️ Video kan niet geladen worden</p><a href="/videos/mtee-complete-part1-1405.webm" download class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Download video</a></div></div>';
                  }
                }}
              >
                <source src="/videos/mtee-complete-part1-1405.webm" type="video/webm" />
                <p className="text-center p-8">
                  Je browser ondersteunt geen video playback.
                  <a href="/videos/mtee-complete-part1-1405.webm" download className="text-blue-600 underline ml-2">
                    Download de video
                  </a>
                </p>
              </video>
              <div className="absolute top-4 left-4 pointer-events-none">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium">
                  Deel 1: Intake Form
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Stap 1: Vul het formulier in
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Zie hoe je het 5-staps intake formulier invult met vacature gegevens.
                Van bedrijfsinfo tot contact details.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Bedrijfsgegevens & branding</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Template selectie & styling</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Verantwoordelijkheden & eisen</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Video 2: Landing Page Result */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className="aspect-video bg-black relative group">
              <video
                controls
                preload="metadata"
                className="w-full h-full object-contain bg-gray-900"
                poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Crect fill='%236366F1' width='16' height='9'/%3E%3Ctext x='50%25' y='50%25' fill='white' text-anchor='middle' dy='.3em' font-size='2'%3EDeel 2%3C/text%3E%3C/svg%3E"
                onError={(e) => {
                  console.error('Video load error:', e);
                  const target = e.target as HTMLVideoElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = '<div class="flex items-center justify-center h-full bg-gray-100"><div class="text-center p-8"><p class="text-gray-600 mb-4">⚠️ Video kan niet geladen worden</p><a href="/videos/mtee-complete-part2-1405.webm" download class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Download video</a></div></div>';
                  }
                }}
              >
                <source src="/videos/mtee-complete-part2-1405.webm" type="video/webm" />
                <p className="text-center p-8">
                  Je browser ondersteunt geen video playback.
                  <a href="/videos/mtee-complete-part2-1405.webm" download className="text-blue-600 underline ml-2">
                    Download de video
                  </a>
                </p>
              </video>
              <div className="absolute top-4 left-4 pointer-events-none">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium">
                  Deel 2: Resultaat
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Stap 2: Bekijk de landing page
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Zie de gegenereerde vacaturepagina in actie. Alle secties, styling en
                formulier automatisch geconfigureerd.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Hero sectie met CTA's</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Alle content secties</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Sollicitatie formulier</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA below videos */}
        <div className="mt-12 text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
          <p className="text-gray-600 mb-4">
            <strong>Pro tip:</strong> Bekijk de video's voordat je begint, zo ben je in 5 minuten klaar! 🚀
          </p>
          <a
            href="/admin/nieuw"
            className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all font-semibold"
          >
            Zelf proberen →
          </a>
        </div>
      </div>
    </section>
  );
}
