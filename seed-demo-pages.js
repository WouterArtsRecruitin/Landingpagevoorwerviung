#!/usr/bin/env node
/**
 * Seed demo landing pages for 3 NEW templates (A, B, C) via Edge Function  
 * Run with: node seed-demo-pages-new.js
 */

const DEMO_VACANCIES = [
  // Template A - Modern Professional (Dark Tech)
  {
    company_name: 'TechVision AI',
    company_website: 'https://www.techvision.ai',
    company_sector: 'ICT & Telecom',
    primary_color: '#3B82F6',
    template_style: 'modern',
    image_style: 'photos',
    job_title: 'Senior AI Engineer',
    job_location: 'Amsterdam',
    salary_min: 6000,
    salary_max: 8500,
    employment_type: 'fulltime',
    job_description: 'Bouw de toekomst van AI-gedreven oplossingen. Als Senior AI Engineer werk je aan cutting-edge machine learning modellen die impact maken voor duizenden gebruikers.',
    responsibilities: [
      'Ontwikkelen van AI/ML modellen voor productie-omgevingen',
      'Optimaliseren van model performance en accuracy',
      'Samenwerken met data scientists en product teams',
      'Implementeren van MLOps best practices'
    ],
    requirements_must: [
      'MSc in Computer Science, AI of vergelijkbaar',
      'Minimaal 5 jaar ervaring met Python en ML frameworks',
      'Expert kennis van TensorFlow/PyTorch',
      'Ervaring met cloud platforms (AWS/GCP/Azure)'
    ],
    requirements_nice: [
      'PhD in Machine Learning',
      'Publicaties in AI conferences',
      'Open source contributions'
    ],
    benefits: [
      'Salaris €6.000 - €8.500 bruto per maand',
      'Remote werken (4 dagen per week)',
      'Aandelenopties',
      'Jaarlijks opleidingsbudget €7.500',
      'MacBook Pro M3 Max + accessories'
    ],
    contact_name: 'Sarah Chen',
    contact_email: 'demo@kandidatentekort.nl',
    contact_phone: '+31 20 123 4567',
  },

  // Template B - Bold & Dynamic (Green Energetic)
  {
    company_name: 'GreenBuild Solutions',
    company_website: 'https://www.greenbuild.nl',
    company_sector: 'Bouw & Vastgoed',
    primary_color: '#10B981',
    template_style: 'dynamic',
    image_style: 'photos',
    job_title: 'Projectleider Duurzame Bouw',
    job_location: 'Utrecht',
    salary_min: 4500,
    salary_max: 6000,
    employment_type: 'fulltime',
    job_description: 'Leid innovatieve duurzame bouwprojecten van concept tot oplevering. Als Projectleider ben je de drijvende kracht achter circulaire en energieneutrale gebouwen.',
    responsibilities: [
      'Aansturen van multidisciplinaire bouwteams',
      'Coördineren van duurzaamheidscertificering (BREEAM/WELL)',
      'Budget- en planning verantwoordelijkheid',
      'Stakeholder management met klanten en partners'
    ],
    requirements_must: [
      'HBO/WO Bouwkunde of Civiele Techniek',
      'Minimaal 3 jaar ervaring als projectleider',
      'Kennis van duurzaam bouwen en circulaire economie',
      'Leiderschaps- en communicatievaardigheden'
    ],
    requirements_nice: [
      'BREEAM assessor certificering',
      'Ervaring met houtbouw',
      'Netwerk in de duurzame bouwsector'
    ],
    benefits: [
      'Salaris €4.500 - €6.000 bruto per maand',
      'Hybride werken (3 dagen kantoor)',
      'Lease elektrische auto',
      '30 vakantiedagen',
      'Bonus gebaseerd op projectresultaten'
    ],
    contact_name: 'Mark van der Berg',
    contact_email: 'demo@kandidatentekort.nl',
    contact_phone: '+31 30 789 0123',
  },

  // Template C - Classic Corporate (Clean White)
  {
    company_name: 'Fintech Partners',
    company_website: 'https://www.fintechpartners.nl',
    company_sector: 'Financiële Diensten',
    primary_color: '#6366F1',
    template_style: 'corporate',
    image_style: 'minimal',
    job_title: 'Senior Financial Analyst',
    job_location: 'Rotterdam',
    salary_min: 5500,
    salary_max: 7500,
    employment_type: 'fulltime',
    job_description: 'Analyseer financiële data en adviseer over strategische investeringen. Als Senior Financial Analyst ben je een trusted advisor voor onze investment teams.',
    responsibilities: [
      'Uitvoeren van financiële analyses en due diligence',
      'Opstellen van investment memos en rapportages',
      'Adviseren over portfolio strategie',
      'Presenteren aan investment committee'
    ],
    requirements_must: [
      'MSc in Finance, Economics of Accountancy',
      'Minimaal 4 jaar ervaring in financial analysis',
      'Uitstekende kennis van Excel en financiële modellen',
      'CFA Level 2 of hoger (of in opleiding)'
    ],
    requirements_nice: [
      'Ervaring in private equity of VC',
      'Kennis van fintech sector',
      'Bloomberg certificatie'
    ],
    benefits: [
      'Salaris €5.500 - €7.500 bruto per maand',
      'Bonus tot 20% van jaarsalaris',
      'Pensioenregeling (8% employer contribution)',
      'Professionele ontwikkeling (CFA/FRM support)',
      'Centraal kantoor met uitzicht op de Maas'
    ],
    contact_name: 'Lisa de Jong',
    contact_email: 'demo@kandidatentekort.nl',
    contact_phone: '+31 10 456 7890',
  },
];

async function callEdgeFunction(data) {
  const edgeUrl = process.env.VITE_SUPABASE_URL?.replace('https://', 'https://') + '/functions/v1/generate-landing-page';
  const anonKey = process.env.VITE_SUPABASE_ANON_KEY;

  const response = await fetch(edgeUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${anonKey}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Edge Function failed: ${response.status} ${text}`);
  }

  return await response.json();
}

async function seedDemoPages() {
  console.log('🌱 Seeding 3 NEW template demos via Edge Function...\n');

  for (const vacancy of DEMO_VACANCIES) {
    console.log(`📄 Creating demo for: ${vacancy.company_name} - ${vacancy.job_title} (${vacancy.template_style})`);

    try {
      const result = await callEdgeFunction(vacancy);
      console.log(`   ✅ Created: /v/${result.slug}`);
    } catch (error) {
      console.error(`   ❌ Failed:`, error.message);
    }
  }

  console.log('\n✨ Done! Check your dashboard at:');
  console.log('   https://landing-page-recruitment-eight.vercel.app/admin/paginas');
  console.log('\nNew demo URLs:');
  console.log('   /v/techvision-ai-senior-ai-engineer');
  console.log('   /v/greenbuild-solutions-projectleider-duurzame-bouw');
  console.log('   /v/fintech-partners-senior-financial-analyst');
}

// Load .env manually since we're in CommonJS mode
import('dotenv/config').then(() => {
  if (!process.env.VITE_SUPABASE_URL || !process.env.VITE_SUPABASE_ANON_KEY) {
    console.error('❌ Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env');
    process.exit(1);
  }
  seedDemoPages().catch(console.error);
});
