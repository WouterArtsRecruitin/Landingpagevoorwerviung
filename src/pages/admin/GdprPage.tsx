import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { GdprRequest } from "@/types/admin";
import {
  NewGdprRequestForm, DataRetentionSection, TypeBadge, GdprStatusBadge,
} from "@/components/admin/gdpr-components";

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

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white rounded-lg border p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-48 mb-3" />
            <div className="h-8 bg-gray-200 rounded w-24" />
          </div>
        ))}
      </div>
    );
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

      <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">AVG-richtlijnen</h3>
        <ul className="text-xs text-blue-700 space-y-1">
          <li>- Verzoeken moeten binnen <strong>30 dagen</strong> worden verwerkt</li>
          <li>- Kandidaatgegevens worden automatisch geanonimiseerd na de retentieperiode</li>
          <li>- Export bevat alle persoonsgegevens van de betreffende kandidaat</li>
          <li>- Na verwijdering zijn gegevens niet meer herstelbaar</li>
        </ul>
      </div>

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
                  <GdprStatusBadge status={req.status} />
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

      <DataRetentionSection />
    </div>
  );
}
