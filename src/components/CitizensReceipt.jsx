import React from 'react';
import { motion } from 'framer-motion';
import Icon from './Icon';

const CitizensReceipt = ({ taxAmount, onClose }) => {
    const impacts = [
        { icon: "Coffee", label: "Schulessen", amount: Math.floor((taxAmount * 0.04) / 3.5), color: 'var(--color-orange)' },
        { icon: "Zap", label: "Straßenbeleuchtung (Std)", amount: Math.floor((taxAmount * 0.03) / 0.5), color: 'var(--color-amber)' },
        { icon: "BookOpen", label: "Bücherei-Bücher", amount: Math.floor((taxAmount * 0.01) / 12), color: 'var(--color-blue)' },
        { icon: "Heart", label: "Impfdosen", amount: Math.floor((taxAmount * 0.02) / 8), color: 'var(--color-green)' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <motion.div
                initial={{ scale: 0.95, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 20, opacity: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="card w-full max-w-md overflow-hidden"
            >
                <div className="p-7 text-center relative">
                    <button onClick={onClose} className="absolute top-4 right-4 text-[var(--color-text-3)] hover:text-[var(--color-text-2)] transition-colors">
                        <Icon name="X" size={18} />
                    </button>

                    <div className="w-12 h-12 rounded-xl bg-[var(--color-green)]/10 border border-[var(--color-green)]/10 flex items-center justify-center mx-auto mb-4">
                        <Icon name="Check" size={24} className="text-[var(--color-green)]" />
                    </div>
                    <h2 className="text-lg font-bold mb-1">Beitrag verifiziert</h2>
                    <p className="text-[var(--color-text-3)] text-sm mb-5">Danke, Bürger:in.</p>
                    <div className="text-3xl font-bold font-mono mb-7">&euro;{taxAmount?.toLocaleString('de-DE')}</div>

                    <div className="text-left mb-6">
                        <h3 className="text-[10px] font-semibold text-[var(--color-text-3)] uppercase tracking-[0.15em] mb-3">Dein konkreter Impact</h3>
                        <div className="grid grid-cols-2 gap-2.5">
                            {impacts.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.15 + i * 0.06 }}
                                    className="card p-3.5 !rounded-xl"
                                >
                                    <div className="mb-2" style={{ color: item.color }}><Icon name={item.icon} size={18} /></div>
                                    <div className="text-lg font-bold tabular-nums">{item.amount}</div>
                                    <div className="text-[10px] text-[var(--color-text-3)]">{item.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-[var(--color-border)] p-4 flex gap-2.5">
                    <button className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white"
                        style={{ background: 'linear-gradient(135deg, var(--color-blue), var(--color-purple))' }}>
                        Quittung laden
                    </button>
                    <button className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-surface-2)] transition-colors">
                        Teilen
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default CitizensReceipt;
