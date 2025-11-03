import { Coffee, Wrench, Users, Home, CheckCircle2 } from "lucide-react";

export function DayInLife() {
  const schedule = [
    {
      time: "08:00",
      icon: Coffee,
      title: "Start van de dag",
      description: "Koffie op kantoor, bespreken planning en checken servicewagen",
      color: "bg-blue-100 text-blue-600",
    },
    {
      time: "09:00",
      icon: Wrench,
      title: "Eerste klus",
      description: "Onderhoud aan veegmachine bij gemeente in Apeldoorn",
      color: "bg-red-100 text-red-600",
    },
    {
      time: "11:30",
      icon: CheckCircle2,
      title: "Tweede opdracht",
      description: "Storing oplossen bij aannemersbedrijf in Deventer",
      color: "bg-green-100 text-green-600",
    },
    {
      time: "13:00",
      icon: Coffee,
      title: "Lunch pauze",
      description: "Lunchpauze bij een klant of onderweg",
      color: "bg-purple-100 text-purple-600",
    },
    {
      time: "14:00",
      icon: Users,
      title: "Installatie & training",
      description: "Nieuwe machine afleveren en klant instrueren",
      color: "bg-red-100 text-red-600",
    },
    {
      time: "16:30",
      icon: Home,
      title: "Afronden",
      description: "Administratie bijwerken en voorbereiden voor morgen",
      color: "bg-slate-100 text-slate-600",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl mb-4">Een dag uit het leven van een servicemonteur</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Elke dag is anders, maar dit geeft je een goed beeld van wat je kunt verwachten
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200 hidden sm:block"></div>

            {/* Timeline items */}
            <div className="space-y-8">
              {schedule.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="relative flex gap-6 items-start">
                    {/* Time indicator */}
                    <div className="flex-shrink-0 w-16 pt-1">
                      <div className="text-sm text-slate-600">{item.time}</div>
                    </div>

                    {/* Icon */}
                    <div className={`flex-shrink-0 w-16 h-16 rounded-full ${item.color} flex items-center justify-center relative z-10`}>
                      <Icon className="w-8 h-8" />
                    </div>

                    {/* Content */}
                    <div className="flex-grow pt-2 pb-8">
                      <h3 className="text-xl mb-2">{item.title}</h3>
                      <p className="text-slate-600">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Key Points */}
        <div className="mt-16 grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-slate-50 rounded-xl">
            <div className="text-3xl mb-2">2-4</div>
            <div className="text-slate-600">Klanten per dag</div>
          </div>
          <div className="text-center p-6 bg-slate-50 rounded-xl">
            <div className="text-3xl mb-2">60%</div>
            <div className="text-slate-600">On-site bij klanten</div>
          </div>
          <div className="text-center p-6 bg-slate-50 rounded-xl">
            <div className="text-3xl mb-2">100%</div>
            <div className="text-slate-600">Afwisselend werk</div>
          </div>
        </div>
      </div>
    </section>
  );
}
