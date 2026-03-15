import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Wifi, WifiOff } from 'lucide-react';
import CategoryCard from './CategoryCard';
import Search from './Search';
import { budgetByYear } from '../data';
import { fetchBundeshaushalt, getCacheFreshness } from '../api/bundeshaushalt';
import { RefreshCw } from 'lucide-react';

const BudgetStream = ({ taxAmount, year }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [liveData, setLiveData] = useState(null);
    const [isLive, setIsLive] = useState(false);
    const [loading, setLoading] = useState(false);

    // Try live API, fallback to static data
    useEffect(() => {
        let cancelled = false;
        setLoading(true);

        fetchBundeshaushalt(year).then(result => {
            if (cancelled) return;
            if (result) {
                setLiveData(result);
                setIsLive(true);
            } else {
                setLiveData(null);
                setIsLive(false);
            }
            setLoading(false);
        });

        return () => { cancelled = true; };
    }, [year]);

    const staticYearData = budgetByYear[year] || budgetByYear[2025];
    const categories = isLive && liveData ? liveData.categories : staticYearData.categories;
    const total = isLive && liveData ? liveData.total : staticYearData.total;

    const filteredData = useMemo(() =>
        categories.filter(c =>
            c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (c.examples || []).some(ex => ex.toLowerCase().includes(searchTerm.toLowerCase()))
        ), [categories, searchTerm]
    );

    return (
        <section id="haushalt" className="w-full py-24 px-6 relative">
            <div className="container-main">
                <motion.div
                    className="mb-14"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 rounded-lg bg-[var(--color-surface-2)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-blue)]">
                                    <BarChart3 size={16} strokeWidth={1.5} />
                                </div>
                                <span className="text-xs font-medium text-[var(--color-text-3)] uppercase tracking-widest">Aufschlüsselung</span>
                                {/* Live/Static indicator */}
                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium border ${
                                    isLive
                                        ? 'text-[var(--color-green)] border-[var(--color-green)]/20 bg-[var(--color-green)]/5'
                                        : 'text-[var(--color-text-3)] border-[var(--color-border)] bg-[var(--color-surface)]'
                                }`}>
                                    {isLive ? <Wifi size={9} /> : <WifiOff size={9} />}
                                    {isLive ? 'Live API' : 'Offline-Daten'}
                                </span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gradient-heading mb-2">
                                Bundeshaushalt {year}
                            </h2>
                            <p className="text-[var(--color-text-2)] text-sm max-w-md">
                                {taxAmount
                                    ? `Deine €${taxAmount.toLocaleString('de-DE')} Steuern — aufgeteilt auf ${categories.length} Bereiche.`
                                    : `€${total} Mrd verteilt auf ${categories.length} Bereiche. Quelle: ${isLive ? 'bundeshaushalt.de (Live)' : 'BMF'}.`}
                            </p>
                            {isLive && liveData?.lastUpdated && (
                                <p className="text-[10px] text-[var(--color-text-3)] mt-1">
                                    BMF-Datenstand: {liveData.lastUpdated} · Abgerufen: {liveData.fetchedAt}
                                </p>
                            )}
                            {!isLive && (
                                <p className="text-[10px] text-[var(--color-text-3)] mt-1">
                                    Statische Daten (BMF Haushaltsplan {year}). Live-API nicht erreichbar — Daten werden bei Verfügbarkeit automatisch aktualisiert.
                                </p>
                            )}
                        </div>
                        <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
                    </div>
                </motion.div>

                {loading ? (
                    <div className="flex items-center justify-center py-24 gap-3">
                        <div className="w-5 h-5 border-2 border-[var(--color-blue)] border-t-transparent rounded-full animate-spin" />
                        <span className="text-sm text-[var(--color-text-3)]">Lade Haushaltsdaten...</span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredData.map((category, index) => (
                            <CategoryCard key={category.id} category={category} index={index} userTax={taxAmount} />
                        ))}
                    </div>
                )}

                {!loading && filteredData.length === 0 && (
                    <div className="text-center text-[var(--color-text-3)] py-20 text-sm">
                        Keine Kategorie für &bdquo;{searchTerm}&ldquo; gefunden.
                    </div>
                )}
            </div>
        </section>
    );
};

export default BudgetStream;
