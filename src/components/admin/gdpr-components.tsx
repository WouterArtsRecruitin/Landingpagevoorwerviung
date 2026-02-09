import { useState } from "react";
import { supabase } from "@/lib/supabase";

export function NewGdprRequestForm({ onSubmit, onCancel }: {
  onSubmit: (data: { request_type: string; requester_email: string; requester_name: string; scope: string }) => Promise<void>;
  onCancel: () => void;
}) {
  const [type, setType] = useState("export");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  return (
    <div className="bg-white rounded-lg border p-4 space-y-3">
      <h4 className="text-sm font-semibold">Nieuw AVG-verzoek</h4>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="text-xs text-gray-600 block mb-1">Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)} className="w-full border rounded px-2 py-1.5 text-sm">
            <option value="export">Data export</option>
            <option value="delete">Data verwijdering</option>
            <option value="rectify">Data correctie</option>
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-600 block mb-1">E-mail betrokkene</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded px-2 py-1.5 text-sm" placeholder="kandidaat@email.nl" />
        </div>
        <div>
          <label className="text-xs text-gray-600 block mb-1">Naam</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded px-2 py-1.5 text-sm" placeholder="Naam van betrokkene" />
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onSubmit({ request_type: type, requester_email: email, requester_name: name, scope: "candidate" })}
          disabled={!email}
          className="px-3 py-1.5 bg-blue-600 text-white rounded text-xs disabled:opacity-50"
        >
          Verzoek aanmaken
        </button>
        <button onClick={onCancel} className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded text-xs">
          Annuleren
        </button>
      </div>
    </div>
  );
}

export function DataRetentionSection() {
  const [retentionDays, setRetentionDays] = useState(90);
  const [running, setRunning] = useState(false);

  async function runRetentionCleanup() {
    setRunning(true);
    try {
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - retentionDays);

      const { data: expired } = await supabase
        .from("applications")
        .select("id")
        .lt("created_at", cutoff.toISOString())
        .is("anonymized_at", null);

      if (expired && expired.length > 0) {
        for (const app of expired) {
          await supabase
            .from("applications")
            .update({
              full_name: "Geanonimiseerd",
              email: "anoniem@verwijderd.nl",
              phone: null,
              city: null,
              motivation: null,
              cv_storage_path: null,
              extra_fields: {},
              anonymized_at: new Date().toISOString(),
            })
            .eq("id", app.id);
        }
      }
    } catch {
      // Cleanup mislukt
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className="bg-gray-50 rounded-lg border p-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-2">Data retentie</h3>
      <p className="text-xs text-gray-600 mb-3">
        Anonimiseer automatisch kandidaatgegevens die ouder zijn dan de ingestelde periode.
      </p>
      <div className="flex items-center gap-3">
        <select
          value={retentionDays}
          onChange={(e) => setRetentionDays(Number(e.target.value))}
          className="border rounded px-2 py-1.5 text-sm"
        >
          <option value={30}>30 dagen</option>
          <option value={60}>60 dagen</option>
          <option value={90}>90 dagen</option>
          <option value={180}>180 dagen</option>
          <option value={365}>1 jaar</option>
        </select>
        <button
          onClick={runRetentionCleanup}
          disabled={running}
          className="px-3 py-1.5 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200 disabled:opacity-50"
        >
          {running ? "Bezig..." : "Cleanup uitvoeren"}
        </button>
      </div>
    </div>
  );
}

export function TypeBadge({ type }: { type: string }) {
  const styles: Record<string, string> = {
    export: "bg-blue-100 text-blue-700",
    delete: "bg-red-100 text-red-600",
    rectify: "bg-amber-100 text-amber-700",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${styles[type] || ""}`}>
      {type}
    </span>
  );
}

export function GdprStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-amber-100 text-amber-700",
    in_progress: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
    rejected: "bg-gray-100 text-gray-500",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${styles[status] || ""}`}>
      {status}
    </span>
  );
}
