import { cn } from "@/lib/utils";
import { DynamicIcon } from "@/components/shared/DynamicIcon";
import type { DayInLifeSectionData } from "@/types/section-data";

interface Props {
  data: DayInLifeSectionData;
  sectionId: string;
  className?: string;
}

export default function DayInLifeSection({ data, sectionId, className }: Props) {
  return (
    <section id={sectionId} className={cn("py-16 lg:py-24", className)}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {data.heading}
          </h2>
          {data.subheading && (
            <p className="text-lg text-muted-foreground">{data.subheading}</p>
          )}
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-primary/20 hidden md:block" />

          <div className="space-y-8">
            {data.timeline.map((item, i) => (
              <div key={i} className="flex gap-6 items-start">
                {/* Timeline dot */}
                <div className="hidden md:flex flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 items-center justify-center z-10 border-4 border-background">
                  {item.icon ? (
                    <DynamicIcon name={item.icon} className="h-5 w-5 text-primary" />
                  ) : (
                    <span className="text-xs font-bold text-primary">{item.time}</span>
                  )}
                </div>

                <div className="flex-1 bg-background rounded-lg p-4 border hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-primary">{item.time}</span>
                    <span className="text-xs text-muted-foreground">|</span>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
