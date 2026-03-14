import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CategoryCard from './CategoryCard';
import Search from './Search';
import { budgetData } from '../data';

const BudgetStream = ({ taxAmount, year }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Simple multiplier to simulate historical data changes
    // Base year 2025. 
    // 2020 = 0.75x, 2025 = 1x
    const yearMultiplier = 1 + ((year - 2025) * 0.05);

    const filteredData = budgetData.map(cat => {
        // Parse amount string "€142B" -> 142
        const numericAmount = parseInt(cat.amount.replace(/[^0-9]/g, ''));
        const adjustedAmount = Math.round(numericAmount * yearMultiplier);

        return {
            ...cat,
            amount: `€${adjustedAmount}B`
        };
    }).filter(category =>
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

                {filteredData.length === 0 && (
                    <div className="text-center text-gray-500 py-12">
                        No categories found matching "{searchTerm}"
                    </div>
                )}
            </div>
        </section>
    );
};

export default BudgetStream;
