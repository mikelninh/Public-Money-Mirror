import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './Icon';

const tiers = [
    { id: 'guardian', name: 'Guardian', price: 5, gradient: 'linear-gradient(135deg, var(--color-purple), var(--color-blue))', features: ['Abstimmen', 'Guardian Badge', 'Discord-Zugang'] },
    { id: 'council', name: 'Council', price: 25, gradient: 'linear-gradient(135deg, var(--color-amber), var(--color-orange))', features: ['10x Stimmgewicht', 'Vorschläge einreichen', 'Direktleitung CityOS'] },
];

const DonationModal = ({ isOpen, onClose, onSuccess }) => {
    const [step, setStep] = useState('select');
    const [selectedTier, setSelectedTier] = useState(null);

    const handleSelect = (tier) => {
        setSelectedTier(tier);
        setStep('processing');
        setTimeout(() => { setStep('success'); onSuccess(tier.id); }, 2000);
    };

    if (!isOpen) return null;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={(e) => e.target === e.currentTarget && onClose()}>
            <motion.div
                initial={{ scale: 0.95, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="card w-full max-w-xl relative overflow-hidden"
            >
                <button onClick={onClose} className="absolute top-4 right-4 z-10 text-[var(--color-text-3)] hover:text-[var(--color-text-2)] transition-colors">
                    <Icon name="X" size={18} />
                </button>

                <div className="p-7">
                    {step === 'select' && (
                        <>
                            <h2 className="text-xl font-bold mb-1">Wähle deinen Impact</h2>
                            <p className="text-[var(--color-text-3)] text-sm mb-7">Unterstütze die Plattform, verstärke deine Stimme.</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {tiers.map(tier => (
                                    <div key={tier.id} onClick={() => handleSelect(tier)}
                                        className="card group p-5 cursor-pointer hover:-translate-y-0.5 transition-transform">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white" style={{ background: tier.gradient }}>
                                                <Icon name="Shield" size={18} />
                                            </div>
                                            <div className="text-lg font-bold">&euro;{tier.price}<span className="text-xs text-[var(--color-text-3)] font-normal">/mo</span></div>
                                        </div>
                                        <h3 className="font-semibold mb-3">{tier.name}</h3>
                                        <ul className="space-y-2 mb-5">
                                            {tier.features.map((f, i) => (
                                                <li key={i} className="flex items-center gap-2 text-sm text-[var(--color-text-2)]">
                                                    <Icon name="Check" size={13} className="text-[var(--color-green)]" /> {f}
                                                </li>
                                            ))}
                                        </ul>
                                        <button className="w-full py-2.5 rounded-xl text-sm font-semibold text-white opacity-80 group-hover:opacity-100 transition-opacity" style={{ background: tier.gradient }}>
                                            Wählen
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button onClick={onClose} className="block mx-auto mt-5 text-xs text-[var(--color-text-3)] hover:text-[var(--color-text-2)] transition-colors">
                                Erstmal als Bürger:in bleiben
                            </button>
                        </>
                    )}
                    {step === 'processing' && (
                        <div className="py-16 text-center">
                            <div className="w-8 h-8 border-2 border-[var(--color-blue)] border-t-transparent rounded-full mx-auto mb-5 animate-spin" />
                            <h3 className="font-semibold mb-1">Verarbeitung...</h3>
                            <p className="text-sm text-[var(--color-text-3)]">Stimmrecht wird gesichert.</p>
                        </div>
                    )}
                    {step === 'success' && (
                        <div className="py-10 text-center">
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                                className="w-14 h-14 rounded-2xl bg-[var(--color-green)] flex items-center justify-center mx-auto mb-5 shadow-[0_0_30px_rgba(52,211,153,0.3)]">
                                <Icon name="Check" size={28} className="text-black" />
                            </motion.div>
                            <h2 className="text-xl font-bold mb-1">Willkommen, {selectedTier?.name}!</h2>
                            <p className="text-sm text-[var(--color-text-3)] mb-7">Dein Stimmgewicht wurde erhöht.</p>
                            <button onClick={onClose} className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white"
                                style={{ background: 'linear-gradient(135deg, var(--color-blue), var(--color-purple))' }}>
                                Jetzt abstimmen
                            </button>
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default DonationModal;
