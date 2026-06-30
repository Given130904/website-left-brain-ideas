import HeroSection from '../components/home/HeroSection';
import AboutSection from '../components/home/AboutSection';
import PhilosophySection from '../components/home/PhilosophySection';
import ServicesSection from '../components/home/ServicesSection';
import PortfolioSection from '../components/home/PortfolioSection';
import TechStackSection from '../components/home/TechStackSection';
import WhySection from '../components/home/WhySection';
import ProcessSection from '../components/home/ProcessSection';
import SecuritySection from '../components/home/SecuritySection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import FaqSection from '../components/home/FaqSection';
import ContactSection from '../components/home/ContactSection';
import FeedbackSection from '../components/home/FeedbackSection';

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <AboutSection />
      <PhilosophySection />
      <ServicesSection />
      <PortfolioSection />
      <TechStackSection />
      <WhySection />
      <ProcessSection />
      <SecuritySection />
      <TestimonialsSection />
      <FaqSection />
      <ContactSection />
      <FeedbackSection />
    </div>
  );
}
