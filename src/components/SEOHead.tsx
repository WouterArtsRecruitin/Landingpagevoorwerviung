import { useEffect } from 'react';

interface SEOHeadProps {
  variant?: 'A' | 'B' | 'C';
}

export function SEOHead({ variant = 'A' }: SEOHeadProps) {
  useEffect(() => {
    // Update document title
    document.title = 'Servicemonteur Vacature Aebi Schmidt | €3.200-€3.800 | Holten';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Word Servicemonteur bij Aebi Schmidt in Holten. Salaris €3.200-€3.800, 40u, servicewagen, trainingen in Zwitserland. Werk met CAN-Bus, IoT en high-tech machines.'
      );
    }

    // Add structured data for Job Posting
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'JobPosting',
      title: 'Servicemonteur Regio Midden-Nederland',
      description:
        'Aebi Schmidt zoekt een Servicemonteur voor de regio Midden-Nederland. Werk met high-tech sneeuwruimapparatuur, CAN-Bus diagnostics, IoT telemetrie en geavanceerde hydrauliek. Krijg volledige training in Zwitserland en Duitsland.',
      identifier: {
        '@type': 'PropertyValue',
        name: 'Aebi Schmidt Nederland',
        value: 'SM-2025-001',
      },
      datePosted: '2025-01-15',
      validThrough: '2025-03-15T23:59:59Z',
      employmentType: 'FULL_TIME',
      hiringOrganization: {
        '@type': 'Organization',
        name: 'Aebi Schmidt Nederland',
        sameAs: 'https://www.aebi-schmidt.com',
        logo: 'https://werkenbij.aebischmidt.nl/images/aebi-schmidt-logo.png',
      },
      jobLocation: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Industrieweg 12',
          addressLocality: 'Holten',
          addressRegion: 'Overijssel',
          postalCode: '7451 PL',
          addressCountry: 'NL',
        },
      },
      baseSalary: {
        '@type': 'MonetaryAmount',
        currency: 'EUR',
        value: {
          '@type': 'QuantitativeValue',
          minValue: 3200,
          maxValue: 3800,
          unitText: 'MONTH',
        },
      },
      workHours: '40 uur per week',
      qualifications:
        'MBO niveau 3-4 richting werktuigbouwkunde, mechatronica of vergelijkbaar. Minimaal 2 jaar werkervaring als monteur. Rijbewijs B. Affiniteit met techniek en diagnostics.',
      responsibilities:
        'Onderhoud en reparatie van sneeuwschuivers, veegmachines en andere Aebi Schmidt apparatuur. CAN-Bus diagnostics, hydraulische systemen, elektrische aandrijvingen. Storing opsporen en oplossen bij klanten on-site.',
      skills: [
        'CAN-Bus diagnostics',
        'Hydraulische systemen',
        'Elektrische aandrijvingen',
        'IoT telemetrie',
        'Software diagnostics',
        'Mechanische reparaties',
      ],
      educationRequirements: {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'MBO niveau 3-4',
      },
      experienceRequirements: {
        '@type': 'OccupationalExperienceRequirements',
        monthsOfExperience: 24,
      },
      benefits: [
        'Salaris €3.200 - €3.800 per maand',
        '8% vakantiegeld',
        '25 vakantiedagen',
        'Servicewagen (VW Caddy) voor woon-werkverkeer',
        '€2.000 trainingsbudget per jaar',
        'Trainingen in Zwitserland en Duitsland',
        'Bedrijfsfitness',
        'Pensioenregeling',
        'Gereedschapsbudget €1.500',
        'Laptop en smartphone',
      ],
      industry: 'Techniek en Engineering',
      occupationalCategory: '49-9041.00', // SOC code voor Mechanical Engineering Technicians
    });
    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [variant]);

  return (
    <>
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content="Servicemonteur bij Aebi Schmidt | €3.200-€3.800 | Holten"
      />
      <meta
        property="og:description"
        content="Word Servicemonteur bij de verborgen parel van de technische sector. High-tech machines, trainingen in Zwitserland, €2.000 opleidingsbudget."
      />
      <meta property="og:image" content="https://werkenbij.aebischmidt.nl/images/og-image.jpg" />
      <meta property="og:url" content="https://werkenbij.aebischmidt.nl/servicemonteur" />
      <meta property="og:site_name" content="Werken bij Aebi Schmidt" />
      <meta property="og:locale" content="nl_NL" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="Servicemonteur bij Aebi Schmidt | €3.200-€3.800 | Holten"
      />
      <meta
        name="twitter:description"
        content="Word Servicemonteur bij de verborgen parel van de technische sector. High-tech machines, trainingen in Zwitserland."
      />
      <meta name="twitter:image" content="https://werkenbij.aebischmidt.nl/images/og-image.jpg" />

      {/* Additional SEO Meta Tags */}
      <meta name="keywords" content="servicemonteur vacature, technisch monteur, Aebi Schmidt, Holten, Overijssel, CAN-Bus, hydrauliek, sneeuwschuiver, veegmachine, technische baan" />
      <meta name="author" content="Aebi Schmidt Nederland" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Dutch" />
      <meta name="geo.region" content="NL-OV" />
      <meta name="geo.placename" content="Holten" />
      <meta name="geo.position" content="52.2894;6.4172" />
      <meta name="ICBM" content="52.2894, 6.4172" />

      {/* Canonical URL */}
      <link rel="canonical" href="https://werkenbij.aebischmidt.nl/servicemonteur" />

      {/* Favicon */}
      <link rel="icon" type="image/png" href="/favicon.png" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    </>
  );
}
