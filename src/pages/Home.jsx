import AboutSection from "../components/AboutSection";
import ContactCTA from "../components/ContactCTA";
import FAQSection from "../components/FAQSection";
import FeaturesShowcase from "../components/FeaturesShowcase";
import HeroBanner from "../components/HeroBanner";
import HowItWorks from "../components/HowItWorks";
import PackagesSection from "../components/PackagesSection";
import Testimonials from "../components/Testimonials";

const Home = () => {
  return (
    <div>
      <HeroBanner />
      <AboutSection />
      <PackagesSection />
      <FeaturesShowcase />
      <Testimonials />
      <HowItWorks />
      <FAQSection/>
      <ContactCTA/>
    </div>
  );
};

export default Home;