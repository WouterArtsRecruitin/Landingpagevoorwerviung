import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";

const NAV_ITEMS = [
  { to: "/admin", label: "Dashboard", end: true },
  { to: "/admin/nieuw", label: "Nieuwe vacature" },
  { to: "/admin/paginas", label: "Pagina's" },
  { to: "/admin/kandidaten", label: "Kandidaten" },
  { to: "/admin/analytics", label: "Analytics" },
  { to: "/admin/avg", label: "AVG / GDPR" },
  { to: "/admin/billing", label: "Abonnement" },
];

export default function AdminLayout() {
  const { user, profile, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">W</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                Vacature Manager
              </h1>
              <p className="text-xs text-gray-500">
                Landingspagina's & kandidaten
              </p>
            </div>
          </div>

          {/* User menu */}
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900">
                {profile?.full_name || user?.email}
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {profile?.subscription_plan || "free"} plan
              </p>
            </div>
            <button
              onClick={signOut}
              className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Uitloggen
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 px-6">
        <div className="max-w-7xl mx-auto flex gap-1 overflow-x-auto">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={"end" in item ? item.end : false}
              className={({ isActive }) =>
                `px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                  isActive
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
