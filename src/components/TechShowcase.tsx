import { Cpu, Gauge, Zap, Cog, Radio, Thermometer } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

export function TechShowcase() {
  const techSystems = [
    {
      icon: Cpu,
      title: "CAN-Bus Diagnostics",
      description: "Real-time foutcode analyse & software updates",
      level: "Expert",
    },
    {
      icon: Gauge,
      title: "Hydraulische Systemen",
      description: "High-pressure hydrauliek tot 350 bar",
      level: "Advanced",
    },
    {
      icon: Zap,
      title: "48V Elektronica",
      description: "Elektrische aandrijvingen & battery management",
      level: "Expert",
    },
    {
      icon: Radio,
      title: "IoT & Telemetrie",
      description: "Remote diagnostics & predictive maintenance",
      level: "Expert",
    },
  ];

  const machines = [
    {
      name: "eSwingo 200+",
      type: "Elektrische Veegmachine",
      price: "€180.000",
      tech: "100% elektrisch 48V systeem • CAN-Bus touchscreen",
      highlight: "Zero-emission tech",
    },
    {
      name: "Schmidt Stratos",
      type: "Winterdienstvoertuig",
      price: "€250.000",
      tech: "GPS-gestuurde strooiautomaat • Hydraulische V-schuif",
      highlight: "Intelligent dosering",
    },
    {
      name: "Aebi TT 281",
      type: "Multifunctioneel Systeem",
      price: "€200.000",
      tech: "100 PK turbo • 40+ werktuigen • Joystick control",
      highlight: "Swiss precision",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#E30613]/20 border border-[#E30613]/40 rounded-full px-4 py-2 mb-6">
            <Cpu className="w-4 h-4 text-[#E30613]" />
            <span className="text-sm text-[#E30613] font-medium">High-Tech Engineering</span>
          </div>
          <h2 className="text-3xl lg:text-5xl mb-6 text-white">
            Werk met de meest geavanceerde machines ter wereld
          </h2>
          <p className="text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
            Aebi Schmidt is een verborgen parel in de technische wereld. Onze machines combineren 
            Zwitserse precisie met cutting-edge technologie. Van IoT en CAN-Bus diagnostics tot 
            geavanceerde hydrauliek en elektrische aandrijvingen.
          </p>
        </div>

        {/* Technical Systems Grid */}
        <div className="mb-16">
          <h3 className="text-2xl mb-8 text-center text-white">Technische Systemen waar je mee werkt</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {techSystems.map((system, index) => {
              const Icon = system.icon;
              return (
                <Card key={index} className="bg-slate-800 border-slate-700 p-6 hover:bg-slate-750 transition-colors text-center">
                  <div className="w-14 h-14 rounded-lg bg-[#E30613]/20 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-[#E30613]" />
                  </div>
                  <Badge variant="outline" className="border-[#E30613]/40 text-[#E30613] bg-[#E30613]/10 text-xs mb-3">
                    {system.level}
                  </Badge>
                  <h4 className="mb-2 text-white">{system.title}</h4>
                  <p className="text-sm text-slate-300">{system.description}</p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Machine Specs */}
        <div>
          <h3 className="text-2xl mb-8 text-center text-white">Premium machines uit ons portfolio</h3>
          <div className="grid lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {machines.map((machine, index) => (
              <div key={index} className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors">
                <div className="text-center mb-4">
                  <div className="text-xs text-[#E30613] mb-1 uppercase tracking-wider">{machine.type}</div>
                  <h4 className="text-xl mb-1 text-white">{machine.name}</h4>
                  <div className="text-2xl text-[#E30613] font-semibold">{machine.price}</div>
                </div>
                
                <p className="text-sm text-slate-200 mb-4 leading-relaxed">{machine.tech}</p>

                <div className="bg-[#E30613]/10 border border-[#E30613]/30 rounded-lg px-3 py-2 text-xs text-[#E30613] text-center font-medium">
                  ✨ {machine.highlight}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 grid sm:grid-cols-4 gap-6 text-center">
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:bg-slate-800 transition-colors">
            <div className="text-3xl mb-2 text-[#E30613] font-semibold">140+</div>
            <div className="text-sm text-slate-300">Jaar innovatie</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:bg-slate-800 transition-colors">
            <div className="text-3xl mb-2 text-[#E30613] font-semibold">50+</div>
            <div className="text-sm text-slate-300">Machine types</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:bg-slate-800 transition-colors">
            <div className="text-3xl mb-2 text-[#E30613] font-semibold">€15M+</div>
            <div className="text-sm text-slate-300">R&D per jaar</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:bg-slate-800 transition-colors">
            <div className="text-3xl mb-2 text-[#E30613] font-semibold">100%</div>
            <div className="text-sm text-slate-300">Swiss engineering</div>
          </div>
        </div>
      </div>
    </section>
  );
}
