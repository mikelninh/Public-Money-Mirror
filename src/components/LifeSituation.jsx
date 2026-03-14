import React from 'react';
import { motion } from 'framer-motion';
import { lifeSituations } from '../data/lifeImpact';

const LifeSituation = ({ selected, onSelect }) => {
    return (
        <section className="w-full py-16 px-6">
            <div className="container-main">
                <motion.div
                    className="text-center mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-gradient-heading mb-3">
                        Was bedeutet der Haushalt für dich?
                    </h2>
                    <p className="text-[var(--color-text-2)] text-sm max-w-md mx-auto">
                        Wähle deine Lebenssituation — wir zeigen dir, welche Milliarden dich direkt betreffen.
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 max-w-3xl mx-auto">
                    {lifeSituations.map((sit, i) => (
                        <motion.button
                            key={sit.id}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            onClick={() => onSelect(selected === sit.id ? null : sit.id)}
                            className={`flex flex-col items-center gap-2.5 p-4 rounded-2xl border transition-all ${
                                selected === sit.id
                                    ? 'border-[var(--color-blue)] bg-[var(--color-blue)]/8 shadow-[0_0_20px_rgba(79,143,247,0.1)]'
                                    : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-2)] hover:border-[var(--color-border-hover)]'
                            }`}
                        >
                            <span className="text-2xl">{sit.emoji}</span>
                            <span className={`text-xs font-medium ${selected === sit.id ? 'text-[var(--color-text)]' : 'text-[var(--color-text-2)]'}`}>
                                {sit.label}
                            </span>
                        </motion.button>
                    ))}
                </div>

                {!selected && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center text-xs text-[var(--color-text-3)] mt-6"
                    >
                        Keine Daten werden gespeichert — alles bleibt in deinem Browser.
                    </motion.p>
                )}
            </div>
        </section>
    );
};

export default LifeSituation;
