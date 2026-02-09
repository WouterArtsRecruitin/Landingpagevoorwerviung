# Lovable Prompt: Analytics & Tracking Instellen

> Prompts voor GA4, pixels, en eigen analytics.

---

## GA4 + Facebook Pixel + LinkedIn instellen

```
Configureer analytics tracking voor deze landingspagina:

GA4 MEASUREMENT ID: [bijv. G-XXXXXXXXXX]
FACEBOOK PIXEL ID: [bijv. 1234567890]
LINKEDIN PARTNER ID: [bijv. 12345]

Pas de analytics config aan in de landingspagina configuratie:
analytics: {
  ga4MeasurementId: "[GA4 ID]",
  fbPixelId: "[FB Pixel ID]",
  linkedinPartnerId: "[LinkedIn ID]"
}

Het framework handelt consent automatisch af:
- GA4 laadt alleen na analytics consent
- FB Pixel en LinkedIn laden alleen na marketing consent
- Eigen Supabase tracking draait altijd (noodzakelijk)

Events die automatisch getrackt worden:
- page_view, page_exit
- scroll_depth (25%, 50%, 75%, 100%)
- time_milestone (30s, 60s, 120s, 300s)
- section_view (per sectie die in beeld komt)
- cta_click (elke CTA klik met label en sectie)
- form_submit (conversie)
- whatsapp_click, phone_click, email_click, calendly_click
```

## UTM tracking voor campagnes

```
Stel UTM tracking in voor recruitment campagnes:

Het framework parsed automatisch UTM parameters uit de URL:
?utm_source=linkedin&utm_medium=cpc&utm_campaign=monteur-q1

Deze worden:
1. Opgeslagen in sessionStorage (hele sessie beschikbaar)
2. Meegestuurd met ALLE analytics events naar Supabase
3. Gekoppeld aan de visitor session
4. Meegestuurd bij sollicitatie (voor ROI tracking)

VOORBEELD CAMPAGNE URLs:
- LinkedIn Ads: ?utm_source=linkedin&utm_medium=paid_social&utm_campaign=[vacature-slug]
- Indeed: ?utm_source=indeed&utm_medium=jobboard&utm_campaign=[vacature-slug]
- Google Ads: ?utm_source=google&utm_medium=cpc&utm_campaign=[vacature-slug]
- WhatsApp share: ?utm_source=whatsapp&utm_medium=social&utm_campaign=[vacature-slug]
- Email: ?utm_source=email&utm_medium=newsletter&utm_campaign=[vacature-slug]

Alle UTM data is beschikbaar in de Supabase analytics_events en visitor_sessions tabellen.
```

## A/B test opzetten

```
Zet een A/B test op voor deze landingspagina:

TEST HYPOTHESE: [bijv. "Andere hero headline verhoogt conversie"]

VARIANT A (control): Huidige configuratie (standaard)
VARIANT B: [beschrijf de wijziging]

Het framework gebruikt deterministische hash-based toewijzing:
- Dezelfde bezoeker krijgt ALTIJD dezelfde variant
- Gebaseerd op anoniem bezoeker ID + landingpage ID
- Geen cookies nodig (privacy-vriendelijk)

OPZET:
1. Maak variant configs aan in Supabase tabel ab_test_variants
2. Definieer sectionOverrides per variant (alleen de secties die anders zijn)
3. Stel trafficWeight in (bijv. 50/50 of 70/30)
4. De ABTestProvider merged automatisch base sections met variant overrides

VOORBEELD VARIANT:
{
  variantKey: "B",
  trafficWeight: 50,
  isActive: true,
  sectionOverrides: [
    {
      id: "hero-1",
      type: "hero",
      data: { headline: "Jouw nieuwe carrière begint hier" }
    }
  ]
}
```

## Conversie dashboard query's

```
Maak een analytics dashboard met deze Supabase SQL queries:

-- Conversie rate per landingspagina
SELECT
  lp.slug,
  COUNT(DISTINCT vs.id) as visitors,
  COUNT(DISTINCT CASE WHEN vs.converted THEN vs.id END) as conversions,
  ROUND(COUNT(DISTINCT CASE WHEN vs.converted THEN vs.id END)::numeric /
        NULLIF(COUNT(DISTINCT vs.id), 0) * 100, 2) as conversion_rate
FROM visitor_sessions vs
JOIN landing_pages lp ON lp.id = vs.landing_page_id
GROUP BY lp.slug
ORDER BY conversion_rate DESC;

-- Top UTM bronnen
SELECT
  utm_source, utm_medium, utm_campaign,
  COUNT(*) as sessions,
  COUNT(CASE WHEN converted THEN 1 END) as conversions
FROM visitor_sessions
WHERE landing_page_id = '[page-id]'
GROUP BY utm_source, utm_medium, utm_campaign
ORDER BY conversions DESC;

-- Gemiddelde tijd tot conversie
SELECT
  AVG(EXTRACT(EPOCH FROM (
    (SELECT MIN(ae.created_at) FROM analytics_events ae
     WHERE ae.session_id = vs.id AND ae.event_name = 'form_submit')
    - vs.created_at
  ))) as avg_seconds_to_convert
FROM visitor_sessions vs
WHERE vs.converted = true;

Voer deze queries uit via de Supabase MCP connector of het SQL dashboard.
```
