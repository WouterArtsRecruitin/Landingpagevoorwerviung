import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EngineeringLanding from './pages/EngineeringLanding';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main landing page route - dynamic slug */}
        <Route path="/v/:slug" element={<EngineeringLanding />} />

        {/* Homepage - Optional welcome page */}
        <Route path="/" element={
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="text-center max-w-2xl px-6">
              <div className="text-6xl mb-6">⚙️</div>
              <h1 className="text-5xl font-bold text-gray-900 mb-4">
                Engineering Landing Pages
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Professionele recruitment landing pages voor engineering posities
              </p>
              <div className="bg-white rounded-2xl shadow-xl p-8 text-left">
                <h2 className="font-semibold text-gray-900 mb-4">📍 URL Format:</h2>
                <code className="block bg-gray-100 px-4 py-3 rounded-lg text-sm font-mono text-blue-600">
                  /v/[slug]
                </code>
                <p className="text-sm text-gray-600 mt-4">
                  Bijvoorbeeld: <code className="bg-gray-100 px-2 py-1 rounded">/v/asml-mechanical-engineer-1</code>
                </p>
              </div>
            </div>
          </div>
        } />

        {/* 404 */}
        <Route path="*" element={
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
              <p className="text-xl text-gray-600">Pagina niet gevonden</p>
            </div>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
