import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Megaphone, Copy, Check, ChevronDown, ExternalLink, Users, ArrowRight, Share2, Globe } from 'lucide-react';
import { kampagnen } from '../data/kampagnen';
import Icon from './Icon';

const Kampagnen = () => {
    const [expanded, setExpanded] = useState(null);
    const [copied, setCopied] = useState(null);
    const [joined, setJoined] = useState(() => {
        const stored = localStorage.getItem('pmm-kampagnen-joined');
        return stored ? JSON.parse(stored) : [];
    });
    const [counts, setCounts] = useState(() => {
        const stored = localStorage.getItem('pmm-kampagnen-counts');
        return stored ? JSON.parse(stored) : {};
    });

    const handleJoin = (id) => {
        if (joined.includes(id)) return;
        const next = [...joined, id];
        setJoined(next);
        localStorage.setItem('pmm-kampagnen-joined', JSON.stringify(next));
        const nextCounts = { ...counts, [id]: (counts[id] || 0) + 1 };
        setCounts(nextCounts);
        localStorage.setItem('pmm-kampagnen-counts', JSON.stringify(nextCounts));
    };

    const handleCopy = (id, text) => {
        navigator.clipboard.writeText(text);
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
        // Also auto-join when copying the letter
        if (!joined.includes(id)) handleJoin(id);
    };

    const handleShare = (kampagne) => {
        const text = `Ich unterstütze: "${kampagne.titel}"\n\n${kampagne.forderung}\n\n${getCount(kampagne)} Menschen sind dabei. Mach mit:\nhttps://mikelninh.github.io/Public-Money-Mirror/`;
        if (navigator.share) {
            navigator.share({ title: kampagne.titel, text });
        } else {
            navigator.clipboard.writeText(text);
            setCopied(kampagne.id + '-share');
            setTimeout(() => setCopied(null), 2000);
        }
    };

    const getCount = (k) => (k.teilnehmer + (counts[k.id] || 0)).toLocaleString('de-DE');

    return (
        <section id="kampagnen" className="w-full py-20 md:py-24 px-4 md:px-6">
            <div className="container-main max-w-4xl">
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-[var(--color-green)]/10 border border-[var(--color-green)]/15 flex items-center justify-center text-[var(--color-green)]">
                            <Megaphone size={16} strokeWidth={1.5} />
                        </div>
                        <span className="text-xs font-medium text-[var(--color-text-3)] uppercase tracking-widest">Gemeinsam handeln</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gradient-heading mb-2">
                        Deine Stimme zählt — aber zusammen sind wir lauter
                    </h2>
                    <p className="text-[var(--color-text-2)] text-sm max-w-lg">
                        Konkrete Forderungen mit internationalen Vorbildern. Brief kopieren, an den Ausschuss senden, Antworten tracken. Kein Like — echte Wirkung.
                    </p>
                </motion.div>

                <div className="space-y-4">
                    {kampagnen.map((k, i) => {
                        const isOpen = expanded === k.id;
                        const hasJoined = joined.includes(k.id);
                        const total = k.teilnehmer + (counts[k.id] || 0);
                        const antwortPct = Math.round((k.antworten.erhalten / (k.antworten.erhalten + k.antworten.ausstehend)) * 100);

                        return (
                            <motion.div
                                key={k.id}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="card overflow-hidden"
                            >
                                {/* Campaign header */}
                                <div className="p-4 md:p-5">
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: k.color + '15', color: k.color }}>
                                            <Icon name={k.icon} size={16} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-[10px] font-semibold uppercase tracking-wider mb-0.5" style={{ color: k.color }}>{k.thema}</div>
                                            <h3 className="text-sm md:text-base font-bold text-[var(--color-text)] leading-tight">{k.titel}</h3>
                                        </div>
                                    </div>

                                    <p className="text-[13px] text-[var(--color-text-2)] leading-relaxed mb-4">{k.problem}</p>

                                    {/* Vorbild */}
                                    <div className="flex items-center gap-2 mb-4 p-2.5 rounded-lg bg-[var(--color-green)]/5 border border-[var(--color-green)]/10">
                                        <Globe size={13} className="text-[var(--color-green)] shrink-0" />
                                        <span className="text-[12px] text-[var(--color-text-2)]">
                                            <strong className="text-[var(--color-text)]">{k.vorbild.land}</strong> — {k.vorbild.detail}
                                        </span>
                                    </div>

                                    {/* Forderung */}
                                    <div className="p-3 rounded-xl bg-[var(--color-surface-2)] border border-[var(--color-border)] mb-4">
                                        <div className="text-[10px] font-semibold text-[var(--color-blue)] uppercase tracking-wider mb-1">Unsere Forderung</div>
                                        <p className="text-[13px] text-[var(--color-text)] font-medium">{k.forderung}</p>
                                    </div>

                                    {/* Stats bar */}
                                    <div className="flex flex-wrap items-center gap-3 mb-4 text-[11px] text-[var(--color-text-3)]">
                                        <span className="flex items-center gap-1 font-medium text-[var(--color-text)]">
                                            <Users size={12} /> {getCount(k)} Unterstützer:innen
                                        </span>
                                        <span>Lobby dagegen: {k.lobby.dagegen}</span>
                                    </div>

                                    {/* Response tracker */}
                                    <div className="mb-4">
                                        <div className="flex items-center justify-between text-[10px] text-[var(--color-text-3)] mb-1.5">
                                            <span>MdB-Antworten: {k.antworten.erhalten} von {k.antworten.erhalten + k.antworten.ausstehend}</span>
                                            <span>{antwortPct}% haben reagiert</span>
                                        </div>
                                        <div className="h-2 rounded-full bg-[var(--color-surface-3)] overflow-hidden flex">
                                            {k.antworten.positiv > 0 && (
                                                <div className="h-full bg-[var(--color-green)]" style={{ width: `${(k.antworten.positiv / (k.antworten.erhalten + k.antworten.ausstehend)) * 100}%` }} title="Positiv" />
                                            )}
                                            {k.antworten.ausweichend > 0 && (
                                                <div className="h-full bg-[var(--color-amber)]" style={{ width: `${(k.antworten.ausweichend / (k.antworten.erhalten + k.antworten.ausstehend)) * 100}%` }} title="Ausweichend" />
                                            )}
                                            {k.antworten.negativ > 0 && (
                                                <div className="h-full bg-[var(--color-red)]" style={{ width: `${(k.antworten.negativ / (k.antworten.erhalten + k.antworten.ausstehend)) * 100}%` }} title="Negativ" />
                                            )}
                                        </div>
                                        <div className="flex gap-3 mt-1 text-[9px]">
                                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[var(--color-green)]" />{k.antworten.positiv} positiv</span>
                                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[var(--color-amber)]" />{k.antworten.ausweichend} ausweichend</span>
                                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[var(--color-red)]" />{k.antworten.negativ} negativ</span>
                                            <span className="flex items-center gap-1 text-[var(--color-text-3)]">{k.antworten.ausstehend} schweigen</span>
                                        </div>
                                    </div>

                                    {/* Action buttons */}
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            onClick={() => setExpanded(isOpen ? null : k.id)}
                                            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
                                            style={{ background: 'linear-gradient(135deg, var(--color-blue), var(--color-purple))' }}
                                        >
                                            <Copy size={13} />
                                            {isOpen ? 'Brief ausblenden' : 'Brief ansehen & kopieren'}
                                        </button>

                                        {!hasJoined ? (
                                            <button
                                                onClick={() => handleJoin(k.id)}
                                                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-surface-2)] transition-colors"
                                            >
                                                <Users size={13} />
                                                Unterstützen
                                            </button>
                                        ) : (
                                            <span className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-[var(--color-green)] bg-[var(--color-green)]/5 border border-[var(--color-green)]/15">
                                                <Check size={13} /> Dabei!
                                            </span>
                                        )}

                                        <button
                                            onClick={() => handleShare(k)}
                                            className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-medium border border-[var(--color-border)] text-[var(--color-text-3)] hover:text-[var(--color-text-2)] transition-colors"
                                        >
                                            {copied === k.id + '-share' ? <Check size={13} /> : <Share2 size={13} />}
                                        </button>
                                    </div>
                                </div>

                                {/* Expandable: full letter + send links */}
                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-4 md:px-5 pb-5 border-t border-[var(--color-border)] pt-4">
                                                {/* Letter */}
                                                <div className="mb-4">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <div className="text-[10px] font-semibold text-[var(--color-text-3)] uppercase tracking-wider">Betreff: {k.briefBetreff}</div>
                                                    </div>
                                                    <div className="text-[13px] text-[var(--color-text)] leading-relaxed p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] whitespace-pre-line max-h-[300px] overflow-y-auto">
                                                        {k.briefText}
                                                    </div>
                                                </div>

                                                {/* Send actions */}
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    <button
                                                        onClick={() => handleCopy(k.id, `Betreff: ${k.briefBetreff}\n\n${k.briefText}`)}
                                                        className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
                                                        style={{ background: copied === k.id ? 'var(--color-green)' : 'linear-gradient(135deg, var(--color-blue), var(--color-purple))' }}
                                                    >
                                                        {copied === k.id ? <><Check size={13} /> Kopiert!</> : <><Copy size={13} /> Brief kopieren</>}
                                                    </button>

                                                    {k.zustaendigeMdBs.map((ausschuss, ai) => (
                                                        <a
                                                            key={ai}
                                                            href={ausschuss.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-medium border border-[var(--color-border)] text-[var(--color-text-2)] hover:bg-[var(--color-surface-2)] transition-colors"
                                                        >
                                                            {ausschuss.name.split(' ').slice(0, 3).join(' ')}... ({ausschuss.mitglieder} MdBs)
                                                            <ExternalLink size={10} />
                                                        </a>
                                                    ))}
                                                </div>

                                                {/* Instructions */}
                                                <div className="p-3 rounded-xl bg-[var(--color-amber)]/5 border border-[var(--color-amber)]/10">
                                                    <div className="text-[11px] text-[var(--color-text-2)] leading-relaxed">
                                                        <strong className="text-[var(--color-amber)]">So sendest du den Brief:</strong>
                                                        <ol className="mt-1 space-y-1 list-decimal list-inside">
                                                            <li>Brief oben kopieren</li>
                                                            <li>Auf <a href="https://www.abgeordnetenwatch.de" target="_blank" rel="noopener noreferrer" className="text-[var(--color-blue)] hover:underline">abgeordnetenwatch.de</a> → Ausschussmitglieder suchen</li>
                                                            <li>Frage stellen → Brief einfügen</li>
                                                            <li>Die Antwort (oder Nicht-Antwort) wird öffentlich dokumentiert</li>
                                                        </ol>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Kampagnen;
