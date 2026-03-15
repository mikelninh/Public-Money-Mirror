import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronDown, ExternalLink, ArrowRight, Share2, Check, Globe } from 'lucide-react';
import { fakten, warumNichtsPassiert, vorbilder, winWinWin, aktionen } from '../data/tierrechte';
import Icon from './Icon';

const tabs = [
    { id: 'fakten', label: 'Die Zahlen' },
    { id: 'warum', label: 'Warum nichts passiert' },
    { id: 'vorbilder', label: 'Wer es besser macht' },
    { id: 'vision', label: 'Win-Win-Win' },
    { id: 'handeln', label: 'Was du tun kannst' },
];

const TierrechteSektion = () => {
    const [activeTab, setActiveTab] = useState('fakten');
    const [shared, setShared] = useState(false);

    const handleShare = () => {
        const text = `Wusstest du?\n\n• 763 Mio Tiere werden jährlich in Deutschland geschlachtet — 24 pro Sekunde\n• 82% der Deutschen wollen strengere Tierschutzgesetze\n• Die Agrarlobby gibt 25x mehr aus als Tierschutzorganisationen\n\nFakten, Vorbilder, Aktionen:\nhttps://mikelninh.github.io/Public-Money-Mirror/`;
        if (navigator.share) {
            navigator.share({ title: 'Tierrechte — Die Fakten', text });
        } else {
            navigator.clipboard.writeText(text);
            setShared(true);
            setTimeout(() => setShared(false), 2000);
        }
    };

    return (
        <section id="tierrechte" className="w-full py-20 md:py-24 px-4 md:px-6">
            <div className="container-main max-w-4xl">
                {/* Header */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-[var(--color-green)]/10 border border-[var(--color-green)]/15 flex items-center justify-center text-[var(--color-green)]">
                            <Heart size={16} strokeWidth={1.5} />
                        </div>
                        <span className="text-xs font-medium text-[var(--color-text-3)] uppercase tracking-widest">Mitgefühl als Politik</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gradient-heading mb-2">
                        763 Millionen Stimmen die nicht gehört werden
                    </h2>
                    <p className="text-[var(--color-text-2)] text-sm max-w-lg">
                        82% der Deutschen wollen besseren Tierschutz. Die Agrarlobby gibt 25x mehr aus. Hier sind die Fakten — und was wir tun können.
                    </p>
                </motion.div>

                {/* Tabs */}
                <div className="flex gap-1 p-1 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] mb-8 overflow-x-auto no-scrollbar">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-colors whitespace-nowrap ${
                                activeTab === tab.id
                                    ? 'bg-[var(--color-green)]/10 text-[var(--color-green)]'
                                    : 'text-[var(--color-text-3)] hover:text-[var(--color-text-2)]'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {/* ── Die Zahlen ── */}
                    {activeTab === 'fakten' && (
                        <motion.div key="fakten" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {fakten.map((f, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.06 }}
                                        className="card p-5"
                                    >
                                        <div className="text-2xl md:text-3xl font-bold font-mono text-[var(--color-text)] mb-1">{f.zahl}</div>
                                        <div className="text-sm font-semibold text-[var(--color-text)] mb-2">{f.was}</div>
                                        <p className="text-[12px] text-[var(--color-text-2)] leading-relaxed mb-2">{f.kontext}</p>
                                        <span className="text-[10px] text-[var(--color-text-3)]">{f.quelle}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* ── Warum nichts passiert ── */}
                    {activeTab === 'warum' && (
                        <motion.div key="warum" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                            <div className="space-y-4">
                                {warumNichtsPassiert.map((w, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.08 }}
                                        className="card p-5"
                                    >
                                        <h3 className="text-sm font-bold text-[var(--color-text)] mb-3">{w.titel}</h3>

                                        {w.details[0]?.seite ? (
                                            <div className="grid grid-cols-2 gap-3 mb-3">
                                                {w.details.map((d, di) => (
                                                    <div key={di} className={`p-3 rounded-xl ${di === 0 ? 'bg-[var(--color-red)]/5 border border-[var(--color-red)]/10' : 'bg-[var(--color-green)]/5 border border-[var(--color-green)]/10'}`}>
                                                        <div className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: di === 0 ? 'var(--color-red)' : 'var(--color-green)' }}>{d.seite}</div>
                                                        <div className="text-sm font-bold font-mono text-[var(--color-text)]">{d.ausgaben}</div>
                                                        <div className="text-[10px] text-[var(--color-text-3)] mt-0.5">{d.orgs}</div>
                                                        <div className="text-[10px] text-[var(--color-text-3)]">{d.lobbyisten} Lobbyist:innen</div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="space-y-1.5 mb-3">
                                                {w.details.map((d, di) => (
                                                    <div key={di} className="flex items-start gap-2 text-[12px] text-[var(--color-text-2)]">
                                                        <span className="text-[var(--color-text-3)] mt-0.5 shrink-0">•</span>
                                                        <span>{d.fakt}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <div className="p-3 rounded-xl bg-[var(--color-amber)]/5 border border-[var(--color-amber)]/10">
                                            <p className="text-[12px] text-[var(--color-text)] font-medium">{w.fazit}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* ── Vorbilder ── */}
                    {activeTab === 'vorbilder' && (
                        <motion.div key="vorbilder" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                            <div className="space-y-3">
                                {vorbilder.map((v, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.06 }}
                                        className="card p-5"
                                    >
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="text-2xl">{v.land.split(' ')[0]}</span>
                                            <div>
                                                <div className="text-sm font-bold text-[var(--color-text)]">{v.land.split(' ').slice(1).join(' ')}</div>
                                                <div className="text-[11px] text-[var(--color-green)] font-medium">{v.titel}</div>
                                            </div>
                                        </div>
                                        <p className="text-[13px] text-[var(--color-text-2)] leading-relaxed mb-2">{v.was}</p>
                                        <div className="p-2.5 rounded-lg bg-[var(--color-green)]/5 border border-[var(--color-green)]/10 mb-2">
                                            <p className="text-[12px] text-[var(--color-text)] font-medium">{v.ergebnis}</p>
                                        </div>
                                        <span className="text-[10px] text-[var(--color-text-3)]">{v.quelle}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* ── Win-Win-Win ── */}
                    {activeTab === 'vision' && (
                        <motion.div key="vision" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                            <div className="text-center mb-8">
                                <h3 className="text-lg font-bold text-[var(--color-text)] mb-2">Kein Verzicht — ein Gewinn für alle</h3>
                                <p className="text-sm text-[var(--color-text-2)] max-w-md mx-auto">
                                    Tierschutz ist kein Nullsummenspiel. Bessere Bedingungen helfen Tieren, Landwirten und uns allen.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {winWinWin.map((w, i) => (
                                    <motion.div
                                        key={w.fuer}
                                        initial={{ opacity: 0, y: 16 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="card p-5"
                                    >
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="w-8 h-8 rounded-lg bg-[var(--color-green)]/10 flex items-center justify-center">
                                                <Icon name={w.icon} size={16} className="text-[var(--color-green)]" />
                                            </div>
                                            <h4 className="text-sm font-bold text-[var(--color-text)]">{w.fuer}</h4>
                                        </div>
                                        <ul className="space-y-2">
                                            {w.punkte.map((p, pi) => (
                                                <li key={pi} className="flex items-start gap-2 text-[12px] text-[var(--color-text-2)]">
                                                    <Check size={11} className="text-[var(--color-green)] mt-0.5 shrink-0" />
                                                    <span>{p}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* ── Was du tun kannst ── */}
                    {activeTab === 'handeln' && (
                        <motion.div key="handeln" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                            <div className="space-y-3 mb-6">
                                {aktionen.map((a, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.08 }}
                                        className="card p-5"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-[var(--color-green)]/10 flex items-center justify-center text-[var(--color-green)] shrink-0 mt-0.5 text-sm font-bold">
                                                {i + 1}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-sm font-bold text-[var(--color-text)] mb-1">{a.titel}</h4>
                                                <p className="text-[12px] text-[var(--color-text-2)] mb-2">{a.beschreibung}</p>
                                                <div className="flex items-center gap-3 text-[10px] text-[var(--color-text-3)]">
                                                    <span>Aufwand: {a.aufwand}</span>
                                                    <span>Wirkung: {a.wirkung}</span>
                                                </div>
                                                {a.url && (
                                                    <a href={a.url} target={a.url.startsWith('#') ? '_self' : '_blank'} rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-[var(--color-blue)] hover:underline mt-2">
                                                        Jetzt machen <ArrowRight size={10} />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Share */}
                            <div className="text-center">
                                <button
                                    onClick={handleShare}
                                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white"
                                    style={{ background: shared ? 'var(--color-green)' : 'linear-gradient(135deg, var(--color-green), var(--color-cyan))' }}
                                >
                                    {shared ? <><Check size={14} /> Kopiert!</> : <><Share2 size={14} /> Diese Fakten teilen</>}
                                </button>
                                <p className="text-[10px] text-[var(--color-text-3)] mt-3 max-w-sm mx-auto">
                                    Nicht belehrend — einfach die Fakten teilen. 82% der Menschen stimmen dir zu. Sie wissen es nur noch nicht.
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default TierrechteSektion;
