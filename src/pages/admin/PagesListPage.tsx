import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface PageRow {
  id: string;
  slug: string;
  page_title: string;
  status: string;
  created_at: string;
  published_at: string | null;
  contact_person_name: string | null;
}

export default function PagesListPage() {
  const [pages, setPages] = useState<PageRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPages();
  }, []);

  async function loadPages() {
    try {
      const { data } = await supabase
        .from("landing_pages")
        .select("id, slug, page_title, status, created_at, published_at, contact_person_name")
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Vacaturepagina's</h2>
        <span className="text-sm text-gray-500">{pages.length} pagina's</span>
      </div>

      {pages.length === 0 ? (
        <div className="bg-white rounded-lg border p-8 text-center">
          <p className="text-gray-500">Nog geen pagina's. Maak er een via het intake formulier.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border divide-y">
          {pages.map((page) => (
            <div key={page.id} className="p-4 flex items-center justify-between gap-4">
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
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <StatusBadge status={page.status} />

                <select
                  value={page.status}
                  onChange={(e) => updateStatus(page.id, e.target.value)}
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
              </div>
            </div>
          ))}
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
