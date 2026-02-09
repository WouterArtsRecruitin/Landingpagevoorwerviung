import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FAQSectionData } from "@/types/landing-page";

interface Props {
  data: FAQSectionData;
  sectionId: string;
  className?: string;
}

export default function FAQSection({ data, sectionId, className }: Props) {
  return (
    <section id={sectionId} className={cn("py-16 lg:py-24", className)}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <Accordion type="single" collapsible className="space-y-2">
          {data.faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="bg-background rounded-lg border px-4">
              <AccordionTrigger className="text-left font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
