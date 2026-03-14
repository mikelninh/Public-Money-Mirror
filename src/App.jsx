import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import BudgetStream from './components/BudgetStream';
import Personalizer from './components/Personalizer';
import ScandalTracker from './components/ScandalTracker';
import TimeSlider from './components/TimeSlider';
import NearMeMap from './components/NearMeMap';
import VotingInterface from './components/VotingInterface';
import DonationModal from './components/DonationModal';
import CitizensReceipt from './components/CitizensReceipt';
import CityAdminDashboard from './components/CityAdminDashboard';
import Icon from './components/Icon';

function App() {
    const [taxAmount, setTaxAmount] = useState(null);
    const [year, setYear] = useState(2025);
    const [userTier, setUserTier] = useState('citizen'); // 'citizen', 'guardian', 'council'
    const [showDonation, setShowDonation] = useState(false);
    const [showReceipt, setShowReceipt] = useState(false);
    const [showAdmin, setShowAdmin] = useState(false);

    const handleTaxUpdate = (amount) => {
        setTaxAmount(amount);
        setShowReceipt(true);
    };

    return (
        <div className="app-container pb-24 bg-black min-h-screen text-white selection:bg-green-500 selection:text-black">
            <Hero />
            <BudgetStream taxAmount={taxAmount} year={year} />
            <NearMeMap />
            <ScandalTracker />

            <VotingInterface
                userTier={userTier}
                onDonate={() => setShowDonation(true)}
            />

            <Personalizer onTaxUpdate={handleTaxUpdate} />
            <TimeSlider currentYear={year} onYearChange={setYear} />

            <DonationModal
                isOpen={showDonation}
                onClose={() => setShowDonation(false)}
                onSuccess={(tier) => setUserTier(tier)}
            />

            <AnimatePresence>
                {showReceipt && (
                    <CitizensReceipt
                        taxAmount={taxAmount}
                        onClose={() => setShowReceipt(false)}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showAdmin && (
                    <CityAdminDashboard onClose={() => setShowAdmin(false)} />
                )}
            </AnimatePresence>

            {/* Enterprise / Gov Login Footer */}
            <div className="fixed bottom-0 left-0 w-full z-40 bg-black/80 backdrop-blur-md border-t border-gray-800 py-3 px-6 flex justify-between items-center">
                <div className="text-xs text-gray-500 font-mono">
                    Public Money Mirror © 2025 • Open Source
                </div>
                <button
                    onClick={() => setShowAdmin(true)}
                    className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors"
                >
                    <Icon name="Building" size={12} />
                    GOVERNMENT LOGIN
                </button>
            </div>
        </div>
    );
}

export default App;
