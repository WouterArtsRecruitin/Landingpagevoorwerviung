import { cn } from "@/lib/utils";
import { useTracking } from "@/providers/TrackingProvider";
import type { VideoEmbedSectionData } from "@/types/landing-page";

interface Props {
  data: VideoEmbedSectionData;
  sectionId: string;
  className?: string;
}

export default function VideoEmbedSection({ data, sectionId, className }: Props) {
  const { trackEvent } = useTracking();

  function getEmbedUrl(url: string): string {
    // YouTube
    const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
    if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;

    // Vimeo
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;

    return url;
  }

  return (
    <section id={sectionId} className={cn("py-16 lg:py-24", className)}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {data.heading && (
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {data.heading}
            </h2>
            {data.subheading && (
              <p className="text-lg text-muted-foreground">{data.subheading}</p>
            )}
          </div>
        )}

        <div className="relative aspect-video rounded-xl overflow-hidden shadow-xl">
          <iframe
            src={getEmbedUrl(data.videoUrl)}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            onLoad={() => trackEvent("video_play", { section: sectionId })}
          />
        </div>
      </div>
    </section>
  );
}
