import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Vote, Briefcase, FileText, UserCheck, Globe, Sliders, Mail, MapPin, AlertTriangle, Eye, Megaphone } from 'lucide-react';

const features = [
    { icon: BarChart3, label: 'Haushalt', desc: '€489 Mrd aufgeschlüsselt', href: '#haushalt', color: 'var(--color-blue)' },
    { icon: Vote, label: 'Parteien', desc: 'Wer will was ausgeben?', href: '#parteien', color: 'var(--color-purple)' },
    { icon: Briefcase, label: 'Lobby', desc: 'Wer gibt Millionen aus?', href: '#lobby', color: 'var(--color-purple)' },
    { icon: Eye, label: 'Aufgedeckt', desc: 'Lobby × Geld × Macht', href: '#korruption', color: 'var(--color-red)' },
    { icon: FileText, label: 'Zeugnis', desc: 'Note für die Regierung', href: '#zeugnis', color: 'var(--color-red)' },
    { icon: UserCheck, label: 'MdB-Index', desc: '28 Abgeordnete bewertet', href: '#mdb-zeugnis', color: 'var(--color-amber)' },
    { icon: Globe, label: 'Vorbilder', desc: 'Andere machen es besser', href: '#vorbilder', color: 'var(--color-cyan)' },
    { icon: Sliders, label: 'Simulator', desc: 'Dein Haushaltsentwurf', href: '#simulator', color: 'var(--color-green)' },
    { icon: Megaphone, label: 'Kampagnen', desc: 'Gemeinsam Druck machen', href: '#kampagnen', color: 'var(--color-green)' },
    { icon: Mail, label: 'MdB-Brief', desc: 'Brief an deinen MdB', href: '#mitmachen', color: 'var(--color-green)' },
    { icon: AlertTriangle, label: 'Verschwendung', desc: '€25+ Mrd dokumentiert', href: '#kontrolle', color: 'var(--color-red)' },
    { icon: MapPin, label: 'Projekte', desc: '10 Bundesweite Baustellen', href: '#vorort', color: 'var(--color-cyan)' },
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
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-lg md:text-xl font-bold text-gradient-heading mb-2">Entdecke mehr</h2>
                    <p className="text-sm text-[var(--color-text-2)]">Klick auf ein Thema um tiefer einzusteigen.</p>
                </motion.div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3 max-w-4xl mx-auto">
                    {features.map((f, i) => (
                        <motion.button
                            key={f.label}
                            onClick={(e) => handleClick(e, f.href)}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.03 }}
                            className="flex flex-col items-center gap-2 p-3 md:p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-2)] hover:border-[var(--color-border-hover)] transition-all group"
                        >
                            <f.icon size={18} className="text-[var(--color-text-3)] group-hover:text-[var(--color-text-2)] transition-colors" />
                            <span className="text-xs font-semibold text-[var(--color-text)]">{f.label}</span>
                            <span className="text-[10px] text-[var(--color-text-3)] text-center leading-tight hidden sm:block">{f.desc}</span>
                        </motion.button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeatureGrid;
