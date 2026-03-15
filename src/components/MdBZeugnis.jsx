import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCheck, ChevronDown, Search, ArrowUpDown, Info, TrendingUp, ExternalLink, Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { scoreFactors, scoreToNote, sampleMdBs } from '../data/mdbScores';
import { noteColors } from '../data/zeugnis';
import { fetchAndScoreMdBs } from '../api/bundestag';
import Icon from './Icon';

const NoteDisplay = ({ note, size = 'normal' }) => {
    const style = noteColors[note] || noteColors[4];
    const cls = size === 'large' ? 'w-11 h-11 text-lg' : size === 'small' ? 'w-6 h-6 text-[11px]' : 'w-8 h-8 text-sm';
    return (
        <div className={`${cls} rounded-lg ${style.bg} ${style.text} border ${style.border} flex items-center justify-center font-bold font-mono shrink-0`}>
            {note}
        </div>
    );
};

const ScoreBar = ({ value, max = 20, color }) => {
    const pct = (value / max) * 100;
    return (
        <div className="h-1.5 rounded-full bg-[var(--color-surface-3)] overflow-hidden flex-1">
            <motion.div
                className="h-full rounded-full"
                style={{ background: color || 'var(--color-blue)' }}
                initial={{ width: 0 }}
                whileInView={{ width: `${pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            />
        </div>
    );
};

const ConfidenceBadge = ({ isLive }) => (
    <span
        className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-medium leading-none shrink-0 ${
            isLive
                ? 'bg-[var(--color-green)]/10 text-[var(--color-green)] border border-[var(--color-green)]/20'
                : 'bg-[var(--color-amber)]/10 text-[var(--color-amber)] border border-[var(--color-amber)]/20'
        }`}
        title={isLive ? 'Aus Live-API-Daten berechnet' : 'Redaktionell geschätzt'}
    >
        {isLive ? '\u{1F4E1} Live' : '\u270F\uFE0F Gesch\u00E4tzt'}
    </span>
);

const partyColors = {
    'CDU/CSU': '#1a1a1a', 'SPD': '#e3000f', 'Grüne': '#1aa037',
    'FDP': '#ffed00', 'AfD': '#009ee0', 'Linke': '#be3075', 'BSW': '#8B1A4A', 'CSU': '#008ac5',
};

const formatTimestamp = (isoString) => {
    if (!isoString) return null;
    try {
        const d = new Date(isoString);
        return d.toLocaleString('de-DE', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit',
        });
    } catch {
        return null;
    }
};

const MdBZeugnis = () => {
    const [expanded, setExpanded] = useState(null);
    const [sortBy, setSortBy] = useState('score');
    const [searchTerm, setSearchTerm] = useState('');
    const [showMethodik, setShowMethodik] = useState(false);
    const [liveMdBs, setLiveMdBs] = useState([]);
    const [isLive, setIsLive] = useState(false);
    const [loadingLive, setLoadingLive] = useState(true);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const loadLiveData = useCallback(async () => {
        setRefreshing(true);
        try {
            const result = await fetchAndScoreMdBs(50);
            if (result && result.members.length > 0) {
                setLiveMdBs(result.members);
                setIsLive(true);
                setLastUpdated(result.lastUpdated || new Date().toISOString());
            }
        } finally {
            setLoadingLive(false);
            setRefreshing(false);
        }
    }, []);

    // Try live API on mount
    useEffect(() => {
        let cancelled = false;
        fetchAndScoreMdBs(50).then(result => {
            if (cancelled) return;
            if (result && result.members.length > 0) {
                setLiveMdBs(result.members);
                setIsLive(true);
                setLastUpdated(result.lastUpdated || new Date().toISOString());
            }
            setLoadingLive(false);
        });
        return () => { cancelled = true; };
    }, []);

    const staticMdBs = sampleMdBs.map(mdb => {
        const total = Object.values(mdb.scores).reduce((a, b) => a + b, 0);
        const note = scoreToNote(total);
        return {
            ...mdb,
            total,
            note,
            // All static data factors are editorial estimates
            liveFactors: [],
            factorConfidence: {
                anwesenheit: 'low',
                erreichbarkeit: 'low',
                nebeneinkuenfte: 'low',
                aktivitaet: 'low',
                transparenz: 'low',
            },
        };
    });

    const liveScoredMdBs = liveMdBs.map(mdb => ({
        ...mdb,
        note: scoreToNote(mdb.total),
    }));

    // Merge: prefer live data for matching names, keep static-only for the rest
    const mergedMdBs = (() => {
        const liveByName = new Map(liveScoredMdBs.map(m => [m.name, m]));
        const merged = [];

        // For each static MdB, check if there is a live version to merge
        for (const staticMdb of staticMdBs) {
            const liveMdb = liveByName.get(staticMdb.name);
            if (liveMdb) {
                // Merge: use live scores where available, static for the rest
                const mergedScores = { ...staticMdb.scores };
                const mergedConfidence = { ...staticMdb.factorConfidence };
                const mergedLiveFactors = [...(staticMdb.liveFactors || [])];

                for (const factorId of (liveMdb.liveFactors || [])) {
                    mergedScores[factorId] = liveMdb.scores[factorId];
                    mergedConfidence[factorId] = 'high';
                    if (!mergedLiveFactors.includes(factorId)) {
                        mergedLiveFactors.push(factorId);
                    }
                }

                const total = Object.values(mergedScores).reduce((a, b) => a + b, 0);
                merged.push({
                    ...staticMdb,
                    scores: mergedScores,
                    total,
                    note: scoreToNote(total),
                    liveFactors: mergedLiveFactors,
                    factorConfidence: mergedConfidence,
                    context: liveMdb.context || staticMdb.context,
                    profileUrl: liveMdb.profileUrl || staticMdb.profileUrl,
                });
                liveByName.delete(staticMdb.name);
            } else {
                merged.push(staticMdb);
            }
        }

        // Add any live-only MdBs not in static data
        for (const liveMdb of liveByName.values()) {
            merged.push(liveMdb);
        }

        return merged;
    })();

    const sorted = [...mergedMdBs].sort((a, b) => {
        if (sortBy === 'score') return b.total - a.total;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'partei') return a.partei.localeCompare(b.partei);
        return 0;
    });

    const filtered = sorted.filter(mdb =>
        mdb.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mdb.partei.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mdb.wahlkreis.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section id="mdb-zeugnis" className="w-full py-24 px-6">
            <div className="container-main max-w-4xl">
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-[var(--color-surface-2)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-amber)]">
                            <UserCheck size={16} strokeWidth={1.5} />
                        </div>
                        <span className="text-xs font-medium text-[var(--color-text-3)] uppercase tracking-widest">MdB Transparenz-Index</span>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium border ${
                            isLive
                                ? 'text-[var(--color-green)] border-[var(--color-green)]/20 bg-[var(--color-green)]/5'
                                : 'text-[var(--color-text-3)] border-[var(--color-border)] bg-[var(--color-surface)]'
                        }`}>
                            {isLive ? <Wifi size={9} /> : <WifiOff size={9} />}
                            {isLive ? `Live (${mergedMdBs.length})` : `${mergedMdBs.length} MdBs`}
                        </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gradient-heading mb-2">
                        Wie gut machen Abgeordnete ihren Job?
                    </h2>
                    <p className="text-[var(--color-text-2)] text-sm max-w-lg">
                        5 Faktoren, 0-100 Punkte, eine Schulnote. Keine Meinung — nur messbare Daten.
                    </p>
                </motion.div>

                {/* Disclaimer banner */}
                <motion.div
                    className="mb-6 p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <p className="text-[12px] text-[var(--color-text-2)] leading-relaxed">
                        Scores basieren auf öffentlichen Daten von{' '}
                        <a href="https://www.abgeordnetenwatch.de" target="_blank" rel="noopener noreferrer" className="text-[var(--color-blue)] hover:underline">abgeordnetenwatch.de</a>
                        {' '}und{' '}
                        <a href="https://www.bundestag.de" target="_blank" rel="noopener noreferrer" className="text-[var(--color-blue)] hover:underline">bundestag.de</a>.
                        {' '}Faktoren mit <span className="font-semibold">{'\u{1F4E1}'} </span> sind live berechnet,
                        Faktoren mit <span className="font-semibold">{'\u270F\uFE0F'} </span> sind redaktionell geschätzt.
                    </p>

                    <div className="flex items-center gap-3 mt-3 flex-wrap">
                        <button
                            onClick={loadLiveData}
                            disabled={refreshing}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                                refreshing
                                    ? 'bg-[var(--color-surface-2)] text-[var(--color-text-3)] border-[var(--color-border)] cursor-wait'
                                    : 'bg-[var(--color-blue)]/10 text-[var(--color-blue)] border-[var(--color-blue)]/20 hover:bg-[var(--color-blue)]/20'
                            }`}
                        >
                            <RefreshCw size={11} className={refreshing ? 'animate-spin' : ''} />
                            {refreshing ? 'Laden...' : 'Daten aktualisieren'}
                        </button>

                        {lastUpdated && (
                            <span className="text-[10px] text-[var(--color-text-3)]">
                                Zuletzt aktualisiert: {formatTimestamp(lastUpdated)}
                            </span>
                        )}
                    </div>
                </motion.div>

                {/* Controls */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <div className="relative flex-1">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-3)]" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            placeholder="Name, Partei oder Wahlkreis..."
                            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-text-3)] focus:border-[var(--color-blue)] focus:outline-none transition-colors"
                        />
                    </div>
                    <div className="flex gap-1 p-1 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
                        {[
                            { id: 'score', label: 'Score' },
                            { id: 'name', label: 'Name' },
                            { id: 'partei', label: 'Partei' },
                        ].map(s => (
                            <button
                                key={s.id}
                                onClick={() => setSortBy(s.id)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                                    sortBy === s.id ? 'bg-[var(--color-blue)] text-white' : 'text-[var(--color-text-3)] hover:text-[var(--color-text-2)]'
                                }`}
                            >
                                {s.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* MdB cards */}
                <div className="space-y-2 mb-8">
                    {filtered.map((mdb, i) => {
                        const isOpen = expanded === mdb.name;
                        const noteStyle = noteColors[mdb.note];
                        const pColor = partyColors[mdb.partei] || 'var(--color-text-3)';
                        const mdbLiveFactors = mdb.liveFactors || [];

                        return (
                            <motion.div
                                key={mdb.name}
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.04 }}
                                className="card overflow-hidden"
                            >
                                <button
                                    onClick={() => setExpanded(isOpen ? null : mdb.name)}
                                    className="w-full p-4 flex items-center gap-4 text-left hover:bg-[var(--color-surface)] transition-colors"
                                >
                                    {/* Rank */}
                                    <div className="w-6 text-center text-xs font-mono text-[var(--color-text-3)] shrink-0">
                                        #{i + 1}
                                    </div>

                                    {/* Party dot */}
                                    <div className="w-3 h-3 rounded-full shrink-0" style={{ background: pColor }} />

                                    {/* Name & info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-semibold text-[var(--color-text)] truncate">{mdb.name}</div>
                                        <div className="text-[10px] text-[var(--color-text-3)]">{mdb.partei} · {mdb.rolle}</div>
                                    </div>

                                    {/* Score */}
                                    <div className="flex items-center gap-2.5 shrink-0">
                                        <div className="text-right">
                                            <div className="text-sm font-bold font-mono text-[var(--color-text)]">{mdb.total}/100</div>
                                        </div>
                                        <NoteDisplay note={mdb.note} />
                                    </div>

                                    <ChevronDown size={14} className={`text-[var(--color-text-3)] transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.25 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-4 pb-5 space-y-3">
                                                {/* Factor breakdown */}
                                                {scoreFactors.map(factor => {
                                                    const val = mdb.scores[factor.id];
                                                    const pct = Math.round((val / factor.maxPoints) * 100);
                                                    const isFactorLive = mdbLiveFactors.includes(factor.id);
                                                    return (
                                                        <div key={factor.id} className="flex items-center gap-3">
                                                            <div className="w-6 h-6 rounded-md bg-[var(--color-surface-2)] flex items-center justify-center shrink-0">
                                                                <Icon name={factor.icon} size={11} className="text-[var(--color-text-3)]" />
                                                            </div>
                                                            <div className="w-24 shrink-0">
                                                                <span className="text-[11px] text-[var(--color-text-2)]">{factor.name}</span>
                                                            </div>
                                                            <ScoreBar value={val} max={factor.maxPoints} color={pct >= 75 ? 'var(--color-green)' : pct >= 50 ? 'var(--color-amber)' : 'var(--color-red)'} />
                                                            <span className="text-[11px] font-mono font-medium text-[var(--color-text)] w-12 text-right shrink-0">
                                                                {val}/{factor.maxPoints}
                                                            </span>
                                                            <ConfidenceBadge isLive={isFactorLive} />
                                                        </div>
                                                    );
                                                })}

                                                {/* Context */}
                                                <div className="mt-2 p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
                                                    <p className="text-[12px] text-[var(--color-text-2)] leading-relaxed">{mdb.context}</p>
                                                </div>

                                                {/* Links */}
                                                <div className="flex gap-2 mt-1">
                                                    <a
                                                        href={`https://www.abgeordnetenwatch.de/search?query=${encodeURIComponent(mdb.name)}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-1 text-[11px] text-[var(--color-blue)] hover:underline"
                                                    >
                                                        abgeordnetenwatch.de <ExternalLink size={9} />
                                                    </a>
                                                    <a
                                                        href={`https://www.bundestag.de/abgeordnete`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-1 text-[11px] text-[var(--color-blue)] hover:underline"
                                                    >
                                                        bundestag.de <ExternalLink size={9} />
                                                    </a>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Methodik */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="card overflow-hidden"
                >
                    <button
                        onClick={() => setShowMethodik(!showMethodik)}
                        className="w-full px-6 py-4 flex items-center justify-between hover:bg-[var(--color-surface)] transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <Info size={16} className="text-[var(--color-blue)]" />
                            <div className="text-left">
                                <div className="text-sm font-semibold text-[var(--color-text)]">So berechnen wir den Score — und so kann man ihn verbessern</div>
                                <div className="text-[10px] text-[var(--color-text-3)]">5 Faktoren × 0-20 Punkte = 0-100 Gesamtscore → Schulnote</div>
                            </div>
                        </div>
                        <ChevronDown size={14} className={`text-[var(--color-text-3)] transition-transform ${showMethodik ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                        {showMethodik && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="overflow-hidden"
                            >
                                <div className="px-6 pb-6 space-y-4">
                                    {/* Score → Note mapping */}
                                    <div className="flex flex-wrap gap-2 pb-4 border-b border-[var(--color-border)]">
                                        {[
                                            { range: '90-100', note: 1 },
                                            { range: '75-89', note: 2 },
                                            { range: '60-74', note: 3 },
                                            { range: '45-59', note: 4 },
                                            { range: '25-44', note: 5 },
                                            { range: '0-24', note: 6 },
                                        ].map(m => {
                                            const style = noteColors[m.note];
                                            return (
                                                <div key={m.note} className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]">
                                                    <span className="text-[10px] font-mono text-[var(--color-text-3)]">{m.range}</span>
                                                    <span className="text-[10px] text-[var(--color-text-3)]">=</span>
                                                    <span className={`text-[10px] font-bold ${style.text}`}>Note {m.note}</span>
                                                    <span className="text-[10px] text-[var(--color-text-3)]">({style.label})</span>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Factor details with "how to improve" */}
                                    {scoreFactors.map((factor, i) => (
                                        <motion.div
                                            key={factor.id}
                                            initial={{ opacity: 0, x: -8 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.06 }}
                                            className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]"
                                        >
                                            <div className="flex items-center gap-2 mb-2">
                                                <Icon name={factor.icon} size={14} className="text-[var(--color-text-3)]" />
                                                <span className="text-sm font-semibold text-[var(--color-text)]">{factor.name}</span>
                                                <span className="text-[10px] font-mono text-[var(--color-text-3)]">0-{factor.maxPoints} Punkte</span>
                                            </div>
                                            <p className="text-[12px] text-[var(--color-text-2)] mb-1.5">{factor.description}</p>
                                            <p className="text-[11px] text-[var(--color-text-3)] mb-2">
                                                <span className="font-semibold">Messung:</span> {factor.howMeasured}
                                            </p>
                                            <p className="text-[11px] text-[var(--color-text-3)] mb-1.5">
                                                <span className="font-semibold">Quelle:</span> {factor.source}
                                            </p>
                                            <div className="flex items-start gap-1.5 mt-2 p-2 rounded-lg bg-[var(--color-green)]/5 border border-[var(--color-green)]/10">
                                                <TrendingUp size={11} className="text-[var(--color-green)] mt-0.5 shrink-0" />
                                                <span className="text-[11px] text-[var(--color-green)]">
                                                    <span className="font-semibold">So verbessern:</span> {factor.howToImprove}
                                                </span>
                                            </div>
                                        </motion.div>
                                    ))}

                                    {/* Fairness note */}
                                    <div className="p-3 rounded-xl bg-[var(--color-blue)]/5 border border-[var(--color-blue)]/15 text-[12px] text-[var(--color-text-2)]">
                                        <span className="font-semibold text-[var(--color-blue)]">Hinweis:</span> Dieser Index misst Transparenz und Aktivität — nicht politische Positionen. Ein:e MdB der AfD kann denselben Score erreichen wie ein:e MdB der Grünen, wenn sie gleich transparent und aktiv sind.
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

export default MdBZeugnis;
