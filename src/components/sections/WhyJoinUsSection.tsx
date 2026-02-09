import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { DynamicIcon } from "@/components/shared/DynamicIcon";
import type { WhyJoinUsSectionData } from "@/types/landing-page";

interface Props {
  data: WhyJoinUsSectionData;
  sectionId: string;
  className?: string;
}

export default function WhyJoinUsSection({ data, sectionId, className }: Props) {
  return (
    <section id={sectionId} className={cn("py-16 lg:py-24 bg-primary/5", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {data.heading}
          </h2>
          {data.subheading && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {data.subheading}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.reasons.map((reason, i) => (
            <Card key={i} className="border-0 shadow-sm text-center">
              <CardContent className="p-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <DynamicIcon name={reason.icon} className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{reason.title}</h3>
                <p className="text-sm text-muted-foreground">{reason.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
