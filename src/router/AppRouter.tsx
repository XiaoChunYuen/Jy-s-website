import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from '../i18n/LanguageContext';
import { CMSProvider } from '../cms/CMSContext';
import { Layout } from '../components/layout/Layout';
import { ScrollToTop } from '../components/layout/ScrollToTop';
import { Home } from '../pages/Home';

const CaseStudy = lazy(() => import('../pages/CaseStudy').then((module) => ({ default: module.CaseStudy })));
const Services = lazy(() => import('../pages/Services').then((module) => ({ default: module.Services })));
const Contact = lazy(() => import('../pages/Contact').then((module) => ({ default: module.Contact })));
const Resume = lazy(() => import('../pages/Resume').then((module) => ({ default: module.Resume })));
const AdminLogin = lazy(() => import('../cms/AdminLogin').then((module) => ({ default: module.AdminLogin })));
const AdminDashboard = lazy(() => import('../cms/AdminDashboard').then((module) => ({ default: module.AdminDashboard })));

function RouteFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50">
      <div className="text-sm tracking-[0.18em] uppercase text-stone-400">Loading</div>
    </div>
  );
}

export function AppRouter() {
  return (
    <LanguageProvider>
      <CMSProvider>
        <Suspense fallback={<RouteFallback />}>
          <Router>
            <ScrollToTop />
            <Routes>
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />

              {/* Public Routes */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="works" element={<Navigate to="/" replace />} />
                <Route path="project/:slug" element={<CaseStudy />} />
                <Route path="services" element={<Services />} />
                <Route path="contact" element={<Contact />} />
                <Route path="resume" element={<Resume />} />
              </Route>
            </Routes>
          </Router>
        </Suspense>
      </CMSProvider>
    </LanguageProvider>
  );
}
