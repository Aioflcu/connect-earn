import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AuthProvider } from "@/lib/auth";
import { ThemeProvider } from "@/lib/theme";
import { Toaster } from "@/components/ui/sonner";
import { CommandPalette } from "@/components/common/CommandPalette";

import HomePage from "@/routes/index";
import AboutPage from "@/routes/about";
import FaqPage from "@/routes/faq";
import PricingPage from "@/routes/pricing";
import LoginPage from "@/routes/login";
import SignupPage from "@/routes/signup";
import Onboarding from "@/routes/onboarding";
import JobsPage from "@/routes/jobs";
import JobDetailPage from "@/routes/jobs.$jobId";
import FreelancersPage from "@/routes/freelancers";
import FreelancerProfilePage from "@/routes/freelancers.$id";
import PostJobPage from "@/routes/post-job";
import ProposalsPage from "@/routes/proposals";
import MessagesPage from "@/routes/messages";
import SettingsPage from "@/routes/settings";
import ClientDashboard from "@/routes/dashboard/client";
import FreelancerDashboard from "@/routes/dashboard/freelancer";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="mt-6 inline-flex items-center justify-center rounded-md bg-brand px-4 py-2 text-sm font-medium text-brand-foreground hover:bg-brand/90">
          Go home
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ScrollToTop />
        <div className="flex min-h-screen flex-col bg-background">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/jobs/:jobId" element={<JobDetailPage />} />
              <Route path="/freelancers" element={<FreelancersPage />} />
              <Route path="/freelancers/:id" element={<FreelancerProfilePage />} />
              <Route path="/post-job" element={<PostJobPage />} />
              <Route path="/proposals" element={<ProposalsPage />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/dashboard/client" element={<ClientDashboard />} />
              <Route path="/dashboard/freelancer" element={<FreelancerDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <CommandPalette />
        <Toaster position="top-right" richColors />
      </AuthProvider>
    </ThemeProvider>
  );
}