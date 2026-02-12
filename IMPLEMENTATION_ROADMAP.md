# 🚀 Implementation Roadmap - All Features

**Selected Features:**
- ✅ A: Client Approval Flow (2u)
- ✅ C: Marketing Page (3u)
- ✅ D: AI-Enhanced Copy (5u)
- ✅ E: Multi-Variant A/B Testing (8u)
- ✅ F: SEO Auto-Optimizer (6u)
- ✅ G: Client Self-Service Portal (12u)
- ✅ I: Recruitment Chatbot (10u)

**Total:** 46 hours (~6 werkdagen)

---

## 📅 WEEK-BY-WEEK PLAN

### **WEEK 1: Foundation (Quick Wins)**

#### Day 1-2: Client Approval Flow (A)
**Time:** 6 hours (3h/dag)

**Tasks:**
1. ✅ Database: Add `approval_tokens` table
2. ✅ Route: `/approve/:token` page
3. ✅ Email: Setup Resend + templates
4. ✅ UI: Approval interface (approve/feedback/reject)
5. ✅ Testing: End-to-end flow

**Deliverable:** Client kan pagina's reviewen via link

---

#### Day 3-5: Marketing Page (C)
**Time:** 9 hours (3h/dag)

**Tasks:**
1. ✅ Homepage: kandidatentekort.nl
2. ✅ Hero section: "Van 4,5u → 15 sec"
3. ✅ Features section
4. ✅ Pricing table (4 tiers)
5. ✅ Demo video embed
6. ✅ Lead capture form
7. ✅ Footer + legal pages

**Deliverable:** Professional marketing site live

---

### **WEEK 2: Premium Features**

#### Day 6-8: AI-Enhanced Copy (D)
**Time:** 15 hours (5h/dag)

**Tasks:**
1. ✅ Claude API integration
2. ✅ Prompt engineering (job-to-copy)
3. ✅ UI: "Enhance with AI" button
4. ✅ Before/after comparison
5. ✅ Cost tracking (€0.05/page)

**Deliverable:** AI-generated headlines & descriptions

---

#### Day 9-10: SEO Auto-Optimizer (F)
**Time:** 12 hours (6h/dag)

**Tasks:**
1. ✅ Keyword research (Google Trends API)
2. ✅ Meta tags generation
3. ✅ Schema.org markup (JobPosting)
4. ✅ Internal linking
5. ✅ SEO score calculator

**Deliverable:** Pages are SEO-optimized automatically

---

### **WEEK 3: Advanced Features**

#### Day 11-13: Multi-Variant A/B Testing (E)
**Time:** 18 hours (6h/dag)

**Tasks:**
1. ✅ Variant generator (3 versions)
2. ✅ Traffic splitter (33/33/33)
3. ✅ Analytics tracking per variant
4. ✅ Winner declaration logic
5. ✅ UI: Variant comparison dashboard

**Deliverable:** Auto-generate & test 3 page variants

---

### **WEEK 4-5: Enterprise Features**

#### Day 14-17: Client Self-Service Portal (G)
**Time:** 24 hours (6h/dag)

**Tasks:**
1. ✅ Client authentication (magic link)
2. ✅ Client dashboard
3. ✅ DIY page builder (simplified)
4. ✅ Template selector
5. ✅ Real-time preview
6. ✅ Publishing workflow
7. ✅ Billing integration (Stripe)

**Deliverable:** Clients can create pages themselves

---

#### Day 18-20: Recruitment Chatbot (I)
**Time:** 18 hours (6h/dag)

**Tasks:**
1. ✅ Claude API chatbot
2. ✅ Knowledge base (job details)
3. ✅ Widget UI (bottom-right)
4. ✅ Conversation tracking
5. ✅ Lead capture in chat
6. ✅ Admin dashboard (conversations)

**Deliverable:** AI chatbot answers candidate questions

---

## 🏗️ TECHNICAL ARCHITECTURE

### New Database Tables:

```sql
-- Approval tokens
CREATE TABLE approval_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID REFERENCES landing_pages(id),
  token TEXT UNIQUE NOT NULL,
  client_email TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, approved, rejected
  feedback TEXT,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- A/B Test Variants
CREATE TABLE page_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID REFERENCES landing_pages(id),
  variant_name TEXT NOT NULL, -- 'A', 'B', 'C'
  sections JSONB NOT NULL,
  traffic_percentage INT DEFAULT 33,
  views INT DEFAULT 0,
  conversions INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Client Accounts (Self-Service)
CREATE TABLE client_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  company_name TEXT,
  subscription_tier TEXT, -- basic, premium, enterprise, self-service
  subscription_status TEXT, -- active, cancelled, trial
  stripe_customer_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Chatbot Conversations
CREATE TABLE chatbot_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID REFERENCES landing_pages(id),
  visitor_id TEXT NOT NULL,
  messages JSONB NOT NULL, -- [{role, content, timestamp}]
  lead_captured BOOLEAN DEFAULT FALSE,
  lead_email TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- SEO Scores
CREATE TABLE seo_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID REFERENCES landing_pages(id),
  score INT, -- 0-100
  keywords JSONB,
  recommendations JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 📁 NEW FILE STRUCTURE

```
src/
├── features/
│   ├── approval/
│   │   ├── ApprovalPage.tsx
│   │   ├── ApprovalActions.tsx
│   │   └── useApprovalToken.ts
│   │
│   ├── ai-enhance/
│   │   ├── EnhanceButton.tsx
│   │   ├── ComparisonView.tsx
│   │   └── useAIEnhance.ts
│   │
│   ├── ab-testing/
│   │   ├── VariantGenerator.ts
│   │   ├── TrafficSplitter.ts
│   │   ├── VariantDashboard.tsx
│   │   └── useABTest.ts
│   │
│   ├── seo/
│   │   ├── SEOOptimizer.ts
│   │   ├── KeywordResearch.ts
│   │   ├── SchemaGenerator.ts
│   │   └── SEOScore.tsx
│   │
│   ├── self-service/
│   │   ├── ClientDashboard.tsx
│   │   ├── PageBuilder.tsx
│   │   ├── TemplateSelector.tsx
│   │   └── BillingPage.tsx
│   │
│   └── chatbot/
│       ├── ChatWidget.tsx
│       ├── ChatWindow.tsx
│       ├── ChatAPI.ts
│       └── ConversationDashboard.tsx
│
├── pages/
│   ├── HomePage.tsx (NEW - Marketing)
│   ├── PricingPage.tsx (NEW)
│   ├── ApprovalPage.tsx (NEW - /approve/:token)
│   ├── ClientPortal.tsx (NEW - /portal)
│   └── ... (existing pages)
│
└── lib/
    ├── claude-api.ts (NEW - AI integration)
    ├── resend.ts (NEW - Email)
    ├── stripe.ts (NEW - Billing)
    └── seo-tools.ts (NEW - SEO)
```

---

## 🎯 DETAILED IMPLEMENTATION GUIDES

### A) CLIENT APPROVAL FLOW

#### 1. Database Migration:
```sql
-- Run in Supabase SQL Editor
CREATE TABLE approval_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID REFERENCES landing_pages(id) ON DELETE CASCADE,
  token TEXT UNIQUE NOT NULL,
  client_email TEXT NOT NULL,
  client_name TEXT,
  status TEXT DEFAULT 'pending',
  feedback TEXT,
  expires_at TIMESTAMPTZ NOT NULL,
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_approval_tokens_token ON approval_tokens(token);
CREATE INDEX idx_approval_tokens_page ON approval_tokens(page_id);
```

#### 2. Resend Email Setup:
```bash
npm install resend
```

```typescript
// lib/resend.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendApprovalEmail({
  clientEmail,
  clientName,
  jobTitle,
  approvalUrl,
}: {
  clientEmail: string;
  clientName: string;
  jobTitle: string;
  approvalUrl: string;
}) {
  await resend.emails.send({
    from: 'Wouter <wouter@kandidatentekort.nl>',
    to: clientEmail,
    subject: `Review je vacaturepagina: ${jobTitle}`,
    html: `
      <h2>Hoi ${clientName},</h2>
      <p>Je vacaturepagina voor <strong>${jobTitle}</strong> is klaar! 🎉</p>
      <p><a href="${approvalUrl}" style="background: #0066cc; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Bekijk & Approve</a></p>
      <p>De link is 7 dagen geldig.</p>
      <p>Groet,<br>Wouter</p>
    `,
  });
}
```

#### 3. Admin Button Component:
```typescript
// components/admin/ShareWithClientButton.tsx
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { sendApprovalEmail } from '@/lib/resend';

export function ShareWithClientButton({ pageId }: { pageId: string }) {
  const [loading, setLoading] = useState(false);
  const [shared, setShared] = useState(false);

  async function handleShare() {
    setLoading(true);

    // 1. Generate token
    const token = crypto.randomUUID();

    // 2. Get page details
    const { data: page } = await supabase
      .from('landing_pages')
      .select('*, organization:organizations(*)')
      .eq('id', pageId)
      .single();

    // 3. Create approval token
    await supabase.from('approval_tokens').insert({
      page_id: pageId,
      token: token,
      client_email: page.contact_person_email,
      client_name: page.contact_person_name,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    });

    // 4. Send email
    const approvalUrl = `${window.location.origin}/approve/${token}`;
    await sendApprovalEmail({
      clientEmail: page.contact_person_email,
      clientName: page.contact_person_name,
      jobTitle: page.page_title,
      approvalUrl,
    });

    setShared(true);
    setLoading(false);
  }

  if (shared) {
    return <div className="text-green-600">✅ Gedeeld met klant!</div>;
  }

  return (
    <button
      onClick={handleShare}
      disabled={loading}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
    >
      {loading ? 'Verzenden...' : '📧 Deel met klant'}
    </button>
  );
}
```

#### 4. Approval Page:
```typescript
// pages/ApprovalPage.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

export default function ApprovalPage() {
  const { token } = useParams();
  const [approval, setApproval] = useState(null);
  const [page, setPage] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function loadApproval() {
      const { data } = await supabase
        .from('approval_tokens')
        .select('*, page:landing_pages(*)')
        .eq('token', token)
        .single();

      if (data) {
        setApproval(data);
        setPage(data.page);
      }
    }
    loadApproval();
  }, [token]);

  async function handleApprove() {
    await supabase
      .from('approval_tokens')
      .update({
        status: 'approved',
        approved_at: new Date().toISOString()
      })
      .eq('token', token);

    // Publish page
    await supabase
      .from('landing_pages')
      .update({
        status: 'published',
        published_at: new Date().toISOString()
      })
      .eq('id', page.id);

    setSubmitted(true);
  }

  async function handleFeedback() {
    await supabase
      .from('approval_tokens')
      .update({
        status: 'feedback',
        feedback: feedback
      })
      .eq('token', token);

    setSubmitted(true);
  }

  async function handleReject() {
    await supabase
      .from('approval_tokens')
      .update({ status: 'rejected' })
      .eq('token', token);

    setSubmitted(true);
  }

  if (!page) return <div>Loading...</div>;

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Bedankt! ✅</h1>
          <p>We hebben je feedback ontvangen.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <h1 className="text-2xl font-bold">Review: {page.page_title}</h1>
        <p className="text-gray-600">Bekijk de preview en geef je feedback</p>
      </div>

      {/* Preview iframe */}
      <div className="container mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <iframe
            src={`/v/${page.slug}?preview=true`}
            className="w-full h-[800px] border-0"
          />
        </div>

        {/* Action buttons */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Wat vind je ervan?</h2>

          <div className="space-y-4">
            {/* Approve */}
            <button
              onClick={handleApprove}
              className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
            >
              ✅ Goedkeuren & Direct Live
            </button>

            {/* Feedback */}
            <div>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Geef je feedback... (optioneel)"
                className="w-full border rounded-lg p-3 mb-2"
                rows={4}
              />
              <button
                onClick={handleFeedback}
                disabled={!feedback}
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50"
              >
                📝 Feedback Sturen
              </button>
            </div>

            {/* Reject */}
            <button
              onClick={handleReject}
              className="w-full py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              ❌ Afwijzen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

### C) MARKETING PAGE

#### Homepage Structure:
```typescript
// pages/HomePage.tsx
export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Van 4,5 uur → 15 seconden
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Genereer professionele recruitment landing pages in seconden
          </p>
          <div className="flex gap-4 justify-center">
            <a href="#demo" className="px-8 py-4 bg-white text-blue-600 rounded-lg font-bold text-lg hover:bg-gray-100">
              Zie Demo
            </a>
            <a href="#pricing" className="px-8 py-4 bg-blue-700 text-white rounded-lg font-bold text-lg hover:bg-blue-600">
              Bekijk Prijzen
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600">98%</div>
              <div className="text-gray-600">Tijdsbesparing</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">15 sec</div>
              <div className="text-gray-600">Generatie tijd</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">€1,200</div>
              <div className="text-gray-600">Per pagina</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon="⚡"
              title="Lightning Fast"
              description="Genereer complete landing pages in 15 seconden"
            />
            <FeatureCard
              icon="🎨"
              title="Professional Design"
              description="Automatisch responsive en SEO-optimized"
            />
            <FeatureCard
              icon="📊"
              title="Built-in Analytics"
              description="Track views, applicaties en conversie"
            />
          </div>
        </div>
      </section>

      {/* Demo Video */}
      <section id="demo" className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Zie het in actie</h2>
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video bg-gray-200 rounded-lg">
              {/* Embed demo video here */}
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Pricing</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <PricingCard
              tier="Basic"
              price="€1,200"
              features={[
                'Template-based',
                'Manual filling',
                'Basic analytics',
                '48u delivery'
              ]}
            />
            {/* ... other tiers ... */}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Klaar om te starten?
          </h2>
          <p className="text-xl mb-8">
            Eerste pagina is gratis. Geen credit card nodig.
          </p>
          <a
            href="/contact"
            className="px-8 py-4 bg-white text-blue-600 rounded-lg font-bold text-lg hover:bg-gray-100 inline-block"
          >
            Start Nu →
          </a>
        </div>
      </section>
    </>
  );
}
```

---

## 🎯 IMPLEMENTATION ORDER

### Sprint 1 (Week 1): Foundation
1. ✅ Day 1-2: Client Approval Flow
2. ✅ Day 3-5: Marketing Page

**Output:** Professional client experience + marketing site

---

### Sprint 2 (Week 2): Premium
3. ✅ Day 6-8: AI-Enhanced Copy
4. ✅ Day 9-10: SEO Auto-Optimizer

**Output:** Premium tier features ready

---

### Sprint 3 (Week 3): Advanced
5. ✅ Day 11-13: Multi-Variant A/B Testing

**Output:** Advanced analytics ready

---

### Sprint 4-5 (Week 4-5): Enterprise
6. ✅ Day 14-17: Client Self-Service Portal
7. ✅ Day 18-20: Recruitment Chatbot

**Output:** Enterprise tier ready

---

## 💰 PRICING AFTER IMPLEMENTATION

### With all features:
```
Basic:        €1,200  (no premium features)
Premium:      €1,800  (+AI, +A/B testing, +SEO)
Enterprise:   €3,500  (+Portal, +Chatbot, +Bulk)
Self-Service: €99/m   (DIY via portal)
```

**New revenue potential:** €581k → €850k/year

---

## 📊 SUCCESS METRICS

Track per feature:
- **Approval Flow:** Avg. approval time (goal: <24h)
- **AI Copy:** Conversion lift (goal: +15%)
- **A/B Testing:** Winner identified (goal: +20% conversie)
- **SEO:** Organic traffic (goal: +40% in 3m)
- **Portal:** Self-service users (goal: 20 in month 1)
- **Chatbot:** Conversations per page (goal: 30%+ engagement)

---

## 🚀 NEXT ACTIONS

**Ready to start?** Pick one:

1. **Start Sprint 1** → Build A + C this week
2. **See code examples** → I'll generate full implementation
3. **Prioritize differently** → Adjust roadmap
4. **Something else** → Tell me what

**Which one?**
