import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ExternalLink, Clock } from 'lucide-react';

// Documented cases of federal waste, cost overruns, and mismanagement
// All amounts and dates from Bundesrechnungshof reports, parliamentary inquiries, and major press coverage
const scandals = [
    {
        id: 1,
        title: 'BER Flughafen — Kostenexplosion',
        amount: '€6,6 Mrd',
        originalAmount: '€2,83 Mrd',
        status: 'Abgeschlossen',
        type: 'waste',
        description: 'Ursprünglich €2,83 Mrd geplant, am Ende €6,6 Mrd. 9 Jahre Verspätung. Brandschutz-Mängel, Planungschaos, mangelnde Aufsicht. Kein politisch Verantwortlicher zur Rechenschaft gezogen.',
        date: '2006–2020',
        source: 'https://www.berlin-airport.de',
        sourceLabel: 'Bundesrechnungshof-Berichte, BER GmbH',
    },
    {
        id: 2,
        title: 'Gorch Fock — Sanierung x13',
        amount: '€135 Mio',
        originalAmount: '€10 Mio',
        status: 'Abgeschlossen',
        type: 'overrun',
        description: 'Sanierung des Segelschulschiffs: von €10 Mio auf €135 Mio. 13-fache Kostenüberschreitung. Bundesrechnungshof rügt massive Versäumnisse bei BMVg und Werft.',
        date: '2016–2021',
        source: 'https://www.bundesrechnungshof.de',
        sourceLabel: 'Bundesrechnungshof Sonderbericht 2019',
    },
    {
        id: 3,
        title: 'PKW-Maut — Politisches Prestigeprojekt',
        amount: '€243 Mio',
        originalAmount: '€0 (sollte Einnahmen bringen)',
        status: 'EuGH-Urteil',
        type: 'waste',
        description: 'PKW-Maut vom EuGH als EU-rechtswidrig gekippt. Verträge mit Betreibern voreilig geschlossen. Schadenersatz €243 Mio an CTS Eventim/Kapsch. Untersuchungsausschuss: Scheuer hat Bundestag nicht korrekt informiert.',
        date: '2018–2019',
        source: 'https://www.bundestag.de/ausschuesse/untersuchungsausschuesse',
        sourceLabel: 'Untersuchungsausschuss 19. BT, EuGH C-591/17',
    },
    {
        id: 4,
        title: 'CureVac — Staatliche Fehlinvestition',
        amount: '€300 Mio',
        originalAmount: '€300 Mio Beteiligung',
        status: 'Verlust realisiert',
        type: 'investment',
        description: 'Bundesbeteiligung 2020 zum Schutz vor feindlicher Übernahme. Impfstoff-Kandidat gescheitert (Wirksamkeit nur 48%). Aktienwert um >90% gefallen. Strategische Begründung fragwürdig.',
        date: '2020–heute',
        source: 'https://www.bundesfinanzministerium.de',
        sourceLabel: 'BMF Beteiligungsbericht 2023, CureVac SE',
    },
    {
        id: 5,
        title: 'Berater-Affäre BMVg',
        amount: '€155 Mio',
        originalAmount: 'Unklar (keine Ausschreibungen)',
        status: 'Abgeschlossen',
        type: 'waste',
        description: 'Unter von der Leyen vergab das BMVg Beraterverträge ohne ordnungsgemäße Vergabe. McKinsey, Accenture, u.a. erhielten Direktaufträge. Akten wurden gelöscht. Untersuchungsausschuss konnte Verantwortung nicht vollständig klären.',
        date: '2014–2019',
        source: 'https://www.bundestag.de',
        sourceLabel: 'Untersuchungsausschuss 19. BT „Beraterverträge"',
    },
    {
        id: 6,
        title: 'Corona-Masken — Überteuerte Beschaffung',
        amount: '€6+ Mrd',
        originalAmount: 'Marktüblich wäre ca. €2 Mrd gewesen',
        status: 'Gerichtsverfahren laufend',
        type: 'waste',
        description: 'BMG kaufte 2020/21 Masken zu Pandemie-Höchstpreisen (teilweise €4,50/Stück statt marktüblich €0,30). 800 Mio überschüssige Masken eingelagert, teilweise verbrannt. Bundesrechnungshof: „erhebliche finanzielle Schäden".',
        date: '2020–2023',
        source: 'https://www.bundesrechnungshof.de',
        sourceLabel: 'BRH Sonderbericht 2022, diverse Zivilklagen',
    },
    {
        id: 7,
        title: 'Stuttgart 21 — Unendliche Geschichte',
        amount: '€11,5 Mrd',
        originalAmount: '€2,5 Mrd (1995)',
        status: 'Im Bau',
        type: 'overrun',
        description: 'Ursprünglich 1995 mit €2,5 Mrd kalkuliert. Aktueller Kostenrahmen: €11,5 Mrd. Fertigstellung mehrfach verschoben (aktuell: frühestens 2026). Bundesanteil ca. €1,5 Mrd.',
        date: '1995–2026+',
        source: 'https://www.bahnprojekt-stuttgart-ulm.de',
        sourceLabel: 'DB AG Projektberichte, BRH',
    },
];

const statusColors = {
    'Abgeschlossen': { bg: 'bg-[var(--color-surface-2)]', text: 'text-[var(--color-text-3)]', border: 'border-[var(--color-border)]' },
    'Unter Prüfung': { bg: 'bg-amber-500/5', text: 'text-[var(--color-amber)]', border: 'border-amber-500/10' },
    'EuGH-Urteil': { bg: 'bg-red-500/5', text: 'text-[var(--color-red)]', border: 'border-red-500/10' },
    'Gerichtsverfahren laufend': { bg: 'bg-amber-500/5', text: 'text-[var(--color-amber)]', border: 'border-amber-500/10' },
    'Verlust realisiert': { bg: 'bg-red-500/5', text: 'text-[var(--color-red)]', border: 'border-red-500/10' },
    'Im Bau': { bg: 'bg-amber-500/5', text: 'text-[var(--color-amber)]', border: 'border-amber-500/10' },
};

const ScandalTracker = () => {
    const totalWaste = '€25,2+ Mrd';

    return (
        <section id="kontrolle" className="w-full py-24 px-6">
            <div className="container-main max-w-4xl">
                <motion.div
                    className="mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-red-500/8 border border-red-500/10 flex items-center justify-center text-[var(--color-red)]">
                            <AlertTriangle size={16} strokeWidth={1.5} />
                        </div>
                        <span className="text-xs font-medium text-[var(--color-text-3)] uppercase tracking-widest">Verschwendungstracker</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gradient-heading mb-2">
                        Wo Steuergeld verbrannt wird
                    </h2>
                    <p className="text-[var(--color-text-2)] text-sm max-w-lg mb-6">
                        Dokumentierte Fälle von Kostenexplosion, Fehlplanung und Verschwendung.
                        Quellen: Bundesrechnungshof, Untersuchungsausschüsse, BMF.
                    </p>

                    <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-red-500/5 border border-red-500/10">
                        <span className="text-xs text-[var(--color-text-3)]">Dokumentierter Schaden</span>
                        <span className="text-lg font-bold font-mono text-[var(--color-red)]">{totalWaste}</span>
                    </div>
                </motion.div>

                <div className="space-y-3">
                    {scandals.map((item, index) => {
                        const colors = statusColors[item.status] || statusColors['Abgeschlossen'];
                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.06 }}
                                className="card group p-5"
                            >
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-3">
                                    <div className="flex-1">
                                        <h3 className="text-[15px] font-semibold text-[var(--color-text)] mb-1">{item.title}</h3>
                                        <div className="flex items-center gap-3 text-[11px] text-[var(--color-text-3)]">
                                            <span className="flex items-center gap-1"><Clock size={11} /> {item.date}</span>
                                            <span>Geplant: {item.originalAmount}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2.5 shrink-0">
                                        <span className="text-base font-mono font-bold text-[var(--color-red)]">{item.amount}</span>
                                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium border ${colors.bg} ${colors.text} ${colors.border}`}>
                                            {item.status}
                                        </span>
                                    </div>
                                </div>

                                <p className="text-[13px] text-[var(--color-text-2)] leading-relaxed mb-3">{item.description}</p>

                                <a
                                    href={item.source}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-xs font-medium text-[var(--color-blue)] hover:underline"
                                >
                                    {item.sourceLabel} <ExternalLink size={11} />
                                </a>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ScandalTracker;
