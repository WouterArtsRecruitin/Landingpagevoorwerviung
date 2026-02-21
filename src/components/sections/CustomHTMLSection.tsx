import { useMemo } from "react";
import DOMPurify from "dompurify";
import { cn } from "@/lib/utils";
import type { CustomHTMLSectionData } from "@/types/section-data";

interface Props {
  data: CustomHTMLSectionData;
  sectionId: string;
  className?: string;
}

export default function CustomHTMLSection({ data, sectionId, className }: Props) {
  const sanitizedHtml = useMemo(
    () => DOMPurify.sanitize(data.html, {
      ALLOWED_TAGS: [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'hr',
        'ul', 'ol', 'li', 'a', 'strong', 'em', 'b', 'i', 'u',
        'span', 'div', 'img', 'blockquote', 'pre', 'code',
        'table', 'thead', 'tbody', 'tr', 'th', 'td',
      ],
      ALLOWED_ATTR: [
        'href', 'target', 'rel', 'src', 'alt', 'width', 'height',
        'class', 'style', 'id',
      ],
    }),
    [data.html]
  );

  return (
    <section id={sectionId} className={cn("py-16 lg:py-24", className)}>
      <div className={cn("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", data.containerClass)}>
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
        />
      </div>
    </section>
  );
}
