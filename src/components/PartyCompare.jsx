import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Vote, Grid3X3, BarChart3, Hexagon, Compass, RotateCcw, Share2 } from 'lucide-react';
import { parties, categories, stances, quizQuestions } from '../data/partyData';
import Icon from './Icon';

const tabs = [
    { id: 'matrix', label: 'Matrix', icon: Grid3X3 },
    { id: 'differences', label: 'Unterschiede', icon: BarChart3 },
    { id: 'radar', label: 'Radar', icon: Hexagon },
    { id: 'kompass', label: 'Wahlkompass', icon: Compass },
];

/* ── Tab 1: Comparison Matrix ── */
const ComparisonMatrix = () => {
    const [hoveredRow, setHoveredRow] = useState(null);
    const [tooltip, setTooltip] = useState(null);

    return (
        <div className="overflow-x-auto -mx-4 px-4">
            <table className="w-full min-w-[640px] border-collapse">
                <thead>
                    <tr>
                        <th className="text-left text-xs font-semibold text-[var(--color-text-3)] uppercase tracking-wider p-3 sticky left-0 bg-[var(--color-bg)] z-10">
                            Kategorie
                        </th>
                        {parties.map(p => (
                            <th key={p.id} className="text-center text-xs font-semibold p-3 min-w-[90px]">
                                <div className="flex flex-col items-center gap-1">
                                    <div
                                        className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold"
                                        style={{ background: p.color, color: p.id === 'fdp' ? '#000' : '#fff' }}
                                    >
                                        {p.shortName.slice(0, 2)}
                                    </div>
                                    <span className="text-[var(--color-text-2)]">{p.shortName}</span>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {categories.map(cat => (
                        <tr
                            key={cat.id}
                            className={`border-t border-[var(--color-border)] transition-colors ${hoveredRow === cat.id ? 'bg-[var(--color-surface)]' : ''}`}
                            onMouseEnter={() => setHoveredRow(cat.id)}
                            onMouseLeave={() => setHoveredRow(null)}
                        >
                            <td className="p-3 sticky left-0 bg-[var(--color-bg)] z-10">
                                <div className="flex items-center gap-2">
                                    <Icon name={cat.icon} size={14} className="text-[var(--color-text-3)]" />
                                    <span className="text-sm font-medium text-[var(--color-text)]">{cat.label}</span>
                                </div>
                            </td>
                            {parties.map(p => {
                                const stance = stances[p.id][cat.id];
                                const v = stance.value;
                                return (
                                    <td
                                        key={p.id}
                                        className="p-3 relative"
                                        onMouseEnter={() => setTooltip({ party: p.name, cat: cat.label, reason: stance.reason })}
                                        onMouseLeave={() => setTooltip(null)}
                                    >
                                        <div className="flex items-center justify-center">
                                            <div className="w-full max-w-[80px] h-5 relative flex items-center">
                                                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[var(--color-border)]" />
                                                {v !== 0 && (
                                                    <motion.div
                                                        className="absolute top-0.5 bottom-0.5 rounded-sm"
                                                        style={{
                                                            background: v > 0 ? 'var(--color-green)' : 'var(--color-red)',
                                                            opacity: Math.abs(v) === 2 ? 0.9 : 0.5,
                                                            left: v > 0 ? '50%' : `${50 - Math.abs(v) * 20}%`,
                                                            width: `${Math.abs(v) * 20}%`,
                                                        }}
                                                        initial={{ scaleX: 0 }}
                                                        animate={{ scaleX: 1 }}
                                                        transition={{ duration: 0.4, delay: 0.05 }}
                                                    />
                                                )}
                                                {v === 0 && (
                                                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[var(--color-text-3)] opacity-30" />
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
            <AnimatePresence>
                {tooltip && (
                    <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 max-w-xs px-4 py-3 rounded-xl bg-[var(--color-surface-2)] border border-[var(--color-border)] shadow-lg"
                    >
                        <div className="text-xs font-semibold text-[var(--color-text)] mb-1">{tooltip.party} — {tooltip.cat}</div>
                        <div className="text-xs text-[var(--color-text-2)]">{tooltip.reason}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

/* ── Tab 2: Biggest Differences ── */
const BiggestDifferences = () => {
    const ranked = categories.map(cat => {
        const values = parties.map(p => stances[p.id][cat.id].value);
        const range = Math.max(...values) - Math.min(...values);
        return { ...cat, values, range };
    }).sort((a, b) => b.range - a.range);

    return (
        <div className="space-y-6">
            {ranked.map((cat, i) => (
                <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="card p-5"
                >
                    <div className="flex items-center gap-2 mb-3">
                        <Icon name={cat.icon} size={14} className="text-[var(--color-text-3)]" />
                        <span className="text-sm font-semibold text-[var(--color-text)]">{cat.label}</span>
                        {i === 0 && (
                            <span className="ml-2 px-2 py-0.5 rounded-full bg-[var(--color-red)]/10 text-[var(--color-red)] text-[10px] font-semibold">
                                Größte Uneinigkeit
                            </span>
                        )}
                    </div>
                    <div className="relative h-10">
                        <div className="absolute top-1/2 left-0 right-0 h-px bg-[var(--color-border)]" />
                        <span className="absolute left-0 top-full text-[9px] text-[var(--color-text-3)] mt-1">&minus;2</span>
                        <span className="absolute left-1/2 top-full -translate-x-1/2 text-[9px] text-[var(--color-text-3)] mt-1">0</span>
                        <span className="absolute right-0 top-full text-[9px] text-[var(--color-text-3)] mt-1">+2</span>
                        <div className="absolute left-1/2 top-[calc(50%-6px)] w-px h-3 bg-[var(--color-border)]" />
                        {parties.map((p, pi) => {
                            const v = stances[p.id][cat.id].value;
                            const pos = ((v + 2) / 4) * 100;
                            const isExtreme = v === Math.max(...cat.values) || v === Math.min(...cat.values);
                            return (
                                <motion.div
                                    key={p.id}
                                    className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center"
                                    style={{ left: `${pos}%` }}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: i * 0.06 + pi * 0.03 }}
                                >
                                    <div
                                        className="w-5 h-5 rounded-full border-2 border-[var(--color-bg)] shadow-sm"
                                        style={{ background: p.color }}
                                        title={`${p.name}: ${v > 0 ? '+' : ''}${v}`}
                                    />
                                    {isExtreme && (
                                        <span className="absolute -top-5 text-[8px] font-bold whitespace-nowrap" style={{ color: p.color === '#1a1a1a' ? 'var(--color-text-2)' : p.color }}>
                                            {p.shortName}
                                        </span>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

/* ── Tab 3: Radar Chart ── */
const RadarChart = () => {
    const [highlighted, setHighlighted] = useState(null);
    const cx = 150, cy = 150, r = 110;
    const n = categories.length;

    const getPoint = (catIndex, value) => {
        const angle = (Math.PI * 2 * catIndex) / n - Math.PI / 2;
        const radius = ((value + 2) / 4) * r;
        return {
            x: cx + radius * Math.cos(angle),
            y: cy + radius * Math.sin(angle),
        };
    };

    const getPolygon = (partyId) => {
        return categories.map((cat, i) => {
            const pt = getPoint(i, stances[partyId][cat.id].value);
            return `${pt.x},${pt.y}`;
        }).join(' ');
    };

    return (
        <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 flex justify-center">
                <svg viewBox="0 0 300 300" className="w-full max-w-[360px]">
                    {[1, 2, 3, 4].map(level => (
                        <circle
                            key={level}
                            cx={cx} cy={cy}
                            r={(level / 4) * r}
                            fill="none"
                            stroke="var(--color-border)"
                            strokeWidth="0.5"
                            opacity={0.5}
                        />
                    ))}
                    {categories.map((cat, i) => {
                        const pt = getPoint(i, 2);
                        return (
                            <line key={cat.id} x1={cx} y1={cy} x2={pt.x} y2={pt.y} stroke="var(--color-border)" strokeWidth="0.5" opacity={0.5} />
                        );
                    })}
                    {categories.map((cat, i) => {
                        const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
                        const lx = cx + (r + 22) * Math.cos(angle);
                        const ly = cy + (r + 22) * Math.sin(angle);
                        return (
                            <text
                                key={cat.id}
                                x={lx} y={ly}
                                textAnchor="middle"
                                dominantBaseline="central"
                                fill="var(--color-text-3)"
                                fontSize="9"
                                fontWeight="500"
                            >
                                {cat.label}
                            </text>
                        );
                    })}
                    {parties.map(p => {
                        const isHighlighted = highlighted === p.id;
                        const isActive = highlighted === null || isHighlighted;
                        return (
                            <polygon
                                key={p.id}
                                points={getPolygon(p.id)}
                                fill={p.color}
                                fillOpacity={isHighlighted ? 0.25 : isActive ? 0.1 : 0.03}
                                stroke={p.color}
                                strokeWidth={isHighlighted ? 2.5 : 1}
                                strokeOpacity={isActive ? 0.8 : 0.15}
                                style={{ transition: 'all 0.3s' }}
                            />
                        );
                    })}
                </svg>
            </div>
            <div className="flex flex-wrap lg:flex-col gap-2">
                {parties.map(p => (
                    <button
                        key={p.id}
                        onClick={() => setHighlighted(h => h === p.id ? null : p.id)}
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all border ${
                            highlighted === p.id
                                ? 'border-[var(--color-border-hover)] bg-[var(--color-surface-2)]'
                                : 'border-transparent hover:bg-[var(--color-surface)]'
                        }`}
                    >
                        <div className="w-3 h-3 rounded-full shrink-0" style={{ background: p.color }} />
                        <span className="text-[var(--color-text)]">{p.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

/* ── Tab 4: Wahlkompass Mini ── */
const WahlkompassMini = () => {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const total = quizQuestions.length;
    const isDone = step >= total;

    const handleAnswer = (catId, value) => {
        setAnswers(prev => ({ ...prev, [catId]: value }));
        setTimeout(() => setStep(s => s + 1), 200);
    };

    const getResults = () => {
        return parties.map(p => {
            let distance = 0;
            categories.forEach(cat => {
                const userVal = answers[cat.id] ?? 0;
                const partyVal = stances[p.id][cat.id].value;
                distance += Math.abs(userVal - partyVal);
            });
            const maxDist = categories.length * 4;
            const match = Math.round(((maxDist - distance) / maxDist) * 100);
            return { ...p, match, distance };
        }).sort((a, b) => b.match - a.match);
    };

    const reset = () => {
        setStep(0);
        setAnswers({});
    };

    const share = () => {
        const results = getResults();
        const text = `Mein Wahlkompass-Ergebnis:\n${results.slice(0, 3).map((r, i) => `${i + 1}. ${r.name}: ${r.match}%`).join('\n')}\n\nGemacht auf Public Money Mirror`;
        if (navigator.share) {
            navigator.share({ title: 'Mein Wahlkompass', text });
        } else {
            navigator.clipboard.writeText(text);
        }
    };

    if (isDone) {
        const results = getResults();
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="text-center mb-8">
                    <h3 className="text-xl font-bold text-[var(--color-text)] mb-2">Dein Ergebnis</h3>
                    <p className="text-sm text-[var(--color-text-2)]">Übereinstimmung mit den Partei-Positionen im Haushalt</p>
                </div>
                <div className="space-y-3 max-w-md mx-auto">
                    {results.map((r, i) => (
                        <motion.div
                            key={r.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.08 }}
                            className="flex items-center gap-3"
                        >
                            <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
                                style={{ background: r.color, color: r.id === 'fdp' ? '#000' : '#fff' }}
                            >
                                {r.shortName.slice(0, 2)}
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm font-medium text-[var(--color-text)]">{r.name}</span>
                                    <span className="text-sm font-bold text-[var(--color-text)]">{r.match}%</span>
                                </div>
                                <div className="h-2 rounded-full bg-[var(--color-surface-3)] overflow-hidden">
                                    <motion.div
                                        className="h-full rounded-full"
                                        style={{ background: r.color }}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${r.match}%` }}
                                        transition={{ duration: 0.6, delay: i * 0.08 }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <div className="flex justify-center gap-3 pt-4">
                    <button onClick={reset} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-surface-2)] transition-colors">
                        <RotateCcw size={14} /> Nochmal
                    </button>
                    <button onClick={share} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: 'linear-gradient(135deg, var(--color-blue), var(--color-purple))' }}>
                        <Share2 size={14} /> Teilen
                    </button>
                </div>
            </motion.div>
        );
    }

    const q = quizQuestions[step];
    return (
        <div className="max-w-lg mx-auto">
            <div className="mb-8">
                <div className="flex justify-between text-xs text-[var(--color-text-3)] mb-2">
                    <span>Frage {step + 1} von {total}</span>
                    <span>{Math.round(((step) / total) * 100)}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-[var(--color-surface-3)] overflow-hidden">
                    <motion.div
                        className="h-full rounded-full"
                        style={{ background: 'linear-gradient(90deg, var(--color-blue), var(--color-purple))' }}
                        animate={{ width: `${((step) / total) * 100}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            </div>
            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.25 }}
                >
                    <h3 className="text-lg font-semibold text-[var(--color-text)] mb-6 text-center">{q.question}</h3>
                    <div className="grid gap-2">
                        {q.options.map(opt => (
                            <button
                                key={opt.value}
                                onClick={() => handleAnswer(q.categoryId, opt.value)}
                                className={`w-full px-5 py-3.5 rounded-xl text-sm font-medium text-left border transition-all ${
                                    answers[q.categoryId] === opt.value
                                        ? 'border-[var(--color-blue)] bg-[var(--color-blue)]/10 text-[var(--color-text)]'
                                        : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-surface-2)] hover:border-[var(--color-border-hover)]'
                                }`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

/* ── Main Component ── */
const PartyCompare = () => {
    const [activeTab, setActiveTab] = useState('matrix');

    const tabContent = {
        matrix: <ComparisonMatrix />,
        differences: <BiggestDifferences />,
        radar: <RadarChart />,
        kompass: <WahlkompassMini />,
    };

    return (
        <section id="parteien" className="w-full py-24 px-6">
            <div className="container-main">
                <motion.div
                    className="mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-[var(--color-surface-2)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-purple)]">
                            <Vote size={16} strokeWidth={1.5} />
                        </div>
                        <span className="text-xs font-medium text-[var(--color-text-3)] uppercase tracking-widest">Parteienvergleich</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gradient-heading mb-2">
                        Wer will was ausgeben?
                    </h2>
                    <p className="text-[var(--color-text-2)] text-sm max-w-lg">
                        Vergleiche die Haushalts-Positionen aller Bundestagsparteien — als Matrix, Radar-Chart oder im Mini-Wahlkompass.
                    </p>
                </motion.div>

                <div className="flex items-center gap-1 p-1.5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] mb-8 w-fit">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                                activeTab === tab.id ? 'text-white' : 'text-[var(--color-text-3)] hover:text-[var(--color-text-2)]'
                            }`}
                        >
                            {activeTab === tab.id && (
                                <motion.div
                                    layoutId="partyTabPill"
                                    className="absolute inset-0 rounded-xl bg-[var(--color-blue)] -z-10"
                                    style={{ boxShadow: '0 2px 12px rgba(79,143,247,0.3)' }}
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                            )}
                            <tab.icon size={14} />
                            <span className="hidden sm:inline">{tab.label}</span>
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {tabContent[activeTab]}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};

export default PartyCompare;
