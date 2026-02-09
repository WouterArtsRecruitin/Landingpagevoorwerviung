import { useEffect } from "react";
import { useConfig } from "@/providers/ConfigProvider";

export function SEOHead() {
  const config = useConfig();

  useEffect(() => {
    // Page title
    document.title = config.pageTitle;

    // Meta tags
    function setMeta(name: string, content: string) {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!el) {
        el = document.createElement("meta");
        el.name = name;
        document.head.appendChild(el);
      }
      el.content = content;
    }

    function setOG(property: string, content: string) {
      let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("property", property);
        document.head.appendChild(el);
      }
      el.content = content;
    }

    if (config.metaDescription) setMeta("description", config.metaDescription);
    setOG("og:title", config.pageTitle);
    if (config.metaDescription) setOG("og:description", config.metaDescription);
    if (config.ogImageUrl) setOG("og:image", config.ogImageUrl);
    setOG("og:type", "website");
    setOG("og:url", config.canonicalUrl || window.location.href);

    // Canonical
    if (config.canonicalUrl) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = config.canonicalUrl;
    }

    // JSON-LD JobPosting schema
    if (config.jobPostingSchema) {
      let script = document.getElementById("job-posting-schema") as HTMLScriptElement;
      if (!script) {
        script = document.createElement("script");
        script.id = "job-posting-schema";
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(config.jobPostingSchema);
    }

    // Favicon
    if (config.faviconUrl) {
      let link = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = config.faviconUrl;
    }
  }, [config]);

  return null;
}
