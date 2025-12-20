import AboutSection from "../components/AboutSection";
import FeaturesShowcase from "../components/FeaturesShowcase";
import HeroBanner from "../components/HeroBanner";
import PackagesSection from "../components/PackagesSection";

const Home = () => {
  return (
    <div>
      <HeroBanner />
      <AboutSection />
      <PackagesSection />
      <FeaturesShowcase/>
    </div>
  );
};

export default Home;