import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause } from 'lucide-react';
import { budgetByYear } from '../data';
import Icon from './Icon';

// €489 Mrd / year = €15,497 per second
const TOTAL_PER_YEAR = 489e9;
const PER_SECOND = TOTAL_PER_YEAR / 365.25 / 24 / 3600;

const categories2025 = budgetByYear[2025].categories;

const TaxTicker = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [elapsed, setElapsed] = useState(0);
    const startRef = useRef(Date.now());
    const frameRef = useRef(null);

    useEffect(() => {
        if (!isOpen || isPaused) {
            if (frameRef.current) cancelAnimationFrame(frameRef.current);
            return;
        }

        startRef.current = Date.now() - elapsed * 1000;

        const tick = () => {
            const now = Date.now();
            setElapsed((now - startRef.current) / 1000);
            frameRef.current = requestAnimationFrame(tick);
        };
        frameRef.current = requestAnimationFrame(tick);

        return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
    }, [isOpen, isPaused]);

    const totalSpent = elapsed * PER_SECOND;

    const formatEuro = (n) => {
        if (n >= 1e6) return `€${(n / 1e6).toFixed(2)} Mio`;
        if (n >= 1e3) return `€${(n / 1e3).toFixed(1)}k`;
        return `€${Math.floor(n).toLocaleString('de-DE')}`;
    };

    const topCategories = categories2025.slice(0, 6);

    // Floating trigger button
    if (!isOpen) {
        return (
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setIsOpen(true); setElapsed(0); startRef.current = Date.now(); }}
                className="fixed bottom-20 left-3 md:left-5 z-40 px-3 md:px-4 py-2 md:py-2.5 rounded-2xl flex items-center gap-2 text-white text-[11px] md:text-xs font-semibold shadow-lg"
                style={{ background: 'linear-gradient(135deg, var(--color-green), var(--color-cyan))', boxShadow: '0 4px 24px rgba(52,211,153,0.25)' }}
            >
                <Play size={13} fill="currentColor" />
                Live-Zähler
            </motion.button>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 left-3 md:left-5 z-50 w-[calc(100vw-24px)] max-w-[320px] rounded-2xl overflow-hidden border border-[var(--color-border)] shadow-2xl"
            style={{ background: 'var(--color-bg)' }}
        >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
                <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                        <span className={`absolute inline-flex h-full w-full rounded-full bg-[var(--color-green)] ${isPaused ? '' : 'animate-ping'} opacity-75`} />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-green)]" />
                    </span>
                    <span className="text-xs font-semibold text-[var(--color-text)]">Bundesausgaben — live</span>
                </div>
                <div className="flex items-center gap-1">
                    <button onClick={() => setIsPaused(p => !p)} className="p-1.5 rounded-lg hover:bg-[var(--color-surface-2)] text-[var(--color-text-3)] transition-colors">
                        {isPaused ? <Play size={12} /> : <Pause size={12} />}
                    </button>
                    <button onClick={() => { setIsOpen(false); setElapsed(0); }} className="p-1.5 rounded-lg hover:bg-[var(--color-surface-2)] text-[var(--color-text-3)] transition-colors">
                        <X size={12} />
                    </button>
                </div>
            </div>

            {/* Total counter */}
            <div className="px-4 py-4 text-center border-b border-[var(--color-border)]">
                <div className="text-[10px] text-[var(--color-text-3)] uppercase tracking-wider mb-1">
                    Ausgegeben seit du zuschaust
                </div>
                <div className="text-2xl font-bold font-mono tabular-nums text-[var(--color-text)]">
                    {formatEuro(totalSpent)}
                </div>
                <div className="text-[10px] text-[var(--color-text-3)] mt-1 font-mono">
                    {Math.floor(elapsed)}s &middot; €{Math.round(PER_SECOND).toLocaleString('de-DE')}/Sekunde
                </div>
            </div>

            {/* Category breakdown */}
            <div className="px-4 py-3 space-y-2 max-h-[240px] overflow-y-auto">
                {topCategories.map(cat => {
                    const catSpent = totalSpent * (cat.percentage / 100);
                    const barPct = cat.percentage / topCategories[0].percentage * 100;
                    return (
                        <div key={cat.id} className="flex items-center gap-2.5">
                            <div className="w-5 h-5 rounded-md bg-[var(--color-surface-2)] flex items-center justify-center shrink-0">
                                <Icon name={cat.icon} size={10} className="text-[var(--color-text-3)]" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center mb-0.5">
                                    <span className="text-[10px] text-[var(--color-text-2)] truncate">{cat.name}</span>
                                    <span className="text-[10px] font-mono font-medium text-[var(--color-text)] tabular-nums ml-2">
                                        {formatEuro(catSpent)}
                                    </span>
                                </div>
                                <div className="h-1 rounded-full bg-[var(--color-surface-3)] overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-all duration-300"
                                        style={{ width: `${barPct}%`, background: cat.color }}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Context footer */}
            <div className="px-4 py-2.5 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
                <div className="text-[9px] text-[var(--color-text-3)] text-center">
                    Berechnung: €489 Mrd Bundeshaushalt 2025 ÷ 365,25 Tage ÷ 86.400 Sekunden
                </div>
            </div>
        </motion.div>
    );
};

export default TaxTicker;
