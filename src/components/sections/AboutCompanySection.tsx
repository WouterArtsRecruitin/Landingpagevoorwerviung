import { cn } from "@/lib/utils";
import type { AboutCompanySectionData } from "@/types/section-data";

interface Props {
  data: AboutCompanySectionData;
  sectionId: string;
  className?: string;
}

export default function AboutCompanySection({ data, sectionId, className }: Props) {
  return (
    <section id={sectionId} className={cn("py-16 lg:py-24", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              {data.heading}
            </h2>
            <p className="text-lg text-muted-foreground mb-6 whitespace-pre-line">
              {data.description}
            </p>

            {data.highlights && data.highlights.length > 0 && (
              <ul className="space-y-2 mb-6">
                {data.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-center gap-2 text-foreground">
                    <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                    {highlight}
                  </li>
                ))}
              </ul>
            )}

            {data.stats && data.stats.length > 0 && (
              <div className="flex flex-wrap gap-6 mt-8">
                {data.stats.map((stat, i) => (
                  <div key={i}>
                    <p className="text-3xl font-bold text-primary">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {data.imageUrl && (
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src={data.imageUrl}
                alt={data.heading}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
