import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Map, Navigation, Layers, Radio } from 'lucide-react';

// Mock data for map pins - Focused on Berlin, Germany
const localProjects = [
    { id: 1, title: "Gymnasium Mitte Renovation", type: "Education", amount: "€2.4M", lat: 52.5200, lng: 13.4050 },
    { id: 2, title: "Radbahn Kreuzberg", type: "Infrastructure", amount: "€450k", lat: 52.4980, lng: 13.4100 },
    { id: 3, title: "Tiergarten Replanting", type: "Environment", amount: "€120k", lat: 52.5140, lng: 13.3500 },
    { id: 4, title: "Charité New Wing", type: "Health", amount: "€12M", lat: 52.5250, lng: 13.3700 },
];

const NearMeMap = () => {
    const [isAdminView, setIsAdminView] = useState(false);

    return (
        <section className="w-full py-20 px-4 bg-gray-50">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <h2 className="text-3xl font-bold flex items-center gap-2">
                                <Map className="text-[var(--color-accent-blue)]" />
                                Spending Near You
                            </h2>
                            <span className="px-2 py-1 rounded-full bg-red-100 text-red-600 text-xs font-bold flex items-center gap-1 animate-pulse">
                                <Radio size={12} /> LIVE
                            </span>
                        </div>
                        <p className="text-gray-600">
                            Real-time project tracking. Currently viewing: <span className="font-bold text-black">Berlin, Germany</span>.
                        </p>
                    </div>

                    {/* B2B Toggle */}
                    <div className="flex items-center gap-3 bg-white p-2 rounded-full shadow-sm border border-gray-200 mt-4 md:mt-0">
                        <span className={`text-sm font-medium ${!isAdminView ? 'text-black' : 'text-gray-400'}`}>Citizen View</span>
                        <button
                            onClick={() => setIsAdminView(!isAdminView)}
                            className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${isAdminView ? 'bg-[var(--color-accent-purple)]' : 'bg-gray-200'}`}
                        >
                            <motion.div
                                className="w-4 h-4 bg-white rounded-full shadow-md"
                                animate={{ x: isAdminView ? 24 : 0 }}
                            />
                        </button>
                        <span className={`text-sm font-medium ${isAdminView ? 'text-[var(--color-accent-purple)]' : 'text-gray-400'}`}>City Admin</span>
                    </div>
                </div>

                {/* Map Container */}
                <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-xl bg-slate-100 border border-gray-200 group">

                    {/* Mock Map Background (CSS Pattern) */}
                    <div className="absolute inset-0 opacity-50"
                        style={{
                            backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
                            backgroundSize: '20px 20px'
                        }}
                    />

                    {/* Berlin Map Placeholder Image (Simulated) */}
                    <div className="absolute inset-0 opacity-30 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/Berlin_map_city_center.png')] bg-cover bg-center grayscale" />

                    {/* Simulated Pins */}
                    {localProjects.map((project, i) => (
                        <motion.div
                            key={project.id}
                            className="absolute cursor-pointer"
                            style={{
                                top: `${40 + (Math.sin(i * 1.5) * 20)}%`,
                                left: `${50 + (Math.cos(i * 1.5) * 20)}%`
                            }}
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            whileHover={{ scale: 1.2, zIndex: 10 }}
                        >
                            <div className={`relative flex flex-col items-center ${isAdminView ? 'opacity-40' : 'opacity-100'}`}>
                                <div className="w-4 h-4 rounded-full bg-[var(--color-accent-blue)] ring-4 ring-white/50 shadow-lg animate-pulse" />
                                <div className="mt-2 bg-white px-3 py-1 rounded-lg shadow-lg text-xs font-bold whitespace-nowrap flex flex-col items-center">
                                    <span>{project.title}</span>
                                    <span className="text-[var(--color-accent-blue)]">{project.amount}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Admin Overlay (Heatmap Simulation) */}
                    {isAdminView && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 pointer-events-none"
                        >
                            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500/20 blur-[80px] rounded-full" />
                            <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-blue-500/20 blur-[80px] rounded-full" />

                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg border border-gray-200">
                                <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                                    <Layers size={14} /> Berlin District Efficiency
                                </h4>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs">
                                        <span>Mitte Budget Utilization</span>
                                        <span className="font-mono font-bold text-green-600">94%</span>
                                    </div>
                                    <div className="w-32 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-500 w-[94%]" />
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span>Kreuzberg Project Delays</span>
                                        <span className="font-mono font-bold text-red-500">12%</span>
                                    </div>
                                    <div className="w-32 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-red-500 w-[12%]" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Navigation Controls Mock */}
                    <div className="absolute bottom-6 right-6 flex flex-col gap-2">
                        <button className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 text-gray-600">
                            <Navigation size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NearMeMap;
