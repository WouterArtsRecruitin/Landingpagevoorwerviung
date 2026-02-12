#!/bin/bash

# Script to create 5 demo pages with different color themes via API

API_URL="https://vaiikkhaulkqdknwvroj.supabase.co/functions/v1/generate-landing-page"
ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhaWlra2hhdWxrcWRrbnd2cm9qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzNDM2MzcsImV4cCI6MjA4NTkxOTYzN30.pJLsXDZvwNdMBQXVZQpU0EaF_7QVeXOQZm0_lqE5H8I"

echo "🚀 Creating 5 demo pages with different color themes..."
echo ""

# 1. TECH - Purple/Indigo
echo "1️⃣  Creating TECH example (Purple gradient)..."
curl -X POST "$API_URL" \
  -H "Authorization: Bearer $ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "company_name": "TechVision AI",
    "company_website": "https://techvision.ai",
    "company_sector": "IT & Software",
    "job_title": "Senior Full-Stack Developer",
    "job_location": "Amsterdam",
    "salary_min": 5500,
    "salary_max": 7500,
    "employment_type": "fulltime",
    "job_description": "Bouw de next-gen AI platform die de tech wereld gaat veranderen. Werk met bleeding-edge technology.",
    "responsibilities": ["Ontwikkelen van microservices in Node.js/Python", "AI/ML features implementeren", "Code reviews & mentoring juniors", "AWS cloud architectuur"],
    "requirements_must": ["5+ jaar Full-Stack ervaring", "React/Node.js expert", "Cloud ervaring (AWS/Azure)", "Agile/Scrum mindset"],
    "requirements_nice": ["AI/ML kennis", "Kubernetes", "GraphQL"],
    "benefits": ["💰 €5500-€7500 + aandelen", "🏖️ 25 vakantiedagen", "💻 €3000 hardware budget", "🚀 Tech conferences wereldwijd", "🎓 €2500 opleidingsbudget", "🏡 100% remote mogelijk"],
    "contact_name": "Alex Chen",
    "contact_role": "Engineering Lead",
    "contact_email": "alex@techvision.ai",
    "contact_phone": "0612345678",
    "contact_whatsapp": "31612345678"
  }' \
  --silent | jq -r '.url // empty'

sleep 2

# 2. FINANCE - Green
echo "2️⃣  Creating FINANCE example (Emerald green)..."
curl -X POST "$API_URL" \
  -H "Authorization: Bearer $ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "company_name": "GreenCapital Invest",
    "company_website": "https://greencapital.nl",
    "company_sector": "Finance & Accounting",
    "job_title": "Investment Analyst",
    "job_location": "Rotterdam",
    "salary_min": 4800,
    "salary_max": 6500,
    "employment_type": "fulltime",
    "job_description": "Analyseer sustainable investments en help bedrijven groeien. Impact maken én goed verdienen.",
    "responsibilities": ["Financiële analyses uitvoeren", "Due diligence op investments", "Rapportages voor stakeholders", "Portfolio monitoring"],
    "requirements_must": ["WO Finance/Econometrie", "Excel & PowerBI expert", "2+ jaar ervaring", "Analytisch sterk"],
    "requirements_nice": ["CFA certificaat", "Bloomberg Terminal", "Python/R"],
    "benefits": ["💰 €4800-€6500 + bonus", "📈 Winstdeling", "🚗 Lease auto", "🏖️ 27 vakantiedagen", "🎓 CFA sponsoring", "☕ Kantoor met Illy koffie"],
    "contact_name": "Sophie van der Berg",
    "contact_role": "HR Manager",
    "contact_email": "sophie@greencapital.nl",
    "contact_phone": "0687654321"
  }' \
  --silent | jq -r '.url // empty'

sleep 2

# 3. HEALTHCARE - Cyan/Teal
echo "3️⃣  Creating HEALTHCARE example (Cyan gradient)..."
curl -X POST "$API_URL" \
  -H "Authorization: Bearer $ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "company_name": "CarePlus Zorggroep",
    "company_website": "https://careplus.nl",
    "company_sector": "Zorg & Welzijn",
    "job_title": "Verpleegkundige IC",
    "job_location": "Utrecht",
    "salary_min": 3800,
    "salary_max": 4800,
    "employment_type": "fulltime",
    "job_description": "Maak het verschil op onze state-of-the-art IC afdeling. Top faciliteiten en een hecht team.",
    "responsibilities": ["IC patiëntenzorg", "Werken met advanced monitoring", "Samenwerken met artsen", "Begeleiden van stagiairs"],
    "requirements_must": ["HBO-V diploma", "IC cursus of bereid te volgen", "BIG registratie", "Teamplayer"],
    "requirements_nice": ["FCCS/PHTLS", "Ervaring met ECMO", "Reanimatiecursus"],
    "benefits": ["💰 €3800-€4800 + toeslagen", "🏥 Modern ziekenhuis", "🎓 Opleiding betaald", "🏖️ 8% vakantiegeld", "🚗 Reiskostenvergoeding", "☕ Personeelsrestaurant"],
    "contact_name": "Dr. Lisa de Wit",
    "contact_role": "Hoofdverpleegkundige IC",
    "contact_email": "l.dewit@careplus.nl",
    "contact_phone": "0698765432"
  }' \
  --silent | jq -r '.url // empty'

sleep 2

# 4. ENGINEERING - Blue
echo "4️⃣  Creating ENGINEERING example (Blue gradient)..."
curl -X POST "$API_URL" \
  -H "Authorization: Bearer $ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "company_name": "Precision Systems BV",
    "company_website": "https://precisionsystems.nl",
    "company_sector": "Techniek & Engineering",
    "job_title": "Mechatronics Engineer",
    "job_location": "Eindhoven",
    "salary_min": 4500,
    "salary_max": 6000,
    "employment_type": "fulltime",
    "job_description": "Ontwerp high-tech machines voor semiconductor industry. Werk met ASML, NXP en andere topbedrijven.",
    "responsibilities": ["Ontwerpen mechatronische systemen", "CAD tekeningen maken (SolidWorks)", "Prototypes bouwen en testen", "Samenwerken met klanten"],
    "requirements_must": ["WO Werktuigbouwkunde/Mechatronica", "SolidWorks/CATIA", "3+ jaar ervaring", "Engels vloeiend"],
    "requirements_nice": ["ASML ervaring", "LabVIEW", "Six Sigma"],
    "benefits": ["💰 €4500-€6000 + winstdeling", "🚗 Leaseauto", "💻 €1500 tool budget", "🎓 Cursussen & conferenties", "🏖️ 30 vrije dagen", "🏋️ Sportabonnement"],
    "contact_name": "Mark Jansen",
    "contact_role": "Lead Engineer",
    "contact_email": "m.jansen@precisionsystems.nl",
    "contact_phone": "0623456789",
    "contact_whatsapp": "31623456789"
  }' \
  --silent | jq -r '.url // empty'

sleep 2

# 5. CREATIVE - Orange/Pink/Cyan
echo "5️⃣  Creating CREATIVE example (Multi-color gradient)..."
curl -X POST "$API_URL" \
  -H "Authorization: Bearer $ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "company_name": "Supernova Creative Studio",
    "company_website": "https://supernovacreative.nl",
    "company_sector": "Marketing & Creative",
    "job_title": "Creative Content Strategist",
    "job_location": "Amsterdam",
    "salary_min": 4500,
    "salary_max": 6500,
    "employment_type": "fulltime",
    "job_description": "Creëer viral content strategieën voor toonaangevende merken. Jij bedenkt de campagnes waar heel Nederland over praat.",
    "responsibilities": ["360° content strategieën ontwikkelen", "Creatieve brainstorms leiden", "TikTok & Instagram masteren", "Campagne concepten bedenken"],
    "requirements_must": ["5+ jaar content strategy", "Portfolio met viral campaigns", "Social media trends expert", "Nederlands & Engels perfect"],
    "requirements_nice": ["Adobe Creative Suite", "Video editing", "Influencer netwerk"],
    "benefits": ["💰 €4500-€6500 + bonussen", "🏖️ 30 vakantiedagen", "🎨 MacBook Pro + toolbudget", "🚀 Toonaangevende merken", "🎓 €2000 opleidingsbudget", "🏡 Hybride (3 dagen kantoor)", "🎉 Legendarische uitjes", "☕ Barista koffie + lunch"],
    "contact_name": "Luna Martinez",
    "contact_role": "Creative Director",
    "contact_email": "luna@supernovacreative.nl",
    "contact_phone": "0687654321",
    "contact_whatsapp": "31687654321"
  }' \
  --silent | jq -r '.url // empty'

echo ""
echo "✅ Done! 5 demo pages created with different color themes"
echo ""
echo "View in admin: http://localhost:3002/admin/paginas"
