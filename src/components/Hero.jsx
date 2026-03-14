import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, TrendingUp, Users, FileText } from 'lucide-react';

const stats = [
    { label: "Bundeshaushalt 2025", value: "€489 Mrd", icon: TrendingUp },
    { label: "Steuerzahler:innen", value: "45,9 Mio", icon: Users },
    { label: "Themen analysiert", value: "15", icon: FileText },
];

const Hero = () => {
    return (
        <section id="hero" className="relative min-h-[90vh] md:min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 md:px-6">
            {/* Ambient */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-30%] left-[20%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-[var(--color-blue)] opacity-[0.04] blur-[150px]" />
                <div className="absolute bottom-[-20%] right-[10%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full bg-[var(--color-purple)] opacity-[0.04] blur-[150px]" />
            </div>

            {/* Dot grid */}
            <div className="absolute inset-0" style={{
                opacity: 'var(--pattern-opacity)',
                backgroundImage: 'radial-gradient(var(--dot-color) 1px, transparent 1px)',
                backgroundSize: '32px 32px'
            }} />

            <div className="relative z-10 text-center max-w-3xl">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-8 md:mb-10"
                >
                    <span className="inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-full text-[11px] md:text-xs font-medium text-[var(--color-text-2)] border border-[var(--color-border)] bg-[var(--color-surface)]">
                        <span className="relative flex h-2 w-2">
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-blue)]" />
                        </span>
                        Daten: BMF &middot; Bundeshaushalt 2025
                    </span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className="text-[clamp(2rem,6vw,5rem)] font-extrabold leading-[1.05] tracking-tight mb-5 md:mb-6"
                >
                    <span className="text-gradient-heading">Wo landet dein</span>
                    <br />
                    <span className="text-gradient-accent">Steuergeld?</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.35 }}
                    className="text-sm md:text-lg text-[var(--color-text-2)] mb-10 md:mb-14 max-w-md mx-auto leading-relaxed font-light px-4"
                >
                    €489 Milliarden — persönlich erklärt. Wer entscheidet? Wer profitiert? Was kannst du tun?
                </motion.p>

                {/* Coin - smaller on mobile */}
                <motion.div
                    className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-12 md:mb-16"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                    <motion.div
                        className="w-full h-full rounded-full flex items-center justify-center"
                        style={{
                            background: 'conic-gradient(from 45deg, #fbbf24, #f59e0b, #d97706, #fbbf24)',
                            boxShadow: '0 0 80px rgba(251,191,36,0.12), inset 0 2px 6px rgba(255,255,255,0.25)'
                        }}
                        animate={{ y: [-6, 6, -6] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <div className="absolute inset-[3px] rounded-full border border-yellow-300/20" />
                        <span className="text-3xl md:text-4xl font-bold text-white/90 select-none">&euro;</span>
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent" />
                    </motion.div>
                </motion.div>

                {/* Stats row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="flex flex-wrap justify-center gap-4 md:gap-10"
                >
                    {stats.map((s, i) => (
                        <div key={i} className="flex items-center gap-2 md:gap-3">
                            <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-[var(--color-surface-2)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-3)]">
                                <s.icon size={14} strokeWidth={1.5} />
                            </div>
                            <div className="text-left">
                                <div className="text-xs md:text-sm font-semibold tabular-nums text-[var(--color-text)]">{s.value}</div>
                                <div className="text-[10px] md:text-[11px] text-[var(--color-text-3)]">{s.label}</div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Scroll */}
            <motion.div
                className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
            >
                <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-text-3)]">Scrollen</span>
                <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-[var(--color-text-3)]">
                    <ArrowDown size={14} strokeWidth={1.5} />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
