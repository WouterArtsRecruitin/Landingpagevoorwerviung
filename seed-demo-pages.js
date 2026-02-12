#!/usr/bin/env node
/**
 * Seed demo landing pages for all 6 templates via Edge Function
 * Run with: node seed-demo-pages.js
 */

const DEMO_VACANCIES = [
  {
    company_name: 'ASML',
    company_website: 'https://www.asml.com',
    company_sector: 'Hightech systemen & materialen',
    primary_color: '#003DA5',
    template_style: 'engineering',
    image_style: 'photos',
    job_title: 'Mechanical Engineer',
    job_location: 'Veldhoven',
    salary_min: 5500,
    salary_max: 7500,
    employment_type: 'fulltime',
    job_description: 'Werk mee aan de meest geavanceerde halfgeleider machines ter wereld. Als Mechanical Engineer bij ASML ontwikkel je innovatieve oplossingen voor mechanische vraagstukken.',
    responsibilities: [
      'Ontwerpen van mechanische componenten voor lithografie systemen',
      'Analyseren en oplossen van complexe engineering vraagstukken',
      'Samenwerken met multidisciplinaire teams',
      'Documenteren van technische specificaties'
    ],
    requirements_must: [
      'MSc in Mechanical Engineering of vergelijkbaar',
      'Minimaal 3 jaar relevante werkervaring',
      'Kennis van CAD software (Siemens NX)',
      'Beheersing van Nederlands en Engels'
    ],
    benefits: [
      'Salaris €5.500 - €7.500 bruto per maand',
      'Pensioenregeling en bonusregeling',
      '40 vakantiedagen',
      'Uitgebreide opleidingsmogelijkheden'
    ],
    contact_name: 'Sarah van Berg',
    contact_email: 'demo@kandidatentekort.nl',
    contact_phone: '+31 40 268 3000',
  },
  {
    company_name: 'Exact',
    company_website: 'https://www.exact.com',
    company_sector: 'ICT (software)',
    primary_color: '#6366F1',
    template_style: 'tech',
    image_style: 'illustrations',
    job_title: 'Senior Full Stack Developer',
    job_location: 'Delft',
    salary_min: 5000,
    salary_max: 7000,
    employment_type: 'fulltime',
    job_description: 'Bouw de volgende generatie business software. Als Full Stack Developer werk je met moderne technologieën en heb je impact op duizenden gebruikers.',
    responsibilities: [
      'Ontwikkelen van nieuwe features in React en Node.js',
      'Optimaliseren van database queries en API performance',
      'Code reviews en mentoring van junior developers',
      'Bijdragen aan architectuur beslissingen'
    ],
    requirements_must: [
      'Minimaal 5 jaar ervaring met TypeScript/JavaScript',
      'Expert in React en Node.js',
      'Ervaring met cloud platforms (Azure/AWS)',
      'Agile/Scrum werkervaring'
    ],
    benefits: [
      'Salaris €5.000 - €7.000 bruto per maand',
      'Remote werken mogelijk (3 dagen per week)',
      'Jaarlijks opleidingsbudget €5.000',
      'MacBook Pro en twee schermen'
    ],
    contact_name: 'Mike de Vries',
    contact_email: 'demo@kandidatentekort.nl',
    contact_phone: '+31 15 711 5000',
  },
  {
    company_name: 'VDL Groep',
    company_website: 'https://www.vdlgroep.com',
    company_sector: 'Metaal - constructie/fijnmechanisch',
    primary_color: '#F97316',
    template_style: 'industrial',
    image_style: 'photos',
    job_title: 'CNC Draaier',
    job_location: 'Eindhoven',
    salary_min: 2800,
    salary_max: 3800,
    employment_type: 'fulltime',
    job_description: 'Word onderdeel van een toonaangevende machinebouwer. Als CNC Draaier werk je aan hoogwaardige precisieonderdelen voor de hightech industrie.',
    responsibilities: [
      'Instellen en bedienen van CNC draaibanken',
      'Programmeren van bewerkingen in Fanuc/Siemens',
      'Kwaliteitscontrole met meetapparatuur',
      'Optimaliseren van bewerkingsprocessen'
    ],
    requirements_must: [
      'MBO 3/4 Metaalbewerking of Werktuigbouwkunde',
      'Minimaal 2 jaar ervaring als CNC Draaier',
      'Kennis van technische tekeningen',
      'Zelfstandig kunnen werken'
    ],
    benefits: [
      'Salaris €2.800 - €3.800 bruto per maand',
      'Ploegentoeslag tot 27,5%',
      '27 vakantiedagen + 13 ADV',
      'Bedrijfsfiets regeling'
    ],
    contact_name: 'Hans Jansen',
    contact_email: 'demo@kandidatentekort.nl',
    contact_phone: '+31 40 292 1200',
  },
  {
    company_name: 'Mitsubishi Electric',
    company_website: 'https://www.mitsubishielectric.nl',
    company_sector: 'Technische dienstverlening',
    primary_color: '#DC2626',
    template_style: 'service',
    image_style: 'photos',
    job_title: 'Servicemonteur Koeltechniek',
    job_location: 'Regio Midden-Nederland',
    salary_min: 2900,
    salary_max: 3900,
    employment_type: 'fulltime',
    job_description: 'Zorg ervoor dat koelsystemen optimaal blijven draaien. Als Servicemonteur ben je het gezicht van Mitsubishi bij onze klanten en los je technische storingen op locatie op.',
    responsibilities: [
      'Onderhoud en reparatie van koelsystemen bij klanten',
      'Analyseren en oplossen van technische storingen',
      'Adviseren van klanten over optimaal gebruik',
      'Rapportage in CRM systeem'
    ],
    requirements_must: [
      'MBO 3/4 Elektrotechniek of Werktuigbouwkunde',
      'F-gassen certificaat vereist',
      'Rijbewijs B',
      'Klantgericht en oplossingsgericht'
    ],
    benefits: [
      'Salaris €2.900 - €3.900 bruto per maand',
      'Volledig ingerichte bedrijfswagen',
      'Telefoon en laptop',
      'Doorgroeimogelijkheden naar Lead Engineer'
    ],
    contact_name: 'Linda Smit',
    contact_email: 'demo@kandidatentekort.nl',
    contact_phone: '+31 36 549 2000',
  },
  {
    company_name: 'Bol.com',
    company_website: 'https://www.bol.com',
    company_sector: 'Transport/logistiek/opslag',
    primary_color: '#10B981',
    template_style: 'logistics',
    image_style: 'photos',
    job_title: 'Warehouse Teamlead',
    job_location: 'Waalwijk',
    salary_min: 3200,
    salary_max: 4200,
    employment_type: 'fulltime',
    job_description: 'Leid een team van 15-20 magazijnmedewerkers in ons state-of-the-art distributiecentrum. Als Teamlead ben je verantwoordelijk voor dagelijkse operatie en teamontwikkeling.',
    responsibilities: [
      'Aansturen van magazijnteam (15-20 FTE)',
      'Plannen en organiseren van dagelijkse werkzaamheden',
      'Monitoren van KPIs en productiviteit',
      'Coachen en ontwikkelen van teamleden'
    ],
    requirements_must: [
      'MBO 4 Logistiek of vergelijkbaar',
      'Minimaal 2 jaar leidinggevende ervaring in logistiek',
      'Kennis van WMS systemen',
      'Sterke communicatieve vaardigheden'
    ],
    benefits: [
      'Salaris €3.200 - €4.200 bruto per maand',
      'Winstuitkering tot 3% van jaarsalaris',
      'Persoonlijk ontwikkelbudget',
      'Korting op Bol.com aankopen'
    ],
    contact_name: 'Jeroen Peters',
    contact_email: 'demo@kandidatentekort.nl',
    contact_phone: '+31 416 335 555',
  },
  {
    company_name: 'Philips',
    company_website: 'https://www.philips.com',
    company_sector: 'Medische technologie',
    primary_color: '#D97706',
    template_style: 'premium',
    image_style: 'minimal',
    job_title: 'Engineering Manager',
    job_location: 'Eindhoven',
    salary_min: 8000,
    salary_max: 11000,
    employment_type: 'fulltime',
    job_description: 'Leid de ontwikkeling van levensreddende medische systemen. Als Engineering Manager ben je verantwoordelijk voor een multidisciplinair team van 30+ engineers.',
    responsibilities: [
      'Strategische leiding aan engineering afdeling (30+ FTE)',
      'Verantwoordelijk voor product roadmap en innovatie',
      'Stakeholder management met executives en klanten',
      'Budget- en resource planning (€10M+ budget)'
    ],
    requirements_must: [
      'MSc in Engineering of PhD',
      'Minimaal 8 jaar managementervaring',
      'Proven track record in medical device development',
      'Uitstekende strategische en analytische vaardigheden'
    ],
    benefits: [
      'Salaris €8.000 - €11.000 bruto per maand',
      'Bonus tot 25% van jaarsalaris',
      'Lease auto (budget €1.200/maand)',
      'Internationale carrièremogelijkheden'
    ],
    contact_name: 'Dr. Emma van Dijk',
    contact_email: 'demo@kandidatentekort.nl',
    contact_phone: '+31 40 279 9111',
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
  console.log('🌱 Seeding demo landing pages via Edge Function...\n');

  for (const vacancy of DEMO_VACANCIES) {
    console.log(`📄 Creating demo for: ${vacancy.company_name} - ${vacancy.job_title}`);

    try {
      const result = await callEdgeFunction(vacancy);
      console.log(`   ✅ Created: /v/${result.slug}`);
    } catch (error) {
      console.error(`   ❌ Failed:`, error.message);
    }
  }

  console.log('\n✨ Done! Check your dashboard at:');
  console.log('   https://landing-page-recruitment-eight.vercel.app/admin/paginas');
}

// Load .env manually since we're in CommonJS mode
import('dotenv/config').then(() => {
  if (!process.env.VITE_SUPABASE_URL || !process.env.VITE_SUPABASE_ANON_KEY) {
    console.error('❌ Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env');
    process.exit(1);
  }
  seedDemoPages().catch(console.error);
});
