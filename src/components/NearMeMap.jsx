import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Eye, EyeOff, ExternalLink } from 'lucide-react';

// Real federally funded projects across Germany
// Sources: Förderdatenbank des Bundes, BMF, BMDV, BMBF press releases
const localProjects = [
    { id: 1, city: 'Hamburg', title: 'S-Bahn S4 Neubau', type: 'Verkehr', amount: '€1,85 Mrd', source: 'BMDV 2023', x: 55, y: 14, color: 'var(--color-blue)' },
    { id: 2, city: 'Berlin', title: 'Charité Forschungscampus', type: 'Forschung', amount: '€660 Mio', source: 'BMBF 2024', x: 68, y: 22, color: 'var(--color-purple)' },
    { id: 3, city: 'München', title: '2. S-Bahn-Stammstrecke', type: 'Verkehr', amount: '€7,2 Mrd', source: 'BMDV 2024', x: 60, y: 80, color: 'var(--color-blue)' },
    { id: 4, city: 'Köln', title: 'Leverkusener Rheinbrücke', type: 'Infrastruktur', amount: '€542 Mio', source: 'BMDV 2023', x: 28, y: 46, color: 'var(--color-orange)' },
    { id: 5, city: 'Dresden', title: 'TSMC/Bosch Chipfabrik', type: 'Wirtschaft', amount: '€5 Mrd Förderung', source: 'BMWK/IPCEI 2024', x: 72, y: 40, color: 'var(--color-amber)' },
    { id: 6, city: 'Stuttgart', title: 'Stuttgart 21 Restbau', type: 'Verkehr', amount: '€11,5 Mrd gesamt', source: 'DB/BMDV', x: 42, y: 72, color: 'var(--color-blue)' },
    { id: 7, city: 'Düsseldorf', title: 'Uni-Klinik Erweiterung', type: 'Gesundheit', amount: '€330 Mio', source: 'BMG/Land NRW 2024', x: 28, y: 42, color: 'var(--color-green)' },
    { id: 8, city: 'Frankfurt', title: 'Fernbahntunnel', type: 'Verkehr', amount: '€3,6 Mrd', source: 'BMDV 2024', x: 38, y: 52, color: 'var(--color-blue)' },
    { id: 9, city: 'Rostock', title: 'LNG-Terminal', type: 'Energie', amount: '€140 Mio', source: 'BMWK 2023', x: 62, y: 10, color: 'var(--color-amber)' },
    { id: 10, city: 'Leipzig', title: 'DLR Quantencomputing', type: 'Forschung', amount: '€50 Mio', source: 'BMBF 2024', x: 65, y: 40, color: 'var(--color-purple)' },
];

const typeColors = {
    'Verkehr': 'var(--color-blue)',
    'Forschung': 'var(--color-purple)',
    'Infrastruktur': 'var(--color-orange)',
    'Wirtschaft': 'var(--color-amber)',
    'Gesundheit': 'var(--color-green)',
    'Energie': 'var(--color-amber)',
};

const NearMeMap = () => {
    const [showLabels, setShowLabels] = useState(true);
    const [selected, setSelected] = useState(null);
    const [filter, setFilter] = useState(null);

    const types = [...new Set(localProjects.map(p => p.type))];
    const filtered = filter ? localProjects.filter(p => p.type === filter) : localProjects;

    return (
        <section id="vorort" className="w-full py-24 px-6">
            <div className="container-main">
                <motion.div
                    className="mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 rounded-lg bg-[var(--color-surface-2)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-cyan)]">
                                    <MapPin size={16} strokeWidth={1.5} />
                                </div>
                                <span className="text-xs font-medium text-[var(--color-text-3)] uppercase tracking-widest">Bundesweite Projekte</span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gradient-heading mb-2">Wo dein Steuergeld verbaut wird</h2>
                            <p className="text-[var(--color-text-2)] text-sm max-w-lg">
                                Reale Großprojekte mit Bundesbeteiligung. Quellen: BMDV, BMBF, BMWK, BMF.
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setShowLabels(!showLabels)}
                                className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-2)] hover:bg-[var(--color-surface-2)] transition-colors"
                            >
                                {showLabels ? <Eye size={14} /> : <EyeOff size={14} />}
                                Labels
                            </button>
                        </div>
                    </div>

                    {/* Type filter */}
                    <div className="flex flex-wrap gap-1.5 mt-5">
                        <button
                            onClick={() => setFilter(null)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${!filter ? 'border-[var(--color-blue)] bg-[var(--color-blue)]/10 text-[var(--color-text)]' : 'border-[var(--color-border)] text-[var(--color-text-3)] hover:text-[var(--color-text-2)]'}`}
                        >
                            Alle ({localProjects.length})
                        </button>
                        {types.map(t => {
                            const count = localProjects.filter(p => p.type === t).length;
                            return (
                                <button
                                    key={t}
                                    onClick={() => setFilter(f => f === t ? null : t)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${filter === t ? 'border-[var(--color-blue)] bg-[var(--color-blue)]/10 text-[var(--color-text)]' : 'border-[var(--color-border)] text-[var(--color-text-3)] hover:text-[var(--color-text-2)]'}`}
                                >
                                    {t} ({count})
                                </button>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Map */}
                <div className="relative w-full h-[420px] md:h-[520px] rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)]">
                    {/* Grid */}
                    <div className="absolute inset-0" style={{
                        opacity: 'var(--pattern-opacity)',
                        backgroundImage: 'radial-gradient(var(--dot-color) 1px, transparent 1px)',
                        backgroundSize: '28px 28px'
                    }} />

                    {/* Germany outline hint */}
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-72 h-72 bg-[var(--color-blue)] opacity-[0.03] blur-[100px] rounded-full" />

                    {/* Pins */}
                    {filtered.map((p, i) => (
                        <motion.div
                            key={p.id}
                            className="absolute z-10 group cursor-pointer"
                            style={{ left: `${p.x}%`, top: `${p.y}%` }}
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + i * 0.06, type: "spring", stiffness: 300 }}
                            onClick={() => setSelected(s => s === p.id ? null : p.id)}
                        >
                            {/* Ping */}
                            <div className="absolute -inset-3 rounded-full animate-ping opacity-20" style={{ background: typeColors[p.type] || p.color }} />
                            {/* Dot */}
                            <div className="w-3.5 h-3.5 rounded-full relative z-10 border-2 border-[var(--color-bg)]" style={{ background: typeColors[p.type] || p.color, boxShadow: `0 0 10px ${typeColors[p.type] || p.color}` }} />

                            {/* Label */}
                            {(showLabels || selected === p.id) && (
                                <motion.div
                                    initial={{ opacity: 0, y: 4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute left-1/2 -translate-x-1/2 top-6 whitespace-nowrap"
                                >
                                    <div className="px-3 py-2.5 rounded-lg bg-[var(--color-surface)]/95 backdrop-blur-sm border border-[var(--color-border)] shadow-lg text-center min-w-[140px]">
                                        <div className="text-[10px] font-medium text-[var(--color-text-3)] mb-0.5">{p.city}</div>
                                        <div className="text-[11px] font-semibold text-[var(--color-text)]">{p.title}</div>
                                        <div className="flex items-center justify-center gap-2 mt-1">
                                            <span className="text-[10px] text-[var(--color-text-3)]">{p.type}</span>
                                            <span className="text-[10px] font-mono font-medium" style={{ color: typeColors[p.type] || p.color }}>{p.amount}</span>
                                        </div>
                                        {selected === p.id && (
                                            <div className="text-[9px] text-[var(--color-text-3)] mt-1 pt-1 border-t border-[var(--color-border)]">
                                                Quelle: {p.source}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    ))}

                    {/* Total in corner */}
                    <div className="absolute bottom-4 left-4 px-3 py-2 rounded-lg bg-[var(--color-surface)]/90 backdrop-blur-sm border border-[var(--color-border)] text-[10px] text-[var(--color-text-3)]">
                        {filtered.length} Projekte angezeigt &middot; Bundesfinanzierung
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NearMeMap;
