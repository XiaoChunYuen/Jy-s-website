import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from '../i18n/LanguageContext';
import { CMSProvider } from '../cms/CMSContext';
import { Layout } from '../components/layout/Layout';
import { ScrollToTop } from '../components/layout/ScrollToTop';
import { Home } from '../pages/Home';
import { CaseStudy } from '../pages/CaseStudy';
import { Services } from '../pages/Services';
import { Contact } from '../pages/Contact';
import { Resume } from '../pages/Resume';
import { AdminLogin } from '../cms/AdminLogin';
import { AdminDashboard } from '../cms/AdminDashboard';

export function AppRouter() {
  return (
    <LanguageProvider>
      <CMSProvider>
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
      </CMSProvider>
    </LanguageProvider>
  );
}
