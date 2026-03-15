import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, Briefcase, Users, Wallet, Heart } from 'lucide-react';
import { impactChains } from '../data/lifeImpact';

const stepLabels = ['Lobby', 'Politik', 'Haushalt', 'Dein Leben'];

const ImpactChains = () => {
    const [expanded, setExpanded] = useState(null);

    return (
        <section className="w-full py-24 px-6">
            <div className="container-main max-w-4xl">
                <motion.div
                    className="mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-[var(--color-surface-2)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-orange)]">
                            <ArrowRight size={16} strokeWidth={1.5} />
                        </div>
                        <span className="text-xs font-medium text-[var(--color-text-3)] uppercase tracking-widest">Wirkungsketten</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gradient-heading mb-2">
                        Wie Lobby-Geld deinen Alltag beeinflusst
                    </h2>
                    <p className="text-[var(--color-text-2)] text-sm max-w-lg">
                        Vom Lobbyregister über Parteipositionen zum Haushalt — und was das für dich bedeutet.
                    </p>
                </motion.div>

                <div className="space-y-3">
                    {impactChains.map((chain, i) => {
                        const isOpen = expanded === chain.id;
                        return (
                            <motion.div
                                key={chain.id}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="card overflow-hidden"
                            >
                                {/* Header */}
                                <button
                                    onClick={() => setExpanded(isOpen ? null : chain.id)}
                                    className="w-full p-5 flex items-center justify-between gap-4 text-left"
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="w-2 h-2 rounded-full shrink-0" style={{ background: chain.color }} />
                                        <h3 className="text-[15px] font-semibold text-[var(--color-text)] truncate">{chain.title}</h3>
                                    </div>
                                    <ChevronDown size={16} className={`text-[var(--color-text-3)] transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Chain steps */}
                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-5 pb-5">
                                                {/* Step indicators */}
                                                <div className="flex items-center gap-1 mb-5 overflow-x-auto no-scrollbar pb-1">
                                                    {stepLabels.map((label, si) => (
                                                        <React.Fragment key={label}>
                                                            <span className="px-2.5 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-3)] bg-[var(--color-surface-2)] border border-[var(--color-border)] whitespace-nowrap">
                                                                {label}
                                                            </span>
                                                            {si < stepLabels.length - 1 && (
                                                                <ArrowRight size={12} className="text-[var(--color-text-3)] shrink-0" />
                                                            )}
                                                        </React.Fragment>
                                                    ))}
                                                </div>

                                                {/* Chain content */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    {/* Lobby */}
                                                    <div className="flex items-start gap-3 p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
                                                        <Briefcase size={14} className="text-[var(--color-purple)] mt-0.5 shrink-0" />
                                                        <div>
                                                            <div className="text-[10px] font-semibold text-[var(--color-purple)] uppercase tracking-wider mb-1">Lobby</div>
                                                            <div className="text-sm font-medium text-[var(--color-text)]">{chain.lobby.name}</div>
                                                            <div className="text-[11px] text-[var(--color-text-3)]">{chain.lobby.spending} Lobbyausgaben, {chain.lobby.employees} Lobbyist:innen</div>
                                                        </div>
                                                    </div>

                                                    {/* Party */}
                                                    <div className="flex items-start gap-3 p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
                                                        <Users size={14} className="text-[var(--color-blue)] mt-0.5 shrink-0" />
                                                        <div>
                                                            <div className="text-[10px] font-semibold text-[var(--color-blue)] uppercase tracking-wider mb-1">Politik</div>
                                                            <div className="text-sm text-[var(--color-text)]">{chain.partyLink}</div>
                                                        </div>
                                                    </div>

                                                    {/* Budget */}
                                                    <div className="flex items-start gap-3 p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
                                                        <Wallet size={14} className="text-[var(--color-amber)] mt-0.5 shrink-0" />
                                                        <div>
                                                            <div className="text-[10px] font-semibold text-[var(--color-amber)] uppercase tracking-wider mb-1">Haushalt</div>
                                                            <div className="text-sm text-[var(--color-text)]">{chain.budgetEffect}</div>
                                                        </div>
                                                    </div>

                                                    {/* Your life */}
                                                    <div className="flex items-start gap-3 p-3 rounded-xl border" style={{ borderColor: chain.color + '30', background: chain.color + '08' }}>
                                                        <Heart size={14} className="mt-0.5 shrink-0" style={{ color: chain.color }} />
                                                        <div>
                                                            <div className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: chain.color }}>Dein Leben</div>
                                                            <div className="text-sm text-[var(--color-text)] font-medium">{chain.yourLife}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ImpactChains;
