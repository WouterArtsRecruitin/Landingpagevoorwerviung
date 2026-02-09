import { cn } from "@/lib/utils";
import { DynamicIcon } from "@/components/shared/DynamicIcon";
import type { TrustSignalsSectionData } from "@/types/landing-page";

interface Props {
  data: TrustSignalsSectionData;
  sectionId: string;
  className?: string;
}

export default function TrustSignalsSection({ data, sectionId, className }: Props) {
  return (
    <section id={sectionId} className={cn("py-16 lg:py-20 bg-secondary text-white", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{data.heading}</h2>
          {data.subheading && (
            <p className="text-lg text-white/80 max-w-2xl mx-auto">{data.subheading}</p>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {data.stats.map((stat, i) => (
            <div key={i} className="text-center">
              <DynamicIcon name={stat.icon} className="h-8 w-8 text-primary mx-auto mb-3" />
              <p className="text-3xl font-bold mb-1">{stat.value}</p>
              <p className="text-sm text-white/70">{stat.label}</p>
            </div>
          ))}
        </div>

        {data.certifications && data.certifications.length > 0 && (
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {data.certifications.map((cert, i) => (
              <div key={i} className="bg-white/10 rounded-full px-4 py-2 text-sm">
                {cert.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
