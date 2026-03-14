import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, X } from 'lucide-react';

const Personalizer = ({ onTaxUpdate }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [amount, setAmount] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onTaxUpdate(Number(amount));
        setIsOpen(false);
    };

    return (
        <>
            {/* Floating Trigger Button */}
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-[var(--color-accent-blue)] text-white shadow-lg hover:shadow-xl transition-shadow"
            >
                <Calculator size={24} />
            </motion.button>

            {/* Modal Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white rounded-3xl p-8 shadow-2xl max-w-md w-full relative overflow-hidden"
                        >
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <h3 className="text-2xl font-bold mb-2">Personalize the Flow</h3>
                            <p className="text-[var(--color-text-muted)] mb-6">
                                Enter your annual tax contribution to see exactly where your money goes.
                            </p>

                            <form onSubmit={handleSubmit}>
                                <div className="relative mb-6">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-400">€</span>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="5000"
                                        className="w-full pl-10 pr-4 py-4 text-3xl font-bold bg-gray-50 rounded-2xl border-2 border-transparent focus:border-[var(--color-accent-blue)] focus:bg-white outline-none transition-all"
                                        autoFocus
                                    />
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="w-full py-4 rounded-xl bg-black text-white font-bold text-lg hover:bg-gray-800 transition-colors"
                                >
                                    Show My Impact
                                </motion.button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Personalizer;
