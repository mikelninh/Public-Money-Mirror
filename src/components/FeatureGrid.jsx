import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Vote, Briefcase, FileText, UserCheck, Globe, Sliders, Mail, MapPin, AlertTriangle, Eye, Megaphone, Signal } from 'lucide-react';

const featureCategories = [
    {
        label: 'Verstehen',
        description: 'Wie funktioniert der Haushalt?',
        items: [
            { icon: BarChart3, label: 'Haushalt', desc: '\u20AC489 Mrd aufgeschl\u00FCsselt', href: '#haushalt', color: 'var(--color-blue)' },
            { icon: Vote, label: 'Parteien', desc: 'Wer will was ausgeben?', href: '#parteien', color: 'var(--color-purple)' },
            { icon: Briefcase, label: 'Lobby', desc: 'Wer gibt Millionen aus?', href: '#lobby', color: 'var(--color-purple)' },
        ],
    },
    {
        label: 'Bewerten',
        description: 'Wie gut l\u00E4uft es wirklich?',
        items: [
            { icon: FileText, label: 'Zeugnis', desc: 'Note f\u00FCr die Regierung', href: '#zeugnis', color: 'var(--color-red)' },
            { icon: UserCheck, label: 'MdB-Index', desc: '28 Abgeordnete bewertet', href: '#mdb-zeugnis', color: 'var(--color-amber)' },
            { icon: Eye, label: 'Aufgedeckt', desc: 'Lobby \u00D7 Geld \u00D7 Macht', href: '#korruption', color: 'var(--color-red)' },
            { icon: AlertTriangle, label: 'Verschwendung', desc: '\u20AC25+ Mrd dokumentiert', href: '#kontrolle', color: 'var(--color-red)' },
        ],
    },
    {
        label: 'Lernen',
        description: 'Wer macht es besser?',
        items: [
            { icon: Globe, label: 'Vorbilder', desc: 'Andere machen es besser', href: '#vorbilder', color: 'var(--color-cyan)' },
            { icon: MapPin, label: 'Projekte', desc: '10 Bundesweite Baustellen', href: '#vorort', color: 'var(--color-cyan)' },
        ],
    },
    {
        label: 'Handeln',
        description: 'Was kannst du tun?',
        items: [
            { icon: Megaphone, label: 'Kampagnen', desc: 'Gemeinsam Druck machen', href: '#kampagnen', color: 'var(--color-green)' },
            { icon: Sliders, label: 'Simulator', desc: 'Dein Haushaltsentwurf', href: '#simulator', color: 'var(--color-green)' },
            { icon: Mail, label: 'MdB-Brief', desc: 'Brief an deinen MdB', href: '#mitmachen', color: 'var(--color-green)' },
            { icon: Signal, label: 'B\u00FCrgersignal', desc: 'Abstimmen & Meinung zeigen', href: '#buergersignal', color: 'var(--color-green)' },
        ],
    },
];

const FeatureGrid = ({ onExplore }) => {

    const handleClick = (e, href) => {
        e.preventDefault();
        // First reveal all sections
        onExplore();
        // Then scroll after React has rendered them
        setTimeout(() => {
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    };

    return (
        <section className="w-full py-16 px-4 md:px-6">
            <div className="container-main">
                <motion.div
                    className="text-center mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-lg md:text-xl font-bold text-gradient-heading mb-2">Entdecke mehr</h2>
                    <p className="text-sm text-[var(--color-text-2)]">Klick auf ein Thema um tiefer einzusteigen.</p>
                </motion.div>

                <div className="max-w-4xl mx-auto space-y-8">
                    {featureCategories.map((cat, catIdx) => (
                        <motion.div
                            key={cat.label}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: catIdx * 0.08 }}
                        >
                            {/* Category header */}
                            <div className="flex items-baseline gap-3 mb-3">
                                <h3 className="text-sm font-bold text-[var(--color-text)] uppercase tracking-wider">
                                    {cat.label}
                                </h3>
                                <span className="text-[11px] text-[var(--color-text-3)]">{cat.description}</span>
                            </div>

                            {/* Cards in 3-column grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3">
                                {cat.items.map((f, i) => (
                                    <motion.button
                                        key={f.label}
                                        onClick={(e) => handleClick(e, f.href)}
                                        initial={{ opacity: 0, y: 12 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: catIdx * 0.06 + i * 0.03 }}
                                        className="flex flex-col items-center gap-2 p-3 md:p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-2)] hover:border-[var(--color-border-hover)] transition-all group"
                                    >
                                        <f.icon size={18} style={{ color: f.color }} className="group-hover:scale-110 transition-transform" />
                                        <span className="text-xs font-semibold text-[var(--color-text)]">{f.label}</span>
                                        <span className="text-[10px] text-[var(--color-text-3)] text-center leading-tight hidden sm:block">{f.desc}</span>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeatureGrid;
