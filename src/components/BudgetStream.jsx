import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CategoryCard from './CategoryCard';
import Search from './Search';
import { fetchBudgetCategories } from '../api/budget';
import { budgetData } from '../data';

const BudgetStream = ({ taxAmount, year }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [categories, setCategories] = useState(budgetData);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);

        fetchBudgetCategories(year)
            .then(data => {
                if (!cancelled) setCategories(data);
            })
            .catch(() => {
                // Fallback to hardcoded data with year multiplier
                if (!cancelled) {
                    const yearMultiplier = 1 + ((year - 2025) * 0.05);
                    setCategories(budgetData.map(cat => {
                        const numericAmount = parseInt(cat.amount.replace(/[^0-9]/g, ''));
                        const adjustedAmount = Math.round(numericAmount * yearMultiplier);
                        return { ...cat, amount: `€${adjustedAmount}B` };
                    }));
                }
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => { cancelled = true; };
    }, [year]);

    const filteredData = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.examples.some(ex => ex.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <section className="min-h-screen w-full py-20 px-4 bg-[var(--color-bg-soft)]">
            <div className="container">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        {taxAmount
                            ? `Your ${year} contribution fuels society.`
                            : `In ${year}, your contribution fuels society.`}
                    </h2>
                    <p className="text-[var(--color-text-muted)] text-lg max-w-2xl mx-auto mb-8">
                        {taxAmount
                            ? "Here is exactly how your money is distributed."
                            : "See how every euro is distributed across the nation's most vital sectors."}
                    </p>

                    <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
                </motion.div>

                {loading ? (
                    <div className="text-center text-gray-400 py-12">Loading budget data...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredData.map((category, index) => (
                            <CategoryCard
                                key={category.id}
                                category={category}
                                index={index}
                                userTax={taxAmount}
                            />
                        ))}
                    </div>
                )}

                {!loading && filteredData.length === 0 && (
                    <div className="text-center text-gray-500 py-12">
                        No categories found matching "{searchTerm}"
                    </div>
                )}
            </div>
        </section>
    );
};

export default BudgetStream;
