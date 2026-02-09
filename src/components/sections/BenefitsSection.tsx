import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { DynamicIcon } from "@/components/shared/DynamicIcon";
import type { BenefitsSectionData } from "@/types/landing-page";

interface Props {
  data: BenefitsSectionData;
  sectionId: string;
  className?: string;
}

export default function BenefitsSection({ data, sectionId, className }: Props) {
  return (
    <section id={sectionId} className={cn("py-16 lg:py-24 bg-muted/50", className)}>
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
          {data.benefits.map((benefit, i) => (
            <Card key={i} className="group hover:shadow-lg transition-shadow duration-300 border-0 bg-background">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <DynamicIcon name={benefit.icon} className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
