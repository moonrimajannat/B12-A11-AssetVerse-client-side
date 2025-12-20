import AboutSection from "../components/AboutSection";
import FeaturesShowcase from "../components/FeaturesShowcase";
import HeroBanner from "../components/HeroBanner";
import PackagesSection from "../components/PackagesSection";
import Testimonials from "../components/Testimonials";

const Home = () => {
  return (
    <div>
      <HeroBanner />
      <AboutSection />
      <PackagesSection />
      <FeaturesShowcase/>
      <Testimonials/>
    </div>
  );
};

export default Home;