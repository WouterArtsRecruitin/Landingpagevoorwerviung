import { useEffect } from 'react';

export function Analytics() {
  useEffect(() => {
    // Google Analytics 4
    if (typeof window !== 'undefined') {
      // GA4 Tracking Code
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX'); // 🔧 VERVANG MET ECHTE GA4 ID
    }
  }, []);

  return (
    <>
      {/* Google Analytics 4 */}
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
      />
      
      {/* LinkedIn Insight Tag */}
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
            _linkedin_partner_id = "XXXXXX"; // 🔧 VERVANG MET LINKEDIN PARTNER ID
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
          `,
        }}
      />
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
            (function(l) {
              if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
              window.lintrk.q=[]}
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript";b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);})(window.lintrk);
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          alt=""
          src="https://px.ads.linkedin.com/collect/?pid=XXXXXX&fmt=gif"
        />
      </noscript>

      {/* Facebook Pixel */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'XXXXXXXXXXXXXXX'); // 🔧 VERVANG MET FACEBOOK PIXEL ID
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=XXXXXXXXXXXXXXX&ev=PageView&noscript=1"
        />
      </noscript>

      {/* Hotjar Tracking Code */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:XXXXXXX,hjsv:6}; // 🔧 VERVANG MET HOTJAR SITE ID
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `,
        }}
      />
    </>
  );
}

// Custom event tracking functions
export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
  
  // Facebook Pixel event
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, eventParams);
  }
  
  // LinkedIn Insight Tag conversion
  if (typeof window !== 'undefined' && window.lintrk) {
    window.lintrk('track', { conversion_id: eventParams?.conversion_id });
  }
};

// Predefined tracking events
export const trackApplyClick = (variant: string) => {
  trackEvent('apply_click', {
    event_category: 'engagement',
    event_label: `variant_${variant}`,
    value: 1,
  });
};

export const trackWhatsAppClick = () => {
  trackEvent('whatsapp_click', {
    event_category: 'engagement',
    event_label: 'whatsapp_button',
    value: 1,
  });
};

export const trackFormSubmission = (variant: string) => {
  trackEvent('Lead', {
    event_category: 'conversion',
    event_label: `variant_${variant}`,
    value: 8500, // Expected revenue per hire
  });
  
  // LinkedIn conversion
  if (typeof window !== 'undefined' && window.lintrk) {
    window.lintrk('track', { conversion_id: 12345678 }); // 🔧 VERVANG MET LINKEDIN CONVERSION ID
  }
};

export const trackVideoPlay = (videoName: string) => {
  trackEvent('video_play', {
    event_category: 'engagement',
    event_label: videoName,
    value: 1,
  });
};

export const trackScrollDepth = (percentage: number) => {
  trackEvent('scroll_depth', {
    event_category: 'engagement',
    event_label: `${percentage}%`,
    value: percentage,
  });
};

// TypeScript declarations
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    fbq: (...args: any[]) => void;
    lintrk: (...args: any[]) => void;
  }
}
