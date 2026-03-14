import React from 'react';
import { motion } from 'framer-motion';

const years = [2020, 2021, 2022, 2023, 2024, 2025];

const TimeSlider = ({ currentYear, onYearChange }) => {
    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 glass-panel px-6 py-3 flex items-center gap-4">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Timeline</span>

            <div className="flex items-center gap-2">
                {years.map((year) => (
                    <button
                        key={year}
                        onClick={() => onYearChange(year)}
                        className={`relative px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 ${currentYear === year
                                ? 'text-black font-bold'
                                : 'text-gray-400 hover:text-gray-600'
                            }`}
                    >
                        {currentYear === year && (
                            <motion.div
                                layoutId="activeYear"
                                className="absolute inset-0 bg-gray-200 rounded-lg -z-10"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
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
