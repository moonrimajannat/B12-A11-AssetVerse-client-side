import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        question: "What is AssetVerse?",
        answer:
            "AssetVerse is a modern asset & employee management platform designed for HR teams and companies of all sizes."
    },
    {
        question: "How does the employee asset assignment work?",
        answer:
            "HR managers can assign assets to employees directly from the dashboard. Employees can view and request assets anytime."
    },
    {
        question: "Can I upgrade my package later?",
        answer:
            "Yes! You can upgrade or downgrade your plan anytime from your account settings."
    },
    {
        question: "Is my data secure?",
        answer:
            "Absolutely. AssetVerse uses enterprise-level security, encrypted storage, and secure authentication."
    }
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (i) => {
        setOpenIndex(openIndex === i ? null : i);
    };

    return (
        <section className="py-20">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-3xl text-center mb-16 md:text-4xl font-bold text-gray-900">
                    Frequently Asked <span className="text-blue-600">Questions</span>
                </h2>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div key={i} className="bg-blue-100 shadow rounded-xl p-4 cursor-pointer"
                            onClick={() => toggleFAQ(i)}
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold">{faq.question}</h3>
                                <ChevronDown
                                    className={`transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""
                                        }`}
                                />
                            </div>

                            {/* Answer Animation */}
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={
                                    openIndex === i
                                        ? { height: "auto", opacity: 1 }
                                        : { height: 0, opacity: 0 }
                                }
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <p className="mt-3 text-gray-600">{faq.answer}</p>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
