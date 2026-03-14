import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';
import { budgetFacts } from '../data/partyData';
import Icon from './Icon';

const BudgetFacts = () => {
    const scrollRef = useRef(null);
    const [isInteracting, setIsInteracting] = useState(false);

    useEffect(() => {
        if (isInteracting || !scrollRef.current) return;
        const el = scrollRef.current;
        const interval = setInterval(() => {
            const maxScroll = el.scrollWidth - el.clientWidth;
            if (el.scrollLeft >= maxScroll - 2) {
                el.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                el.scrollBy({ left: 280, behavior: 'smooth' });
            }
        }, 4000);
        return () => clearInterval(interval);
    }, [isInteracting]);

    return (
        <section className="w-full py-16 px-6">
            <div className="container-main">
                <motion.div
                    className="flex items-center gap-2 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="w-8 h-8 rounded-lg bg-[var(--color-surface-2)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-amber)]">
                        <Lightbulb size={16} strokeWidth={1.5} />
                    </div>
                    <h2 className="text-lg font-bold text-gradient-heading">Wusstest du?</h2>
                </motion.div>
            </div>

            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth px-6 pb-4 no-scrollbar"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                onMouseEnter={() => setIsInteracting(true)}
                onMouseLeave={() => setIsInteracting(false)}
                onTouchStart={() => setIsInteracting(true)}
                onTouchEnd={() => setTimeout(() => setIsInteracting(false), 5000)}
            >
                {/* Left spacer for centering */}
                <div className="shrink-0 w-[max(0px,calc((100vw-1140px)/2))]" />

                {budgetFacts.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                        className="card p-5 min-w-[260px] max-w-[300px] shrink-0 snap-start"
                    >
                        <div className="w-9 h-9 rounded-xl bg-[var(--color-surface-2)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-blue)] mb-3">
                            <Icon name={item.icon} size={16} />
                        </div>
                        <p className="text-sm text-[var(--color-text)] leading-relaxed mb-3">{item.fact}</p>
                        <span className="text-[10px] text-[var(--color-text-3)] font-medium">Quelle: {item.source}</span>
                    </motion.div>
                ))}

                <div className="shrink-0 w-6" />
            </div>
        </section>
    );
};

export default BudgetFacts;
