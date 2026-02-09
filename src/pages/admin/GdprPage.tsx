import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { GdprRequest } from "@/types/admin";

export default function GdprPage() {
  const [requests, setRequests] = useState<GdprRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewForm, setShowNewForm] = useState(false);

  useEffect(() => {
    loadRequests();
  }, []);

  async function loadRequests() {
    try {
      const { data } = await supabase
        .from("gdpr_requests")
        .select("*")
        .order("created_at", { ascending: false });

      setRequests(data || []);
    } catch {
      // Laden mislukt
    } finally {
      setLoading(false);
    }
  }

  async function updateRequestStatus(id: string, status: string) {
    const updates: Record<string, unknown> = {
      status,
      processed_at: new Date().toISOString(),
    };

    if (status === "completed") {
      updates.data_deleted_at = new Date().toISOString();
    }

    await supabase.from("gdpr_requests").update(updates).eq("id", id);
    loadRequests();
  }

  async function anonymizeCandidate(applicationId: string) {
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
      .eq("id", applicationId);
  }

  const pending = requests.filter((r) => r.status === "pending");
  const completed = requests.filter((r) => r.status !== "pending");

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">AVG / GDPR</h2>
          <p className="text-sm text-gray-600 mt-1">
            Beheer persoonsgegevens en verwerk AVG-verzoeken
          </p>
        </div>
        <button
          onClick={() => setShowNewForm(!showNewForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
        >
          + Nieuw verzoek
        </button>
      </div>

      {/* Info */}
      <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">AVG-richtlijnen</h3>
        <ul className="text-xs text-blue-700 space-y-1">
          <li>- Verzoeken moeten binnen <strong>30 dagen</strong> worden verwerkt</li>
          <li>- Kandidaatgegevens worden automatisch geanonimiseerd na de retentieperiode</li>
          <li>- Export bevat alle persoonsgegevens van de betreffende kandidaat</li>
          <li>- Na verwijdering zijn gegevens niet meer herstelbaar</li>
        </ul>
      </div>

      {/* Nieuw verzoek form */}
      {showNewForm && (
        <NewGdprRequestForm
          onSubmit={async (data) => {
            await supabase.from("gdpr_requests").insert({
              ...data,
              deadline_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            });
            setShowNewForm(false);
            loadRequests();
          }}
          onCancel={() => setShowNewForm(false)}
        />
      )}

      {/* Openstaande verzoeken */}
      {pending.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Openstaand ({pending.length})
          </h3>
          <div className="space-y-3">
            {pending.map((req) => (
              <div key={req.id} className="bg-white rounded-lg border p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <TypeBadge type={req.request_type} />
                    <span className="text-sm font-medium">{req.requester_email}</span>
                    {req.requester_name && (
                      <span className="text-xs text-gray-500">({req.requester_name})</span>
                    )}
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(req.created_at).toLocaleDateString("nl-NL")}
                  </span>
                </div>
                {req.deadline_at && (
                  <p className="text-xs text-amber-600 mb-3">
                    Deadline: {new Date(req.deadline_at).toLocaleDateString("nl-NL")}
                  </p>
                )}
                <div className="flex gap-2">
                  {req.request_type === "delete" && req.application_id && (
                    <button
                      onClick={async () => {
                        await anonymizeCandidate(req.application_id!);
                        await updateRequestStatus(req.id, "completed");
                      }}
                      className="px-3 py-1.5 bg-red-600 text-white rounded text-xs hover:bg-red-700"
                    >
                      Anonimiseer & voltooi
                    </button>
                  )}
                  <button
                    onClick={() => updateRequestStatus(req.id, "completed")}
                    className="px-3 py-1.5 bg-green-600 text-white rounded text-xs hover:bg-green-700"
                  >
                    Markeer als afgerond
                  </button>
                  <button
                    onClick={() => updateRequestStatus(req.id, "rejected")}
                    className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded text-xs hover:bg-gray-200"
                  >
                    Afwijzen
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Afgeronde verzoeken */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Geschiedenis ({completed.length})
        </h3>
        {completed.length === 0 ? (
          <p className="text-sm text-gray-500">Geen afgeronde verzoeken.</p>
        ) : (
          <div className="bg-white rounded-lg border divide-y">
            {completed.map((req) => (
              <div key={req.id} className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2">
                  <TypeBadge type={req.request_type} />
                  <span className="text-sm">{req.requester_email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={req.status} />
                  <span className="text-xs text-gray-400">
                    {req.processed_at
                      ? new Date(req.processed_at).toLocaleDateString("nl-NL")
                      : "-"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Data retentie */}
      <DataRetentionSection />
    </div>
  );
}

function NewGdprRequestForm({ onSubmit, onCancel }: {
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

function DataRetentionSection() {
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

function TypeBadge({ type }: { type: string }) {
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

function StatusBadge({ status }: { status: string }) {
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
