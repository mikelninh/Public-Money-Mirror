import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

const CategoryCard = ({ category, index, userTax }) => {
    // Try lucide-react first, fallback to Circle
    const IconComponent = Icons[category.icon] || Icons.Circle;
    const personalAmount = userTax ? (userTax * (category.percentage / 100)) : null;
    // Use amountNum for sorting display if available
    const displayColor = typeof category.color === 'string' && category.color.startsWith('#') ? category.color : undefined;
    const cssColor = typeof category.color === 'string' && category.color.startsWith('var') ? category.color : undefined;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: index * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="card group p-0 overflow-hidden"
        >
            {/* Percentage bar at top */}
            <div className="h-1 bg-[var(--color-surface-2)]">
                <motion.div
                    className="h-full rounded-r-full"
                    style={{ background: category.color, width: `${category.percentage}%` }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${category.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                />
            </div>

            <div className="p-5 md:p-6">
                {/* Header row */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `color-mix(in srgb, ${category.color} 12%, transparent)`, color: category.color }}>
                            <IconComponent size={20} strokeWidth={1.5} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-[15px] text-[var(--color-text)]">{category.name}</h3>
                            <span className="text-xs text-[var(--color-text-3)]">{personalAmount ? 'Dein Anteil' : 'Gesamtbudget'}</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-xl font-bold tabular-nums" style={{ color: category.color }}>{category.percentage}%</div>
                    </div>
                </div>

                {/* Description */}
                <p className="text-[13px] text-[var(--color-text-2)] leading-relaxed mb-4">{category.description}</p>

                {/* Amount */}
                <div className="flex items-end justify-between mb-4">
                    <span className="text-lg font-bold font-mono tabular-nums text-[var(--color-text)]">
                        {personalAmount
                            ? `€${personalAmount.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                            : category.amount}
                    </span>
                </div>

                {/* Examples as subtle chips */}
                <div className="flex flex-wrap gap-1.5">
                    {category.examples.slice(0, 3).map((ex, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-md text-[11px] text-[var(--color-text-3)] bg-[var(--color-surface-2)] border border-[var(--color-border)]">
                            {ex}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default CategoryCard;
