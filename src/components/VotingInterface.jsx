import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './Icon';

// Real transparency demands based on Bundesrechnungshof recommendations and civil society proposals
const proposals = [
    {
        id: 1,
        title: 'Öffentliches Vertragsregister für Bundesaufträge',
        description: 'Alle Verträge über €25.000 sollen in einem öffentlichen Register einsehbar sein — wie in der Slowakei seit 2011.',
        votes: 4280,
        category: 'Transparenz',
        source: 'Transparency International DE',
    },
    {
        id: 2,
        title: 'Echtzeit-Haushaltsdaten als Open Data',
        description: 'Der Bundeshaushalt soll in maschinenlesbarem Format (CSV/JSON) und in Echtzeit veröffentlicht werden — nicht nur als PDF.',
        votes: 3156,
        category: 'Open Data',
        source: 'Open Knowledge Foundation',
    },
    {
        id: 3,
        title: 'Kostenüberschreitungen ab 20% automatisch prüfen',
        description: 'Großprojekte mit >20% Kostenüberschreitung sollen automatisch vom Bundesrechnungshof geprüft und öffentlich berichtet werden.',
        votes: 5892,
        category: 'Kontrolle',
        source: 'Bund der Steuerzahler',
    },
    {
        id: 4,
        title: 'Lobbyregister mit Fußabdruck',
        description: 'Zu jedem Gesetz soll dokumentiert werden, welche Lobbyorganisationen Einfluss genommen haben — inklusive Änderungsvorschläge.',
        votes: 2734,
        category: 'Integrität',
        source: 'abgeordnetenwatch.de',
    },
];

const VotingInterface = ({ userTier, onDonate }) => {
    const [votedId, setVotedId] = useState(() => {
        const stored = localStorage.getItem('pmm-voted');
        return stored ? Number(stored) : null;
    });
    const [localVotes, setLocalVotes] = useState(() => {
        const stored = localStorage.getItem('pmm-votes');
        return stored ? JSON.parse(stored) : {};
    });

    const handleVote = (id) => {
        setVotedId(id);
        localStorage.setItem('pmm-voted', String(id));
        setLocalVotes(prev => {
            const next = { ...prev, [id]: (prev[id] || 0) + 1 };
            localStorage.setItem('pmm-votes', JSON.stringify(next));
            return next;
        });
    };

    const getVotes = (prop) => prop.votes + (localVotes[prop.id] || 0);
    const totalVotes = proposals.reduce((sum, p) => sum + getVotes(p), 0);

    return (
        <section className="w-full py-24 px-6 relative overflow-hidden">
            {/* Grid bg */}
            <div className="absolute inset-0" style={{
                opacity: 'var(--pattern-opacity)',
                backgroundImage: 'linear-gradient(var(--dot-color) 1px, transparent 1px), linear-gradient(90deg, var(--dot-color) 1px, transparent 1px)',
                backgroundSize: '48px 48px'
            }} />

            <div className="container-main relative z-10">
                <motion.div
                    className="mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-[var(--color-surface-2)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-green)]">
                            <Icon name="Activity" size={16} />
                        </div>
                        <span className="text-xs font-medium text-[var(--color-text-3)] uppercase tracking-widest">Bürgersignal</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gradient-heading mb-2">
                        Welche Transparenz-Reform ist dir am wichtigsten?
                    </h2>
                    <p className="text-[var(--color-text-2)] text-sm max-w-lg">
                        Reale Forderungen von Transparency International, Open Knowledge Foundation und dem Bund der Steuerzahler.
                        Deine Stimme zeigt, was Bürger:innen Priorität geben.
                    </p>
                </motion.div>

                <div className="space-y-3 max-w-3xl">
                    {proposals
                        .map(p => ({ ...p, totalVotes: getVotes(p) }))
                        .sort((a, b) => b.totalVotes - a.totalVotes)
                        .map((prop, i) => {
                            const votes = prop.totalVotes;
                            const pct = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
                            return (
                                <motion.div
                                    key={prop.id}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.06 }}
                                    className={`card p-5 ${votedId === prop.id ? '!border-[var(--color-green)]/30' : ''}`}
                                >
                                    <div className="flex justify-between items-start mb-2 gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="px-2 py-0.5 rounded-md text-[10px] font-medium text-[var(--color-text-3)] bg-[var(--color-surface-2)] border border-[var(--color-border)]">
                                                    {prop.category}
                                                </span>
                                                <span className="text-[10px] text-[var(--color-text-3)]">via {prop.source}</span>
                                            </div>
                                            <h3 className="text-[15px] font-semibold text-[var(--color-text)]">{prop.title}</h3>
                                        </div>
                                        <button
                                            onClick={() => handleVote(prop.id)}
                                            disabled={votedId !== null}
                                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all shrink-0 ${
                                                votedId === prop.id
                                                    ? 'bg-[var(--color-green)] text-black'
                                                    : votedId !== null
                                                    ? 'bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[var(--color-text-3)] cursor-not-allowed'
                                                    : 'bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-surface-3)] hover:border-[var(--color-border-hover)]'
                                            }`}
                                        >
                                            {votedId === prop.id
                                                ? <span className="flex items-center gap-1.5"><Icon name="Check" size={14} /> Gewählt</span>
                                                : 'Stimme geben'
                                            }
                                        </button>
                                    </div>
                                    <p className="text-[13px] text-[var(--color-text-2)] leading-relaxed mb-3">{prop.description}</p>
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1 max-w-[240px]">
                                            <div className="h-1.5 rounded-full bg-[var(--color-surface-3)] overflow-hidden">
                                                <motion.div
                                                    className="h-full rounded-full"
                                                    style={{ background: 'linear-gradient(90deg, var(--color-blue), var(--color-purple))' }}
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${pct}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.8, delay: i * 0.1 }}
                                                />
                                            </div>
                                        </div>
                                        <span className="text-xs text-[var(--color-text-3)] font-mono tabular-nums">
                                            {votes.toLocaleString('de-DE')} Stimmen ({pct}%)
                                        </span>
                                    </div>
                                </motion.div>
                            );
                        })}
                </div>

                {votedId && (
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center text-sm text-[var(--color-text-3)] mt-8 max-w-md mx-auto"
                    >
                        Deine Stimme wird lokal gespeichert. Dieses Feature ist ein Stimmungsbild —
                        für echte politische Wirkung nutze die <a href="#mitmachen" className="text-[var(--color-blue)] hover:underline">Civic Action Links</a> unten.
                    </motion.p>
                )}
            </div>
        </section>
    );
};

export default VotingInterface;
