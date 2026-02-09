// Static section builders: FAQ, salary breakdown, final CTA

export function buildSalarySection(salaryText: string, salaryMin?: number, salaryMax?: number) {
  return {
    id: "salary-1",
    type: "salary_breakdown",
    order: 3,
    visible: true,
    data: {
      heading: "Wat verdien je?",
      subheading: "Transparant overzicht van je beloning",
      items: [
        {
          icon: "euro",
          label: "Basissalaris",
          value: salaryText,
          description: "Bruto maandsalaris o.b.v. ervaring",
        },
        {
          icon: "gift",
          label: "Vakantietoeslag",
          value: "8%",
          description: "Jaarlijkse vakantietoeslag",
        },
      ],
      totalLabel: "Indicatief jaarsalaris",
      totalValue: salaryMin && salaryMax
        ? `\u20AC${Math.round(salaryMin * 12.96 / 1000) * 1000} - \u20AC${Math.round(salaryMax * 12.96 / 1000) * 1000}`
        : salaryText,
      totalDescription: "Inclusief vakantietoeslag",
    },
  };
}

export function buildFaqSection(body: Record<string, unknown>) {
  return {
    id: "faq-1",
    type: "faq",
    order: 5,
    visible: true,
    data: {
      heading: "Veelgestelde vragen",
      subheading: "Nog vragen? Hier vind je antwoorden.",
      faqs: [
        {
          question: "Hoe ziet het sollicitatieproces eruit?",
          answer: `Na je sollicitatie nemen we snel contact met je op voor een kennismakingsgesprek. Het proces is laagdrempelig en snel.`,
        },
        {
          question: "Kan ik ook eerst vrijblijvend informatie krijgen?",
          answer: `Natuurlijk! Neem gerust contact op met ${body.contact_name} via telefoon of WhatsApp. Een vrijblijvend gesprek is altijd mogelijk.`,
        },
        {
          question: "Wanneer kan ik starten?",
          answer: "De startdatum is in overleg. We kijken samen naar wat het beste uitkomt.",
        },
      ],
    },
  };
}

export function buildFinalCtaSection(body: Record<string, unknown>, companyName: string) {
  return {
    id: "final-cta-1",
    type: "final_cta",
    order: 7,
    visible: true,
    data: {
      heading: "Klaar om te solliciteren",
      highlightedText: `bij ${companyName}?`,
      subheading: "Kies de manier die bij je past. Geen verplichtingen.",
      ctaOptions: [
        {
          type: "apply",
          heading: "Online solliciteren",
          description: "Vul het formulier in en we reageren snel",
          buttonLabel: "Ja, dit lijkt me wat!",
        },
        ...(body.contact_whatsapp
          ? [{
              type: "whatsapp",
              heading: "Via WhatsApp",
              description: "Stel je vraag direct via WhatsApp",
              buttonLabel: "Stuur een bericht",
            }]
          : []),
      ],
      trustBadges: [
        "Snelle reactie",
        "Vrijblijvend kennismaken",
        "Je gegevens zijn veilig (AVG)",
      ],
    },
  };
}
