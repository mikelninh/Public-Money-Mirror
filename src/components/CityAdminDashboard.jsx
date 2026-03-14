import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from './Icon';

const MetricCard = ({ title, value, trend, icon, color, delay }) => (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}
        className="card p-5">
        <div className="flex justify-between items-start mb-3">
            <div className="w-9 h-9 rounded-xl bg-[var(--color-surface-2)] border border-[var(--color-border)] flex items-center justify-center" style={{ color }}>
                <Icon name={icon} size={18} />
            </div>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md border border-[var(--color-border)] bg-[var(--color-surface-2)] ${trend.startsWith('+') ? 'text-[var(--color-green)]' : 'text-[var(--color-red)]'}`}>{trend}</span>
        </div>
        <div className="text-[10px] text-[var(--color-text-3)] uppercase tracking-[0.12em] mb-0.5">{title}</div>
        <div className="text-2xl font-bold font-mono tabular-nums">{value}</div>
    </motion.div>
);

const CityAdminDashboard = ({ onClose }) => {
    const [liveSignal, setLiveSignal] = useState("Warte auf Bürgersignal...");
    const [allocations, setAllocations] = useState([40, 65, 35, 85, 55, 70, 45]);

    useEffect(() => {
        const signals = [
            "SIGNAL: 450 Stimmen für 'Schulessen-Zuschuss' [Verifiziert]",
            "ALERT: Negativer Sentiment-Spike in 'Transport'",
            "SIGNAL: 1.200 Stimmen für 'Schlagloch-Reparatur' in Mitte",
            "PREDICTION: 89% Protest-Wahrscheinlichkeit bei Kürzung",
            "SIGNAL: Neues Guardian-Mitglied: ID #9921",
        ];
        let i = 0;
        const iv = setInterval(() => { setLiveSignal(signals[i]); i = (i + 1) % signals.length; }, 2500);
        return () => clearInterval(iv);
    }, []);

    useEffect(() => {
        const iv = setInterval(() => {
            setAllocations(prev => prev.map(v => Math.min(100, Math.max(10, v + (Math.random() * 10 - 5)))));
        }, 2000);
        return () => clearInterval(iv);
    }, []);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-[var(--color-bg)] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 z-20 bg-[var(--color-bg)]/95 backdrop-blur-xl border-b border-[var(--color-border)] px-6 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[var(--color-blue)] flex items-center justify-center shadow-[0_0_12px_rgba(79,143,247,0.3)]">
                        <Icon name="Activity" size={16} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-sm font-bold">CityOS <span className="text-[var(--color-blue)]">Command Center</span></h1>
                        <p className="text-[10px] text-[var(--color-text-3)] font-mono flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-green)] animate-pulse" /> BERLIN_MUNICIPALITY
                        </p>
                    </div>
                </div>
                <button onClick={onClose} className="p-2 rounded-lg hover:bg-[var(--color-surface-2)] text-[var(--color-text-3)] transition-colors">
                    <Icon name="X" size={18} />
                </button>
            </div>

            {/* Signal ticker */}
            <div className="border-b border-[var(--color-border)] py-2 px-6 flex items-center gap-3 overflow-hidden">
                <span className="text-[10px] font-semibold text-[var(--color-blue)] uppercase tracking-wider shrink-0 flex items-center gap-1.5">
                    <Icon name="Wifi" size={10} className="animate-pulse" /> Signal
                </span>
                <span className="text-[11px] font-mono text-[var(--color-text-3)] truncate">{liveSignal}</span>
            </div>

            <div className="container-main py-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    <MetricCard title="Effizienz" value="94.2%" trend="+2.4%" icon="PieChart" color="var(--color-blue)" delay={0.05} />
                    <MetricCard title="Vertrauen" value="72/100" trend="+5.1%" icon="Heart" color="var(--color-purple)" delay={0.1} />
                    <MetricCard title="Risiko" value="NIEDRIG" trend="-1.2%" icon="Shield" color="var(--color-green)" delay={0.15} />
                    <MetricCard title="Engagement" value="14.5k" trend="+12.5%" icon="Users" color="var(--color-orange)" delay={0.2} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-2 card p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="font-semibold flex items-center gap-2"><Icon name="Zap" size={15} className="text-[var(--color-amber)]" /> Prädiktive Allokation</h3>
                                <p className="text-[11px] text-[var(--color-text-3)] mt-0.5">KI: 5% nach Bildung verschieben für langfristiges Wachstum.</p>
                            </div>
                            <button className="px-3 py-1.5 text-[10px] font-semibold text-white rounded-lg"
                                style={{ background: 'linear-gradient(135deg, var(--color-blue), var(--color-purple))' }}>OPTIMIEREN</button>
                        </div>
                        <div className="h-48 flex items-end justify-between gap-2">
                            {allocations.map((h, i) => (
                                <div key={i} className="w-full bg-[var(--color-surface-3)] rounded-t relative overflow-hidden">
                                    <motion.div className="absolute bottom-0 left-0 right-0 rounded-t"
                                        style={{ background: 'linear-gradient(to top, var(--color-blue), var(--color-purple))' }}
                                        animate={{ height: `${h}%` }}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }} />
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-3 text-[10px] text-[var(--color-text-3)] font-mono">
                            {['EDU','INFRA','HEALTH','DEF','SOC','ENV','R&D'].map(l => <span key={l}>{l}</span>)}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="card p-5">
                            <h3 className="text-sm font-semibold mb-4 flex items-center gap-2 text-[var(--color-text-2)]"><Icon name="Shield" size={15} /> Audit</h3>
                            <div className="flex justify-center py-2">
                                <div className="relative w-24 h-24 flex items-center justify-center">
                                    <svg className="w-full h-full -rotate-90">
                                        <circle cx="48" cy="48" r="40" stroke="var(--color-surface-3)" strokeWidth="5" fill="none" />
                                        <circle cx="48" cy="48" r="40" stroke="var(--color-green)" strokeWidth="5" fill="none" strokeDasharray="251" strokeDashoffset="5" strokeLinecap="round" />
                                    </svg>
                                    <span className="absolute text-lg font-bold font-mono">98%</span>
                                </div>
                            </div>
                            <div className="text-center text-[10px] text-[var(--color-text-3)]">Nächstes Audit: 14 Tage</div>
                        </div>
                        <div className="card p-5 !border-[var(--color-blue)]/10 !bg-[var(--color-blue)]/[0.03] cursor-pointer group">
                            <h3 className="font-semibold mb-1">Bundesdaten freischalten</h3>
                            <p className="text-sm text-[var(--color-text-3)] mb-3">Vergleich mit nationalen Benchmarks.</p>
                            <span className="text-xs font-semibold text-[var(--color-blue)] group-hover:text-white transition-colors flex items-center gap-1">
                                Sales kontaktieren <Icon name="ArrowRight" size={11} />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default CityAdminDashboard;
