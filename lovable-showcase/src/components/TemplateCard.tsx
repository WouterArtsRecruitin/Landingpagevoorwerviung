interface Template {
  id: string;
  name: string;
  emoji: string;
  sector: string;
  color: string;
  gradient: string;
  description: string;
  features: string[];
  demoUrl: string;
  thumbnailUrl: string;
}

interface TemplateCardProps {
  template: Template;
  onSelect: (id: string) => void;
}

export default function TemplateCard({ template, onSelect }: TemplateCardProps) {
  return (
    <div
      onClick={() => onSelect(template.id)}
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden border border-gray-100 cursor-pointer"
    >
      {/* Gradient Header */}
      <div
        className="h-48 flex items-center justify-center text-white relative overflow-hidden"
        style={{ background: template.gradient }}
      >
        <div className="text-8xl opacity-50">{template.emoji}</div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="text-center px-4">
            <div className="text-white font-bold text-lg mb-2">Bekijk Preview</div>
            <div className="text-white/80 text-sm">Klik voor details</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
            {template.sector}
          </span>
          <div
            className="w-6 h-6 rounded-full border-2 border-white shadow"
            style={{ background: template.color }}
          ></div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {template.emoji} {template.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          {template.description}
        </p>

        {/* Features */}
        <ul className="space-y-1 mb-4">
          {template.features.slice(0, 2).map((feature, i) => (
            <li key={i} className="text-xs text-gray-500 flex items-start gap-1">
              <span className="text-green-500">✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <button
          className="w-full py-3 rounded-lg font-semibold text-white transition-all hover:scale-105 shadow"
          style={{ background: template.gradient }}
        >
          Gebruik Template →
        </button>
      </div>
    </div>
  );
}
