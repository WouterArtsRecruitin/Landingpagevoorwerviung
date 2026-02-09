import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import type { DashboardStats } from "@/types/admin";

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalPages: 0,
    publishedPages: 0,
    totalCandidates: 0,
    candidatesThisWeek: 0,
    pendingGdprRequests: 0,
  });
  const [recentPages, setRecentPages] = useState<
    Array<{ id: string; slug: string; page_title: string; status: string; created_at: string }>
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [pagesRes, appsRes, gdprRes] = await Promise.all([
          supabase.from("landing_pages").select("id, slug, page_title, status, created_at"),
          supabase.from("applications").select("id, created_at"),
          supabase.from("gdpr_requests").select("id, status"),
        ]);

        const pages = pagesRes.data || [];
        const apps = appsRes.data || [];
        const gdpr = gdprRes.data || [];

        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);

        setStats({
          totalPages: pages.length,
          publishedPages: pages.filter((p) => p.status === "published").length,
          totalCandidates: apps.length,
          candidatesThisWeek: apps.filter(
            (a) => new Date(a.created_at) > weekAgo
          ).length,
          pendingGdprRequests: gdpr.filter((g) => g.status === "pending").length,
        });

        setRecentPages(
          pages
            .sort(
              (a, b) =>
                new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            )
            .slice(0, 5)
        );
      } catch {
        // Dashboard stats laden mislukt
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-lg border p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-20 mb-2" />
              <div className="h-8 bg-gray-200 rounded w-12" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <Link
          to="/admin/nieuw"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          + Nieuwe vacature
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Totaal pagina's" value={stats.totalPages} />
        <StatCard label="Gepubliceerd" value={stats.publishedPages} accent="green" />
        <StatCard label="Kandidaten" value={stats.totalCandidates} />
        <StatCard
          label="Deze week"
          value={stats.candidatesThisWeek}
          accent="blue"
        />
      </div>

      {/* AVG waarschuwing */}
      {stats.pendingGdprRequests > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-sm text-amber-800">
            <strong>{stats.pendingGdprRequests} AVG-verzoek(en)</strong> wachten
            op verwerking.{" "}
            <Link to="/admin/avg" className="underline">
              Bekijk verzoeken
            </Link>
          </p>
        </div>
      )}

      {/* Recente pagina's */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recente vacaturepagina's
        </h3>
        {recentPages.length === 0 ? (
          <div className="bg-white rounded-lg border p-8 text-center">
            <p className="text-gray-500 mb-4">
              Nog geen vacaturepagina's aangemaakt.
            </p>
            <Link
              to="/admin/nieuw"
              className="text-blue-600 hover:underline text-sm"
            >
              Maak je eerste vacaturepagina
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg border divide-y">
            {recentPages.map((page) => (
              <div
                key={page.id}
                className="flex items-center justify-between px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {page.page_title}
                  </p>
                  <p className="text-xs text-gray-500">/v/{page.slug}</p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={page.status} />
                  <a
                    href={`/v/${page.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Bekijk
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: "green" | "blue";
}) {
  const valueColor =
    accent === "green"
      ? "text-green-600"
      : accent === "blue"
        ? "text-blue-600"
        : "text-gray-900";

  return (
    <div className="bg-white rounded-lg border p-6">
      <p className="text-sm text-gray-500">{label}</p>
      <p className={`text-3xl font-bold mt-1 ${valueColor}`}>{value}</p>
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
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${styles[status] || styles.draft}`}
    >
      {labels[status] || status}
    </span>
  );
}
