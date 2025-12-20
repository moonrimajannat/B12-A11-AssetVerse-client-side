import { motion } from "framer-motion";
import { FolderCheck, Users2, BarChart3, Shield, RefreshCw, Layers } from "lucide-react";

const features = [
  {
    icon: <FolderCheck className="w-10 h-10 text-blue-600" />,
    title: "Centralized Asset Management",
    desc: "Manage all company assets—laptops, devices, and inventory—from a single dashboard."
  },
  {
    icon: <Users2 className="w-10 h-10 text-blue-600" />,
    title: "HR & Employee Workflow",
    desc: "Employees request assets and HR approves them instantly with a streamlined workflow."
  },
  {
    icon: <BarChart3 className="w-10 h-10 text-blue-600" />,
    title: "Analytics & Reports",
    desc: "Get insights into asset usage, employee assignments, and company-wide asset distribution."
  },
  {
    icon: <Shield className="w-10 h-10 text-blue-600" />,
    title: "Secure & Reliable",
    desc: "Built with modern authentication and role-based access to ensure data safety and integrity."
  },
  {
    icon: <RefreshCw className="w-10 h-10 text-blue-600" />,
    title: "Asset Lifecycle Tracking",
    desc: "Track every stage of an asset's journey—from inventory to assignment to return."
  },
  {
    icon: <Layers className="w-10 h-10 text-blue-600" />,
    title: "Multi-Company Support",
    desc: "Employees can work with multiple companies without mixing records or assignments."
  }
];

const FeaturesShowcase = () => {
  return (
    <section className="w-full bg-gray-100 mb-10 py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Powerful <span className="text-blue-600">Features</span> for Modern Businesses
          </h2>
          <p className="mt-3 text-gray-600 md:w-2/3 mx-auto">
            AssetVerse comes with a robust set of tools designed to help companies stay organized, efficient, and secure.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-8 bg-gray-50 rounded-xl shadow-sm hover:shadow-md border border-gray-100 transition"
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

export default FeaturesShowcase;