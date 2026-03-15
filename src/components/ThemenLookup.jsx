import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ExternalLink, ArrowRight, Mail, Globe, ChevronDown } from 'lucide-react';
import { themen, searchThemen } from '../data/themen';
import { noteColors } from '../data/zeugnis';
import Icon from './Icon';

const categories = [
    { id: 'alle', label: 'Alle', icon: null },
    { id: 'soziales', label: 'Soziales', icon: 'Users', themen: ['rente', 'kinderarmut', 'pflege', 'obdachlosigkeit', 'gleichstellung'] },
    { id: 'wirtschaft', label: 'Wirtschaft', icon: 'Wallet', themen: ['steuern', 'buerokratie', 'landwirtschaft', 'forschung', 'laendlicher-raum'] },
    { id: 'umwelt', label: 'Umwelt & Klima', icon: 'Leaf', themen: ['klima', 'tierschutz', 'ernaehrung', 'luftqualitaet'] },
    { id: 'staat', label: 'Staat & Recht', icon: 'Shield', themen: ['sicherheit', 'bundeswehr-beschaffung', 'justiz', 'demokratie', 'cybersicherheit', 'datenschutz'] },
    { id: 'infrastruktur', label: 'Infrastruktur', icon: 'Train', themen: ['verkehr', 'digitalisierung', 'wohnen'] },
    { id: 'leben', label: 'Gesellschaft', icon: 'Heart', themen: ['bildung', 'gesundheit', 'drogen', 'sport', 'kultur', 'migration', 'entwicklungshilfe'] },
];

const CategoryBrowser = ({ onSelect, activeCategory, onCategoryChange }) => {
    const filteredThemen = activeCategory === 'alle'
        ? themen
        : themen.filter(t => {
            const cat = categories.find(c => c.id === activeCategory);
            return cat?.themen?.includes(t.id);
        });

    return (
        <div className="mt-4">
            {/* Category tabs */}
            <div className="flex flex-wrap gap-1.5 mb-5">
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => onCategoryChange(cat.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                            activeCategory === cat.id
                                ? 'border-[var(--color-blue)] bg-[var(--color-blue)]/8 text-[var(--color-text)]'
                                : 'border-[var(--color-border)] text-[var(--color-text-3)] hover:text-[var(--color-text-2)] hover:border-[var(--color-border-hover)]'
                        }`}
                    >
                        {cat.icon && <Icon name={cat.icon} size={12} />}
                        {cat.label}
                        <span className="text-[10px] opacity-60">
                            {cat.id === 'alle' ? themen.length : cat.themen?.length}
                        </span>
                    </button>
                ))}
            </div>

            {/* Topic grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {filteredThemen.map(t => {
                    const noteStyle = noteColors[t.versprechen.note] || noteColors[4];
                    return (
                        <button
                            key={t.id}
                            onClick={() => onSelect(t.name.toLowerCase().split(' ')[0])}
                            className="flex items-start gap-2 p-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-2)] hover:border-[var(--color-border-hover)] transition-all text-left"
                        >
                            <div className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5" style={{ background: t.color + '15', color: t.color }}>
                                <Icon name={t.icon} size={11} />
                            </div>
                            <div className="min-w-0">
                                <div className="text-[12px] font-medium text-[var(--color-text)] leading-tight truncate">{t.name}</div>
                                <div className="flex items-center gap-1.5 mt-1">
                                    <span className={`text-[9px] font-bold ${noteStyle.text}`}>{t.versprechen.note}</span>
                                    <span className="text-[9px] text-[var(--color-text-3)]">{t.international.flagge}</span>
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

const ThemenCard = ({ thema }) => {
    const [section, setSection] = useState('uebersicht'); // uebersicht | lobby | vorbild | aktion
    const noteStyle = noteColors[thema.versprechen.note] || noteColors[4];

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="card overflow-hidden"
        >
            {/* Header */}
            <div className="px-6 py-5 border-b border-[var(--color-border)]">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: thema.color + '15', color: thema.color }}>
                                <Icon name={thema.icon} size={16} />
                            </div>
                            <h3 className="text-lg font-bold text-[var(--color-text)]">{thema.name}</h3>
                        </div>
                        <p className="text-sm text-[var(--color-text-2)]">
                            Zuständig: {thema.zustaendig.ministerium}
                        </p>
                    </div>
                    <div className="text-center shrink-0">
                        <div className="text-[9px] text-[var(--color-text-3)] uppercase tracking-wider mb-1">Versprechen</div>
                        <div className={`w-10 h-10 rounded-lg ${noteStyle.bg} ${noteStyle.text} border ${noteStyle.border} flex items-center justify-center text-lg font-bold font-mono`}>
                            {thema.versprechen.note}
                        </div>
                    </div>
                </div>
            </div>

            {/* Tab nav */}
            <div className="flex border-b border-[var(--color-border)]">
                {[
                    { id: 'uebersicht', label: 'Übersicht' },
                    { id: 'lobby', label: 'Lobby-Kräfte' },
                    { id: 'vorbild', label: `${thema.international.flagge} Vorbild` },
                    { id: 'aktion', label: 'Was tun?' },
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setSection(tab.id)}
                        className={`flex-1 px-4 py-2.5 text-xs font-medium transition-colors border-b-2 ${
                            section === tab.id
                                ? 'border-[var(--color-blue)] text-[var(--color-text)]'
                                : 'border-transparent text-[var(--color-text-3)] hover:text-[var(--color-text-2)]'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab content */}
            <div className="p-6">
                <AnimatePresence mode="wait">
                    {section === 'uebersicht' && (
                        <motion.div key="uebersicht" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <div className="space-y-4">
                                {/* Budget */}
                                <div className="p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
                                    <div className="text-[10px] font-semibold text-[var(--color-text-3)] uppercase tracking-wider mb-1">Budget</div>
                                    <div className="text-sm font-semibold text-[var(--color-text)]">{thema.budget.ressort}</div>
                                    <div className="text-[12px] text-[var(--color-text-2)] mt-1">{thema.budget.anteil}</div>
                                    <div className="text-[11px] text-[var(--color-amber)] mt-1 font-medium">{thema.budget.vergleich}</div>
                                </div>

                                {/* Versprechen */}
                                <div className="p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
                                    <div className="text-[10px] font-semibold text-[var(--color-text-3)] uppercase tracking-wider mb-1">Versprochen</div>
                                    <div className="text-sm text-[var(--color-text)]">{thema.versprechen.text}</div>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${noteStyle.text} ${noteStyle.bg}`}>
                                            Note {thema.versprechen.note}: {noteStyle.label}
                                        </span>
                                        <span className="text-[11px] text-[var(--color-text-3)]">{thema.versprechen.status}</span>
                                    </div>
                                </div>

                                {/* Zuständigkeit */}
                                <div className="p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
                                    <div className="text-[10px] font-semibold text-[var(--color-text-3)] uppercase tracking-wider mb-1">Zuständiger Ausschuss</div>
                                    <a href={thema.zustaendig.ausschussUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--color-blue)] hover:underline flex items-center gap-1">
                                        {thema.zustaendig.ausschuss} <ExternalLink size={10} />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {section === 'lobby' && (
                        <motion.div key="lobby" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <div className="text-[10px] font-semibold text-[var(--color-green)] uppercase tracking-wider mb-3">Dafür / Reform</div>
                                    <div className="space-y-2">
                                        {thema.lobby.dafuer.map((l, i) => (
                                            <div key={i} className="p-3 rounded-xl bg-[var(--color-green)]/5 border border-[var(--color-green)]/10">
                                                <div className="text-sm font-medium text-[var(--color-text)]">{l.name}</div>
                                                <div className="text-[11px] text-[var(--color-text-3)]">{l.ausgaben} · {l.lobbyisten} Lobbyist:innen</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[10px] font-semibold text-[var(--color-red)] uppercase tracking-wider mb-3">Dagegen / Status Quo</div>
                                    <div className="space-y-2">
                                        {thema.lobby.dagegen.map((l, i) => (
                                            <div key={i} className="p-3 rounded-xl bg-[var(--color-red)]/5 border border-[var(--color-red)]/10">
                                                <div className="text-sm font-medium text-[var(--color-text)]">{l.name}</div>
                                                <div className="text-[11px] text-[var(--color-text-3)]">{l.ausgaben} · {l.lobbyisten} Lobbyist:innen</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 p-3 rounded-xl bg-[var(--color-amber)]/5 border border-[var(--color-amber)]/15 text-[12px] text-[var(--color-text-2)]">
                                <span className="font-semibold text-[var(--color-amber)]">Fazit:</span> {thema.lobby.fazit}
                            </div>
                        </motion.div>
                    )}

                    {section === 'vorbild' && (
                        <motion.div key="vorbild" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-3xl">{thema.international.flagge}</span>
                                <div>
                                    <div className="text-sm font-bold text-[var(--color-text)]">Vorbild: {thema.international.vorbild}</div>
                                    <div className="text-[11px] text-[var(--color-text-3)]">Was können wir lernen?</div>
                                </div>
                            </div>

                            <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] mb-4">
                                <div className="text-[10px] font-semibold text-[var(--color-green)] uppercase tracking-wider mb-2">Was {thema.international.vorbild} macht</div>
                                <p className="text-sm text-[var(--color-text)] leading-relaxed">{thema.international.wasBeimVorbild}</p>
                            </div>

                            <div className="p-4 rounded-xl bg-[var(--color-blue)]/5 border border-[var(--color-blue)]/15 mb-3">
                                <div className="text-[10px] font-semibold text-[var(--color-blue)] uppercase tracking-wider mb-2">Was Deutschland übernehmen könnte</div>
                                <p className="text-sm text-[var(--color-text)] leading-relaxed">{thema.international.wasWirLernen}</p>
                            </div>

                            <div className="text-[10px] text-[var(--color-text-3)]">Quelle: {thema.international.quelle}</div>
                        </motion.div>
                    )}

                    {section === 'aktion' && (
                        <motion.div key="aktion" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <div className="space-y-3">
                                <a
                                    href={`https://www.abgeordnetenwatch.de/search?query=${encodeURIComponent(thema.zustaendig.ausschuss)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:bg-[var(--color-surface-2)] transition-colors"
                                >
                                    <Mail size={18} className="text-[var(--color-blue)] shrink-0" />
                                    <div>
                                        <div className="text-sm font-semibold text-[var(--color-text)]">Ausschussmitglieder anschreiben</div>
                                        <div className="text-[11px] text-[var(--color-text-3)]">Frage die zuständigen MdBs, warum Note {thema.versprechen.note} — und was sie ändern wollen.</div>
                                    </div>
                                    <ExternalLink size={14} className="text-[var(--color-text-3)] shrink-0" />
                                </a>

                                <a
                                    href={thema.zustaendig.ausschussUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:bg-[var(--color-surface-2)] transition-colors"
                                >
                                    <Globe size={18} className="text-[var(--color-purple)] shrink-0" />
                                    <div>
                                        <div className="text-sm font-semibold text-[var(--color-text)]">Ausschuss-Sitzungen verfolgen</div>
                                        <div className="text-[11px] text-[var(--color-text-3)]">Öffentliche Sitzungen werden live auf bundestag.de übertragen.</div>
                                    </div>
                                    <ExternalLink size={14} className="text-[var(--color-text-3)] shrink-0" />
                                </a>

                                <div className="p-4 rounded-xl bg-[var(--color-green)]/5 border border-[var(--color-green)]/15">
                                    <div className="text-sm font-semibold text-[var(--color-text)] mb-2 flex items-center gap-2">
                                        <ArrowRight size={14} className="text-[var(--color-green)]" />
                                        Konkreter Vorschlag
                                    </div>
                                    <p className="text-[13px] text-[var(--color-text-2)] leading-relaxed">
                                        "Deutschland sollte sich am Modell {thema.international.vorbild} orientieren: {thema.international.wasWirLernen.split('.')[0]}."
                                        <br /><br />
                                        Nutze diesen Satz in deinem Brief an den Ausschuss. Konkrete internationale Vorbilder sind überzeugender als abstrakte Forderungen.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

const ThemenLookup = () => {
    const [query, setQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('alle');
    const results = useMemo(() => searchThemen(query), [query]);

    return (
        <section id="themen" className="w-full py-24 px-6">
            <div className="container-main max-w-4xl">
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-[var(--color-surface-2)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-blue)]">
                            <Search size={16} strokeWidth={1.5} />
                        </div>
                        <span className="text-xs font-medium text-[var(--color-text-3)] uppercase tracking-widest">Dein Thema</span>
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-2xl md:text-3xl font-bold text-gradient-heading">
                            Was ist dir wichtig?
                        </h2>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[var(--color-blue)]/8 text-[var(--color-blue)] border border-[var(--color-blue)]/15">
                            {themen.length} Themen
                        </span>
                    </div>
                    <p className="text-[var(--color-text-2)] text-sm max-w-lg">
                        Tippe dein Thema ein. Wir zeigen dir: wer zuständig ist, was versprochen wurde, wer Lobby macht, welches Land es besser macht — und was du konkret tun kannst.
                    </p>
                </motion.div>

                {/* Search */}
                <div className="relative mb-6">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-3)]" />
                    <input
                        type="text"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="Tippe ein Thema: Rente, Klima, Tierschutz, Bildung..."
                        className="w-full pl-12 pr-4 py-4 rounded-2xl text-base bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-text-3)] focus:border-[var(--color-blue)] focus:outline-none transition-colors"
                    />
                </div>

                {/* Category browser — shown when not searching */}
                {!query && (
                    <CategoryBrowser
                        onSelect={setQuery}
                        activeCategory={activeCategory}
                        onCategoryChange={setActiveCategory}
                    />
                )}

                {/* Results */}
                <div className="mt-6 space-y-4">
                    {results.map(thema => (
                        <ThemenCard key={thema.id} thema={thema} />
                    ))}

                    {query.length >= 2 && results.length === 0 && (
                        <div className="text-center py-12 text-sm text-[var(--color-text-3)]">
                            Kein Thema gefunden für "{query}". Wir bauen die Datenbank laufend aus.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ThemenLookup;
