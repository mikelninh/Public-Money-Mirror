import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

const years = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];

const TimeSlider = ({ currentYear, onYearChange }) => {
    return (
        <div className="fixed bottom-3 md:bottom-5 left-1/2 -translate-x-1/2 z-40 max-w-[calc(100vw-24px)]">
            <div className="flex items-center gap-0.5 md:gap-1 px-1 md:px-1.5 py-1 md:py-1.5 rounded-xl md:rounded-2xl bg-[var(--color-surface)]/95 backdrop-blur-xl border border-[var(--color-border)] shadow-[0_8px_40px_rgba(0,0,0,var(--shadow-strength))] overflow-x-auto no-scrollbar">
                <div className="px-1.5 md:px-2.5 text-[var(--color-text-3)] hidden sm:flex items-center shrink-0">
                    <Calendar size={13} strokeWidth={1.5} />
                </div>

                {years.map(year => (
                    <button
                        key={year}
                        onClick={() => onYearChange(year)}
                        className={`relative px-2 md:px-3 py-1 md:py-1.5 rounded-lg md:rounded-xl text-[11px] md:text-xs font-medium transition-colors duration-200 shrink-0 ${
                            currentYear === year
                                ? 'text-white'
                                : 'text-[var(--color-text-3)] hover:text-[var(--color-text-2)]'
                        }`}
                    >
                        {currentYear === year && (
                            <motion.div
                                layoutId="yearPill"
                                className="absolute inset-0 rounded-lg md:rounded-xl bg-[var(--color-blue)] -z-10"
                                style={{ boxShadow: '0 2px 12px rgba(79,143,247,0.3)' }}
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            />
                        )}
                        {year}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TimeSlider;
