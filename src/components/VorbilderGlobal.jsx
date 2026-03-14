import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ThumbsUp, ChevronDown, Plus, Send, ArrowRight, ExternalLink } from 'lucide-react';
import { vorbilderByThema, seedVorschlaege } from '../data/vorbilder';
import Icon from './Icon';

const themenLabels = {
    rente: { label: 'Rente', icon: 'Clock', color: 'var(--color-orange)' },
    bildung: { label: 'Bildung', icon: 'GraduationCap', color: 'var(--color-purple)' },
    klima: { label: 'Klima', icon: 'Leaf', color: 'var(--color-green)' },
    gesundheit: { label: 'Gesundheit', icon: 'Heart', color: 'var(--color-green)' },
    wohnen: { label: 'Wohnen', icon: 'Building', color: 'var(--color-cyan)' },
};

const VorbilderGlobal = () => {
    const [activeThema, setActiveThema] = useState('rente');
    const [expandedVorbild, setExpandedVorbild] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ titel: '', beschreibung: '', vorbild: '' });

    // Vorschläge: seed + localStorage
    const [vorschlaege, setVorschlaege] = useState(() => {
        const stored = localStorage.getItem('pmm-vorschlaege');
        return stored ? JSON.parse(stored) : seedVorschlaege;
    });
    const [voted, setVoted] = useState(() => {
        const stored = localStorage.getItem('pmm-voted-vorschlaege');
        return stored ? JSON.parse(stored) : [];
    });

    const handleVote = (id) => {
        if (voted.includes(id)) return;
        const next = vorschlaege.map(v => v.id === id ? { ...v, votes: v.votes + 1 } : v);
        setVorschlaege(next);
        localStorage.setItem('pmm-vorschlaege', JSON.stringify(next));
        const nextVoted = [...voted, id];
        setVoted(nextVoted);
        localStorage.setItem('pmm-voted-vorschlaege', JSON.stringify(nextVoted));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.titel.trim()) return;
        const newV = {
            id: 'v' + Date.now(),
            themaId: activeThema,
            titel: formData.titel,
            beschreibung: formData.beschreibung,
            vorbild: formData.vorbild || 'Eigene Idee',
            votes: 1,
            datum: new Date().toISOString().split('T')[0],
        };
        const next = [newV, ...vorschlaege];
        setVorschlaege(next);
        localStorage.setItem('pmm-vorschlaege', JSON.stringify(next));
        setVoted([...voted, newV.id]);
        localStorage.setItem('pmm-voted-vorschlaege', JSON.stringify([...voted, newV.id]));
        setFormData({ titel: '', beschreibung: '', vorbild: '' });
        setShowForm(false);
    };

    const vorbilder = vorbilderByThema[activeThema] || [];
    const themaVorschlaege = vorschlaege
        .filter(v => v.themaId === activeThema)
        .sort((a, b) => b.votes - a.votes);

    return (
        <section id="vorbilder" className="w-full py-24 px-6">
            <div className="container-main max-w-4xl">
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-[var(--color-surface-2)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-cyan)]">
                            <Globe size={16} strokeWidth={1.5} />
                        </div>
                        <span className="text-xs font-medium text-[var(--color-text-3)] uppercase tracking-widest">Globale Vorbilder</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gradient-heading mb-2">
                        Andere Länder können das besser — was lernen wir?
                    </h2>
                    <p className="text-[var(--color-text-2)] text-sm max-w-lg">
                        Für jedes Problem gibt es ein Land, das eine Lösung gefunden hat. Hier sind die besten — mit konkreten Zahlen und Vorschlägen.
                    </p>
                </motion.div>

                {/* Thema-Tabs */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {Object.entries(themenLabels).map(([id, meta]) => (
                        <button
                            key={id}
                            onClick={() => { setActiveThema(id); setExpandedVorbild(null); }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                                activeThema === id
                                    ? 'border-[var(--color-blue)] bg-[var(--color-blue)]/8 text-[var(--color-text)]'
                                    : 'border-[var(--color-border)] text-[var(--color-text-3)] hover:text-[var(--color-text-2)] hover:border-[var(--color-border-hover)]'
                            }`}
                        >
                            <Icon name={meta.icon} size={14} />
                            {meta.label}
                        </button>
                    ))}
                </div>

                {/* Vorbilder-Karten */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeThema}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                    >
                        <div className="space-y-3 mb-10">
                            {vorbilder.map((vb, i) => {
                                const isOpen = expandedVorbild === i;
                                return (
                                    <motion.div
                                        key={vb.land}
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.06 }}
                                        className="card overflow-hidden"
                                    >
                                        <button
                                            onClick={() => setExpandedVorbild(isOpen ? null : i)}
                                            className="w-full p-5 flex items-center gap-4 text-left hover:bg-[var(--color-surface)] transition-colors"
                                        >
                                            <span className="text-2xl">{vb.flagge}</span>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-sm font-semibold text-[var(--color-text)]">{vb.land}</div>
                                                <div className="text-[12px] text-[var(--color-text-2)]">{vb.kernidee}</div>
                                            </div>
                                            <div className="flex items-center gap-2 shrink-0">
                                                <div className="px-2 py-1 rounded-lg bg-[var(--color-green)]/10 text-[var(--color-green)] text-xs font-bold font-mono">
                                                    {vb.score}/100
                                                </div>
                                                <ChevronDown size={14} className={`text-[var(--color-text-3)] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                                            </div>
                                        </button>

                                        <AnimatePresence>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="px-5 pb-5 space-y-4">
                                                        <p className="text-[13px] text-[var(--color-text-2)] leading-relaxed">{vb.details}</p>

                                                        {/* Key numbers */}
                                                        <div className="flex flex-wrap gap-2">
                                                            {Object.entries(vb.zahlen).map(([key, val]) => (
                                                                <div key={key} className="px-3 py-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]">
                                                                    <div className="text-[9px] text-[var(--color-text-3)] uppercase tracking-wider">{key.replace(/([A-Z])/g, ' $1')}</div>
                                                                    <div className="text-sm font-bold font-mono text-[var(--color-text)]">{val}</div>
                                                                </div>
                                                            ))}
                                                        </div>

                                                        {/* What to adopt */}
                                                        <div className="p-3 rounded-xl bg-[var(--color-blue)]/5 border border-[var(--color-blue)]/15">
                                                            <div className="flex items-center gap-1.5 mb-1.5">
                                                                <ArrowRight size={12} className="text-[var(--color-blue)]" />
                                                                <span className="text-[11px] font-semibold text-[var(--color-blue)] uppercase tracking-wider">Was wir übernehmen können</span>
                                                            </div>
                                                            <p className="text-[13px] text-[var(--color-text)] leading-relaxed">{vb.uebernehmen}</p>
                                                        </div>

                                                        <div className="text-[10px] text-[var(--color-text-3)]">Quelle: {vb.quelle}</div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Bürger-Vorschläge */}
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-bold text-[var(--color-text)] flex items-center gap-2">
                                    <ThumbsUp size={14} className="text-[var(--color-purple)]" />
                                    Bürger-Vorschläge — {themenLabels[activeThema]?.label}
                                </h3>
                                <button
                                    onClick={() => setShowForm(!showForm)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[var(--color-blue)] border border-[var(--color-border)] hover:bg-[var(--color-surface)] transition-colors"
                                >
                                    <Plus size={12} />
                                    Vorschlag machen
                                </button>
                            </div>

                            {/* Submit form */}
                            <AnimatePresence>
                                {showForm && (
                                    <motion.form
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        onSubmit={handleSubmit}
                                        className="overflow-hidden mb-4"
                                    >
                                        <div className="card p-5 space-y-3">
                                            <input
                                                type="text"
                                                value={formData.titel}
                                                onChange={e => setFormData(f => ({ ...f, titel: e.target.value }))}
                                                placeholder="Dein Vorschlag in einem Satz..."
                                                className="w-full px-3 py-2.5 rounded-lg text-sm bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-text-3)] focus:border-[var(--color-blue)] focus:outline-none"
                                                required
                                            />
                                            <textarea
                                                value={formData.beschreibung}
                                                onChange={e => setFormData(f => ({ ...f, beschreibung: e.target.value }))}
                                                placeholder="Erkläre kurz, warum das funktionieren würde..."
                                                rows={2}
                                                className="w-full px-3 py-2.5 rounded-lg text-sm bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-text-3)] focus:border-[var(--color-blue)] focus:outline-none resize-none"
                                            />
                                            <input
                                                type="text"
                                                value={formData.vorbild}
                                                onChange={e => setFormData(f => ({ ...f, vorbild: e.target.value }))}
                                                placeholder="Welches Land macht das schon? (optional)"
                                                className="w-full px-3 py-2.5 rounded-lg text-sm bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-text-3)] focus:border-[var(--color-blue)] focus:outline-none"
                                            />
                                            <button
                                                type="submit"
                                                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
                                                style={{ background: 'linear-gradient(135deg, var(--color-blue), var(--color-purple))' }}
                                            >
                                                <Send size={13} /> Vorschlag einreichen
                                            </button>
                                        </div>
                                    </motion.form>
                                )}
                            </AnimatePresence>

                            {/* Vorschlag-Liste */}
                            <div className="space-y-2">
                                {themaVorschlaege.map((v, i) => (
                                    <motion.div
                                        key={v.id}
                                        initial={{ opacity: 0, y: 8 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.04 }}
                                        className="card p-4 flex items-start gap-3"
                                    >
                                        <button
                                            onClick={() => handleVote(v.id)}
                                            disabled={voted.includes(v.id)}
                                            className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg border transition-all shrink-0 ${
                                                voted.includes(v.id)
                                                    ? 'border-[var(--color-green)]/20 bg-[var(--color-green)]/5 text-[var(--color-green)]'
                                                    : 'border-[var(--color-border)] text-[var(--color-text-3)] hover:border-[var(--color-green)]/30 hover:text-[var(--color-green)]'
                                            }`}
                                        >
                                            <ThumbsUp size={14} />
                                            <span className="text-[11px] font-bold font-mono">{v.votes}</span>
                                        </button>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm font-medium text-[var(--color-text)] mb-0.5">{v.titel}</div>
                                            {v.beschreibung && <p className="text-[12px] text-[var(--color-text-2)] leading-relaxed mb-1">{v.beschreibung}</p>}
                                            <div className="flex items-center gap-2 text-[10px] text-[var(--color-text-3)]">
                                                <span>{v.vorbild}</span>
                                                <span>·</span>
                                                <span>{v.datum}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}

                                {themaVorschlaege.length === 0 && (
                                    <div className="text-center py-8 text-sm text-[var(--color-text-3)]">
                                        Noch keine Vorschläge für {themenLabels[activeThema]?.label}. Sei die/der Erste!
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};

export default VorbilderGlobal;
