import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { DynamicIcon } from "@/components/shared/DynamicIcon";
import type { SalaryBreakdownSectionData } from "@/types/landing-page";

interface Props {
  data: SalaryBreakdownSectionData;
  sectionId: string;
  className?: string;
}

export default function SalaryBreakdownSection({ data, sectionId, className }: Props) {
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

        <div className="space-y-4 mb-8">
          {data.items.map((item, i) => (
            <Card key={i} className="border-0 shadow-sm">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <DynamicIcon name={item.icon} className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <p className="font-bold text-lg text-primary">{item.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Total */}
        <Card className="bg-primary text-white border-0">
          <CardContent className="p-6 text-center">
            <p className="text-sm opacity-90 mb-1">{data.totalLabel}</p>
            <p className="text-4xl font-extrabold mb-1">{data.totalValue}</p>
            {data.totalDescription && (
              <p className="text-sm opacity-80">{data.totalDescription}</p>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
