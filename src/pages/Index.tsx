import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CompetenciesSection from "@/components/CompetenciesSection";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ChatAssistant from "@/components/ChatAssistant";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <CompetenciesSection />
      <ProjectsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
      <ChatAssistant />
    </div>
  );
};

export default Index;
