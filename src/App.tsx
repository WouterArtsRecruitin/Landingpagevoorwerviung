import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";

// Admin pages (lazy loaded)
const AdminLayout = lazy(() => import("@/pages/admin/AdminLayout"));
const DashboardPage = lazy(() => import("@/pages/admin/DashboardPage"));
const IntakeFormPage = lazy(() => import("@/pages/admin/IntakeFormPage"));
const PagesListPage = lazy(() => import("@/pages/admin/PagesListPage"));
const CandidatesPage = lazy(() => import("@/pages/admin/CandidatesPage"));
const GdprPage = lazy(() => import("@/pages/admin/GdprPage"));
const AnalyticsPage = lazy(() => import("@/pages/admin/AnalyticsPage"));

function AdminLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm text-gray-500">Laden...</p>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Pagina niet gevonden</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/admin"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Naar dashboard
          </a>
          <a
            href="/v/demo"
            className="inline-block px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Demo pagina
          </a>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page route: /v/{slug} */}
        <Route path="/v/:slug" element={<LandingPage />} />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <Suspense fallback={<AdminLoading />}>
              <AdminLayout />
            </Suspense>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="nieuw" element={<IntakeFormPage />} />
          <Route path="paginas" element={<PagesListPage />} />
          <Route path="kandidaten" element={<CandidatesPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="avg" element={<GdprPage />} />
        </Route>

        {/* Root redirect naar admin dashboard */}
        <Route path="/" element={<Navigate to="/admin" replace />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
