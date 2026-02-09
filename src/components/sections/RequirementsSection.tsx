import { Check, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { RequirementsSectionData } from "@/types/section-data";

interface Props {
  data: RequirementsSectionData;
  sectionId: string;
  className?: string;
}

export default function RequirementsSection({ data, sectionId, className }: Props) {
  return (
    <section id={sectionId} className={cn("py-16 lg:py-24 bg-muted/50", className)}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {data.heading}
          </h2>
          {data.subheading && (
            <p className="text-lg text-muted-foreground">
              {data.subheading}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Must have */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Check className="h-5 w-5 text-green-600" />
              Wat we vragen
            </h3>
            <ul className="space-y-3">
              {data.mustHave.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  {item.text}
                </li>
              ))}
            </ul>
          </div>

          {/* Nice to have */}
          {data.niceToHave && data.niceToHave.length > 0 && (
            <div>
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Plus className="h-5 w-5 text-blue-600" />
                Mooi meegenomen
              </h3>
              <ul className="space-y-3">
                {data.niceToHave.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Plus className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Not required */}
          {data.noRequirements && data.noRequirements.length > 0 && (
            <div>
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <X className="h-5 w-5 text-muted-foreground" />
                Niet nodig
              </h3>
              <ul className="space-y-3">
                {data.noRequirements.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <X className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
