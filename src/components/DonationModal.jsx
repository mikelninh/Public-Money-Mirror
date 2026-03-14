import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './Icon';

const tiers = [
    {
        id: 'guardian',
        name: 'Guardian',
        price: 5,
        color: 'from-purple-500 to-blue-500',
        features: ['Vote on Proposals', 'Guardian Badge', 'Access to Discord']
    },
    {
        id: 'council',
        name: 'Council Member',
        price: 25,
        color: 'from-yellow-400 to-orange-500',
        features: ['10x Voting Power', 'Propose New Topics', 'Direct Line to CityOS']
    }
];

const DonationModal = ({ isOpen, onClose, onSuccess }) => {
    const [step, setStep] = useState('select'); // select, processing, success
    const [selectedTier, setSelectedTier] = useState(null);

    const handleSelect = (tier) => {
        setSelectedTier(tier);
        setStep('processing');
        // Simulate payment processing
        setTimeout(() => {
            setStep('success');
            onSuccess(tier.id);
        }, 2000);
    };

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-gray-900 border border-gray-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors z-10"
                >
                    <Icon name="X" size={20} />
                </button>

                <div className="p-8">
                    {step === 'select' && (
                        <>
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-white mb-2">Choose Your Impact</h2>
                                <p className="text-gray-400">Support the platform and amplify your voice.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {tiers.map((tier) => (
                                    <div
                                        key={tier.id}
                                        onClick={() => handleSelect(tier)}
                                        className="group relative p-6 rounded-2xl bg-gray-800 border border-gray-700 hover:border-gray-500 cursor-pointer transition-all hover:-translate-y-1"
                                    >
                                        <div className={`absolute inset-0 bg-gradient-to-br ${tier.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity`} />

                                        <div className="flex justify-between items-start mb-4">
                                            <div className={`p-3 rounded-xl bg-gradient-to-br ${tier.color} text-white shadow-lg`}>
                                                <Icon name="Shield" size={24} />
                                            </div>
                                            <div className="text-2xl font-bold text-white">€{tier.price}<span className="text-sm text-gray-500 font-normal">/mo</span></div>
                                        </div>

                                        <h3 className="text-xl font-bold text-white mb-4">{tier.name}</h3>

                                        <ul className="space-y-3 mb-6">
                                            {tier.features.map((feat, i) => (
                                                <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                                                    <Icon name="Check" size={14} className="text-green-500" /> {feat}
                                                </li>
                                            ))}
                                        </ul>

                                        <button className={`w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r ${tier.color} opacity-90 group-hover:opacity-100 transition-opacity`}>
                                            Select {tier.name}
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 text-center">
                                <button onClick={onClose} className="text-sm text-gray-500 hover:text-white transition-colors">
                                    No thanks, I'll stay a Citizen for now.
                                </button>
                            </div>
                        </>
                    )}

                    {step === 'processing' && (
                        <div className="py-20 text-center">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-6"
                            />
                            <h3 className="text-xl font-bold text-white mb-2">Processing Contribution...</h3>
                            <p className="text-gray-400">Securing your voting rights on-chain.</p>
                        </div>
                    )}

                    {step === 'success' && (
                        <div className="py-10 text-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_50px_#22c55e]"
                            >
                                <Icon name="Check" size={48} className="text-black" />
                            </motion.div>
                            <h2 className="text-3xl font-bold text-white mb-2">Welcome, {selectedTier.name}!</h2>
                            <p className="text-gray-400 mb-8">Your voting power has been upgraded.</p>
                            <button
                                onClick={onClose}
                                className="px-8 py-3 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-colors"
                            >
                                Start Voting
                            </button>
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default DonationModal;
