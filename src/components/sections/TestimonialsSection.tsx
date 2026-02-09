import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import type { TestimonialsSectionData } from "@/types/landing-page";

interface Props {
  data: TestimonialsSectionData;
  sectionId: string;
  className?: string;
}

export default function TestimonialsSection({ data, sectionId, className }: Props) {
  return (
    <section id={sectionId} className={cn("py-16 lg:py-24 bg-secondary/5", className)}>
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
          {data.testimonials.map((testimonial, i) => (
            <Card key={i} className="border-0 shadow-md">
              <CardContent className="p-6">
                {/* Rating */}
                {testimonial.rating && (
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        className={cn(
                          "h-4 w-4",
                          j < testimonial.rating!
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-200"
                        )}
                      />
                    ))}
                  </div>
                )}

                {/* Quote */}
                <blockquote className="text-foreground mb-4 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3">
                  {testimonial.imageUrl && (
                    <img
                      src={testimonial.imageUrl}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="font-semibold text-sm text-foreground">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
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
