import { Routes, Route } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import HomePage from '../pages/HomePage';
import CaseStudyPage from '../pages/CaseStudyPage';
import InquiryPage from '../pages/InquiryPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/case-study/:id" element={<CaseStudyPage />} />
        <Route path="/inquiry" element={<InquiryPage />} />
      </Route>
    </Routes>
  );
}
