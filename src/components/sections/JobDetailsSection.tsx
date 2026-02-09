import { cn } from "@/lib/utils";
import { DynamicIcon } from "@/components/shared/DynamicIcon";
import type { JobDetailsSectionData } from "@/types/section-data";

interface Props {
  data: JobDetailsSectionData;
  sectionId: string;
  className?: string;
}

export default function JobDetailsSection({ data, sectionId, className }: Props) {
  return (
    <section id={sectionId} className={cn("py-16 lg:py-24", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {data.heading}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {data.description}
          </p>
        </div>

        {/* Quick info */}
        {data.quickInfo && data.quickInfo.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {data.quickInfo.map((item, i) => (
              <div key={i} className="text-center p-4 rounded-lg bg-muted/50">
                <DynamicIcon name={item.icon} className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="font-semibold text-foreground">{item.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Responsibilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.responsibilities.map((item, i) => (
            <div key={i} className="flex gap-4 p-4 rounded-lg hover:bg-muted/30 transition-colors">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                {i + 1}
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
