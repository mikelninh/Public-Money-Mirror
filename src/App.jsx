import React, { useState, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LifeSituation from './components/LifeSituation';
import FeatureGrid from './components/FeatureGrid';
import Icon from './components/Icon';

// Lazy-load all deep sections
const PersonalImpact = lazy(() => import('./components/PersonalImpact'));
const ThemenLookup = lazy(() => import('./components/ThemenLookup'));
const BudgetStream = lazy(() => import('./components/BudgetStream'));
const BudgetFacts = lazy(() => import('./components/BudgetFacts'));
const ImpactChains = lazy(() => import('./components/ImpactChains'));
const PartyCompare = lazy(() => import('./components/PartyCompare'));
const LobbyTracker = lazy(() => import('./components/LobbyTracker'));
const NearMeMap = lazy(() => import('./components/NearMeMap'));
const ScandalTracker = lazy(() => import('./components/ScandalTracker'));
const KorruptionsTracker = lazy(() => import('./components/KorruptionsTracker'));
const PolitikZeugnis = lazy(() => import('./components/PolitikZeugnis'));
const MdBZeugnis = lazy(() => import('./components/MdBZeugnis'));
const VorbilderGlobal = lazy(() => import('./components/VorbilderGlobal'));
const BudgetSimulator = lazy(() => import('./components/BudgetSimulator'));
const Kampagnen = lazy(() => import('./components/Kampagnen'));
const BriefGenerator = lazy(() => import('./components/BriefGenerator'));
const VotingInterface = lazy(() => import('./components/VotingInterface'));
const TaxTicker = lazy(() => import('./components/TaxTicker'));
const Personalizer = lazy(() => import('./components/Personalizer'));
const TimeSlider = lazy(() => import('./components/TimeSlider'));
const CitizensReceipt = lazy(() => import('./components/CitizensReceipt'));

const SectionLoader = () => (
    <div className="flex items-center justify-center py-16">
        <div className="w-5 h-5 border-2 border-[var(--color-blue)] border-t-transparent rounded-full animate-spin" />
    </div>
);

function App() {
    const [taxAmount, setTaxAmount] = useState(null);
    const [year, setYear] = useState(2025);
    const [showReceipt, setShowReceipt] = useState(false);
    const [lifeSituation, setLifeSituation] = useState(null);
    const [showDeepDive, setShowDeepDive] = useState(false);

    const handleTaxUpdate = (amount) => {
        setTaxAmount(amount);
        setShowReceipt(true);
    };

    const handleExplore = () => {
        setShowDeepDive(true);
    };

    return (
        <div className="min-h-screen">
            <Navbar />

            {/* ═══ LANDING ═══ Always visible, focused, fast */}
            <Hero />
            <LifeSituation selected={lifeSituation} onSelect={setLifeSituation} />

            <Suspense fallback={<SectionLoader />}>
                {lifeSituation && <PersonalImpact situation={lifeSituation} />}
                <ThemenLookup />
            </Suspense>

            {/* Feature grid — always visible as navigation */}
            <FeatureGrid onExplore={handleExplore} />

            {/* ═══ DEEP DIVE ═══ Revealed on demand */}
            {showDeepDive && (
                <Suspense fallback={<SectionLoader />}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                    >
                        <BudgetStream taxAmount={taxAmount} year={year} />
                        <BudgetFacts />
                        <ImpactChains />
                        <PartyCompare />
                        <LobbyTracker />
                        <NearMeMap />
                        <ScandalTracker />
                        <KorruptionsTracker />
                        <PolitikZeugnis />
                        <MdBZeugnis />
                        <VorbilderGlobal />
                        <BudgetSimulator />
                        <Kampagnen />
                        <BriefGenerator />
                        <VotingInterface />
                    </motion.div>
                </Suspense>
            )}

            {/* ═══ UTILITIES ═══ Always available */}
            <Suspense fallback={null}>
                {showDeepDive && (
                    <>
                        <TaxTicker />
                        <Personalizer onTaxUpdate={handleTaxUpdate} />
                        <TimeSlider currentYear={year} onYearChange={setYear} />
                    </>
                )}
                <AnimatePresence>
                    {showReceipt && (
                        <CitizensReceipt taxAmount={taxAmount} onClose={() => setShowReceipt(false)} />
                    )}
                </AnimatePresence>
            </Suspense>

            {/* Footer */}
            <footer className="border-t border-[var(--color-border)] py-6 md:py-8 px-4 md:px-6 pb-20 md:pb-24">
                <div className="container-main flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
                    <span className="text-[10px] md:text-xs text-[var(--color-text-3)] tracking-wide">
                        Public Money Mirror &copy; 2025 &middot; Open Source &middot; MIT
                    </span>
                    <div className="flex items-center gap-3 md:gap-4 text-[10px] md:text-xs text-[var(--color-text-3)]">
                        <span>Daten: BMF, Lobbyregister, BRH</span>
                        <a
                            href="https://www.bundeshaushalt.de"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 hover:text-[var(--color-text-2)] transition-colors"
                        >
                            <Icon name="ExternalLink" size={10} />
                            bundeshaushalt.de
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;
