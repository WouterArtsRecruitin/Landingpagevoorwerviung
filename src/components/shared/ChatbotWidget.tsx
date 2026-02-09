import { useEffect } from "react";
import type { ChatbotConfig } from "@/types/landing-page";
import { useTracking } from "@/providers/TrackingProvider";

interface ChatbotWidgetProps {
  config: ChatbotConfig;
}

export function ChatbotWidget({ config }: ChatbotWidgetProps) {
  const { trackEvent } = useTracking();

  useEffect(() => {
    if (!config.enabled || !config.widgetId) return;

    let script: HTMLScriptElement | null = null;

    switch (config.provider) {
      case "tawk": {
        // Tawk.to
        script = document.createElement("script");
        script.async = true;
        script.src = `https://embed.tawk.to/${config.widgetId}/default`;
        script.charset = "UTF-8";
        script.setAttribute("crossorigin", "*");
        document.head.appendChild(script);
        break;
      }
      case "crisp": {
        // Crisp
        (window as any).$crisp = [];
        (window as any).CRISP_WEBSITE_ID = config.widgetId;
        script = document.createElement("script");
        script.src = "https://client.crisp.chat/l.js";
        script.async = true;
        document.head.appendChild(script);
        break;
      }
      case "intercom": {
        // Intercom
        (window as any).intercomSettings = {
          api_base: "https://api-iam.intercom.io",
          app_id: config.widgetId,
        };
        script = document.createElement("script");
        script.src = `https://widget.intercom.io/widget/${config.widgetId}`;
        script.async = true;
        document.head.appendChild(script);
        break;
      }
      case "custom": {
        // Custom script injection
        if (config.customScript) {
          script = document.createElement("script");
          script.textContent = config.customScript;
          document.head.appendChild(script);
        }
        break;
      }
    }

    // Track chatbot open event
    const observer = new MutationObserver(() => {
      trackEvent("chatbot_open", { provider: config.provider });
    });

    return () => {
      observer.disconnect();
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [config, trackEvent]);

  return null; // Chatbot widgets injecteren zichzelf in de DOM
}
