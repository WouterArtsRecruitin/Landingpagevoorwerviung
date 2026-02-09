interface PageStats {
  id: string;
  slug: string;
  page_title: string;
  status: string;
  totalVisitors: number;
  totalApplications: number;
  conversionRate: number;
  avgTimeOnPage: number;
  avgScrollDepth: number;
  ctaClicks: number;
  whatsappClicks: number;
  topSources: Array<{ source: string; count: number }>;
}

export function MetricCard({ label, value, accent }: {
  label: string; value: number | string; accent?: "green" | "blue";
}) {
  const color = accent === "green" ? "text-green-600" : accent === "blue" ? "text-blue-600" : "text-gray-900";
  return (
    <div className="bg-white rounded-lg border p-4">
      <p className="text-xs text-gray-500">{label}</p>
      <p className={`text-2xl font-bold mt-1 ${color}`}>{value}</p>
    </div>
  );
}

export function MiniMetric({ label, value }: { label: string; value: number | string }) {
  return (
    <div>
      <p className="text-lg font-semibold text-gray-900">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    draft: "bg-gray-100 text-gray-600",
    published: "bg-green-100 text-green-700",
    paused: "bg-amber-100 text-amber-700",
    archived: "bg-red-100 text-red-600",
  };
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${styles[status] || styles.draft}`}>
      {status}
    </span>
  );
}

/** Automatische CRO-aanbevelingen op basis van data */
export function OptimizationAdvice({ stats }: { stats: PageStats[] }) {
  const advice: Array<{ type: "warning" | "tip" | "success"; page: string; message: string }> = [];

  for (const page of stats) {
    if (page.totalVisitors >= 20 && page.conversionRate < 3) {
      advice.push({
        type: "warning",
        page: page.page_title,
        message: `Conversie is ${page.conversionRate.toFixed(1)}% (benchmark: 5-10%). Overweeg: kortere formulier, salaris prominenter tonen, of CTA-tekst testen.`,
      });
    }

    if (page.totalVisitors >= 10 && page.avgScrollDepth < 40) {
      advice.push({
        type: "tip",
        page: page.page_title,
        message: `Gem. scroll is ${Math.round(page.avgScrollDepth)}%. Bezoekers zien het formulier niet. Overweeg: hero verbeteren, content boven de fold optimaliseren.`,
      });
    }

    if (page.totalVisitors >= 10 && page.avgTimeOnPage < 20) {
      advice.push({
        type: "warning",
        page: page.page_title,
        message: `Gem. tijd op pagina is ${Math.round(page.avgTimeOnPage)}s. Bezoekers vertrekken snel. Check: laadsnelheid, relevantie van hero tekst, mobiele weergave.`,
      });
    }

    if (page.ctaClicks > 5 && page.totalApplications === 0) {
      advice.push({
        type: "warning",
        page: page.page_title,
        message: `${page.ctaClicks} CTA clicks maar 0 sollicitaties. Het formulier blokkeert. Check: te veel velden, technisch probleem, of ontbrekend vertrouwen.`,
      });
    }

    if (page.totalVisitors >= 10 && page.conversionRate >= 8) {
      advice.push({
        type: "success",
        page: page.page_title,
        message: `Conversie van ${page.conversionRate.toFixed(1)}% - uitstekend! Gebruik deze pagina als template voor nieuwe vacatures.`,
      });
    }

    if (page.status === "published" && page.totalVisitors < 5) {
      advice.push({
        type: "tip",
        page: page.page_title,
        message: `Bijna geen bezoekers. Deel de link actief via LinkedIn, Indeed, of gerichte advertenties.`,
      });
    }

    if (page.whatsappClicks > 3 && page.totalApplications < page.whatsappClicks) {
      advice.push({
        type: "tip",
        page: page.page_title,
        message: `WhatsApp is populair (${page.whatsappClicks} clicks). Overweeg WhatsApp-solliciteren als primaire CTA.`,
      });
    }
  }

  if (advice.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg border p-4">
        <p className="text-sm text-gray-500">
          Nog niet genoeg data voor aanbevelingen. Minimaal 10-20 bezoekers per pagina nodig.
        </p>
      </div>
    );
  }

  const icons: Record<string, string> = {
    warning: "bg-red-100 text-red-700 border-red-200",
    tip: "bg-blue-50 text-blue-700 border-blue-200",
    success: "bg-green-50 text-green-700 border-green-200",
  };

  const labels: Record<string, string> = {
    warning: "Actie nodig",
    tip: "Tip",
    success: "Goed bezig",
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Aanbevelingen ({advice.length})
      </h3>
      <div className="space-y-3">
        {advice.map((a, i) => (
          <div key={i} className={`rounded-lg border p-4 ${icons[a.type]}`}>
            <div className="flex items-start gap-3">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white/50 flex-shrink-0">
                {labels[a.type]}
              </span>
              <div>
                <p className="text-xs font-medium mb-1">{a.page}</p>
                <p className="text-sm">{a.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
