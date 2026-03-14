import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-[var(--color-accent-blue)] to-transparent blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tl from-[var(--color-accent-purple)] to-transparent blur-[100px]" />
            </div>

            {/* Main Content */}
            <div className="z-10 text-center px-4">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-gradient"
                >
                    Where does your money go?
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-xl md:text-2xl text-[var(--color-text-muted)] mb-12 max-w-2xl mx-auto"
                >
                    Let’s follow its journey.
                </motion.p>

                {/* The Antigravity Coin */}
                <div className="relative h-64 w-64 mx-auto mb-12 perspective-1000">
                    <motion.div
                        className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 shadow-2xl flex items-center justify-center relative z-20"
                        animate={{
                            y: [-10, 10, -10],
                            rotateY: [0, 10, 0, -10, 0],
                            boxShadow: [
                                "0 20px 50px rgba(234, 179, 8, 0.3)",
                                "0 10px 30px rgba(234, 179, 8, 0.2)",
                                "0 20px 50px rgba(234, 179, 8, 0.3)"
                            ]
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <div className="absolute inset-1 rounded-full border-2 border-yellow-200 opacity-50" />
                        <span className="text-6xl font-bold text-white drop-shadow-md">€</span>

                        {/* Shine effect */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
                    </motion.div>

                    {/* Shadow on the "floor" */}
                    <motion.div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-4 bg-black/10 rounded-[100%] blur-md"
                        animate={{
                            scale: [1, 0.8, 1],
                            opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[var(--color-text-muted)] flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
            >
                <span className="text-sm font-medium tracking-widest uppercase">Scroll to split</span>
                <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <ArrowDown size={20} />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
