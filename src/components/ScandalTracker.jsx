import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, ExternalLink } from 'lucide-react';

const scandals = [
    {
        id: 1,
        title: "Unfinished Airport Terminal",
        amount: "€120M",
        status: "Under Investigation",
        description: "Construction halted due to contractor dispute. Funds currently frozen.",
        date: "2023-11"
    },
    {
        id: 2,
        title: "Digital Health Portal Outage",
        amount: "€4.5M",
        status: "Resolved",
        description: "Server infrastructure failure. Refund issued by vendor.",
        date: "2024-02"
    },
    {
        id: 3,
        title: "Bridge Maintenance Overspend",
        amount: "€12M",
        status: "Audited",
        description: "Costs exceeded budget by 40%. Audit confirmed material price surge.",
        date: "2023-08"
    }
];

const ScandalTracker = () => {
    return (
        <section className="w-full py-20 px-4 bg-white">
            <div className="container max-w-4xl mx-auto">
                <motion.div
                    className="flex items-center gap-3 mb-12"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="p-3 rounded-full bg-red-100 text-red-600">
                        <AlertTriangle size={24} />
                    </div>
                    <h2 className="text-3xl font-bold">Scandal Tracker</h2>
                </motion.div>

                <div className="space-y-6">
                    {scandals.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative p-6 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                                    <span className="text-sm text-gray-500">{item.date}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-xl font-mono font-bold text-red-500">-{item.amount}</span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {item.status}
                                    </span>
                                </div>
                            </div>

                            <p className="text-gray-600 mb-4">{item.description}</p>

                            <div className="flex items-center gap-2 text-sm text-[var(--color-accent-blue)] font-medium cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                                View Official Report <ExternalLink size={14} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ScandalTracker;
