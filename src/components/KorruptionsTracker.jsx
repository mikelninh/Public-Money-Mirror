import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, ChevronDown, ExternalLink, AlertTriangle, ArrowRight, RotateCcw, DollarSign, Users, Clock } from 'lucide-react';
import { skandale, drehtuer, korrelationen, karenzregeln } from '../data/korruption';
import Icon from './Icon';

const tabs = [
    { id: 'korrelationen', label: 'Lobby × Politik', icon: Eye },
    { id: 'skandale', label: 'Dokumentierte Fälle', icon: AlertTriangle },
    { id: 'drehtuer', label: 'Drehtür', icon: RotateCcw },
    { id: 'karenz', label: 'Karenzzeit', icon: Clock },
];

const schwereColors = {
    'kritisch': 'text-red-600 bg-red-600/10 border-red-600/20',
    'hoch': 'text-[var(--color-red)] bg-[var(--color-red)]/10 border-[var(--color-red)]/20',
    'mittel': 'text-[var(--color-amber)] bg-[var(--color-amber)]/10 border-[var(--color-amber)]/20',
};

const KorruptionsTracker = () => {
    const [activeTab, setActiveTab] = useState('korrelationen');
    const [expanded, setExpanded] = useState(null);

    return (
        <section id="korruption" className="w-full py-20 md:py-24 px-4 md:px-6">
            <div className="container-main max-w-4xl">
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-red-500/8 border border-red-500/10 flex items-center justify-center text-[var(--color-red)]">
                            <Eye size={16} strokeWidth={1.5} />
                        </div>
                        <span className="text-xs font-medium text-[var(--color-text-3)] uppercase tracking-widest">Aufgedeckt</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gradient-heading mb-2">
                        Lobby, Geld und Macht — die Verbindungen
                    </h2>
                    <p className="text-[var(--color-text-2)] text-sm max-w-lg">
                        Keine Anschuldigungen — nur öffentliche Daten nebeneinandergelegt. Alle Quellen sind verlinkt. Du entscheidest, ob das Zufall ist.
                    </p>
                </motion.div>

                {/* Tabs */}
                <div className="flex gap-1 p-1 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] mb-8 overflow-x-auto no-scrollbar">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => { setActiveTab(tab.id); setExpanded(null); }}
                            className={`flex items-center gap-1.5 px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-colors whitespace-nowrap ${
                                activeTab === tab.id
                                    ? 'bg-[var(--color-red)]/10 text-[var(--color-red)]'
                                    : 'text-[var(--color-text-3)] hover:text-[var(--color-text-2)]'
                            }`}
                        >
                            <tab.icon size={13} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {/* ── Korrelationen ── */}
                    {activeTab === 'korrelationen' && (
                        <motion.div key="korrelationen" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                            <div className="space-y-3">
                                {korrelationen.map((k, i) => (
                                    <motion.div
                                        key={k.id}
                                        initial={{ opacity: 0, y: 12 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.06 }}
                                        className="card overflow-hidden"
                                    >
                                        <button
                                            onClick={() => setExpanded(expanded === k.id ? null : k.id)}
                                            className="w-full p-4 md:p-5 flex items-start gap-3 text-left hover:bg-[var(--color-surface)] transition-colors"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-[var(--color-red)]/8 flex items-center justify-center text-[var(--color-red)] shrink-0 mt-0.5">
                                                <DollarSign size={14} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-sm font-semibold text-[var(--color-text)]">{k.titel}</h3>
                                                <p className="text-[11px] text-[var(--color-text-3)] mt-0.5">{k.lobby.name} · {k.lobby.ausgaben}</p>
                                            </div>
                                            <ChevronDown size={14} className={`text-[var(--color-text-3)] transition-transform shrink-0 mt-1 ${expanded === k.id ? 'rotate-180' : ''}`} />
                                        </button>

                                        <AnimatePresence>
                                            {expanded === k.id && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="px-4 md:px-5 pb-5 space-y-3">
                                                        {/* Flow: Lobby → Spenden → Abstimmung → Ergebnis */}
                                                        <div className="space-y-2">
                                                            <div className="flex items-start gap-2 p-3 rounded-xl bg-[var(--color-purple)]/5 border border-[var(--color-purple)]/10">
                                                                <span className="text-[10px] font-bold text-[var(--color-purple)] uppercase tracking-wider mt-0.5 shrink-0 w-16">Lobby</span>
                                                                <span className="text-[12px] text-[var(--color-text)]">{k.lobby.name}: {k.lobby.ausgaben}, {k.lobby.lobbyisten} Lobbyist:innen</span>
                                                            </div>
                                                            <div className="flex items-center justify-center text-[var(--color-text-3)]"><ArrowRight size={12} /></div>
                                                            <div className="flex items-start gap-2 p-3 rounded-xl bg-[var(--color-amber)]/5 border border-[var(--color-amber)]/10">
                                                                <span className="text-[10px] font-bold text-[var(--color-amber)] uppercase tracking-wider mt-0.5 shrink-0 w-16">Spenden</span>
                                                                <span className="text-[12px] text-[var(--color-text)]">{k.spenden}</span>
                                                            </div>
                                                            <div className="flex items-center justify-center text-[var(--color-text-3)]"><ArrowRight size={12} /></div>
                                                            <div className="flex items-start gap-2 p-3 rounded-xl bg-[var(--color-blue)]/5 border border-[var(--color-blue)]/10">
                                                                <span className="text-[10px] font-bold text-[var(--color-blue)] uppercase tracking-wider mt-0.5 shrink-0 w-16">Abstimmung</span>
                                                                <span className="text-[12px] text-[var(--color-text)]">{k.abstimmung}</span>
                                                            </div>
                                                            <div className="flex items-center justify-center text-[var(--color-text-3)]"><ArrowRight size={12} /></div>
                                                            <div className="flex items-start gap-2 p-3 rounded-xl bg-[var(--color-red)]/5 border border-[var(--color-red)]/10">
                                                                <span className="text-[10px] font-bold text-[var(--color-red)] uppercase tracking-wider mt-0.5 shrink-0 w-16">Ergebnis</span>
                                                                <span className="text-[12px] text-[var(--color-text)] font-medium">{k.ergebnis}</span>
                                                            </div>
                                                        </div>

                                                        <div className="p-3 rounded-xl bg-[var(--color-surface-2)] border border-[var(--color-border)]">
                                                            <p className="text-[13px] text-[var(--color-text)] font-medium italic">"{k.frage}"</p>
                                                        </div>

                                                        <div className="text-[10px] text-[var(--color-text-3)]">Quellen: {k.quelle}</div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* ── Skandale ── */}
                    {activeTab === 'skandale' && (
                        <motion.div key="skandale" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                            <div className="space-y-3">
                                {skandale.map((s, i) => (
                                    <motion.div
                                        key={s.id}
                                        initial={{ opacity: 0, y: 12 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.06 }}
                                        className="card overflow-hidden"
                                    >
                                        <button
                                            onClick={() => setExpanded(expanded === s.id ? null : s.id)}
                                            className="w-full p-4 md:p-5 flex items-start justify-between gap-3 text-left hover:bg-[var(--color-surface)] transition-colors"
                                        >
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                    <h3 className="text-sm font-semibold text-[var(--color-text)]">{s.titel}</h3>
                                                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-semibold border ${schwereColors[s.schwere]}`}>{s.schwere}</span>
                                                </div>
                                                <p className="text-[11px] text-[var(--color-text-3)]">{s.jahr} · {s.kategorie} · {s.betrag}</p>
                                            </div>
                                            <ChevronDown size={14} className={`text-[var(--color-text-3)] transition-transform shrink-0 mt-1 ${expanded === s.id ? 'rotate-180' : ''}`} />
                                        </button>

                                        <AnimatePresence>
                                            {expanded === s.id && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="px-4 md:px-5 pb-5 space-y-3">
                                                        <p className="text-[13px] text-[var(--color-text-2)] leading-relaxed">{s.wasPassierte}</p>

                                                        <div className="text-[10px] font-semibold text-[var(--color-text-3)] uppercase tracking-wider">Beteiligte</div>
                                                        <div className="space-y-1.5">
                                                            {s.personen.map((p, pi) => (
                                                                <div key={pi} className="flex items-center gap-2 p-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]">
                                                                    <span className="text-[12px] font-medium text-[var(--color-text)]">{p.name}</span>
                                                                    <span className="text-[10px] text-[var(--color-text-3)]">({p.partei}, {p.rolle})</span>
                                                                    <span className="text-[10px] text-[var(--color-text-3)] ml-auto">→ {p.konsequenz}</span>
                                                                </div>
                                                            ))}
                                                        </div>

                                                        <div className="p-3 rounded-xl bg-[var(--color-surface-2)] border border-[var(--color-border)]">
                                                            <div className="text-[10px] font-semibold text-[var(--color-text-3)] uppercase tracking-wider mb-1">Konsequenzen</div>
                                                            <p className="text-[12px] text-[var(--color-text-2)]">{s.konsequenzen}</p>
                                                        </div>

                                                        <a href={s.quelleUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[11px] text-[var(--color-blue)] hover:underline">
                                                            {s.quelle} <ExternalLink size={9} />
                                                        </a>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* ── Drehtür ── */}
                    {activeTab === 'drehtuer' && (
                        <motion.div key="drehtuer" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                            <div className="space-y-3">
                                {drehtuer.map((d, i) => (
                                    <motion.div
                                        key={d.name}
                                        initial={{ opacity: 0, y: 12 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.06 }}
                                        className="card p-4 md:p-5"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                                                d.wechselNachMonaten <= 3 ? 'bg-red-600/10 text-red-600 border border-red-600/20' :
                                                d.wechselNachMonaten <= 12 ? 'bg-[var(--color-red)]/10 text-[var(--color-red)] border border-[var(--color-red)]/20' :
                                                'bg-[var(--color-amber)]/10 text-[var(--color-amber)] border border-[var(--color-amber)]/20'
                                            }`}>
                                                {d.wechselNachMonaten}M
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                                                    <span className="text-sm font-semibold text-[var(--color-text)]">{d.name}</span>
                                                    <span className="text-[10px] text-[var(--color-text-3)]">({d.partei})</span>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-[11px] text-[var(--color-text-3)] mb-2">
                                                    <span>{d.politischesAmt}</span>
                                                    <ArrowRight size={10} />
                                                    <span className="font-medium text-[var(--color-text-2)]">{d.neuerJob}</span>
                                                </div>
                                                <p className="text-[12px] text-[var(--color-text-2)] leading-relaxed">{d.grund}</p>
                                                <div className="text-[10px] text-[var(--color-text-3)] mt-2">Quelle: {d.quelle}</div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Durchschnitt */}
                            <div className="mt-6 p-4 rounded-xl bg-[var(--color-red)]/5 border border-[var(--color-red)]/10 text-center">
                                <div className="text-xs text-[var(--color-text-3)] mb-1">Durchschnittliche Wartezeit vor Wechsel</div>
                                <div className="text-2xl font-bold font-mono text-[var(--color-red)]">
                                    {Math.round(drehtuer.reduce((s, d) => s + d.wechselNachMonaten, 0) / drehtuer.length)} Monate
                                </div>
                                <div className="text-[11px] text-[var(--color-text-3)] mt-1">Empfohlen: mindestens 36 Monate (3 Jahre)</div>
                            </div>
                        </motion.div>
                    )}

                    {/* ── Karenzzeit ── */}
                    {activeTab === 'karenz' && (
                        <motion.div key="karenz" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                            <div className="card p-5 md:p-6 mb-6">
                                <h3 className="text-sm font-bold text-[var(--color-text)] mb-3">Aktuelle Regelung in Deutschland</h3>
                                <p className="text-[13px] text-[var(--color-text-2)] mb-4">{karenzregeln.aktuell}</p>

                                <div className="text-[10px] font-semibold text-[var(--color-red)] uppercase tracking-wider mb-2">Probleme</div>
                                <div className="space-y-1.5 mb-6">
                                    {karenzregeln.probleme.map((p, i) => (
                                        <div key={i} className="flex items-start gap-2 text-[12px] text-[var(--color-text-2)]">
                                            <AlertTriangle size={11} className="text-[var(--color-red)] mt-0.5 shrink-0" />
                                            <span>{p}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="text-[10px] font-semibold text-[var(--color-green)] uppercase tracking-wider mb-2">Forderungen & internationale Vorbilder</div>
                                <div className="space-y-2">
                                    {karenzregeln.forderungen.map((f, i) => (
                                        <div key={i} className="flex items-start gap-2 p-3 rounded-xl bg-[var(--color-green)]/5 border border-[var(--color-green)]/10">
                                            <Icon name="Check" size={12} className="text-[var(--color-green)] mt-0.5 shrink-0" />
                                            <div>
                                                <div className="text-[12px] text-[var(--color-text)] font-medium">{f.text}</div>
                                                <div className="text-[10px] text-[var(--color-text-3)]">Vorbild: {f.vorbild}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default KorruptionsTracker;
