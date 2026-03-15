import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, X } from 'lucide-react';

const Personalizer = ({ onTaxUpdate }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [amount, setAmount] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (amount) {
            onTaxUpdate(Number(amount));
            setIsOpen(false);
        }
    };

    return (
        <>
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-20 right-3 md:right-5 z-40 w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center text-white shadow-lg"
                style={{ background: 'linear-gradient(135deg, var(--color-blue), var(--color-purple))', boxShadow: '0 4px 24px rgba(79,143,247,0.25)' }}
            >
                <Calculator size={18} strokeWidth={1.5} />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                        onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.95, y: 20, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            className="card p-7 max-w-sm w-full relative"
                        >
                            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-[var(--color-text-3)] hover:text-[var(--color-text-2)] transition-colors">
                                <X size={18} />
                            </button>

                            <h3 className="text-lg font-bold mb-1 text-[var(--color-text)]">Personalisieren</h3>
                            <p className="text-[var(--color-text-3)] text-sm mb-5">
                                Trage deine jährliche Steuerlast ein.
                            </p>

                            <form onSubmit={handleSubmit}>
                                <div className="relative mb-5">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-semibold text-[var(--color-text-3)]">&euro;</span>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="5000"
                                        className="w-full pl-10 pr-4 py-3.5 text-xl font-bold bg-[var(--color-surface-2)] rounded-xl border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-text-3)] focus:border-[var(--color-blue)] focus:outline-none transition-colors"
                                        autoFocus
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-opacity hover:opacity-90"
                                    style={{ background: 'linear-gradient(135deg, var(--color-blue), var(--color-purple))' }}
                                >
                                    Meinen Anteil zeigen
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Personalizer;
