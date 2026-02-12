import { useState } from "react";

// === Review component ===

export function ReviewSection({ title, stepNr, onEdit, rows }: {
  title: string;
  stepNr: number;
  onEdit: () => void;
  rows: Array<{ label: string; value: string; isColor?: boolean }>;
}) {
  return (
    <div className="bg-white border rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-gray-900">
          Stap {stepNr}: {title}
        </h4>
        <button onClick={onEdit} className="text-xs text-blue-600 hover:underline">
          Aanpassen
        </button>
      </div>
      <div className="space-y-2">
        {rows.map((row) => (
          <div key={row.label} className="flex justify-between text-sm">
            <span className="text-gray-500">{row.label}</span>
            {row.isColor ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: row.value }} />
                <span className="text-gray-900 font-mono text-xs">{row.value}</span>
              </div>
            ) : (
              <span className="text-gray-900 font-medium text-right max-w-[60%] truncate">
                {row.value}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// === Herbruikbare form components ===

export function Field({ label, value, onChange, placeholder, type = "text", helpText, required, recommended }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; helpText?: string;
  required?: boolean; recommended?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
        {recommended && <span className="text-amber-500 ml-1 text-xs">(aanbevolen)</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          required && !value ? "border-red-300" : "border-gray-300"
        }`}
      />
      {helpText && <p className="text-xs text-gray-500 mt-1">{helpText}</p>}
      {recommended && !helpText && <p className="text-xs text-amber-600 mt-1">{recommended}</p>}
    </div>
  );
}

export function NumberField({ label, value, onChange, placeholder, prefix, recommended }: {
  label: string; value: number | null; onChange: (v: number | null) => void;
  placeholder?: string; prefix?: string; recommended?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {recommended && <span className="text-amber-500 ml-1 text-xs">(aanbevolen)</span>}
      </label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">{prefix}</span>
        )}
        <input
          type="number"
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}
          placeholder={placeholder}
          className={`w-full border border-gray-300 rounded-lg py-2 text-sm focus:ring-2 focus:ring-blue-500 ${prefix ? "pl-12 pr-3" : "px-3"}`}
        />
      </div>
    </div>
  );
}

export function SelectField({ label, value, onChange, options, recommended, helpText }: {
  label: string; value: string; onChange: (v: string) => void;
  options: Array<{ value: string; label: string }>; recommended?: string; helpText?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {recommended && <span className="text-amber-500 ml-1 text-xs">(aanbevolen)</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
      >
        <option value="">-- Selecteer --</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      {helpText && <p className="text-xs text-gray-500 mt-1">{helpText}</p>}
      {recommended && !helpText && <p className="text-xs text-amber-600 mt-1">{recommended}</p>}
    </div>
  );
}

export function TextAreaField({ label, value, onChange, placeholder, rows = 3, recommended }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; rows?: number; recommended?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {recommended && <span className="text-amber-500 ml-1 text-xs">(aanbevolen)</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
      />
      {recommended && <p className="text-xs text-amber-600 mt-1">{recommended}</p>}
    </div>
  );
}

export function ListField({ label, items, onChange, placeholder, helpText, recommended }: {
  label: string; items: string[]; onChange: (v: string[]) => void;
  placeholder?: string; helpText?: string; recommended?: boolean;
}) {
  const [inputValue, setInputValue] = useState("");

  function addItem() {
    const trimmed = inputValue.trim();
    if (trimmed && !items.includes(trimmed)) {
      onChange([...items, trimmed]);
      setInputValue("");
    }
  }

  function removeItem(index: number) {
    onChange(items.filter((_, i) => i !== index));
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {recommended && <span className="text-amber-500 ml-1 text-xs">(aanbevolen)</span>}
      </label>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addItem(); } }}
          placeholder={placeholder}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
        />
        <button type="button" onClick={addItem} className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">
          +
        </button>
      </div>
      {items.length > 0 && (
        <div className="space-y-1">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-2 bg-gray-50 rounded px-3 py-1.5">
              <span className="flex-1 text-sm text-gray-700">{item}</span>
              <button onClick={() => removeItem(i)} className="text-gray-400 hover:text-red-500 text-sm">x</button>
            </div>
          ))}
        </div>
      )}
      {helpText && <p className="text-xs text-gray-500 mt-1">{helpText}</p>}
    </div>
  );
}
