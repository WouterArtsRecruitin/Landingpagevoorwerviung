# 🚀 Deployment Checklist - Servicemonteur Landing Page

## Pre-Deployment Setup

### 1️⃣ Netlify Account Setup
```bash
□ Maak Netlify account aan (netlify.com)
□ Koppel GitHub repository
□ Selecteer branch: main
□ Build command: npm run build
□ Publish directory: dist
□ Node version: 18
```

### 2️⃣ Domain Configuration
```bash
□ Koop domain: nieuwebaanalsservicemonteur.nl
□ Voeg custom domain toe in Netlify
□ Netlify DNS: ns1.netlify.com, ns2.netlify.com
□ Wacht op DNS propagatie (max 48 uur)
□ Enable HTTPS (automatic via Let's Encrypt)
□ Force HTTPS redirect (enabled in netlify.toml)
```

### 3️⃣ Analytics Setup

**Google Analytics 4:**
```bash
□ Ga naar analytics.google.com
□ Maak nieuwe property: "Aebi Schmidt Recruitment"
□ Kopieer Measurement ID (G-XXXXXXXXXX)
□ Vervang in /components/Analytics.tsx regel 9
□ Test met Google Analytics Debugger extension
```

**LinkedIn Insight Tag:**
```bash
□ Ga naar linkedin.com/campaign-manager
□ Klik Account Assets → Insight Tag
□ Kopieer Partner ID (6-cijferig nummer)
□ Vervang in /components/Analytics.tsx regel 20
□ Test met LinkedIn Pixel Helper extension
```

**Facebook Pixel:**
```bash
□ Ga naar facebook.com/business
□ Events Manager → Create Pixel
□ Kopieer Pixel ID (15-cijferig nummer)
□ Vervang in /components/Analytics.tsx regel 46
□ Test met Facebook Pixel Helper extension
```

**Hotjar:**
```bash
□ Maak account op hotjar.com
□ Create new site
□ Kopieer Site ID (7-cijferig nummer)
□ Vervang in /components/Analytics.tsx regel 69
□ Test via Hotjar dashboard (check for recordings)
```

### 4️⃣ Form Integration

**Netlify Forms:**
```bash
□ Forms zijn automatisch enabled (zie netlify.toml)
□ Test form submission na deployment
□ Check Netlify dashboard → Forms voor submissions
□ Download form submissions als CSV
```

**Zapier Integration:**
```bash
STAP 1: NETLIFY → ZAPIER TRIGGER
□ Zap 1: "Netlify Form Submission"
   └─ Select form: "servicemonteur-application"

STAP 2: ZAPIER → PIPEDRIVE
□ Action: "Create Deal"
   ├─ Title: {{naam}} - Servicemonteur
   ├─ Person: {{naam}} ({{email}})
   ├─ Value: €8.500 (expected hire value)
   ├─ Stage: "Sollicitatie Ontvangen"
   ├─ Pipeline: "Recruitment"
   └─ Custom fields:
       ├─ Telefoon: {{telefoon}}
       ├─ Woonplaats: {{woonplaats}}
       ├─ Motivatie: {{motivatie}}
       ├─ Variant: {{variant}}
       └─ Datum: {{timestamp}}

STAP 3: ZAPIER → GMAIL (NOTIFICATION MONIQUE)
□ Action: "Send Email"
   ├─ To: monique@aebischmidt.nl
   ├─ Subject: "🔔 Nieuwe sollicitatie: {{naam}}"
   └─ Body:
       Nieuwe sollicitatie ontvangen voor Servicemonteur:
       
       📋 Kandidaat:
       Naam: {{naam}}
       Email: {{email}}
       Telefoon: {{telefoon}}
       Woonplaats: {{woonplaats}}
       
       💬 Motivatie:
       {{motivatie}}
       
       🎯 Variant: {{variant}}
       📅 Datum: {{timestamp}}
       
       👉 Bekijk in Pipedrive: [DEAL_LINK]

STAP 4: ZAPIER → GMAIL (AUTO-RESPONSE)
□ Action: "Send Email"
   ├─ To: {{email}}
   ├─ Subject: "Bevestiging sollicitatie Servicemonteur - Aebi Schmidt"
   └─ Body: (zie template hieronder)

□ Test complete Zap workflow
□ Monitor Zap runs eerste week
```

**Auto-response Email Template:**
```
Hoi {{naam}},

Bedankt voor je sollicitatie voor de functie Servicemonteur bij Aebi Schmidt!

We hebben je sollicitatie in goede orde ontvangen en nemen binnen 2 werkdagen 
contact met je op via {{telefoon}} of {{email}}.

In de tussentijd kun je alvast:
• Onze website bezoeken: www.aebi-schmidt.com
• Ons volgen op LinkedIn: linkedin.com/company/aebi-schmidt
• Vragen stellen via WhatsApp: wa.me/31612345678

Met vriendelijke groet,

Monique
Recruitment Lead
Aebi Schmidt Nederland

---
📞 Vragen? Bel of app me direct: +31 6 12 34 56 78
🌐 www.aebischmidt.nl
```

### 5️⃣ WhatsApp Business Setup
```bash
□ Download WhatsApp Business app
□ Gebruik zakelijk nummer: +31 6 12 34 56 78
□ Profile setup:
   ├─ Bedrijfsnaam: Aebi Schmidt Nederland
   ├─ Categorie: Automotive/Industrial
   ├─ Beschrijving: "Wereldleider in sneeuwruimapparatuur..."
   └─ Website: nieuwebaanalsservicemonteur.nl
□ Greeting message: "Hoi! Bedankt voor je interesse in de Servicemonteur vacature. Monique reageert zo snel mogelijk (meestal binnen 2 uur)."
□ Away message (buiten kantooruren): "Bedankt voor je bericht! We zijn op dit moment offline. We reageren maandag-vrijdag tussen 08:00-17:00."
□ Quick replies instellen:
   ├─ /vacature → Link naar full job description
   ├─ /solliciteren → Link naar application form
   ├─ /salaris → "€3.200-€3.800 bruto per maand..."
   └─ /locatie → "Holten (Overijssel), regio Twente/Salland"
```

### 6️⃣ Image & Asset Upload
```bash
□ Upload hero image: /public/images/hero-monteur-workshop.jpg
□ Upload logo: /public/images/aebi-schmidt-logo-white.svg
□ Upload logo: /public/images/aebi-schmidt-logo-orange.svg
□ Upload team photos: /public/images/team/*.jpg
□ Upload machine photos: /public/images/machines/*.jpg
□ Upload testimonial photos: /public/images/testimonials/*.jpg
□ Upload OG image: /public/images/og-image.jpg (1200x630px)
□ Upload favicon: /public/favicon.png (32x32px)
□ Upload apple-touch-icon: /public/apple-touch-icon.png (180x180px)

FORMAAT REQUIREMENTS:
• Hero images: 1920x1080px, WebP format, max 500KB
• Team photos: 800x800px, WebP, max 200KB
• OG image: 1200x630px, JPG, max 300KB
• Favicon: 32x32px, PNG, transparent background
```

### 7️⃣ Video Setup (YouTube/Vimeo)
```bash
YOUTUBE OPTIE:
□ Upload videos naar YouTube (unlisted)
□ Get embed code
□ Add to components (TechShowcase, Testimonials)

VIMEO PRO OPTIE (aanbevolen voor controle):
□ Upload videos naar Vimeo
□ Enable privacy: "Hide from Vimeo.com"
□ Customize player colors (orange #F97316)
□ Get embed code
□ Add to components
```

---

## Post-Deployment Testing

### Performance Testing
```bash
□ Google PageSpeed Insights: score 90+ (desktop & mobile)
□ GTmetrix: Grade A, load time <2s
□ WebPageTest: First Contentful Paint <1.5s
□ Lighthouse: Performance 90+, SEO 100, Accessibility 95+
```

### Cross-Browser Testing
```bash
□ Chrome (latest)
□ Firefox (latest)
□ Safari (macOS & iOS)
□ Edge (latest)
□ Mobile Safari (iOS 15+)
□ Chrome Mobile (Android 11+)
```

### Device Testing
```bash
□ Desktop 1920x1080
□ Desktop 1440x900
□ Laptop 1280x720
□ Tablet iPad (768x1024)
□ Mobile iPhone 13 (390x844)
□ Mobile Samsung Galaxy (360x800)
```

### Functionality Testing
```bash
□ Test form submission (all fields)
□ Check email notifications (Monique + candidate)
□ Verify Pipedrive deal creation
□ Test WhatsApp links (desktop + mobile)
□ Test all CTA buttons
□ Test video embeds
□ Test image lazy loading
□ Test mobile menu
□ Test scroll-to-section links
□ Test A/B/C variant switcher
```

### SEO Testing
```bash
□ Google Search Console: submit sitemap
□ Check Google Jobs schema with Rich Results Test
□ Verify meta tags with Meta Tags Validator
□ Test Open Graph tags with Facebook Debugger
□ Check Twitter Card with Twitter Card Validator
□ Mobile-friendly test: search.google.com/test/mobile-friendly
```

### Analytics Testing
```bash
□ Google Analytics: verify page views
□ GA4: test "apply_click" event
□ GA4: test "whatsapp_click" event
□ GA4: test "form_submission" event
□ LinkedIn: verify Insight Tag firing
□ Facebook: verify Pixel firing
□ Hotjar: check for first recording
```

---

## Go-Live Checklist

### Pre-Launch (T-24 hours)
```bash
□ Final content review (typos, links, images)
□ Legal review (privacy policy, GDPR compliance)
□ Stakeholder approval (hiring manager, marketing)
□ Backup all code (GitHub commit + tag)
□ Prepare rollback plan
```

### Launch Day
```bash
□ Deploy to production (merge to main branch)
□ Verify DNS propagation (check from multiple locations)
□ Test form submission end-to-end
□ Verify analytics tracking
□ Send test WhatsApp message
□ Monitor Netlify deployment logs
□ Check for JavaScript errors (browser console)
```

### Post-Launch (T+1 hour)
```bash
□ Check Google Analytics real-time data
□ Verify first form submission
□ Test from external devices (mobile data)
□ Share link with team for QA
□ Post announcement on LinkedIn/Facebook
```

### Post-Launch (T+24 hours)
```bash
□ Review analytics data (traffic sources, bounce rate)
□ Check Hotjar recordings (user behavior)
□ Review form submissions (lead quality)
□ Monitor Zapier task history
□ Check Pipedrive for new deals
```

---

## Campaign Launch

### Meta Ads Setup
```bash
□ Create Facebook Ad Account
□ Create LinkedIn Campaign Manager account
□ Upload custom audiences (retargeting)
□ Set up conversion tracking
□ Launch ads with UTM parameters:
   Facebook: ?utm_source=facebook&utm_medium=cpc&utm_campaign=servicemonteur-jan-2025
   LinkedIn: ?utm_source=linkedin&utm_medium=cpc&utm_campaign=servicemonteur-jan-2025
□ Daily budget: €50-100 (eerste week)
□ Target audience:
   ├─ Location: Overijssel, Gelderland (50km radius Holten)
   ├─ Age: 25-45
   ├─ Interests: Automotive, Engineering, Technical
   └─ Job titles: Monteur, Technician, Mechanic
```

### Google Ads Setup (optional)
```bash
□ Create Google Ads account
□ Set up conversion tracking (form submission)
□ Campaign 1: Google Search
   ├─ Keywords: "servicemonteur vacature", "technisch monteur", etc.
   ├─ Location: Overijssel, 50km radius Holten
   └─ Budget: €30-50/day
□ Campaign 2: Google Display
   ├─ Remarketing audiences
   └─ Budget: €20-30/day
```

---

## Monitoring & Optimization

### Daily Monitoring (Week 1)
```bash
□ Check traffic: Google Analytics
□ Check conversions: Form submissions
□ Check leads: Pipedrive
□ Check errors: Netlify logs
□ Check user behavior: Hotjar recordings
□ Respond to applications: <24 hours
```

### Weekly Optimization
```bash
□ Review A/B test results
□ Adjust ad targeting (if CTR <2%)
□ Optimize slow pages (if load time >2s)
□ Update content based on feedback
□ Review competitor job postings
```

### Monthly Review
```bash
□ Traffic analysis (sources, demographics)
□ Conversion rate optimization
□ Lead quality assessment
□ ROI calculation (cost per hire)
□ Content updates (seasonal campaigns)
```

---

## Emergency Contacts

```
🔴 CRITICAL ISSUES:
Netlify down → Status: status.netlify.com
Forms not working → Check Netlify Forms dashboard
Analytics not tracking → Verify tracking codes

💬 SUPPORT:
Netlify Support: support@netlify.com
Zapier Support: help.zapier.com
Hotjar Support: support@hotjar.com

👤 TEAM:
Recruitment Lead (Monique): monique@aebischmidt.nl / +31 6 12 34 56 78
Marketing Manager: marketing@aebischmidt.nl
IT/DevOps: it@aebischmidt.nl
```

---

## Success Metrics (KPIs)

### Week 1 Goals:
- [ ] 500+ page views
- [ ] 10+ qualified applications
- [ ] 2% conversion rate (visitors → applications)
- [ ] <60% bounce rate
- [ ] 3+ minutes average time on page

### Month 1 Goals:
- [ ] 2.000+ page views
- [ ] 50+ qualified applications
- [ ] 3+ hires
- [ ] Cost per hire <€1.500 (including ads)

---

**Last updated:** 29 oktober 2025
**Version:** 1.0
**Owner:** Recruitment Team Aebi Schmidt Nederland
