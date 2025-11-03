import { useState, useEffect } from "react";
import { VersionA } from "./components/versions/VersionA";
import { VersionB } from "./components/versions/VersionB";
import { VersionC } from "./components/versions/VersionC";
import Proposal from "./pages/proposal";
import { Button } from "./components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Analytics, trackScrollDepth } from "./components/Analytics";
import { SEOHead } from "./components/SEOHead";

export default function App() {
  const [version, setVersion] = useState<"A" | "B" | "C">("A");
  const [showProposal, setShowProposal] = useState(false);

  // Detect page from URL
  useEffect(() => {
    const path = window.location.pathname;
    const params = new URLSearchParams(window.location.search);
    
    // Check if we're on the proposal page
    if (path.includes('/proposal') || params.get('page') === 'proposal') {
      setShowProposal(true);
      return;
    }
    
    // Otherwise check for variant
    const urlVariant = params.get('variant')?.toUpperCase();
    if (urlVariant === 'A' || urlVariant === 'B' || urlVariant === 'C') {
      setVersion(urlVariant);
    }
  }, []);

  // Track scroll depth
  useEffect(() => {
    if (showProposal) return; // Don't track on proposal page
    
    let tracked25 = false;
    let tracked50 = false;
    let tracked75 = false;
    let tracked100 = false;

    const handleScroll = () => {
      const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      if (scrolled >= 25 && !tracked25) {
        trackScrollDepth(25);
        tracked25 = true;
      }
      if (scrolled >= 50 && !tracked50) {
        trackScrollDepth(50);
        tracked50 = true;
      }
      if (scrolled >= 75 && !tracked75) {
        trackScrollDepth(75);
        tracked75 = true;
      }
      if (scrolled >= 100 && !tracked100) {
        trackScrollDepth(100);
        tracked100 = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showProposal]);

  // If showing proposal, render it
  if (showProposal) {
    return <Proposal />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* SEO & Analytics */}
      <SEOHead variant={version} />
      <Analytics />
      {/* Version Switcher - Voor A/B/C testdoeleinden */}
      <div className="fixed top-4 right-4 z-50 bg-white rounded-lg shadow-xl p-4 border border-slate-200 max-w-xs">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm">A/B/C Test:</div>
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        </div>
        <Tabs value={version} onValueChange={(v) => setVersion(v as "A" | "B" | "C")}>
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="A">A</TabsTrigger>
            <TabsTrigger value="B">B</TabsTrigger>
            <TabsTrigger value="C">C</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="text-xs text-slate-500 mt-3 space-y-1">
          {version === "A" && (
            <>
              <div>✓ Volledig verhaal + FAQ</div>
              <div>✓ Verborgen parel positioning</div>
              <div>✓ Tech showcase prominent</div>
            </>
          )}
          {version === "B" && (
            <>
              <div>✓ Beknopter & sneller</div>
              <div>✓ Focus op essentie</div>
              <div>✓ Minder secties</div>
            </>
          )}
          {version === "C" && (
            <>
              <div>✓ Leadmagnet versie</div>
              <div>✓ Extra trust signals</div>
              <div>✓ Salaris breakdown</div>
            </>
          )}
        </div>
        <Button
          size="sm"
          variant="outline"
          className="w-full mt-3 text-xs"
          onClick={() => setShowProposal(true)}
        >
          📊 View Proposal
        </Button>
      </div>

      {/* Render Selected Version */}
      {version === "A" && <VersionA />}
      {version === "B" && <VersionB />}
      {version === "C" && <VersionC />}
    </div>
  );
}
