import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Sliders, RotateCcw, Share2, Download, AlertTriangle, Check } from 'lucide-react';
import { budgetByYear } from '../data';
import Icon from './Icon';

// What €1 Mrd can buy in each category
const equivalents = {
    'arbeit-soziales': [
        { unit: '€50/Monat mehr Bürgergeld', costMrd: 2.5 },
        { unit: '€50/Monat mehr Kindergeld', costMrd: 6.0 },
        { unit: 'Grundrente für 100.000 Menschen', costMrd: 1.2 },
    ],
    'verteidigung': [
        { unit: 'Eurofighter Typhoon', costMrd: 0.13 },
        { unit: 'Leopard 2A7 Kampfpanzer', costMrd: 0.015 },
        { unit: 'Korvette K130', costMrd: 0.35 },
    ],
    'verkehr-digital': [
        { unit: 'km Autobahn-Neubau', costMrd: 0.03 },
        { unit: 'km Schienen-Neubau', costMrd: 0.01 },
        { unit: 'Jahr Deutschlandticket', costMrd: 3.2 },
    ],
    'bildung-forschung': [
        { unit: 'Lehrer:innen-Gehälter (1 Jahr)', costMrd: 0.00007 },
        { unit: 'Schulneubau (komplett)', costMrd: 0.015 },
        { unit: '€100/Monat mehr BAföG für alle', costMrd: 1.2 },
    ],
    'gesundheit': [
        { unit: 'Krankenhaus-Neubau', costMrd: 0.05 },
        { unit: 'Pflegekraft-Gehälter (1 Jahr)', costMrd: 0.00005 },
        { unit: 'Senke Krankenkassenbeitrag um 0,1%', costMrd: 1.8 },
    ],
    'wirtschaft-klima': [
        { unit: 'Windräder (Onshore)', costMrd: 0.005 },
        { unit: 'Wärmepumpen-Förderung', costMrd: 0.015 },
        { unit: 'Ladesäulen (Schnelllader)', costMrd: 0.001 },
    ],
};

const BudgetSimulator = () => {
    const baseline = budgetByYear[2025].categories;
    const baseTotal = budgetByYear[2025].total;

    const [adjustments, setAdjustments] = useState(() => {
        const init = {};
        baseline.forEach(c => { init[c.id] = 0; });
        return init;
    });
    const [shared, setShared] = useState(false);

    const adjust = useCallback((id, delta) => {
        setAdjustments(prev => ({ ...prev, [id]: Math.max(-50, Math.min(100, delta)) }));
    }, []);

    const reset = () => {
        const init = {};
        baseline.forEach(c => { init[c.id] = 0; });
        setAdjustments(init);
    };

    const results = useMemo(() => {
        return baseline.map(cat => {
            const pctChange = adjustments[cat.id] || 0;
            const newAmount = cat.amountNum * (1 + pctChange / 100);
            const diff = newAmount - cat.amountNum;
            return { ...cat, pctChange, newAmount, diff };
        });
    }, [baseline, adjustments]);

    const newTotal = results.reduce((s, c) => s + c.newAmount, 0);
    const totalDiff = newTotal - baseTotal;
    const hasChanges = Object.values(adjustments).some(v => v !== 0);

    // Generate what your changes mean
    const getEquivalents = (catId, diffMrd) => {
        const eqs = equivalents[catId];
        if (!eqs || Math.abs(diffMrd) < 0.1) return null;
        const absDiff = Math.abs(diffMrd);
        const best = eqs.reduce((a, b) => {
            const countA = absDiff / a.costMrd;
            const countB = absDiff / b.costMrd;
            return (countA > 1 && countA < countB) ? a : b;
        });
        const count = Math.floor(absDiff / best.costMrd);
        if (count < 1) return null;
        return { count, unit: best.unit, direction: diffMrd > 0 ? 'mehr' : 'weniger' };
    };

    const shareText = () => {
        const changes = results.filter(r => r.pctChange !== 0)
            .map(r => `${r.name}: ${r.pctChange > 0 ? '+' : ''}${r.pctChange}%`)
            .join('\n');
        const text = `Mein Bundeshaushalt-Entwurf:\n${changes}\nGesamt: €${newTotal.toFixed(1)} Mrd (${totalDiff >= 0 ? '+' : ''}€${totalDiff.toFixed(1)} Mrd)\n\nErstellt auf Public Money Mirror`;

        if (navigator.share) {
            navigator.share({ title: 'Mein Haushaltsentwurf', text });
        } else {
            navigator.clipboard.writeText(text);
            setShared(true);
            setTimeout(() => setShared(false), 2000);
        }
    };

    return (
        <section id="simulator" className="w-full py-24 px-6">
            <div className="container-main max-w-4xl">
                <motion.div
                    className="mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-[var(--color-surface-2)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-cyan)]">
                            <Sliders size={16} strokeWidth={1.5} />
                        </div>
                        <span className="text-xs font-medium text-[var(--color-text-3)] uppercase tracking-widest">Simulator</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gradient-heading mb-2">
                        Wie würdest du €489 Mrd verteilen?
                    </h2>
                    <p className="text-[var(--color-text-2)] text-sm max-w-lg">
                        Verschiebe die Regler. Sieh was passiert. Teile deinen Entwurf.
                    </p>
                </motion.div>

                {/* Total indicator */}
                <div className={`card p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                    Math.abs(totalDiff) > 0.5 ? (totalDiff > 0 ? '!border-[var(--color-red)]/20' : '!border-[var(--color-green)]/20') : ''
                }`}>
                    <div>
                        <div className="text-xs text-[var(--color-text-3)] mb-1">Dein Haushalt</div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-xl font-bold font-mono tabular-nums text-[var(--color-text)]">
                                €{newTotal.toFixed(1)} Mrd
                            </span>
                            {Math.abs(totalDiff) > 0.05 && (
                                <span className={`text-sm font-mono font-semibold ${totalDiff > 0 ? 'text-[var(--color-red)]' : 'text-[var(--color-green)]'}`}>
                                    {totalDiff > 0 ? '+' : ''}{totalDiff.toFixed(1)} Mrd
                                </span>
                            )}
                        </div>
                        {totalDiff > 5 && (
                            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-[var(--color-red)]">
                                <AlertTriangle size={11} />
                                <span>+€{totalDiff.toFixed(0)} Mrd müssten durch Schulden oder Steuern finanziert werden</span>
                            </div>
                        )}
                        {totalDiff < -5 && (
                            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-[var(--color-green)]">
                                <Check size={11} />
                                <span>€{Math.abs(totalDiff).toFixed(0)} Mrd gespart — könnten Schulden tilgen oder Steuern senken</span>
                            </div>
                        )}
                    </div>
                    <div className="flex gap-2">
                        {hasChanges && (
                            <button onClick={reset} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border border-[var(--color-border)] text-[var(--color-text-3)] hover:bg-[var(--color-surface)] transition-colors">
                                <RotateCcw size={12} /> Reset
                            </button>
                        )}
                        {hasChanges && (
                            <button onClick={shareText} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white" style={{ background: shared ? 'var(--color-green)' : 'linear-gradient(135deg, var(--color-blue), var(--color-purple))' }}>
                                {shared ? <><Check size={12} /> Kopiert!</> : <><Share2 size={12} /> Teilen</>}
                            </button>
                        )}
                    </div>
                </div>

                {/* Sliders */}
                <div className="space-y-1">
                    {results.filter(c => c.id !== 'sonstiges').map((cat, i) => {
                        const eq = getEquivalents(cat.id, cat.diff);
                        return (
                            <motion.div
                                key={cat.id}
                                initial={{ opacity: 0, y: 8 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.03 }}
                                className="card p-4"
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-6 h-6 rounded-md flex items-center justify-center shrink-0" style={{ background: cat.color + '18', color: cat.color }}>
                                        <Icon name={cat.icon} size={12} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-[var(--color-text)] truncate">{cat.name}</span>
                                            <div className="flex items-center gap-2 ml-2 shrink-0">
                                                <span className="text-xs font-mono text-[var(--color-text-3)]">{cat.amountNum.toFixed(1)}</span>
                                                <span className="text-xs font-mono text-[var(--color-text-3)]">→</span>
                                                <span className={`text-xs font-mono font-semibold ${cat.pctChange > 0 ? 'text-[var(--color-green)]' : cat.pctChange < 0 ? 'text-[var(--color-red)]' : 'text-[var(--color-text)]'}`}>
                                                    €{cat.newAmount.toFixed(1)} Mrd
                                                </span>
                                                {cat.pctChange !== 0 && (
                                                    <span className={`text-[10px] font-mono ${cat.pctChange > 0 ? 'text-[var(--color-green)]' : 'text-[var(--color-red)]'}`}>
                                                        {cat.pctChange > 0 ? '+' : ''}{cat.pctChange}%
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Slider */}
                                <div className="flex items-center gap-3">
                                    <span className="text-[9px] text-[var(--color-text-3)] w-8 text-right shrink-0">-50%</span>
                                    <input
                                        type="range"
                                        min={-50}
                                        max={100}
                                        value={adjustments[cat.id]}
                                        onChange={e => adjust(cat.id, Number(e.target.value))}
                                        className="flex-1 h-1.5 rounded-full appearance-none cursor-pointer"
                                        style={{
                                            background: `linear-gradient(to right, var(--color-red) 0%, var(--color-surface-3) 33.3%, var(--color-green) 100%)`,
                                            accentColor: cat.pctChange >= 0 ? 'var(--color-green)' : 'var(--color-red)',
                                        }}
                                    />
                                    <span className="text-[9px] text-[var(--color-text-3)] w-10 shrink-0">+100%</span>
                                </div>

                                {/* Equivalent */}
                                {eq && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="mt-2 px-2 py-1.5 rounded-lg bg-[var(--color-surface)] text-[11px] text-[var(--color-text-2)]"
                                    >
                                        {cat.diff > 0 ? '↑' : '↓'} Das {eq.direction === 'mehr' ? 'entspricht' : 'entspricht'} <strong>{eq.count.toLocaleString('de-DE')} {eq.unit}</strong> {eq.direction}
                                    </motion.div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                {/* Sonstiges (non-adjustable) */}
                <div className="mt-3 px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Icon name="Building" size={12} className="text-[var(--color-text-3)]" />
                        <span className="text-xs text-[var(--color-text-3)]">Sonstige Ressorts (nicht verstellbar)</span>
                    </div>
                    <span className="text-xs font-mono text-[var(--color-text-3)]">€{baseline.find(c => c.id === 'sonstiges')?.amountNum.toFixed(1)} Mrd</span>
                </div>
            </div>
        </section>
    );
};

export default BudgetSimulator;
