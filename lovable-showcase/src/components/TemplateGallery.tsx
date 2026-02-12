import { useState } from 'react';
import TemplateCard from './TemplateCard';
import { TEMPLATES } from '../templates';

export default function TemplateGallery() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    const template = TEMPLATES.find(t => t.id === id);
    if (template?.demoUrl && template.demoUrl !== '#') {
      window.open(template.demoUrl, '_blank');
    }
  };

  return (
    <div id="templates" className="container mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          6 Templates voor Tech & Industrie
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Elk template heeft een uniek kleurenschema en visuele identiteit.
          Kies wat past bij jouw vacature.
        </p>
      </div>

      {/* Template Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {TEMPLATES.map(template => (
          <TemplateCard
            key={template.id}
            template={template}
            onSelect={handleSelect}
          />
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-20 text-center bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl p-12 sm:p-16 text-white shadow-2xl">
        <h2 className="text-4xl font-bold mb-4">
          Klaar om te starten?
        </h2>
        <p className="text-xl mb-8 text-white/90">
          Kies je template en genereer een professionele vacaturepagina in 5 minuten
        </p>
        <button className="px-8 py-4 bg-white text-purple-600 rounded-lg hover:shadow-xl hover:scale-105 transition-all font-bold text-lg">
          Start Nu Gratis →
        </button>
        <p className="text-sm text-white/70 mt-4">
          Geen creditcard nodig • Direct aan de slag
        </p>
      </div>
    </div>
  );
}
