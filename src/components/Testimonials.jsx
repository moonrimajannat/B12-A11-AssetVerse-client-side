import { motion } from "framer-motion";

const testimonials = [
  {
    company: "TechNova Solutions",
    feedback:
      "AssetVerse simplified our entire asset workflow. Tracking employee devices is now effortless and transparent.",
    name: "Richard Morgan",
    title: "HR Director"
  },
  {
    company: "BlueWave Technologies",
    feedback:
      "We used spreadsheets before, but AssetVerse changed everything — smoother, faster, and highly reliable.",
    name: "Sophia Bennett",
    title: "Operations Manager"
  },
  {
    company: "CloudCore Systems",
    feedback:
      "The multi-company feature is a lifesaver for us. Our contractors can manage assets more effectively.",
    name: "Daniel Kim",
    title: "Team Lead"
  }
];

const stats = [
  { number: "100+", label: "Companies Trust Us" },
  { number: "1,500+", label: "Assets Tracked" },
  { number: "800+", label: "Employee Accounts" },
  { number: "99.9%", label: "System Uptime" }
];

const Testimonials = () => {
  return (
    <section className="w-full bg-gray-50 py-20">
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
            Trusted by <span className="text-blue-600">Leading Companies</span>
          </h2>
          <p className="mt-3 text-gray-600 md:w-2/3 mx-auto">
            AssetVerse is helping HR teams and employees manage their assets smarter and faster.
          </p>
        </motion.div>

        {/* Testimonials */}
        <div className="mt-14 grid sm:grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md border border-gray-100 transition"
            >
              <p className="text-gray-700 leading-relaxed italic">
                “{item.feedback}”
              </p>
              <div className="mt-6">
                <h4 className="font-semibold text-gray-900">{item.name}</h4>
                <p className="text-sm text-gray-600">{item.title}, {item.company}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center"
        >
          {stats.map((stat, index) => (
            <div key={index}>
              <h3 className="text-4xl font-bold text-blue-600">{stat.number}</h3>
              <p className="text-gray-700 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Testimonials;
