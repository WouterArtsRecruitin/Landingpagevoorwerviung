import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Candidate {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  city: string | null;
  motivation: string | null;
  cv_storage_path: string | null;
  privacy_consent: boolean;
  utm_source: string | null;
  utm_campaign: string | null;
  device_type: string | null;
  ats_sync_status: string;
  created_at: string;
  retention_expires_at: string | null;
  anonymized_at: string | null;
  landing_page_id: string;
}

interface PageOption {
  id: string;
  slug: string;
  page_title: string;
}

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [pages, setPages] = useState<PageOption[]>([]);
  const [selectedPage, setSelectedPage] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [candRes, pagesRes] = await Promise.all([
        supabase
          .from("applications")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase
          .from("landing_pages")
          .select("id, slug, page_title"),
      ]);

      setCandidates(candRes.data || []);
      setPages(pagesRes.data || []);
    } catch {
      // Laden mislukt
    } finally {
      setLoading(false);
    }
  }

  const filtered = selectedPage === "all"
    ? candidates
    : candidates.filter((c) => c.landing_page_id === selectedPage);

  const pageTitle = (id: string) =>
    pages.find((p) => p.id === id)?.page_title || "Onbekend";

  if (loading) {
    return <div className="animate-pulse space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-lg border p-4">
          <div className="h-4 bg-gray-200 rounded w-40 mb-2" />
          <div className="h-3 bg-gray-200 rounded w-28" />
        </div>
      ))}
    </div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Kandidaten</h2>
        <div className="flex items-center gap-3">
          <select
            value={selectedPage}
            onChange={(e) => setSelectedPage(e.target.value)}
            className="text-sm border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="all">Alle vacatures ({candidates.length})</option>
            {pages.map((p) => (
              <option key={p.id} value={p.id}>
                {p.page_title} ({candidates.filter((c) => c.landing_page_id === p.id).length})
              </option>
            ))}
          </select>
          <button
            onClick={() => exportCsv(filtered)}
            className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            Exporteer CSV
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-lg border p-8 text-center">
          <p className="text-gray-500">Nog geen kandidaten voor deze selectie.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Naam</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Email</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">Telefoon</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600 hidden lg:table-cell">Vacature</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Datum</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">ATS</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => setSelectedCandidate(c)}
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {c.anonymized_at ? (
                        <span className="text-gray-400 italic">Geanonimiseerd</span>
                      ) : (
                        c.full_name
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {c.anonymized_at ? "***" : c.email}
                    </td>
                    <td className="px-4 py-3 text-gray-600 hidden md:table-cell">
                      {c.anonymized_at ? "***" : (c.phone || "-")}
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs hidden lg:table-cell truncate max-w-[200px]">
                      {pageTitle(c.landing_page_id)}
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">
                      {new Date(c.created_at).toLocaleDateString("nl-NL")}
                    </td>
                    <td className="px-4 py-3">
                      <AtsBadge status={c.ats_sync_status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detail modal */}
      {selectedCandidate && (
        <CandidateDetail
          candidate={selectedCandidate}
          pageTitle={pageTitle(selectedCandidate.landing_page_id)}
          onClose={() => setSelectedCandidate(null)}
        />
      )}
    </div>
  );
}

function CandidateDetail({ candidate, pageTitle, onClose }: {
  candidate: Candidate; pageTitle: string; onClose: () => void;
}) {
  if (candidate.anonymized_at) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div className="bg-white rounded-lg p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
          <h3 className="text-lg font-semibold mb-2">Geanonimiseerd</h3>
          <p className="text-sm text-gray-600">
            Deze kandidaat is geanonimiseerd op {new Date(candidate.anonymized_at).toLocaleDateString("nl-NL")} conform AVG-beleid.
          </p>
          <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-100 rounded-lg text-sm">Sluiten</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{candidate.full_name}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
        </div>
        <div className="space-y-3 text-sm">
          <DetailRow label="E-mail" value={candidate.email} />
          <DetailRow label="Telefoon" value={candidate.phone} />
          <DetailRow label="Woonplaats" value={candidate.city} />
          <DetailRow label="Vacature" value={pageTitle} />
          <DetailRow label="Datum" value={new Date(candidate.created_at).toLocaleString("nl-NL")} />
          <DetailRow label="Bron" value={candidate.utm_source} />
          <DetailRow label="Campagne" value={candidate.utm_campaign} />
          <DetailRow label="Apparaat" value={candidate.device_type} />
          <DetailRow label="ATS status" value={candidate.ats_sync_status} />
          {candidate.motivation && (
            <div>
              <p className="text-gray-500 text-xs mb-1">Motivatie</p>
              <p className="text-gray-700 bg-gray-50 rounded p-2">{candidate.motivation}</p>
            </div>
          )}
          {candidate.cv_storage_path && (
            <div>
              <p className="text-gray-500 text-xs mb-1">CV</p>
              <p className="text-blue-600 text-xs">{candidate.cv_storage_path}</p>
            </div>
          )}
          {candidate.retention_expires_at && (
            <div className="bg-amber-50 rounded p-2">
              <p className="text-xs text-amber-700">
                Data verloopt op: {new Date(candidate.retention_expires_at).toLocaleDateString("nl-NL")}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500">{label}</span>
      <span className="text-gray-900 font-medium">{value || "-"}</span>
    </div>
  );
}

function AtsBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-gray-100 text-gray-600",
    synced: "bg-green-100 text-green-700",
    failed: "bg-red-100 text-red-600",
    skipped: "bg-gray-100 text-gray-400",
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${styles[status] || styles.pending}`}>
      {status}
    </span>
  );
}

function exportCsv(candidates: Candidate[]) {
  const active = candidates.filter((c) => !c.anonymized_at);
  if (active.length === 0) return;

  const headers = ["Naam", "Email", "Telefoon", "Woonplaats", "Datum", "Bron", "ATS Status"];
  const rows = active.map((c) => [
    c.full_name,
    c.email,
    c.phone || "",
    c.city || "",
    new Date(c.created_at).toLocaleDateString("nl-NL"),
    c.utm_source || "",
    c.ats_sync_status,
  ]);

  const csv = [headers, ...rows].map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `kandidaten-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
