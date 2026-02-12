export default function Hero() {
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
