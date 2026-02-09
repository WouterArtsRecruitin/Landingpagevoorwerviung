import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  MetricCard, MiniMetric, StatusBadge, OptimizationAdvice,
} from "@/components/admin/analytics-components";

interface PageStats {
  id: string;
  slug: string;
  page_title: string;
  status: string;
  totalVisitors: number;
  totalApplications: number;
  conversionRate: number;
  avgTimeOnPage: number;
  avgScrollDepth: number;
  ctaClicks: number;
  whatsappClicks: number;
  topSources: Array<{ source: string; count: number }>;
}

interface WeeklyTrend {
  week: string;
  visitors: number;
  applications: number;
}

export default function AnalyticsPage() {
  const [pageStats, setPageStats] = useState<PageStats[]>([]);
  const [weeklyTrend, setWeeklyTrend] = useState<WeeklyTrend[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPage, setSelectedPage] = useState<string>("all");

  useEffect(() => {
    loadAnalytics();
  }, []);

  async function loadAnalytics() {
    try {
      const [pagesRes, sessionsRes, appsRes, eventsRes] = await Promise.all([
        supabase.from("landing_pages").select("id, slug, page_title, status"),
        supabase.from("visitor_sessions").select("*"),
        supabase.from("applications").select("id, landing_page_id, created_at, utm_source"),
        supabase.from("analytics_events").select("landing_page_id, event_name, created_at"),
      ]);

      const pages = pagesRes.data || [];
      const sessions = sessionsRes.data || [];
      const apps = appsRes.data || [];
      const events = eventsRes.data || [];

      const stats: PageStats[] = pages.map((page) => {
        const pageSessions = sessions.filter((s) => s.landing_page_id === page.id);
        const pageApps = apps.filter((a) => a.landing_page_id === page.id);
        const pageEvents = events.filter((e) => e.landing_page_id === page.id);

        const totalVisitors = pageSessions.length;
        const totalApplications = pageApps.length;
        const conversionRate = totalVisitors > 0 ? (totalApplications / totalVisitors) * 100 : 0;

        const avgTimeOnPage = pageSessions.length > 0
          ? pageSessions.reduce((sum, s) => sum + (s.time_on_page_ms || 0), 0) / pageSessions.length / 1000
          : 0;

        const avgScrollDepth = pageSessions.length > 0
          ? pageSessions.reduce((sum, s) => sum + (s.max_scroll_depth || 0), 0) / pageSessions.length
          : 0;

        const ctaClicks = pageEvents.filter((e) => e.event_name === "cta_click").length;
        const whatsappClicks = pageSessions.filter((s) => s.did_click_whatsapp).length;

        const sourceCounts: Record<string, number> = {};
        pageSessions.forEach((s) => {
          const source = s.utm_source || s.referrer || "direct";
          sourceCounts[source] = (sourceCounts[source] || 0) + 1;
        });
        const topSources = Object.entries(sourceCounts)
          .map(([source, count]) => ({ source, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);

        return {
          id: page.id, slug: page.slug, page_title: page.page_title, status: page.status,
          totalVisitors, totalApplications, conversionRate, avgTimeOnPage,
          avgScrollDepth, ctaClicks, whatsappClicks, topSources,
        };
      });

      setPageStats(stats.sort((a, b) => b.totalApplications - a.totalApplications));

      // Wekelijkse trend (laatste 8 weken)
      const weeks: WeeklyTrend[] = [];
      for (let i = 7; i >= 0; i--) {
        const weekStart = new Date();
        weekStart.setDate(weekStart.getDate() - (i * 7));
        weekStart.setHours(0, 0, 0, 0);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 7);

        const weekLabel = `${weekStart.getDate()}/${weekStart.getMonth() + 1}`;
        const weekVisitors = sessions.filter((s) => {
          const d = new Date(s.created_at);
          return d >= weekStart && d < weekEnd;
        }).length;
        const weekApps = apps.filter((a) => {
          const d = new Date(a.created_at);
          return d >= weekStart && d < weekEnd;
        }).length;

        weeks.push({ week: weekLabel, visitors: weekVisitors, applications: weekApps });
      }
      setWeeklyTrend(weeks);
    } catch {
      // Analytics laden mislukt
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg border p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-48 mb-3" />
            <div className="h-8 bg-gray-200 rounded w-24" />
          </div>
        ))}
      </div>
    );
  }

  const filteredStats = selectedPage === "all"
    ? pageStats
    : pageStats.filter((p) => p.id === selectedPage);

  const totals = filteredStats.reduce(
    (acc, p) => ({
      visitors: acc.visitors + p.totalVisitors,
      applications: acc.applications + p.totalApplications,
      ctaClicks: acc.ctaClicks + p.ctaClicks,
      whatsappClicks: acc.whatsappClicks + p.whatsappClicks,
    }),
    { visitors: 0, applications: 0, ctaClicks: 0, whatsappClicks: 0 }
  );

  const totalConversion = totals.visitors > 0
    ? ((totals.applications / totals.visitors) * 100).toFixed(1)
    : "0.0";

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
        <select
          value={selectedPage}
          onChange={(e) => setSelectedPage(e.target.value)}
          className="text-sm border border-gray-300 rounded-lg px-3 py-2"
        >
          <option value="all">Alle pagina's</option>
          {pageStats.map((p) => (
            <option key={p.id} value={p.id}>{p.page_title}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <MetricCard label="Bezoekers" value={totals.visitors} />
        <MetricCard label="Sollicitaties" value={totals.applications} accent="green" />
        <MetricCard label="Conversie" value={`${totalConversion}%`} accent="blue" />
        <MetricCard label="CTA clicks" value={totals.ctaClicks} />
        <MetricCard label="WhatsApp" value={totals.whatsappClicks} />
      </div>

      {/* Wekelijkse trend */}
      <div className="bg-white rounded-lg border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Wekelijkse trend</h3>
        <div className="flex items-end gap-2 h-32">
          {weeklyTrend.map((w, i) => {
            const maxVal = Math.max(...weeklyTrend.map((t) => t.visitors), 1);
            const height = (w.visitors / maxVal) * 100;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs text-gray-500">{w.applications}</span>
                <div className="w-full relative" style={{ height: `${Math.max(height, 4)}%` }}>
                  <div className="absolute bottom-0 w-full bg-blue-200 rounded-t" style={{ height: "100%" }} />
                  {w.applications > 0 && (
                    <div
                      className="absolute bottom-0 w-full bg-green-500 rounded-t"
                      style={{ height: `${(w.applications / Math.max(w.visitors, 1)) * 100}%` }}
                    />
                  )}
                </div>
                <span className="text-xs text-gray-400">{w.week}</span>
              </div>
            );
          })}
        </div>
        <div className="flex gap-4 mt-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-blue-200 rounded" /> Bezoekers
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-green-500 rounded" /> Sollicitaties
          </span>
        </div>
      </div>

      <OptimizationAdvice stats={filteredStats} />

      {/* Per-pagina overzicht */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Per vacature</h3>
        <div className="space-y-3">
          {filteredStats.map((page) => (
            <div key={page.id} className="bg-white rounded-lg border p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">{page.page_title}</p>
                  <p className="text-xs text-gray-500">/v/{page.slug}</p>
                </div>
                <StatusBadge status={page.status} />
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 text-center">
                <MiniMetric label="Bezoekers" value={page.totalVisitors} />
                <MiniMetric label="Sollicitaties" value={page.totalApplications} />
                <MiniMetric label="Conversie" value={`${page.conversionRate.toFixed(1)}%`} />
                <MiniMetric label="Gem. tijd" value={`${Math.round(page.avgTimeOnPage)}s`} />
                <MiniMetric label="Scroll" value={`${Math.round(page.avgScrollDepth)}%`} />
                <MiniMetric label="CTA clicks" value={page.ctaClicks} />
              </div>
              {page.topSources.length > 0 && (
                <div className="mt-3 pt-3 border-t">
                  <p className="text-xs text-gray-500 mb-1">Top bronnen:</p>
                  <div className="flex gap-2 flex-wrap">
                    {page.topSources.map((s) => (
                      <span key={s.source} className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                        {s.source} ({s.count})
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
