import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const PackagesSection = () => {
    const [packages, setPackages] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const res = await axiosPublic.get("/packages");
                setPackages(res.data);
            } catch (err) {
                console.error("Error fetching user data:", err);
            }
        };
        fetchPackages();
    }, []);

    return (
        <section className="w-full bg-gray-50 lg:mb-20 py-20">
            <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold text-gray-900"
                >
                    Choose the Right <span className="text-blue-600">Plan</span>
                </motion.h2>
                <p className="mt-3 text-gray-600 md:w-2/3 mx-auto">
                    Flexible subscription plans designed to meet the needs of businesses of all sizes.
                </p>

                {/* Packages Grid */}
                <div className="mt-14 grid sm:grid-cols-1 md:grid-cols-3 gap-8">
                    {packages?.map((pkg, index) => (
                        <motion.div
                            key={pkg.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl border border-gray-100 flex flex-col justify-between"
                        >
                            <div>
                                <h3 className="text-2xl font-semibold text-gray-900">{pkg.name}</h3>
                                <p className="mt-2 text-gray-600">
                                    Up to {pkg.employeeLimit} Employees
                                </p>
                                <p className="mt-4 text-3xl font-bold text-blue-600">${pkg.price}/mo</p>

                                <ul className="mt-6 space-y-2">
                                    {pkg.features.map((feature, idx) => (
                                        <li key={idx} className="text-gray-600 before:content-['✓'] before:text-blue-600 before:mr-2">
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button className="mt-6 w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                                Select Plan
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PackagesSection;