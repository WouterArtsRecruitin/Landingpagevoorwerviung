import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Pagina niet gevonden</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/v/aebi-schmidt-servicemonteur"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Aebi Schmidt Servicemonteur
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

        {/* Root redirect naar Aebi Schmidt vacature */}
        <Route path="/" element={<Navigate to="/v/aebi-schmidt-servicemonteur" replace />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
