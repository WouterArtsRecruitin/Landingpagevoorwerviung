import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Wrench, Snowflake, Truck, Gauge } from "lucide-react";
import veegmachineWinter from "figma:asset/850154234cd67e1eaca7a5469c5dc0f6652fabd5.png";

export function VeegmachineShowcase() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#E30613]/10 border border-[#E30613]/20 px-4 py-2 rounded-full font-medium mb-6">
            <Truck className="w-4 h-4 text-[#E30613]" />
            <span className="text-[#E30613]">Waarmee je werkt</span>
          </div>
          <h2 className="mb-4">
            Innovatieve <span className="text-[#E30613]">Aebi Schmidt</span> Machines
          </h2>
          <p className="text-slate-600 max-w-3xl mx-auto">
            Van compacte veegmachines tot krachtige winterdienstvoertuigen - 
            werk met de meest geavanceerde apparatuur in de sector
          </p>
        </div>

        {/* Main Showcase Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
          
          {/* Image */}
          <div className="order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <div className="aspect-[16/10] bg-slate-100">
                <img
                  src={veegmachineWinter}
                  alt="Aebi Schmidt sneeuwschuif en veegmachine in winterse omgeving"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              {/* Overlay Badge */}
              <div className="absolute top-4 right-4 bg-[#E30613] text-white px-4 py-2 rounded-lg shadow-lg">
                <p className="font-semibold">Swiss Quality</p>
                <p className="text-red-100">Since 1883</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <h3 className="mb-6 text-[#003B5C]">
              High-Tech Winterdienst & Veegmachines
            </h3>
            
            <p className="text-slate-600 mb-8">
              Als servicemonteur bij Aebi Schmidt werk je met de meest geavanceerde 
              machines in de industrie. Onze veegmachines en winterdienstvoertuigen 
              combineren Zwitserse precisie met cutting-edge technologie.
            </p>

            {/* Feature Grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              
              {/* Feature 1 */}
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-[#E30613]/10 rounded-lg flex items-center justify-center">
                  <Snowflake className="w-5 h-5 text-[#E30613]" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Winterdienst</h4>
                  <p className="text-slate-600">Sneeuwschuiven, strooiers, veegmachines</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-[#003B5C]/10 rounded-lg flex items-center justify-center">
                  <Truck className="w-5 h-5 text-[#003B5C]" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Veegmachines</h4>
                  <p className="text-slate-600">Straatreiniging & industriële reiniging</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-[#E30613]/10 rounded-lg flex items-center justify-center">
                  <Gauge className="w-5 h-5 text-[#E30613]" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Moderne Techniek</h4>
                  <p className="text-slate-600">Elektronica, hydrauliek, software</p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-[#003B5C]/10 rounded-lg flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-[#003B5C]" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Service & Onderhoud</h4>
                  <p className="text-slate-600">Preventief en curatief onderhoud</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 pt-6 border-t border-slate-200">
              <div>
                <p className="text-[#E30613] mb-1">500+</p>
                <p className="text-slate-600">Machines in NL</p>
              </div>
              <div>
                <p className="text-[#E30613] mb-1">140 jaar</p>
                <p className="text-slate-600">Ervaring</p>
              </div>
              <div>
                <p className="text-[#E30613] mb-1">€50M+</p>
                <p className="text-slate-600">Wagenpark waarde</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-br from-[#003B5C] to-[#002A42] rounded-2xl p-8 lg:p-12 text-white text-center">
          <h3 className="mb-4">
            Passie voor machines? Word onderdeel van ons team!
          </h3>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8">
            Werk aan high-tech apparatuur die steden bereikbaar houdt, zelfs tijdens de zwaarste sneeuwstormen
          </p>
          <button
            onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 bg-[#E30613] hover:bg-[#C00510] text-white px-8 py-4 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
          >
            <span>Solliciteer Direct</span>
            <Truck className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
