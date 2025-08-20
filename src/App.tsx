import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

import Index from "./pages/Index";
import Artworks from "./pages/Artworks";
import Auth from "./pages/Auth";

import NotFound from "./pages/NotFound";
import VisitorArtworkPage from "./pages/VisitorArtworkPage";
import VisitorDashboard from "./pages/VisitorDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Auth Route */}
            <Route path="/auth" element={<Auth />} />

            {/* Protected Routes */}
            <Route path="/visitor/artwork/:artworkId" element={<VisitorDashboard />} />
            {/* <Route path="/visitor/artwork/:artworkId" element={<VisitorArtworkPage />} /> */}
            <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
            <Route path="/artworks" element={<ProtectedRoute><Layout><Artworks /></Layout></ProtectedRoute>} />

            {/* Catch-All */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
