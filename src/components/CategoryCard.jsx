import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

const CategoryCard = ({ category, index, userTax }) => {
    const IconComponent = Icons[category.icon] || Icons.Circle;

    const personalAmount = userTax ? (userTax * (category.percentage / 100)) : null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="glass-panel p-6 cursor-pointer group relative overflow-hidden"
            style={{ borderTop: `4px solid ${category.color}` }}
        >
            {/* Background Glow on Hover */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                style={{ background: category.color }}
            />

            <div className="flex items-start justify-between mb-4">
                <div
                    className="p-3 rounded-xl bg-white/50 backdrop-blur-sm text-white"
                    style={{ backgroundColor: category.color }}
                >
                    <IconComponent size={24} />
                </div>
                <span className="text-2xl font-bold" style={{ color: category.color }}>
                    {category.percentage}%
                </span>
            </div>

            <h3 className="text-xl font-bold mb-2">{category.name}</h3>
            <p className="text-[var(--color-text-muted)] text-sm mb-4 min-h-[40px]">
                {category.description}
            </p>

            <div className="flex items-center justify-between mt-auto">
                <div className="flex flex-col">
                    <span className="font-mono font-medium text-lg">
                        {personalAmount
                            ? `€${personalAmount.toFixed(2)}`
                            : category.amount}
                    </span>
                    {personalAmount && (
                        <span className="text-xs text-[var(--color-text-muted)]">your contribution</span>
                    )}
                </div>

                <motion.button
                    whileHover={{ x: 5 }}
                    className="text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: category.color }}
                >
                    Explore <Icons.ArrowRight size={16} />
                </motion.button>
            </div>
        </motion.div>
    );
};

export default CategoryCard;
