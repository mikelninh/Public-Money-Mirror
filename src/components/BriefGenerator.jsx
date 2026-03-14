import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Copy, Check, ExternalLink, ChevronRight, Users } from 'lucide-react';
import { letterTemplates } from '../data/lifeImpact';

const BriefGenerator = () => {
    const [selected, setSelected] = useState(null);
    const [copied, setCopied] = useState(false);
    const [name, setName] = useState('');

    const handleCopy = (text) => {
        const personalized = text.replace('[NAME MdB]', name || 'Abgeordnete/r');
        navigator.clipboard.writeText(personalized);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const template = selected ? letterTemplates.find(t => t.id === selected) : null;

    return (
        <section id="mitmachen" className="w-full py-24 px-6">
            <div className="container-main max-w-4xl">
                <motion.div
                    className="mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-[var(--color-surface-2)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-green)]">
                            <Mail size={16} strokeWidth={1.5} />
                        </div>
                        <span className="text-xs font-medium text-[var(--color-text-3)] uppercase tracking-widest">Aktiv werden</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gradient-heading mb-2">
                        Schreib deinem MdB — mit echtem Inhalt
                    </h2>
                    <p className="text-[var(--color-text-2)] text-sm max-w-lg">
                        Keine leere Geste. Wähle ein konkretes Thema, wir geben dir einen fundierten Brief mit Quellen.
                        Dein:e Abgeordnete:r muss antworten.
                    </p>
                </motion.div>

                {/* Topic cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
                    {letterTemplates.map((tpl, i) => (
                        <motion.button
                            key={tpl.id}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            onClick={() => setSelected(selected === tpl.id ? null : tpl.id)}
                            className={`card p-5 text-left transition-all ${
                                selected === tpl.id
                                    ? '!border-[var(--color-blue)]/30 !bg-[var(--color-blue)]/5'
                                    : ''
                            }`}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <Mail size={16} className={selected === tpl.id ? 'text-[var(--color-blue)]' : 'text-[var(--color-text-3)]'} />
                                <ChevronRight size={14} className={`text-[var(--color-text-3)] transition-transform ${selected === tpl.id ? 'rotate-90' : ''}`} />
                            </div>
                            <h3 className="text-sm font-semibold text-[var(--color-text)] mb-2">{tpl.title}</h3>
                            <p className="text-[12px] text-[var(--color-text-2)] leading-relaxed mb-3">{tpl.context}</p>
                            <div className="flex items-center gap-2 text-[10px] text-[var(--color-text-3)]">
                                <Users size={10} />
                                <span>{tpl.count.toLocaleString('de-DE')} haben diesen Brief bereits genutzt</span>
                            </div>
                        </motion.button>
                    ))}
                </div>

                {/* Letter preview */}
                <AnimatePresence>
                    {template && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            <div className="card p-6">
                                {/* MdB name input */}
                                <div className="flex flex-col sm:flex-row gap-3 mb-5">
                                    <div className="flex-1">
                                        <label className="text-[10px] font-semibold text-[var(--color-text-3)] uppercase tracking-wider mb-1.5 block">
                                            Name deines MdB (optional)
                                        </label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                            placeholder="z.B. Dr. Anna Müller"
                                            className="w-full px-3 py-2 rounded-lg text-sm bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-text-3)] focus:border-[var(--color-blue)] focus:outline-none transition-colors"
                                        />
                                    </div>
                                    <a
                                        href="https://www.bundestag.de/abgeordnete"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-[var(--color-blue)] border border-[var(--color-border)] hover:bg-[var(--color-surface)] transition-colors self-end whitespace-nowrap"
                                    >
                                        MdB finden <ExternalLink size={11} />
                                    </a>
                                </div>

                                {/* Subject */}
                                <div className="mb-4">
                                    <label className="text-[10px] font-semibold text-[var(--color-text-3)] uppercase tracking-wider mb-1 block">Betreff</label>
                                    <div className="text-sm font-medium text-[var(--color-text)] px-3 py-2 rounded-lg bg-[var(--color-surface-2)] border border-[var(--color-border)]">
                                        {template.subject}
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="mb-4">
                                    <label className="text-[10px] font-semibold text-[var(--color-text-3)] uppercase tracking-wider mb-1 block">Brief</label>
                                    <div className="text-[13px] text-[var(--color-text)] leading-relaxed px-4 py-3 rounded-lg bg-[var(--color-surface-2)] border border-[var(--color-border)] whitespace-pre-line max-h-[300px] overflow-y-auto">
                                        {template.body.replace('[NAME MdB]', name || '[Name deines MdB]')}
                                    </div>
                                </div>

                                {/* Source */}
                                <div className="text-[10px] text-[var(--color-text-3)] mb-5">
                                    Quelle: {template.source}
                                </div>

                                {/* Actions */}
                                <div className="flex flex-wrap gap-3">
                                    <button
                                        onClick={() => handleCopy(template.body)}
                                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
                                        style={{ background: copied ? 'var(--color-green)' : 'linear-gradient(135deg, var(--color-blue), var(--color-purple))' }}
                                    >
                                        {copied ? <><Check size={14} /> Kopiert!</> : <><Copy size={14} /> Brief kopieren</>}
                                    </button>
                                    <a
                                        href="https://www.abgeordnetenwatch.de"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-surface-2)] transition-colors"
                                    >
                                        Via abgeordnetenwatch.de senden <ExternalLink size={12} />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default BriefGenerator;
