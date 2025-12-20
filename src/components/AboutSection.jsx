import { motion } from "framer-motion";
import { ShieldCheck, Users, Layers, MonitorCheck } from "lucide-react";

const features = [
  {
    icon: <ShieldCheck className="w-10 h-10 text-blue-600" />,
    title: "Secure Asset Tracking",
    desc: "Track company-owned devices and equipment with full transparency and accountability.",
  },
  {
    icon: <Users className="w-10 h-10 text-blue-600" />,
    title: "HR & Employee Friendly",
    desc: "Designed for seamless workflows—HR manages assets, employees request and track them easily.",
  },
  {
    icon: <Layers className="w-10 h-10 text-blue-600" />,
    title: "Multi-Company Support",
    desc: "Employees can work with multiple companies while keeping asset records separate and organized.",
  },
  {
    icon: <MonitorCheck className="w-10 h-10 text-blue-600" />,
    title: "Smart Lifecycle Management",
    desc: "Manage assets from inventory to assignment to return with real-time updates and history.",
  },
];

const AboutSection = () => {
  return (
    <section className="w-full bg-gray-100 lg:mb-20 py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Why Choose <span className="text-blue-600">AssetVerse?</span>
          </h2>
          <p className="mt-3 text-gray-600 md:w-2/3 mx-auto">
            A powerful and intuitive platform designed to help modern businesses keep 
            track of their assets effortlessly while maintaining team productivity.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100"
            >
              <div>{item.icon}</div>

              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                {item.title}
              </h3>

              <p className="mt-2 text-gray-600 text-sm">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
