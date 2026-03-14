import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './Icon';

const proposals = [
    { id: 1, title: "Audit Bundestag Renovation Costs", votes: 1240, status: "Active", tier: "citizen" },
    { id: 2, title: "Review A100 Autobahn Expansion", votes: 892, status: "Active", tier: "citizen" },
    { id: 3, title: "Digitalization Fund Transparency", votes: 2156, status: "Passed", tier: "guardian" },
];

const VotingInterface = ({ userTier, onDonate }) => {
    const [blocks, setBlocks] = useState([1, 2, 3]);
    const [votedId, setVotedId] = useState(null);
    const [showSignal, setShowSignal] = useState(false);

    // Simulate blockchain activity
    useEffect(() => {
        const interval = setInterval(() => {
            setBlocks(prev => [...prev.slice(-4), prev[prev.length - 1] + 1]);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const handleVote = (id) => {
        if (userTier === 'citizen') {
            onDonate(); // Prompt to upgrade if they try to do a "Guardian" action, or just let them vote?
            // Plan says: Citizen (Free): View only? Or Vote free?
            // Plan says: "Universal Access: Voting is free for all citizens."
            // So Citizen CAN vote.
        }

        setVotedId(id);
        setShowSignal(true);
        setTimeout(() => setShowSignal(false), 3000);
    };

    const getVotingPower = () => {
        if (userTier === 'council') return 10;
        if (userTier === 'guardian') return 5;
        return 1;
    };

    return (
        <section className="w-full py-20 px-4 bg-black text-white overflow-hidden relative border-t border-gray-900">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <div className="container mx-auto relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                                On-Chain Governance
                            </h2>
                            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-900/30 border border-green-500/30 text-green-400 text-[10px] font-mono uppercase tracking-wider">
                                <Icon name="Wifi" size={10} className="animate-pulse" /> Live Mainnet
                            </div>
                        </div>
                        <p className="text-gray-400">Your voice is the signal. We amplify it to the CityOS.</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="text-right hidden md:block">
                            <div className="text-xs text-gray-500 uppercase tracking-wider">Your Status</div>
                            <div className={`font-bold flex items-center justify-end gap-2 ${userTier === 'council' ? 'text-yellow-400' : userTier === 'guardian' ? 'text-purple-400' : 'text-blue-400'}`}>
                                {userTier === 'council' && <Icon name="Shield" size={16} />}
                                {userTier === 'guardian' && <Icon name="Shield" size={16} />}
                                {userTier.toUpperCase()}
                            </div>
                        </div>
                        {userTier === 'citizen' && (
                            <button
                                onClick={onDonate}
                                className="flex items-center gap-2 px-6 py-3 rounded-full font-bold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all shadow-lg shadow-purple-900/20"
                            >
                                <Icon name="Shield" size={18} />
                                Become a Guardian
                            </button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Proposals Column */}
                    <div className="lg:col-span-2 space-y-4">
                        {proposals.map((prop) => (
                            <motion.div
                                key={prop.id}
                                className={`p-6 rounded-2xl border ${votedId === prop.id ? 'border-green-500 bg-green-500/10' : 'border-gray-800 bg-gray-900/50'} backdrop-blur-sm relative overflow-hidden group`}
                                whileHover={{ scale: 1.01 }}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <span className="text-xs font-mono text-gray-500 mb-1 block">PROPOSAL #{prop.id}</span>
                                        <h3 className="text-xl font-bold">{prop.title}</h3>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm font-mono text-gray-400">
                                        <Icon name="Box" size={14} /> Block {18492 + prop.id}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-6">
                                    <div className="w-full max-w-xs">
                                        <div className="flex justify-between text-xs mb-1 text-gray-400">
                                            <span>Votes</span>
                                            <span>{prop.votes.toLocaleString()}</span>
                                        </div>
                                        <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500" style={{ width: `${(prop.votes / 3000) * 100}%` }} />
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleVote(prop.id)}
                                        disabled={votedId !== null}
                                        className={`px-6 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${votedId === prop.id ? 'bg-green-500 text-black' : 'bg-white text-black hover:bg-gray-200 hover:scale-105'}`}
                                    >
                                        {votedId === prop.id ? (
                                            <> <Icon name="Check" size={16} /> Voted </>
                                        ) : (
                                            <> Vote <span className="text-xs opacity-50 ml-1">({getVotingPower()}x)</span> </>
                                        )}
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Live Chain Visualizer */}
                    <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Icon name="Activity" size={14} /> Live Ledger
                        </h3>

                        {/* Signal Sent Animation Overlay */}
                        <AnimatePresence>
                            {showSignal && (
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -50 }}
                                    className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm"
                                >
                                    <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-black mb-4 shadow-[0_0_30px_#22c55e]">
                                        <Icon name="Wifi" size={32} />
                                    </div>
                                    <h4 className="text-xl font-bold text-white">Signal Sent!</h4>
                                    <p className="text-sm text-gray-400">CityOS has received your input.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="relative h-[400px] flex flex-col items-center justify-end gap-4 overflow-hidden">
                            <AnimatePresence>
                                {blocks.map((block) => (
                                    <motion.div
                                        key={block}
                                        initial={{ y: -50, opacity: 0, scale: 0.8 }}
                                        animate={{ y: 0, opacity: 1, scale: 1 }}
                                        exit={{ y: 50, opacity: 0 }}
                                        className="w-full p-4 rounded-xl bg-gradient-to-br from-gray-800 to-black border border-gray-700 flex items-center justify-between group hover:border-blue-500/50 transition-colors cursor-pointer"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:text-white group-hover:bg-blue-500 transition-colors">
                                                <Icon name="Box" size={16} />
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-500">Block Hash</div>
                                                <div className="font-mono text-xs text-gray-300">0x8a...9f2</div>
                                            </div>
                                        </div>
                                        <div className="text-xs text-green-400 font-mono">+4 Votes</div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            <div className="absolute top-0 w-full h-20 bg-gradient-to-b from-black to-transparent z-10" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VotingInterface;
