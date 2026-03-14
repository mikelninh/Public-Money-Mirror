import React, { useState, lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LifeSituation from './components/LifeSituation';
import Icon from './components/Icon';

// Lazy-load heavy sections for performance
const PersonalImpact = lazy(() => import('./components/PersonalImpact'));
const ThemenLookup = lazy(() => import('./components/ThemenLookup'));
const BudgetStream = lazy(() => import('./components/BudgetStream'));
const BudgetFacts = lazy(() => import('./components/BudgetFacts'));
const ImpactChains = lazy(() => import('./components/ImpactChains'));
const PartyCompare = lazy(() => import('./components/PartyCompare'));
const LobbyTracker = lazy(() => import('./components/LobbyTracker'));
const NearMeMap = lazy(() => import('./components/NearMeMap'));
const ScandalTracker = lazy(() => import('./components/ScandalTracker'));
const PolitikZeugnis = lazy(() => import('./components/PolitikZeugnis'));
const MdBZeugnis = lazy(() => import('./components/MdBZeugnis'));
const VorbilderGlobal = lazy(() => import('./components/VorbilderGlobal'));
const BudgetSimulator = lazy(() => import('./components/BudgetSimulator'));
const BriefGenerator = lazy(() => import('./components/BriefGenerator'));
const VotingInterface = lazy(() => import('./components/VotingInterface'));
const TaxTicker = lazy(() => import('./components/TaxTicker'));
const Personalizer = lazy(() => import('./components/Personalizer'));
const TimeSlider = lazy(() => import('./components/TimeSlider'));
const CitizensReceipt = lazy(() => import('./components/CitizensReceipt'));

const SectionLoader = () => (
    <div className="flex items-center justify-center py-24">
        <div className="w-5 h-5 border-2 border-[var(--color-blue)] border-t-transparent rounded-full animate-spin" />
    </div>
);

function App() {
    const [taxAmount, setTaxAmount] = useState(null);
    const [year, setYear] = useState(2025);
    const [showReceipt, setShowReceipt] = useState(false);
    const [lifeSituation, setLifeSituation] = useState(null);

    const handleTaxUpdate = (amount) => {
        setTaxAmount(amount);
        setShowReceipt(true);
    };

    return (
        <div className="min-h-screen">
            <Navbar />
            <Hero />
            <LifeSituation selected={lifeSituation} onSelect={setLifeSituation} />

            <Suspense fallback={<SectionLoader />}>
                {lifeSituation && <PersonalImpact situation={lifeSituation} />}
                <ThemenLookup />
                <BudgetStream taxAmount={taxAmount} year={year} />
                <BudgetFacts />
                <ImpactChains />
                <PartyCompare />
                <LobbyTracker />
                <NearMeMap />
                <ScandalTracker />
                <PolitikZeugnis />
                <MdBZeugnis />
                <VorbilderGlobal />
                <BudgetSimulator />
                <BriefGenerator />
                <VotingInterface />

                <TaxTicker />
                <Personalizer onTaxUpdate={handleTaxUpdate} />
                <TimeSlider currentYear={year} onYearChange={setYear} />

                <AnimatePresence>
                    {showReceipt && (
                        <CitizensReceipt taxAmount={taxAmount} onClose={() => setShowReceipt(false)} />
                    )}
                </AnimatePresence>
            </Suspense>

            {/* Footer */}
            <footer className="border-t border-[var(--color-border)] py-8 px-6 pb-24">
                <div className="container-main flex flex-col md:flex-row justify-between items-center gap-4">
                    <span className="text-xs text-[var(--color-text-3)] tracking-wide">
                        Public Money Mirror &copy; 2025 &middot; Open Source &middot; MIT
                    </span>
                    <div className="flex items-center gap-4 text-xs text-[var(--color-text-3)]">
                        <span>Daten: BMF, Lobbyregister, Bundesrechnungshof</span>
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
