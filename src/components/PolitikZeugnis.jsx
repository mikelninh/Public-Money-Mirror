import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ChevronDown, Share2, Check, ThumbsUp, ThumbsDown } from 'lucide-react';
import { zeugnisData, noteColors, statusLabels, methodik } from '../data/zeugnis';
import Icon from './Icon';

const NoteDisplay = ({ note, size = 'normal' }) => {
    const style = noteColors[note] || noteColors[4];
    const sizeClass = size === 'large' ? 'w-12 h-12 text-xl' : 'w-7 h-7 text-sm';
    return (
        <div className={`${sizeClass} rounded-lg ${style.bg} ${style.text} border ${style.border} flex items-center justify-center font-bold font-mono shrink-0`}>
            {note}
        </div>
    );
};

const PolitikZeugnis = () => {
    const [expandedSubject, setExpandedSubject] = useState(null);
    const [shared, setShared] = useState(false);
    const [buergerNoten, setBuergerNoten] = useState(() => {
        const stored = localStorage.getItem('pmm-buergernoten');
        return stored ? JSON.parse(stored) : {};
    });
    const [voteCounts, setVoteCounts] = useState(() => {
        const stored = localStorage.getItem('pmm-vote-counts');
        return stored ? JSON.parse(stored) : {};
    });

    // Calculate overall average
    const allNotes = zeugnisData.subjects.map(s => s.averageNote);
    const overallAvg = (allNotes.reduce((a, b) => a + b, 0) / allNotes.length);
    const overallNote = Math.round(overallAvg);

    const handleBuergerNote = (subjectId, note) => {
        const next = { ...buergerNoten, [subjectId]: note };
        setBuergerNoten(next);
        localStorage.setItem('pmm-buergernoten', JSON.stringify(next));

        // Simulate vote counts
        const counts = { ...voteCounts };
        if (!counts[subjectId]) counts[subjectId] = { total: Math.floor(Math.random() * 500) + 200, sum: 0 };
        counts[subjectId].total += 1;
        counts[subjectId].sum += note;
        setVoteCounts(counts);
        localStorage.setItem('pmm-vote-counts', JSON.stringify(counts));
    };

    const getBuergerAvg = (subjectId) => {
        const c = voteCounts[subjectId];
        if (!c || c.total === 0) return null;
        // Include the user's vote in the average with simulated base
        const baseAvg = zeugnisData.subjects.find(s => s.id === subjectId)?.averageNote || 3;
        const simulatedSum = baseAvg * (c.total - 1) + (buergerNoten[subjectId] || baseAvg);
        return (simulatedSum / c.total).toFixed(1);
    };

    const shareZeugnis = () => {
        const lines = zeugnisData.subjects.map(s => `${s.name}: ${s.averageNote.toFixed(1)}`).join('\n');
        const text = `Zeugnis der ${zeugnisData.government} (${zeugnisData.period}):\n\n${lines}\n\nGesamtnote: ${overallAvg.toFixed(1)}\n\n→ publicmoneymirror.de`;

        if (navigator.share) {
            navigator.share({ title: 'Politik-Zeugnis', text });
        } else {
            navigator.clipboard.writeText(text);
            setShared(true);
            setTimeout(() => setShared(false), 2000);
        }
    };

    return (
        <section id="zeugnis" className="w-full py-24 px-6">
            <div className="container-main max-w-4xl">
                {/* Header */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-[var(--color-surface-2)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-red)]">
                            <FileText size={16} strokeWidth={1.5} />
                        </div>
                        <span className="text-xs font-medium text-[var(--color-text-3)] uppercase tracking-widest">Versprechen-Check</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gradient-heading mb-2">
                        Zeugnis: {zeugnisData.government}
                    </h2>
                    <p className="text-[var(--color-text-2)] text-sm max-w-lg">
                        Was wurde versprochen? Was wurde geliefert? {zeugnisData.period} — bewertet anhand des Koalitionsvertrags.
                    </p>
                </motion.div>

                {/* Zeugnis Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="card overflow-hidden mb-6"
                >
                    {/* Zeugnis header - looks like a real report card */}
                    <div className="px-6 py-5 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="text-[10px] font-semibold text-[var(--color-text-3)] uppercase tracking-[0.2em] mb-1">Bundesrepublik Deutschland</div>
                                <h3 className="text-lg font-bold text-[var(--color-text)]">Zeugnis der Regierungsarbeit</h3>
                                <div className="flex items-center gap-3 mt-1.5">
                                    <span className="text-sm text-[var(--color-text-2)]">{zeugnisData.government}</span>
                                    <span className="text-xs text-[var(--color-text-3)]">{zeugnisData.period}</span>
                                    <div className="flex gap-1">
                                        {zeugnisData.parties.map(p => (
                                            <span key={p} className="px-1.5 py-0.5 rounded text-[9px] font-medium text-[var(--color-text-3)] bg-[var(--color-surface-2)] border border-[var(--color-border)]">{p}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-[9px] text-[var(--color-text-3)] uppercase tracking-wider mb-1">Gesamt</div>
                                <NoteDisplay note={overallNote} size="large" />
                                <div className="text-[10px] text-[var(--color-text-3)] mt-1 font-mono">{overallAvg.toFixed(1)}</div>
                            </div>
                        </div>
                    </div>

                    {/* Subjects */}
                    <div className="divide-y divide-[var(--color-border)]">
                        {zeugnisData.subjects.map((subject, si) => {
                            const isOpen = expandedSubject === subject.id;
                            const buergerAvg = getBuergerAvg(subject.id);
                            const userNote = buergerNoten[subject.id];

                            return (
                                <div key={subject.id}>
                                    {/* Subject row */}
                                    <button
                                        onClick={() => setExpandedSubject(isOpen ? null : subject.id)}
                                        className="w-full px-6 py-4 flex items-center gap-4 hover:bg-[var(--color-surface)] transition-colors text-left"
                                    >
                                        <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: subject.color + '15', color: subject.color }}>
                                            <Icon name={subject.icon} size={14} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm font-semibold text-[var(--color-text)]">{subject.name}</div>
                                            <div className="text-[10px] text-[var(--color-text-3)]">
                                                {subject.promises.length} Versprechen geprüft
                                                {buergerAvg && <span className="ml-2">· Bürger-Schnitt: {buergerAvg}</span>}
                                            </div>
                                        </div>
                                        <NoteDisplay note={Math.round(subject.averageNote)} />
                                        <ChevronDown size={14} className={`text-[var(--color-text-3)] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {/* Expanded: individual promises */}
                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.25 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="px-6 pb-5 space-y-2">
                                                    {subject.promises.map((promise, pi) => {
                                                        const statusStyle = statusLabels[promise.status] || { color: 'text-[var(--color-text-3)]', bg: 'bg-[var(--color-surface-2)]' };
                                                        return (
                                                            <motion.div
                                                                key={pi}
                                                                initial={{ opacity: 0, x: -8 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: pi * 0.05 }}
                                                                className="flex items-start gap-3 p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]"
                                                            >
                                                                <NoteDisplay note={promise.note} />
                                                                <div className="flex-1 min-w-0">
                                                                    <div className="flex items-center gap-2 mb-1">
                                                                        <span className="text-sm font-medium text-[var(--color-text)]">{promise.text}</span>
                                                                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-semibold ${statusStyle.color} ${statusStyle.bg} whitespace-nowrap`}>
                                                                            {promise.status}
                                                                        </span>
                                                                    </div>
                                                                    <p className="text-[12px] text-[var(--color-text-2)] leading-relaxed">{promise.detail}</p>
                                                                </div>
                                                            </motion.div>
                                                        );
                                                    })}

                                                    {/* Bürger-Note */}
                                                    <div className="mt-3 p-3 rounded-xl bg-[var(--color-surface-2)] border border-[var(--color-border)]">
                                                        <div className="text-[10px] font-semibold text-[var(--color-text-3)] uppercase tracking-wider mb-2">
                                                            Deine Note für {subject.name}
                                                        </div>
                                                        <div className="flex items-center gap-1.5">
                                                            {[1, 2, 3, 4, 5, 6].map(n => {
                                                                const style = noteColors[n];
                                                                return (
                                                                    <button
                                                                        key={n}
                                                                        onClick={() => handleBuergerNote(subject.id, n)}
                                                                        className={`w-9 h-9 rounded-lg text-sm font-bold font-mono border transition-all ${
                                                                            userNote === n
                                                                                ? `${style.bg} ${style.text} ${style.border} ring-2 ring-offset-1 ring-offset-[var(--color-bg)]`
                                                                                : 'border-[var(--color-border)] text-[var(--color-text-3)] hover:bg-[var(--color-surface)] hover:border-[var(--color-border-hover)]'
                                                                        }`}
                                                                        style={userNote === n ? { ringColor: style.text } : {}}
                                                                    >
                                                                        {n}
                                                                    </button>
                                                                );
                                                            })}
                                                            {userNote && (
                                                                <span className="ml-2 text-[11px] text-[var(--color-text-3)]">
                                                                    {noteColors[userNote].label}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>

                    {/* Zeugnis footer */}
                    <div className="px-6 py-4 border-t border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div className="text-[10px] text-[var(--color-text-3)]">
                            Quelle: {zeugnisData.source}
                        </div>
                        <button
                            onClick={shareZeugnis}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white"
                            style={{ background: shared ? 'var(--color-green)' : 'linear-gradient(135deg, var(--color-blue), var(--color-purple))' }}
                        >
                            {shared ? <><Check size={12} /> Kopiert!</> : <><Share2 size={12} /> Zeugnis teilen</>}
                        </button>
                    </div>
                </motion.div>

                {/* Context */}
                <div className="text-center text-xs text-[var(--color-text-3)] max-w-lg mx-auto leading-relaxed mb-12">
                    {zeugnisData.overview}
                </div>

                {/* Methodik — transparent */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="card overflow-hidden mb-6"
                >
                    <button
                        onClick={() => setExpandedSubject(expandedSubject === 'methodik' ? null : 'methodik')}
                        className="w-full px-6 py-4 flex items-center justify-between hover:bg-[var(--color-surface)] transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <Icon name="Search" size={16} className="text-[var(--color-blue)]" />
                            <div className="text-left">
                                <div className="text-sm font-semibold text-[var(--color-text)]">{methodik.title}</div>
                                <div className="text-[10px] text-[var(--color-text-3)]">Unsere Methodik — offen für Kritik und Verbesserung</div>
                            </div>
                        </div>
                        <ChevronDown size={14} className={`text-[var(--color-text-3)] transition-transform ${expandedSubject === 'methodik' ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                        {expandedSubject === 'methodik' && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="overflow-hidden"
                            >
                                <div className="px-6 pb-6">
                                    {/* Steps */}
                                    <div className="space-y-3 mb-6">
                                        {methodik.steps.map((step, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -8 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.06 }}
                                                className="flex items-start gap-3"
                                            >
                                                <div className="w-6 h-6 rounded-full bg-[var(--color-blue)]/10 border border-[var(--color-blue)]/20 flex items-center justify-center text-[10px] font-bold text-[var(--color-blue)] shrink-0 mt-0.5">
                                                    {step.step}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-[var(--color-text)] mb-0.5">{step.title}</div>
                                                    <div className="text-[12px] text-[var(--color-text-2)] leading-relaxed mb-1">{step.description}</div>
                                                    <div className="text-[10px] text-[var(--color-text-3)]">Quelle: {step.source}</div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Fairness statement */}
                                    <div className="p-3 rounded-xl bg-[var(--color-blue)]/5 border border-[var(--color-blue)]/15 text-[12px] text-[var(--color-text-2)] leading-relaxed mb-6">
                                        <span className="font-semibold text-[var(--color-blue)]">Fairness-Prinzip:</span> {methodik.fairness}
                                    </div>

                                    {/* How to improve */}
                                    <div>
                                        <h4 className="text-sm font-bold text-[var(--color-text)] mb-3 flex items-center gap-2">
                                            <Icon name="TrendingUp" size={14} className="text-[var(--color-green)]" />
                                            An die Politik: So verbessert ihr eure Note
                                        </h4>
                                        <div className="space-y-2">
                                            {methodik.howToImprove.map((item, i) => {
                                                const style = noteColors[item.note];
                                                return (
                                                    <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]">
                                                        <div className={`w-7 h-7 rounded-md ${style.bg} ${style.text} border ${style.border} flex items-center justify-center text-xs font-bold font-mono shrink-0`}>
                                                            {item.note}
                                                        </div>
                                                        <div className="flex items-center gap-2 text-[var(--color-text-3)]">
                                                            <span className="text-[12px]">→</span>
                                                        </div>
                                                        <span className="text-[12px] text-[var(--color-text-2)]">{item.advice}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default PolitikZeugnis;
