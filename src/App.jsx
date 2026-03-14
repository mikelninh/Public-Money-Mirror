import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LifeSituation from './components/LifeSituation';
import PersonalImpact from './components/PersonalImpact';
import ThemenLookup from './components/ThemenLookup';
import BudgetStream from './components/BudgetStream';
import BudgetFacts from './components/BudgetFacts';
import ImpactChains from './components/ImpactChains';
import PartyCompare from './components/PartyCompare';
import LobbyTracker from './components/LobbyTracker';
import NearMeMap from './components/NearMeMap';
import ScandalTracker from './components/ScandalTracker';
import PolitikZeugnis from './components/PolitikZeugnis';
import MdBZeugnis from './components/MdBZeugnis';
import BudgetSimulator from './components/BudgetSimulator';
import BriefGenerator from './components/BriefGenerator';
import VotingInterface from './components/VotingInterface';
import TaxTicker from './components/TaxTicker';
import Personalizer from './components/Personalizer';
import TimeSlider from './components/TimeSlider';
import CitizensReceipt from './components/CitizensReceipt';
import Icon from './components/Icon';

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

            {/* 1. Hook: "Wo landet dein Steuergeld?" */}
            <Hero />

            {/* 2. Personal: "Wer bist du?" */}
            <LifeSituation selected={lifeSituation} onSelect={setLifeSituation} />

            {/* 3. Personal: "Was das für DICH bedeutet" (conditionally shown) */}
            {lifeSituation && <PersonalImpact situation={lifeSituation} />}

            {/* 4. Themen-Lookup: "Was ist dir wichtig?" */}
            <ThemenLookup />

            {/* 5. Data: Der volle Haushalt */}
            <BudgetStream taxAmount={taxAmount} year={year} />

            {/* 5. Surprise: "Wusstest du?" */}
            <BudgetFacts />

            {/* 6. Cause & Effect: "Wie Lobby-Geld deinen Alltag beeinflusst" */}
            <ImpactChains />

            {/* 7. Deep Dive: Parteienvergleich */}
            <PartyCompare />

            {/* 8. Follow the Money: Lobbyregister */}
            <LobbyTracker />

            {/* 9. Local: Bundesweite Projekte */}
            <NearMeMap />

            {/* 10. Accountability: Verschwendung */}
            <ScandalTracker />

            {/* 11. Report Card: Versprochen vs. Geliefert */}
            <PolitikZeugnis />

            {/* 12. Individual: MdB Transparenz-Index */}
            <MdBZeugnis />

            {/* 12. Play: "Wie würdest du €489 Mrd verteilen?" */}
            <BudgetSimulator />

            {/* 12. Action: Brief an deinen MdB */}
            <BriefGenerator />

            {/* 13. Signal: Bürgervotum */}
            <VotingInterface />

            {/* Utilities */}
            <TaxTicker />
            <Personalizer onTaxUpdate={handleTaxUpdate} />
            <TimeSlider currentYear={year} onYearChange={setYear} />

            <AnimatePresence>
                {showReceipt && (
                    <CitizensReceipt taxAmount={taxAmount} onClose={() => setShowReceipt(false)} />
                )}
            </AnimatePresence>

            {/* Footer */}
            <footer className="border-t border-[var(--color-border)] py-8 px-6 pb-24">
                <div className="container-main flex flex-col md:flex-row justify-between items-center gap-4">
                    <span className="text-xs text-[var(--color-text-3)] tracking-wide">
                        Public Money Mirror &copy; 2025 &middot; Open Source
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
