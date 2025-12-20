import { motion } from "framer-motion";
import { Link } from "react-router";

const ContactCTA = () => {
  return (
    <section className="bg-gray-100 mb-[120px] py-20 text-black">
      <div className="max-w-6xl mx-auto px-6 md:px-12 text-center">

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold"
        >
          Have Questions? We're Here to Help.
        </motion.h2>

        <p className="mt-3 md:w-2/3 mx-auto">
          Contact our support team for guidance, demos, or onboarding assistance.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <Link
            to="mailto:support@assetverse.com"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition inline-block"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactCTA;