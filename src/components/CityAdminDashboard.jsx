import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './Icon';

const MetricCard = ({ title, value, trend, icon, color, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className="p-6 rounded-2xl bg-gray-900 border border-gray-800 relative overflow-hidden group hover:border-gray-700 transition-colors"
    >
        <div className={`absolute top-0 right-0 p-20 rounded-full ${color.replace('text-', 'bg-')} opacity-5 blur-3xl -mr-10 -mt-10 transition-opacity group-hover:opacity-10`} />

        <div className="flex justify-between items-start mb-4 relative z-10">
            <div className={`p-3 rounded-xl bg-gray-800 ${color}`}>
                <Icon name={icon} size={24} />
            </div>
            <span className={`text-xs font-mono font-bold px-2 py-1 rounded bg-gray-800 ${trend.toString().startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                {trend}
            </span>
        </div>
        <h3 className="text-gray-400 text-xs font-mono uppercase tracking-widest mb-1 relative z-10">{title}</h3>
        <div className="text-3xl font-bold text-white relative z-10 font-mono">{value}</div>
    </motion.div>
);

const CityAdminDashboard = ({ onClose }) => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [liveSignal, setLiveSignal] = useState("Waiting for citizen input...");
    const [allocations, setAllocations] = useState([40, 65, 35, 85, 55, 70, 45]);

    // Simulate Citizen Signal Stream (The Product)
    useEffect(() => {
        const signals = [
            "SIGNAL: 450 votes for 'School Lunch Subsidy' [Verified]",
            "ALERT: Negative sentiment spike in 'Transport' sector",
            "SIGNAL: 1,200 votes for 'Pothole Repair' in Mitte",
            "PREDICTION: 89% probability of protest if budget cut",
            "SIGNAL: New 'Guardian' tier member joined: ID #9921",
            "DATA: 15,000 data points collected today"
        ];
        let i = 0;
        const interval = setInterval(() => {
            setLiveSignal(signals[i]);
            i = (i + 1) % signals.length;
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    // Simulate Predictive Pulse
    useEffect(() => {
        const interval = setInterval(() => {
            setAllocations(prev => prev.map(v => Math.min(100, Math.max(10, v + (Math.random() * 10 - 5)))));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] bg-black text-white overflow-y-auto font-sans">
            {/* Enterprise Header */}
            <div className="sticky top-0 z-20 bg-black/90 backdrop-blur-xl border-b border-gray-800 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded bg-blue-600 flex items-center justify-center font-bold shadow-[0_0_20px_rgba(37,99,235,0.5)]">
                        <Icon name="Activity" size={24} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold flex items-center gap-2 tracking-tight">
                            CityOS <span className="font-mono text-blue-500">COMMAND CENTER</span>
                        </h1>
                        <p className="text-xs text-gray-500 flex items-center gap-2 font-mono">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
                            LICENSE: BERLIN_MUNICIPALITY_TIER_1
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-6 mr-4 text-xs font-mono text-gray-500 border-r border-gray-800 pr-6">
                        <span className="flex items-center gap-2"><Icon name="Shield" size={14} className="text-green-500" /> ISO 27001: COMPLIANT</span>
                        <span className="flex items-center gap-2"><Icon name="Server" size={14} className="text-blue-500" /> UPTIME: 99.99%</span>
                    </div>
                    <button className="px-4 py-2 rounded bg-blue-600/20 text-blue-400 border border-blue-600/50 text-xs font-bold hover:bg-blue-600/30 transition-all uppercase tracking-wider">
                        Upgrade to Federal View
                    </button>
                    <button onClick={onClose} className="p-2 rounded hover:bg-gray-800 text-gray-500 transition-colors"><Icon name="X" size={20} /></button>
                </div>
            </div>

            {/* The "Product" Stream */}
            <div className="bg-gray-900 border-b border-gray-800 py-2 px-6 flex items-center gap-4 overflow-hidden">
                <div className="text-xs font-bold text-blue-400 uppercase tracking-widest whitespace-nowrap flex items-center gap-2">
                    <Icon name="Wifi" size={12} className="animate-pulse" /> Incoming Citizen Signal:
                </div>
                <div className="text-xs font-mono text-gray-400 whitespace-nowrap animate-pulse">
                    {liveSignal}
                </div>
            </div>

            <div className="container mx-auto max-w-7xl p-8">
                {/* KPI Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <MetricCard title="Budget Efficiency" value="94.2%" trend="+2.4%" icon="PieChart" color="text-blue-500" delay={0.1} />
                    <MetricCard title="Public Trust Score" value="72/100" trend="+5.1%" icon="Heart" color="text-purple-500" delay={0.2} />
                    <MetricCard title="Risk Exposure" value="LOW" trend="-1.2%" icon="Shield" color="text-green-500" delay={0.3} />
                    <MetricCard title="Citizen Engagement" value="14.5k" trend="+12.5%" icon="Users" color="text-orange-500" delay={0.4} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Predictive Allocation Engine */}
                    <div className="lg:col-span-2 bg-gray-900 rounded-2xl border border-gray-800 p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-32 bg-blue-600/5 blur-3xl rounded-full -mr-16 -mt-16" />

                        <div className="flex items-center justify-between mb-8 relative z-10">
                            <div>
                                <h3 className="font-bold text-lg flex items-center gap-2">
                                    <Icon name="Zap" size={18} className="text-yellow-500" /> Predictive Allocation Engine
                                </h3>
                                <p className="text-xs text-gray-500 mt-1">AI Recommendation: Shift 5% to Education to optimize long-term growth.</p>
                            </div>
                            <button className="px-3 py-1 text-xs font-bold bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                                AUTO-OPTIMIZE
                            </button>
                        </div>

                        <div className="h-64 flex items-end justify-between gap-2 px-4 relative z-10">
                            {allocations.map((h, i) => (
                                <div key={i} className="w-full bg-gray-800 rounded-t-sm relative group overflow-hidden">
                                    <motion.div
                                        className="absolute bottom-0 left-0 right-0 bg-blue-600/80 group-hover:bg-blue-500"
                                        animate={{ height: `${h}%` }}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                    {/* Prediction Line */}
                                    <div className="absolute bottom-0 left-0 right-0 border-t-2 border-dashed border-white/30" style={{ height: `${h + 15}%` }} />
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-4 text-xs text-gray-500 font-mono relative z-10">
                            <span>EDU</span><span>INFRA</span><span>HEALTH</span><span>DEF</span><span>SOC</span><span>ENV</span><span>R&D</span>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Compliance & Audit */}
                        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
                            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-gray-200">
                                <Icon name="FileText" size={18} /> Audit Readiness
                            </h3>
                            <div className="flex items-center justify-center py-4">
                                <div className="relative w-32 h-32 flex items-center justify-center">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle cx="64" cy="64" r="60" stroke="#1f2937" strokeWidth="8" fill="none" />
                                        <circle cx="64" cy="64" r="60" stroke="#22c55e" strokeWidth="8" fill="none" strokeDasharray="377" strokeDashoffset="10" />
                                    </svg>
                                    <div className="absolute text-2xl font-bold font-mono">98%</div>
                                </div>
                            </div>
                            <div className="text-center text-xs text-gray-500">Next Audit: 14 Days</div>
                        </div>

                        {/* Upsell Card */}
                        <div className="bg-gradient-to-br from-blue-900 to-black rounded-2xl p-6 border border-blue-800/50 relative overflow-hidden group cursor-pointer">
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                            <div className="relative z-10">
                                <h3 className="font-bold text-lg text-white mb-2">Unlock Federal Data</h3>
                                <p className="text-sm text-blue-200 mb-4">Compare your municipality with national benchmarks.</p>
                                <div className="flex items-center gap-2 text-xs font-bold text-blue-300 group-hover:text-white transition-colors">
                                    CONTACT SALES <Icon name="ArrowRight" size={12} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default CityAdminDashboard;
