import { cn } from "@/lib/utils";
import type { CustomHTMLSectionData } from "@/types/landing-page";

interface Props {
  data: CustomHTMLSectionData;
  sectionId: string;
  className?: string;
}

export default function CustomHTMLSection({ data, sectionId, className }: Props) {
  return (
    <section id={sectionId} className={cn("py-16 lg:py-24", className)}>
      <div className={cn("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", data.containerClass)}>
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: data.html }}
        />
      </div>
    </section>
  );
}
