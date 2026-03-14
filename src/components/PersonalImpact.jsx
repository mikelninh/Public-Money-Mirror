import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { personalImpacts } from '../data/lifeImpact';
import Icon from './Icon';

const directionIcon = {
    positive: <TrendingUp size={12} className="text-[var(--color-green)]" />,
    negative: <TrendingDown size={12} className="text-[var(--color-red)]" />,
    neutral: <Minus size={12} className="text-[var(--color-amber)]" />,
};

const directionColor = {
    positive: 'border-[var(--color-green)]/15 bg-[var(--color-green)]/5',
    negative: 'border-[var(--color-red)]/15 bg-[var(--color-red)]/5',
    neutral: 'border-[var(--color-amber)]/15 bg-[var(--color-amber)]/5',
};

const PersonalImpact = ({ situation }) => {
    const data = personalImpacts[situation];
    if (!data) return null;

    return (
        <AnimatePresence mode="wait">
            <motion.section
                key={situation}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
                className="w-full py-16 px-6"
            >
                <div className="container-main max-w-4xl">
                    {/* Headline */}
                    <motion.div
                        className="mb-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 rounded-lg bg-[var(--color-blue)]/10 border border-[var(--color-blue)]/15 flex items-center justify-center text-[var(--color-blue)]">
                                <Icon name="Users" size={16} />
                            </div>
                            <span className="text-xs font-medium text-[var(--color-text-3)] uppercase tracking-widest">Dein Haushalt</span>
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-[var(--color-text)] mb-2">
                            {data.headline}
                        </h2>
                    </motion.div>

                    {/* Relevant budget areas */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-10">
                        {data.relevantAreas.map((area, i) => (
                            <motion.div
                                key={area.budget}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 + i * 0.08 }}
                                className="card p-5"
                            >
                                <div className="flex items-center gap-2 mb-3">
                                    <Icon name={area.icon} size={14} className="text-[var(--color-text-3)]" />
                                    <span className="text-xs font-semibold text-[var(--color-text-3)] uppercase tracking-wider">{area.budget}</span>
                                </div>
                                <div className="text-lg font-bold text-[var(--color-text)] mb-2 font-mono">{area.amount}</div>
                                <p className="text-[13px] text-[var(--color-text-2)] leading-relaxed">{area.personal}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* What's changing */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mb-10"
                    >
                        <h3 className="text-sm font-bold text-[var(--color-text)] mb-4 flex items-center gap-2">
                            <ArrowRight size={14} className="text-[var(--color-blue)]" />
                            Was sich für dich ändert
                        </h3>
                        <div className="space-y-2">
                            {data.changes.map((change, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.45 + i * 0.06 }}
                                    className={`flex items-start gap-3 px-4 py-3 rounded-xl border ${directionColor[change.direction]}`}
                                >
                                    <span className="mt-0.5 shrink-0">{directionIcon[change.direction]}</span>
                                    <span className="text-sm text-[var(--color-text)] leading-relaxed">{change.text}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Personal tax breakdown */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.55 }}
                        className="card p-6"
                    >
                        <h3 className="text-sm font-bold text-[var(--color-text)] mb-1">
                            Dein Steuergeld — konkret
                        </h3>
                        <p className="text-xs text-[var(--color-text-3)] mb-5">
                            Bei €{data.taxExample.income.toLocaleString('de-DE')} Bruttoeinkommen zahlst du ca. €{data.taxExample.tax.toLocaleString('de-DE')} Einkommensteuer.
                            {data.taxExample.tax === 0 && ' Du bist unter dem Grundfreibetrag.'}
                        </p>
                        <div className="space-y-2.5">
                            {data.taxExample.breakdown.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.6 + i * 0.05 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="w-7 h-7 rounded-lg bg-[var(--color-surface-2)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-3)] shrink-0">
                                        <Icon name={item.icon} size={13} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <span className="text-sm text-[var(--color-text)]">{item.label}</span>
                                    </div>
                                    <span className={`text-sm font-bold font-mono tabular-nums ${item.amount < 0 ? 'text-[var(--color-green)]' : 'text-[var(--color-text)]'}`}>
                                        {item.amount < 0 ? '' : '€'}{Math.abs(item.amount).toLocaleString('de-DE')}
                                        {item.amount < 0 && ' Nettovorteil'}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </motion.section>
        </AnimatePresence>
    );
};

export default PersonalImpact;
