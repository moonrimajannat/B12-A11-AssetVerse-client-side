import { motion } from "framer-motion";
import { Building2, UserPlus, ClipboardCheck } from "lucide-react";

const steps = [
  {
    icon: <Building2 className="w-12 h-12 text-blue-600" />,
    title: "1. Company Registration",
    desc: "HR Managers register their company and instantly get a default subscription plan.",
  },
  {
    icon: <UserPlus className="w-12 h-12 text-blue-600" />,
    title: "2. Employee Registration",
    desc: "Employees join independently and become affiliated with companies automatically.",
  },
  {
    icon: <ClipboardCheck className="w-12 h-12 text-blue-600" />,
    title: "3. Asset Assignment",
    desc: "HR assigns assets, employees request them, and everything is tracked in real-time.",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-gray-100 mb-10 py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            How <span className="text-blue-600">AssetVerse</span> Works
          </h2>
          <p className="mt-3 text-gray-600 md:w-2/3 mx-auto">
            A simple and efficient process to manage assets across companies and teams.
          </p>
        </motion.div>

        <div className="mt-14 grid md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md border border-gray-100 text-center"
            >
              <div className="flex justify-center">{step.icon}</div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                {step.title}
              </h3>
              <p className="mt-2 text-gray-600 text-sm">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;