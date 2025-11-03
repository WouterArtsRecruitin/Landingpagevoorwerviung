import { Award, TrendingUp, Globe, Sparkles } from "lucide-react";

export function HiddenGem() {
  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-red-50 via-white to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Main Message */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-red-600 text-white rounded-full px-6 py-3 mb-6 shadow-lg">
              <Sparkles className="w-5 h-5" />
              <span>De verborgen parel van de technische sector</span>
            </div>
            <h2 className="text-3xl lg:text-4xl mb-4">
              Waarom ken je Aebi Schmidt nog niet?
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed max-w-3xl mx-auto">
              Terwijl iedereen droomt van Apple of Tesla, werken wij dagelijks met technologie 
              die net zo geavanceerd is – maar dan voor machines met échte maatschappelijke impact.
            </p>
          </div>

          {/* Comparison Points */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="mb-4 text-slate-500">Andere tech bedrijven:</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-slate-400">•</span>
                  <span>Consumer products</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-400">•</span>
                  <span>Honderden sollicitanten</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-400">•</span>
                  <span>Beperkte hands-on</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-xl p-6 shadow-xl border-2 border-red-500 text-white">
              <h3 className="mb-4 flex items-center gap-2">
                <Award className="w-5 h-5" />
                Aebi Schmidt:
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>Critical infrastructure</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>Persoonlijke aandacht</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>140 jaar stabiliteit (sinds 1883)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Key Differentiators */}
          <div className="bg-slate-900 text-white rounded-xl p-8">
            <div className="grid sm:grid-cols-3 gap-6 text-center">
              <div>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-600 mb-3">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h4 className="mb-2 text-sm">Cutting-edge tech</h4>
                <p className="text-xs text-slate-400">
                  IoT, elektrische aandrijvingen, autonome functies
                </p>
              </div>
              <div>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-600 mb-3">
                  <Globe className="w-6 h-6" />
                </div>
                <h4 className="mb-2 text-sm">Global impact</h4>
                <p className="text-xs text-slate-400">
                  Actief in 40+ landen wereldwijd
                </p>
              </div>
              <div>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-600 mb-3">
                  <Award className="w-6 h-6" />
                </div>
                <h4 className="mb-2 text-sm">Swiss precision</h4>
                <p className="text-xs text-slate-400">
                  140 jaar engineering excellence
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
