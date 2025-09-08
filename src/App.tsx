import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import Index from "./pages/Index";
import Diagnose from "./pages/Diagnose";
import Buy from "./pages/Buy";
import MarketAnalysis from "./pages/MarketAnalysis";
import UserProfile from "./pages/UserProfile";
import SellerPanel from "./pages/SellerPanel";
import GovernmentSchemes from "./pages/GovernmentSchemes";
import Weather from "./pages/Weather";
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Home page without layout to show custom design */}
          <Route path="/" element={<Layout><Index /></Layout>} />
          
          {/* All other pages with layout */}
          <Route path="/diagnose" element={<Layout><Diagnose /></Layout>} />
          <Route path="/buy" element={<Layout><Buy /></Layout>} />
          <Route path="/market-analysis" element={<Layout><MarketAnalysis /></Layout>} />
          <Route path="/user-profile" element={<Layout><UserProfile /></Layout>} />
          <Route path="/seller-panel" element={<Layout><SellerPanel /></Layout>} />
          <Route path="/government-schemes" element={<Layout><GovernmentSchemes /></Layout>} />
          <Route path="/weather" element={<Layout><Weather /></Layout>} />
          <Route path="/blogs" element={<Layout><Blog /></Layout>} />
          
          {/* Placeholder routes for future pages */}
          <Route path="/admin" element={<Layout><div className="p-8 text-center"><h1 className="text-2xl">Admin Dashboard - Coming Soon</h1></div></Layout>} />
          <Route path="/crops-hybrid" element={<Layout><div className="p-8 text-center"><h1 className="text-2xl">Crops & Hybrids - Coming Soon</h1></div></Layout>} />
          <Route path="/support" element={<Layout><div className="p-8 text-center"><h1 className="text-2xl">Support & Community - Coming Soon</h1></div></Layout>} />
          
          {/* Legal pages */}
          <Route path="/privacy" element={<Layout><div className="p-8 text-center"><h1 className="text-2xl">Privacy Policy - Coming Soon</h1></div></Layout>} />
          <Route path="/terms" element={<Layout><div className="p-8 text-center"><h1 className="text-2xl">Terms of Service - Coming Soon</h1></div></Layout>} />
          <Route path="/cookies" element={<Layout><div className="p-8 text-center"><h1 className="text-2xl">Cookie Policy - Coming Soon</h1></div></Layout>} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
