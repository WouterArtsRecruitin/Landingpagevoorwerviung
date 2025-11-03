# Servicemonteur Landing Page - Aebi Schmidt Nederland

High-converting recruitment landing page voor Servicemonteur vacature bij Aebi Schmidt. Gebouwd met React, TypeScript, Tailwind CSS en geoptimaliseerd voor conversie.

## 🚀 Features

- ✅ **3 A/B/C Test Varianten** - Optimaliseer voor maximum conversie
- ✅ **Netlify Forms** - Directe sollicitatie integratie
- ✅ **Zapier Automation** - Auto-sync naar Pipedrive CRM
- ✅ **Analytics Suite** - GA4, LinkedIn, Facebook Pixel, Hotjar
- ✅ **Mobile First** - Responsive design (desktop, tablet, mobile)
- ✅ **SEO Optimized** - Schema.org JobPosting, meta tags
- ✅ **Performance** - <2s load time, 90+ PageSpeed score
- ✅ **WhatsApp Integration** - Direct contact met recruitment lead

---

## 📋 Tech Stack

```
Frontend:
├─ React 18
├─ TypeScript
├─ Tailwind CSS
├─ shadcn/ui components
└─ Vite build tool

Hosting & Deployment:
├─ Netlify (CDN + Forms + SSL)
├─ Domain: nieuwebaanalsservicemonteur.nl
└─ Automatic deployments from GitHub

Analytics & Tracking:
├─ Google Analytics 4
├─ LinkedIn Insight Tag
├─ Facebook Pixel
└─ Hotjar (heatmaps + recordings)

Integrations:
├─ Netlify Forms → Zapier → Pipedrive
├─ Auto-response emails (Zapier → Gmail)
└─ WhatsApp Business (direct messaging)
```

---

## 🏗️ Project Structure

```
├── /components
│   ├── Hero.tsx                  # Hero section (Variant A)
│   ├── TechShowcase.tsx          # Technical deep-dive
│   ├── Testimonials.tsx          # Employee testimonials
│   ├── Benefits.tsx              # Salary & benefits
│   ├── ApplicationForm.tsx       # Netlify Forms integration
│   ├── Analytics.tsx             # Tracking codes
│   ├── SEOHead.tsx              # SEO meta tags + Schema.org
│   ├── /variants                # A/B/C test components
│   │   ├── HeroB.tsx            # Career-focused headline
│   │   ├── HeroC.tsx            # Salary-focused headline
│   │   └── ...
│   └── /versions                # Full page versions
│       ├── VersionA.tsx         # Full story + FAQ
│       ├── VersionB.tsx         # Visual + accordions
│       └── VersionC.tsx         # Ultra compact
├── /public
│   ├── _redirects               # Netlify redirects
│   └── /images                  # Image assets
├── netlify.toml                 # Netlify config
├── AB-TEST-VARIANTS.md          # A/B test documentation
├── DEPLOYMENT-CHECKLIST.md      # Complete deployment guide
└── App.tsx                      # Main app (variant switcher)
```

---

## 🛠️ Local Development

### Prerequisites
```bash
Node.js 18+
npm or yarn
Git
```

### Installation
```bash
# Clone repository
git clone https://github.com/aebischmidt/servicemonteur-landing.git
cd servicemonteur-landing

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in browser.

### Build for Production
```bash
npm run build
npm run preview  # Test production build locally
```

---

## 🚀 Deployment

### Quick Deploy to Netlify

**Option 1: One-Click Deploy**
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

**Option 2: Manual Deploy**
```bash
# Build project
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

**Option 3: GitHub Auto-Deploy** (Recommended)
1. Push code to GitHub
2. Connect repository in Netlify dashboard
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `18`
4. Deploy automatically on every push to `main` branch

### Post-Deployment Setup

**See `/DEPLOYMENT-CHECKLIST.md` for complete setup guide:**

1. Configure custom domain: `nieuwebaanalsservicemonteur.nl`
2. Add analytics tracking IDs:
   - Google Analytics: `G-XXXXXXXXXX`
   - LinkedIn Insight Tag: `XXXXXX`
   - Facebook Pixel: `XXXXXXXXXXXXXXX`
   - Hotjar: `XXXXXXX`
3. Set up Zapier workflows:
   - Netlify Forms → Pipedrive
   - Netlify Forms → Gmail notifications
4. Upload images to `/public/images/`
5. Test form submissions
6. Launch Meta ads campaigns

---

## 🧪 A/B/C Testing

### Accessing Variants

**Via URL Parameters:**
```
https://nieuwebaanalsservicemonteur.nl/?variant=a  # Variant A (default)
https://nieuwebaanalsservicemonteur.nl/?variant=b  # Variant B (career focus)
https://nieuwebaanalsservicemonteur.nl/?variant=c  # Variant C (salary focus)
```

**Via Test Switcher:**
- Use floating switcher in top-right corner (development mode)
- Toggle between A/B/C variants in real-time

### Variant Differences

| Variant | Headline Focus | Target Audience | Primary CTA |
|---------|---------------|-----------------|-------------|
| **A** | Technical Challenge | Experienced mechanics | "Van CAN-Bus tot Hydrauliek" |
| **B** | Career Growth | Ambitious mechanics | "Groei naar Senior in 18 maanden" |
| **C** | Salary/Financial | Underpaid mechanics | "Verdien tot €3.800/maand" |

**Read full test strategy:** `/AB-TEST-VARIANTS.md`

---

## 📊 Analytics & Tracking

### Events Tracked

```javascript
// Application form submissions
trackFormSubmission(variant)

// CTA button clicks
trackApplyClick(variant)

// WhatsApp link clicks
trackWhatsAppClick()

// Video plays
trackVideoPlay(videoName)

// Scroll depth (25%, 50%, 75%, 100%)
trackScrollDepth(percentage)
```

### View Analytics Dashboards

- **Google Analytics:** [analytics.google.com](https://analytics.google.com)
- **Hotjar:** [hotjar.com](https://hotjar.com)
- **Netlify Forms:** Netlify dashboard → Forms
- **Pipedrive:** [app.pipedrive.com](https://app.pipedrive.com)

---

## 📱 WhatsApp Integration

**Direct link:** `wa.me/31612345678?text=Hoi%20Monique...`

Pre-filled message template:
```
Hoi Monique, ik heb interesse in de Servicemonteur vacature!
```

All WhatsApp clicks are tracked in Google Analytics.

---

## 🔒 Security & Privacy

- ✅ **HTTPS enforced** (automatic SSL via Netlify)
- ✅ **GDPR compliant** (privacy checkbox required)
- ✅ **Secure headers** (X-Frame-Options, CSP, etc.)
- ✅ **Form validation** (client + server-side)
- ✅ **Honeypot protection** (bot-field for spam prevention)

**Privacy Policy:** `/public/privacy.html`

---

## 🐛 Troubleshooting

### Forms not submitting
```bash
# Check Netlify Forms dashboard
# Verify form has name="servicemonteur-application"
# Ensure data-netlify="true" attribute is present
# Check browser console for errors
```

### Analytics not tracking
```bash
# Verify tracking IDs in /components/Analytics.tsx
# Check browser ad-blockers (disable for testing)
# Use Google Analytics Debugger extension
# Check Network tab for tracking pixel requests
```

### Images not loading
```bash
# Verify image paths start with /public/images/
# Check file extensions (jpg, png, webp)
# Compress images if >500KB
# Use ImageWithFallback component
```

### Slow load times
```bash
# Run Lighthouse audit
# Compress images (use WebP format)
# Enable lazy loading (built-in)
# Check Netlify CDN cache headers
```

---

## 📞 Support & Contact

**Recruitment Team:**
- Monique (Lead): monique@aebischmidt.nl / +31 6 12 34 56 78
- HR Manager: hr@aebischmidt.nl

**Technical Support:**
- Developer: dev@aebischmidt.nl
- Netlify Support: support@netlify.com

**Documentation:**
- Deployment Guide: `/DEPLOYMENT-CHECKLIST.md`
- A/B Test Strategy: `/AB-TEST-VARIANTS.md`
- Components: `/components/README.md`

---

## 📈 Success Metrics

### Target KPIs (Month 1)

```
Traffic:
├─ Page views: 2.000+
├─ Unique visitors: 1.500+
├─ Bounce rate: <60%
└─ Avg. time on page: 3+ minutes

Conversions:
├─ Applications: 50+
├─ Conversion rate: 3%+
├─ WhatsApp messages: 20+
└─ Video plays: 40%+ of visitors

Lead Quality:
├─ Qualified candidates: 30+
├─ Interview invites: 15+
└─ Hires: 3+

Cost Efficiency:
├─ Cost per application: <€30
├─ Cost per hire: <€1.500
└─ ROI: 5x+ (vs. recruitment agency)
```

---

## 🔄 Version History

**v1.0.0** (29 oktober 2025)
- ✅ Initial launch
- ✅ 3 A/B/C test variants
- ✅ Full analytics suite
- ✅ Netlify Forms + Zapier integration
- ✅ Mobile responsive
- ✅ SEO optimized (Schema.org JobPosting)

**Upcoming:**
- [ ] v1.1: Video testimonials
- [ ] v1.2: Live chat integration
- [ ] v1.3: Multi-language support (EN)
- [ ] v1.4: Salary calculator tool

---

## 📄 License

Proprietary - © 2025 Aebi Schmidt Nederland. All rights reserved.

---

## 🎯 Quick Links

- 🌐 **Live Site:** [nieuwebaanalsservicemonteur.nl](https://nieuwebaanalsservicemonteur.nl)
- 📊 **Analytics:** [analytics.google.com](https://analytics.google.com)
- 📝 **Netlify:** [app.netlify.com](https://app.netlify.com)
- ⚡ **Zapier:** [zapier.com/app/zaps](https://zapier.com/app/zaps)
- 💼 **Pipedrive:** [app.pipedrive.com](https://app.pipedrive.com)
- 🔥 **Hotjar:** [insights.hotjar.com](https://insights.hotjar.com)

---

**Built with ❤️ by the Aebi Schmidt Recruitment Team**
