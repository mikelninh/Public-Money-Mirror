import React from 'react';
import { motion } from 'framer-motion';
import { Vote, Mail, CalendarClock, ExternalLink, Megaphone } from 'lucide-react';

const actions = [
    {
        icon: Vote,
        headline: 'Wählen gehen',
        description: 'Finde dein Wahllokal und informiere dich über die Stimmabgabe.',
        cta: 'Wahllokal finden',
        href: 'https://www.bundeswahlleiter.de/bundestagswahlen/2025/wahlkreiseinteilung.html',
        gradient: 'from-[var(--color-blue)] to-[var(--color-cyan)]',
        borderColor: 'var(--color-blue)',
    },
    {
        icon: Mail,
        headline: 'Abgeordnete kontaktieren',
        description: 'Schreib deinem MdB direkt — stelle Fragen, fordere Transparenz.',
        cta: 'Schreib deinem MdB',
        href: 'https://www.abgeordnetenwatch.de',
        gradient: 'from-[var(--color-purple)] to-[var(--color-red)]',
        borderColor: 'var(--color-purple)',
    },
    {
        icon: CalendarClock,
        headline: 'Nächste Wahlen',
        description: 'Die nächste Bundestagswahl findet voraussichtlich im Herbst 2029 statt.',
        cta: 'Erinnerung setzen',
        href: null,
        gradient: 'from-[var(--color-green)] to-[var(--color-cyan)]',
        borderColor: 'var(--color-green)',
    },
];

const CivicAction = () => {
    const handleReminder = () => {
        if ('Notification' in window && Notification.permission !== 'denied') {
            Notification.requestPermission();
        }
        alert('Wahltermin-Erinnerung wird über deinen Browser-Kalender empfohlen. Die nächste Bundestagswahl ist voraussichtlich im Herbst 2029.');
    };

    return (
        <section id="mitmachen" className="w-full py-24 px-6">
            <div className="container-main">
                <motion.div
                    className="mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-[var(--color-surface-2)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-green)]">
                            <Megaphone size={16} strokeWidth={1.5} />
                        </div>
                        <span className="text-xs font-medium text-[var(--color-text-3)] uppercase tracking-widest">Civic Action</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gradient-heading mb-2">
                        Du kannst etwas tun
                    </h2>
                    <p className="text-[var(--color-text-2)] text-sm max-w-lg">
                        Demokratie lebt von Beteiligung. Hier sind drei konkrete Schritte.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {actions.map((action, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="card p-6 relative overflow-hidden group"
                        >
                            {/* Gradient top border */}
                            <div
                                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${action.gradient}`}
                            />

                            <div
                                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                                style={{ background: `${action.borderColor}15` }}
                            >
                                <action.icon size={20} style={{ color: action.borderColor }} />
                            </div>

                            <h3 className="text-base font-semibold text-[var(--color-text)] mb-2">
                                {action.headline}
                            </h3>
                            <p className="text-sm text-[var(--color-text-2)] mb-5 leading-relaxed">
                                {action.description}
                            </p>

                            {action.href ? (
                                <a
                                    href={action.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-surface-2)] hover:border-[var(--color-border-hover)]"
                                >
                                    {action.cta}
                                    <ExternalLink size={13} />
                                </a>
                            ) : (
                                <button
                                    onClick={handleReminder}
                                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-surface-2)] hover:border-[var(--color-border-hover)]"
                                >
                                    {action.cta}
                                    <CalendarClock size={13} />
                                </button>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CivicAction;
