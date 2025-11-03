import { Euro, GraduationCap, Car, Users, Heart, TrendingUp } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Benefits() {
  const benefits = [
    {
      icon: Euro,
      title: "€2.800 - €3.800 p/m",
      description: "+ 8% vakantiegeld + bonus",
    },
    {
      icon: Car,
      title: "Servicewagen",
      description: "Ook voor privé gebruik",
    },
    {
      icon: GraduationCap,
      title: "€2.000 Training Budget",
      description: "Academy in Zwitserland",
    },
    {
      icon: Heart,
      title: "25 Vakantiedagen",
      description: "Pensioen premievrij",
    },
    {
      icon: TrendingUp,
      title: "High-Tech Machines",
      description: "CAN-Bus, IoT, 48V systemen",
    },
    {
      icon: Users,
      title: "Klein Team",
      description: "Persoonlijke aandacht",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1759692072150-166d6387c616?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwZXF1aXBtZW50JTIwbWFpbnRlbmFuY2V8ZW58MXx8fHwxNzYxNjUzNDg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Werken bij Aebi Schmidt"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Benefits List */}
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl lg:text-4xl mb-4">Wat bieden wij jou?</h2>
            <p className="text-slate-600 mb-8">
              Premium arbeidsvoorwaarden bij een stabiel bedrijf met cutting-edge technologie.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="flex gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-red-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm mb-1">{benefit.title}</h3>
                      <p className="text-sm text-slate-600">{benefit.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
