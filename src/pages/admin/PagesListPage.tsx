import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ShareWithClientButton } from "@/components/admin/ShareWithClientButton";

interface ApprovalToken {
  id: string;
  client_email: string;
  client_name: string | null;
  status: string;
  created_at: string;
  approved_at: string | null;
}

interface PageRow {
  id: string;
  slug: string;
  page_title: string;
  status: string;
  created_at: string;
  published_at: string | null;
  contact_person_name: string | null;
  contact_person_email: string | null;
  approval_tokens?: ApprovalToken[];
}

export default function PagesListPage() {
  const [pages, setPages] = useState<PageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCreator, setFilterCreator] = useState<string>("all");

  useEffect(() => {
    loadPages();
  }, []);

  async function loadPages() {
    try {
      const { data } = await supabase
        .from("landing_pages")
        .select(`
          id,
          slug,
          page_title,
          status,
          created_at,
          published_at,
          contact_person_name,
          contact_person_email,
          approval_tokens (
            id,
            client_email,
            client_name,
            status,
            created_at,
            approved_at
          )
        `)
        .order("created_at", { ascending: false });

      setPages(data || []);
    } catch {
      // Laden mislukt
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: string, status: string) {
    const updates: Record<string, unknown> = { status };
    if (status === "published") {
      updates.published_at = new Date().toISOString();
    }

    await supabase.from("landing_pages").update(updates).eq("id", id);
    loadPages();
  }

  if (loading) {
    return <div className="animate-pulse space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-lg border p-4">
          <div className="h-4 bg-gray-200 rounded w-48 mb-2" />
          <div className="h-3 bg-gray-200 rounded w-32" />
        </div>
      ))}
    </div>;
  }

  // Calculate statistics per creator
  const creatorStats = pages.reduce((acc, page) => {
    const creator = page.contact_person_email || "Onbekend";
    const name = page.contact_person_name || "Onbekend";
    if (!acc[creator]) {
      acc[creator] = { email: creator, name, count: 0 };
    }
    acc[creator].count++;
    return acc;
  }, {} as Record<string, { email: string; name: string; count: number }>);

  const sortedCreators = Object.values(creatorStats).sort((a, b) => b.count - a.count);

  // Filter pages by selected creator
  const filteredPages = filterCreator === "all"
    ? pages
    : pages.filter(p => (p.contact_person_email || "Onbekend") === filterCreator);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Vacaturepagina's</h2>
        <span className="text-sm text-gray-500">{pages.length} pagina's</span>
      </div>

      {/* Statistics Dashboard */}
      {sortedCreators.length > 0 && (
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistieken per maker</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
            {sortedCreators.map((creator) => (
              <div key={creator.email} className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm font-medium text-gray-900">{creator.name}</div>
                <div className="text-xs text-gray-500 truncate">{creator.email}</div>
                <div className="text-2xl font-bold text-blue-600 mt-2">{creator.count}</div>
                <div className="text-xs text-gray-500">pagina's aangemaakt</div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-700">Filter op maker:</label>
            <select
              value={filterCreator}
              onChange={(e) => setFilterCreator(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="all">Alle makers ({pages.length})</option>
              {sortedCreators.map((creator) => (
                <option key={creator.email} value={creator.email}>
                  {creator.name} ({creator.count})
                </option>
              ))}
            </select>
            {filterCreator !== "all" && (
              <button
                onClick={() => setFilterCreator("all")}
                className="text-xs text-blue-600 hover:underline"
              >
                Reset filter
              </button>
            )}
          </div>
        </div>
      )}

      {pages.length === 0 ? (
        <div className="bg-white rounded-lg border p-8 text-center">
          <p className="text-gray-500">Nog geen pagina's. Maak er een via het intake formulier.</p>
        </div>
      ) : filteredPages.length === 0 ? (
        <div className="bg-white rounded-lg border p-8 text-center">
          <p className="text-gray-500">Geen pagina's gevonden voor deze maker.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border divide-y">
          {filteredPages.map((page) => (
            <PageRow
              key={page.id}
              page={page}
              onStatusUpdate={updateStatus}
              onShared={loadPages}
            />
          ))}
        </div>
      )}

    </div>
  );
}

function PageRow({
  page,
  onStatusUpdate,
  onShared,
}: {
  page: PageRow;
  onStatusUpdate: (id: string, status: string) => void;
  onShared: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [showEmailHistory, setShowEmailHistory] = useState(false);

  const emailCount = page.approval_tokens?.length || 0;

  return (
    <div className="p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {page.page_title}
          </p>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs text-gray-500 font-mono">/v/{page.slug}</span>
            {page.contact_person_name && (
              <span className="text-xs text-gray-400">{page.contact_person_name}</span>
            )}
            <span className="text-xs text-gray-400">
              {new Date(page.created_at).toLocaleDateString("nl-NL")}
            </span>
            {emailCount > 0 && (
              <button
                onClick={() => setShowEmailHistory(!showEmailHistory)}
                className="text-xs text-blue-600 hover:underline flex items-center gap-1"
              >
                📧 {emailCount}x gedeeld
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <StatusBadge status={page.status} />

          <select
            value={page.status}
            onChange={(e) => onStatusUpdate(page.id, e.target.value)}
            className="text-xs border border-gray-200 rounded px-2 py-1"
          >
            <option value="draft">Concept</option>
            <option value="published">Publiceren</option>
            <option value="paused">Pauzeren</option>
            <option value="archived">Archiveren</option>
          </select>

          <a
            href={`/v/${page.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 hover:underline px-2"
          >
            Bekijk
          </a>

          {page.status === 'draft' && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs px-3 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors font-medium"
            >
              {expanded ? 'Verberg' : 'Delen'}
            </button>
          )}
        </div>
      </div>

      {expanded && page.status === 'draft' && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="max-w-md">
            <ShareWithClientButton pageId={page.id} onShared={onShared} />
          </div>
        </div>
      )}

      {showEmailHistory && emailCount > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">📧 Email geschiedenis</h4>
          <div className="space-y-2">
            {page.approval_tokens?.map((token) => (
              <div key={token.id} className="bg-gray-50 rounded-lg p-3 text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900">
                      {token.client_name || token.client_email}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {token.client_email}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Verzonden: {new Date(token.created_at).toLocaleString("nl-NL")}
                    </div>
                    {token.approved_at && (
                      <div className="text-xs text-gray-500">
                        Goedgekeurd: {new Date(token.approved_at).toLocaleString("nl-NL")}
                      </div>
                    )}
                  </div>
                  <ApprovalStatusBadge status={token.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    draft: "bg-gray-100 text-gray-600",
    published: "bg-green-100 text-green-700",
    paused: "bg-amber-100 text-amber-700",
    archived: "bg-red-100 text-red-600",
  };
  const labels: Record<string, string> = {
    draft: "Concept",
    published: "Live",
    paused: "Gepauzeerd",
    archived: "Gearchiveerd",
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${styles[status] || styles.draft}`}>
      {labels[status] || status}
    </span>
  );
}

function ApprovalStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    approved: "bg-green-100 text-green-700",
    feedback: "bg-blue-100 text-blue-700",
    rejected: "bg-red-100 text-red-700",
  };
  const labels: Record<string, string> = {
    pending: "⏳ Wacht op reactie",
    approved: "✅ Goedgekeurd",
    feedback: "💬 Feedback gegeven",
    rejected: "❌ Afgekeurd",
  };

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${styles[status] || styles.pending}`}>
      {labels[status] || status}
    </span>
  );
}
