import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from './Icon';

const CitizensReceipt = ({ taxAmount, onClose }) => {
    const [showShare, setShowShare] = useState(false);

    // Calculate tangible impacts
    const impacts = [
        { icon: "Coffee", label: "School Lunches", amount: Math.floor((taxAmount * 0.04) / 3.5), color: "text-orange-500", bg: "bg-orange-500/10" },
        { icon: "Trees", label: "Trees Planted", amount: Math.floor((taxAmount * 0.02) / 150), color: "text-green-500", bg: "bg-green-500/10" },
        { icon: "Book", label: "Library Books", amount: Math.floor((taxAmount * 0.01) / 12), color: "text-blue-500", bg: "bg-blue-500/10" },
        { icon: "Zap", label: "Street Lights Powered (Hrs)", amount: Math.floor((taxAmount * 0.03) / 0.5), color: "text-yellow-500", bg: "bg-yellow-500/10" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
        >
            <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
                >
                    <Icon name="X" size={20} className="text-gray-600" />
                </button>

                <div className="p-8 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-green-50 to-transparent" />

                    <div className="relative z-10">
                        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-100">
                            <Icon name="Check" size={32} className="text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold mb-1">Contribution Verified</h2>
                        <p className="text-gray-500 mb-6">Thank you, Citizen.</p>

                        <div className="text-4xl font-bold font-mono mb-8">
                            €{taxAmount?.toLocaleString()}
                        </div>

                        <div className="text-left mb-6">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Your Tangible Impact</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {impacts.map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.1 }}
                                        className={`p-4 rounded-2xl ${item.bg} border border-transparent hover:border-gray-200 transition-colors`}
                                    >
                                        <div className={`${item.color} mb-2`}>
                                            <Icon name={item.icon} size={24} />
                                        </div>
                                        <div className="text-2xl font-bold mb-1">{item.amount}</div>
                                        <div className="text-xs text-gray-600 font-medium">{item.label}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Hero Card / Share Preview */}
                        <div className="bg-black text-white rounded-xl p-6 relative overflow-hidden group cursor-pointer transform transition-transform hover:scale-105">
                            <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                            <div className="absolute top-0 right-0 p-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-2xl opacity-30 -mr-8 -mt-8" />

                            <div className="relative z-10 flex justify-between items-end">
                                <div className="text-left">
                                    <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">Status</div>
                                    <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                                        Taxpayer Hero
                                    </div>
                                </div>
                                <Icon name="Share2" size={20} className="text-gray-400 group-hover:text-white transition-colors" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 p-4 flex gap-3 border-t border-gray-100">
                    <button className="flex-1 py-3 rounded-xl bg-black text-white font-bold text-sm hover:bg-gray-800 transition-colors shadow-lg">
                        Download Receipt
                    </button>
                    <button className="flex-1 py-3 rounded-xl bg-white border border-gray-200 text-black font-bold text-sm hover:bg-gray-50 transition-colors">
                        Share Impact
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default CitizensReceipt;
