import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building, ExternalLink, Users, Briefcase, Wifi, WifiOff, ChevronDown } from 'lucide-react';
import { fetchLobbyEntries, getTopSpenders, aggregateByInterest, formatFinancial, fallbackTopSpenders } from '../api/lobbyregister';

const LobbyTracker = () => {
    const [entries, setEntries] = useState([]);
    const [isLive, setIsLive] = useState(false);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState(null);
    const [view, setView] = useState('spenders'); // 'spenders' | 'interests'

    useEffect(() => {
        let cancelled = false;
        setLoading(true);

        fetchLobbyEntries({ pageSize: 100 }).then(result => {
            if (cancelled) return;
            if (result && result.entries.length > 0) {
                setEntries(result.entries);
                setIsLive(true);
            } else {
                // Use fallback data
                setEntries(fallbackTopSpenders);
                setIsLive(false);
            }
            setLoading(false);
        });

        return () => { cancelled = true; };
    }, []);

    const topSpenders = useMemo(() =>
        isLive ? getTopSpenders(entries, 12) : fallbackTopSpenders
    , [entries, isLive]);

    const interestAgg = useMemo(() =>
        aggregateByInterest(isLive ? entries : fallbackTopSpenders).slice(0, 10)
    , [entries, isLive]);

    const totalCount = isLive ? entries.length : 6760;
    const maxFinancial = topSpenders[0]?.financialTo || 1;

    return (
        <section id="lobby" className="w-full py-24 px-6">
            <div className="container-main max-w-4xl">
                <motion.div
                    className="mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-[var(--color-surface-2)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-purple)]">
                            <Briefcase size={16} strokeWidth={1.5} />
                        </div>
                        <span className="text-xs font-medium text-[var(--color-text-3)] uppercase tracking-widest">Lobbyregister</span>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium border ${
                            isLive
                                ? 'text-[var(--color-green)] border-[var(--color-green)]/20 bg-[var(--color-green)]/5'
                                : 'text-[var(--color-text-3)] border-[var(--color-border)] bg-[var(--color-surface)]'
                        }`}>
                            {isLive ? <Wifi size={9} /> : <WifiOff size={9} />}
                            {isLive ? 'Live API' : 'Offline'}
                        </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gradient-heading mb-2">
                        Wer beeinflusst den Haushalt?
                    </h2>
                    <p className="text-[var(--color-text-2)] text-sm max-w-lg mb-6">
                        {totalCount.toLocaleString('de-DE')} Organisationen sind im offiziellen Lobbyregister des Bundestags eingetragen.
                        Hier die größten nach Lobbyausgaben.
                    </p>

                    {/* View toggle */}
                    <div className="flex items-center gap-1 p-1 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] w-fit">
                        <button
                            onClick={() => setView('spenders')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                                view === 'spenders' ? 'bg-[var(--color-blue)] text-white' : 'text-[var(--color-text-3)] hover:text-[var(--color-text-2)]'
                            }`}
                        >
                            Top-Ausgaben
                        </button>
                        <button
                            onClick={() => setView('interests')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                                view === 'interests' ? 'bg-[var(--color-blue)] text-white' : 'text-[var(--color-text-3)] hover:text-[var(--color-text-2)]'
                            }`}
                        >
                            Nach Themenfeld
                        </button>
                    </div>
                </motion.div>

                {loading ? (
                    <div className="flex items-center justify-center py-16 gap-3">
                        <div className="w-5 h-5 border-2 border-[var(--color-purple)] border-t-transparent rounded-full animate-spin" />
                        <span className="text-sm text-[var(--color-text-3)]">Lade Lobbyregister...</span>
                    </div>
                ) : (
                    <AnimatePresence mode="wait">
                        {view === 'spenders' ? (
                            <motion.div
                                key="spenders"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                className="space-y-2"
                            >
                                {topSpenders.map((entry, i) => {
                                    const pct = (entry.financialTo / maxFinancial) * 100;
                                    const isExpanded = expanded === i;
                                    return (
                                        <motion.div
                                            key={entry.name}
                                            initial={{ opacity: 0, y: 12 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.04 }}
                                            className="card p-4 cursor-pointer"
                                            onClick={() => setExpanded(isExpanded ? null : i)}
                                        >
                                            <div className="flex items-start gap-3">
                                                {/* Rank */}
                                                <div className="w-7 h-7 rounded-lg bg-[var(--color-surface-2)] border border-[var(--color-border)] flex items-center justify-center text-[11px] font-bold text-[var(--color-text-3)] shrink-0 mt-0.5">
                                                    {i + 1}
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-2 mb-1">
                                                        <div className="min-w-0">
                                                            <h3 className="text-sm font-semibold text-[var(--color-text)] truncate">{entry.name}</h3>
                                                            <span className="text-[10px] text-[var(--color-text-3)]">{entry.activityType}</span>
                                                        </div>
                                                        <div className="text-right shrink-0 flex items-center gap-2">
                                                            <span className="text-sm font-bold font-mono text-[var(--color-purple)]">
                                                                {formatFinancial(entry.financialFrom, entry.financialTo)}
                                                            </span>
                                                            <ChevronDown size={14} className={`text-[var(--color-text-3)] transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                                                        </div>
                                                    </div>

                                                    {/* Financial bar */}
                                                    <div className="h-1.5 rounded-full bg-[var(--color-surface-3)] overflow-hidden mt-2">
                                                        <motion.div
                                                            className="h-full rounded-full"
                                                            style={{ background: 'linear-gradient(90deg, var(--color-purple), var(--color-blue))' }}
                                                            initial={{ width: 0 }}
                                                            whileInView={{ width: `${pct}%` }}
                                                            viewport={{ once: true }}
                                                            transition={{ duration: 0.6, delay: i * 0.04 }}
                                                        />
                                                    </div>

                                                    {/* Meta row */}
                                                    <div className="flex items-center gap-3 mt-2 text-[10px] text-[var(--color-text-3)]">
                                                        <span className="flex items-center gap-1"><Users size={10} /> {entry.employeeFTE} Lobbyist:innen (FTE)</span>
                                                        <span>{entry.projectCount} Gesetzesvorhaben</span>
                                                    </div>

                                                    {/* Expanded details */}
                                                    <AnimatePresence>
                                                        {isExpanded && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: 'auto', opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                transition={{ duration: 0.2 }}
                                                                className="overflow-hidden"
                                                            >
                                                                <div className="pt-3 mt-3 border-t border-[var(--color-border)]">
                                                                    <div className="text-[10px] font-semibold text-[var(--color-text-3)] uppercase tracking-wider mb-2">Interessengebiete</div>
                                                                    <div className="flex flex-wrap gap-1.5 mb-3">
                                                                        {entry.interests.slice(0, 6).map(interest => (
                                                                            <span key={interest} className="px-2 py-0.5 rounded-md text-[10px] text-[var(--color-text-2)] bg-[var(--color-surface-2)] border border-[var(--color-border)]">
                                                                                {interest}
                                                                            </span>
                                                                        ))}
                                                                    </div>
                                                                    {entry.url && (
                                                                        <a
                                                                            href={entry.url}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            onClick={e => e.stopPropagation()}
                                                                            className="inline-flex items-center gap-1 text-xs text-[var(--color-blue)] hover:underline"
                                                                        >
                                                                            Eintrag im Lobbyregister <ExternalLink size={10} />
                                                                        </a>
                                                                    )}
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}

                                <div className="text-center pt-4">
                                    <a
                                        href="https://www.lobbyregister.bundestag.de/suche"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-xs text-[var(--color-blue)] hover:underline"
                                    >
                                        Alle {totalCount.toLocaleString('de-DE')} Einträge im Lobbyregister ansehen <ExternalLink size={11} />
                                    </a>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="interests"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                className="space-y-2"
                            >
                                {interestAgg.map((item, i) => {
                                    const maxCount = interestAgg[0]?.count || 1;
                                    const pct = (item.count / maxCount) * 100;
                                    return (
                                        <motion.div
                                            key={item.name}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.04 }}
                                            className="card p-4"
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-medium text-[var(--color-text)]">{item.name}</span>
                                                <span className="text-xs font-mono text-[var(--color-text-3)]">{item.count} Organisationen</span>
                                            </div>
                                            <div className="h-1.5 rounded-full bg-[var(--color-surface-3)] overflow-hidden">
                                                <motion.div
                                                    className="h-full rounded-full bg-[var(--color-purple)]"
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${pct}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.5, delay: i * 0.04 }}
                                                />
                                            </div>
                                            <div className="flex items-center gap-3 mt-2 text-[10px] text-[var(--color-text-3)]">
                                                <span>{Math.round(item.totalEmployees)} Lobbyist:innen (FTE gesamt)</span>
                                                <span>~{formatFinancial(0, Math.round(item.totalFinancial))} Gesamtausgaben</span>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}
            </div>
        </section>
    );
};

export default LobbyTracker;
