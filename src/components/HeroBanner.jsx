import { motion } from "framer-motion";
import heroImg from "../assets/hero-banner.jpg";

const HeroBanner = () => {
  return (
    <section className="w-full bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-10 items-center">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Smart & Efficient <span className="text-blue-600">Asset Management</span>  
            for Modern Businesses
          </h1>

          <p className="mt-5 text-gray-600 text-lg md:w-11/12">
            AssetVerse helps companies track laptops, devices, and office equipment 
            with ease. Reduce asset loss, empower HR teams, and give employees a 
            seamless way to request and manage their assigned tools.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Get Started
            </button>
            <button className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
              Learn More
            </button>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="flex justify-center"
        >
          <img
            src={heroImg}
            alt="Asset Management Illustration"
            className="w-full lg:h-[450px] max-w-md md:max-w-lg drop-shadow-xl"
          />
        </motion.div>

      </div>
    </section>
  );
};

export default HeroBanner;