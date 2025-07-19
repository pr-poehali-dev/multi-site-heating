
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GeolocationProvider } from "@/contexts/GeolocationContext";
import { CMSProvider } from "@/contexts/CMSContext";
import Index from "./pages/Index";
import HomePage from "./pages/HomePage";
import CMSPage from "./pages/CMSPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <GeolocationProvider>
        <CMSProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
          <Route path="/old" element={<Index />} />
              <Route path="/cms" element={<CMSPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CMSProvider>
      </GeolocationProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;